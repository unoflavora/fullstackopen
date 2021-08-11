const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const useExtractor = async (request, response, next) => {
  const auth = request.get('Authorization')
  if (auth) {
    if (auth.toLowerCase().startsWith('bearer ')){
      request['token'] = auth.substring(7)
      const user = await jwt.verify(request['token'], process.env.ROUTER)
      request['user'] = user
    }
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'MongoError') {
    return response.status(400).json({ error: error.message})
  } else if(error.name === 'JsonWebTokenError') {
    return response.status(404).json({error: error.message})
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  useExtractor
}