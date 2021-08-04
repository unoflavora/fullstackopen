/* eslint-disable no-undef */
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./mongo.js')

morgan.token('data', function (req, res) {
  return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :response-time ms - :data'))
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then((phonebook) => {
    response.json(phonebook)
  }).catch(error => next(error))
})

app.get('/info', (request, response) => {
  response.send(
    `<div>Phonebook has info for ${
      data.length
    } people<p>${new Date()}</p></div>`
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findById(id)
    .then((phonebook) => {
      if (phonebook) {
        response.json(phonebook)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findByIdAndRemove(id)
    .then((result) => {
      response.json(result)
      response.status(204).end()
      console.log(result)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  if (!request.body.Name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Phonebook({
    Name: request.body.Name,
    Num: request.body.Num
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((e) => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const phonebook = {
    Name: body.name,
    Num: body.number
  }

  Phonebook.findByIdAndUpdate(request.params.id, phonebook, { new: true })
    .then(updatedPhonebook => {
      response.json(updatedPhonebook)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT)

console.log(`Server is running at ${PORT}`)
