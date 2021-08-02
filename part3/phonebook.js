const express  = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

morgan.token('data', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time ms - :data'))

let data = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/info', (request, response) => {
    response.send(
    `<div>Phonebook has info for ${data.length} people<p>${new Date()}</p></div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(400).json({
            error: 'data is missing'
        })
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)
    if (person) {
        data = data.filter(person => person.id !== id)
        response.json(data)    
    } else {
        response.status(400).json({
        error: 'data is missing'
        })
    }
})

const generateId = () => {
    const maxId = data.length > 0
    ? Math.max(...data.map(n => n.id)) 
    : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {

    if (!request.body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        name: request.body.name,
        number: request.body.number,
        id: generateId()
    }

    data = data.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server is running at ${PORT}`)