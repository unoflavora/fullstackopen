const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')

const blogRouter = require('./controller/blog')
const loginRouter = require('./controller/login')
const userRouter = require('./controller/user')

require('dotenv').config()

const connectDB = async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  logger.info('Connected to MongoDB')
}

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', middleware.useExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/testing.js')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.loggerResponse)


module.exports = app