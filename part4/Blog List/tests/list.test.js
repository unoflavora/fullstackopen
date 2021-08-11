const helper = require('../utils/testing')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const api = supertest(app)
let token = ''
beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const newUser = new User(helper.newUser)
  const user = await newUser.save()
  token = await jwt.sign({username: user.username, id:user._id}, process.env.ROUTER)

  for (let blog of helper.listWithManyBlog) {
    blog['user'] = user._id
    let newBlog = new Blog(blog)
    await newBlog.save()
  }


})

test('Panjang list dari blog benar', async () => {
    const response = await api
      .get(`/api/blogs`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
    
    const blogList = await helper.fileInDB()
    
    expect(blogList.length).toEqual(3)
})
  
test('Ada id untuk setiap blog', async () => {
    const response = await api
      .get(`/api/blogs`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body[0].id).toBeDefined()
})
  
test('Berhasil mensubmit blog', async () => {
    
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }
  
    const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    expect(response.body.title).toEqual('Go To Statement Considered Harmful')
    
})

test('Likes default 0 jika tidak ada likes', async () => {
    const noLikes = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      }
    
    const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(noLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
})

test('if title or url missing, expect 400', async () => {
    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.noUrl)
    .expect(400)

    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.noTitle)
    .expect(400)
})

test('sucess delete', async () => {
  const deletedBlog = await Blog.findOne({title: 'The Godfather'})
  const id = deletedBlog.id.toString()

  await api
  .delete(`/api/blogs/${id}`)
  .set('Authorization', `bearer ${token}`)
  .expect(204)

  const fileInDB = await helper.fileInDB()

  expect(fileInDB).not.toContain(deletedBlog.title)
})

test('sucess update', async () => {
  const updatedBlog = await Blog.findOne({title: 'The Godfather'})
  updatedBlog.likes = 10
  const id = updatedBlog.id.toString()

  const response = await api
  .put(`/api/blogs/${id}`)
  .set('Authorization', `bearer ${token}`)
  .send(updatedBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toEqual(updatedBlog.likes)
})

test('gagal upload jika tida ada auth', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  } 

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(401)

})
  
afterAll(() => {
  mongoose.connection.close()
})