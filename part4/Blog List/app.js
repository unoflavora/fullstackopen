const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')
const Router = require('./controller/router.js')

require('dotenv').config()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {logger.info('connected to MongoDB')})
.catch((error) => {console.log('Error connecting to mongodb', error.message)})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', Router)

module.exports = app