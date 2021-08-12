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
const morganBody = require('morgan-body')
const refreshDb = require('./tests/refreshDb')

require('dotenv').config()

const connectDB = async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  logger.info('Connected to MongoDB')
}

connectDB()

if (process.env.NODE_ENV === 'development') {
  refreshDb()
}

app.use(cors())
app.use(express.json())
morganBody(app)

app.use('/api/blogs', middleware.useExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.loggerResponse)


module.exports = app