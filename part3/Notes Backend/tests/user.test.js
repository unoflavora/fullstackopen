const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({username:'root', passwordHash})

  await user.save()
})

describe('user testing', () => {
  test('creation success with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mkalinin',
      name: 'Matt Kalinin',
      password: 'rahasia'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username not containing invalid chars', async () => {
    const newUser = {
      username: '@imamsuper',
      name: 'Supergirlandlove',
      password: 'rahasiaa'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  })
})

describe('user saving notes', () => {
  test('create a new note', async() => {
    const user = await User.findOne({username: 'root'})
    const newNote = {
      content: "user id is cool so good",
      important: true,
      userId: user.id
    }

    await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
  })
})


afterAll(() => {
  mongoose.connection.close()
})

