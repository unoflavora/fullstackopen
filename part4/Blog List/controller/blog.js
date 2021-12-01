const Router = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

Router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})
  
Router.post('/', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url)
  {
    return response.status(400).json({error:'no title or url!'})
  } else if (!request.user) {
    return response.status(401).json({error:'no user'})
  } else {

    const user = await User.findById(request.user.id)

    if (!body.likes) {
      body.likes = 0
    }
    
    const blog = new Blog({
      title: body.title, 
      author: body.author,
      url: body.url, 
      likes: body.likes,
      user: user.id,
      comments: []
    })

    const newBlog = await blog.save()

    response.status(201).json({message: 'Save Notes Successful', newBlog})

    user.blogs = user.blogs.concat(blog._id)
    await user.save()  
  }
})

Router.post('/:id/comments', async (request, response) => {
  const id = request.params.id 
  const user = await User.findById(request.user.id)

  if(user) {
    const data = await Blog.findById(id)
    let comment = request.body.comment
    let comments = data.comments.concat(comment)

    console.log(data)
    console.log(comments)
    try {
      const blog = await Blog.findByIdAndUpdate(id, {comments: comments}, {new: true})
      response.status(201).json({blog})  
    } catch (e) {
      console.log(e)
      response.status(500).json({error: e.message})  
    }

  } else {
    response.status(401).json({error: 'No User'})

  }
})


Router.delete('/:id', async (request, response) => {
  const id = request.params.id 
  const blog = await Blog.findById(id)
  const userId = request.user.id
    
  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
  } else {
    return response.status(401).json({error: 'You cannot delete a note by another user!'})
  }
})

Router.put('/:id', async (request, response) => {
  const id = request.params.id

  const updated = await Blog.findByIdAndUpdate(id, request.body, {new: true})
  response.status(201).json(updated)
})

module.exports = Router