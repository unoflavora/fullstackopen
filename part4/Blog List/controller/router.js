const Router = require('express').Router()
const Blog = require('../models/mongo.js')

Router.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => {
          response.status(400).json({error: error.message})
      })
  })
  
Router.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

module.exports = Router