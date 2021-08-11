const Blog = require('../models/blog')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0 
  }
]
const listWithManyBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'The Godfather',
    author: 'Imam',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 100,
  }
]

const newUser = {
  username:'tests',
  passwordHash: 'password',
  name: 'admin'
}


const noTitle = {
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
}

const noUrl = {
  title: 'The Godfather',
  author: 'Edsger W. Dijkstra',
  likes: 5,
}

const dummy = (blogs) => {
  return blogs.length === 0 
    ? 1
    : blogs.length
}

const totalLikes = (blogs) => {
  const reduce = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return reduce
}

const favoriteBlog = (blogs) => {
  let maxLikes = {title: 'no blog', likes: 0}
  blogs.forEach((blog) => {
    if (blog.likes > maxLikes.likes) {
      maxLikes = blog
    }
  })
  return maxLikes
}

const fileInDB = async () => {
  const response = await Blog.find({})
  return response.map(res => res.toJSON())
}

module.exports = {
  listWithManyBlog, 
  listWithOneBlog,
  noTitle,
  noUrl, 
  newUser,
  fileInDB, 
  dummy, 
  totalLikes, 
  favoriteBlog
}