const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/testing')

testingRouter.post('/reset', async function(request, response) {
    await Blog.deleteMany({})
    await User.deleteMany({})
  
    response.status(200).end()
})

module.exports = testingRouter