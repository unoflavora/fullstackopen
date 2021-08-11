const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    body = request.body

    if (body.password.length < 4) {
        response.status(400).json({error: 'the minimum password length is 4'})
    } else {
        const passwordHash = await bcrypt.hash(body.password, 10)
        const newUser = new User ({
            username: body.username,
            name: body.name,
            passwordHash
        })
    
        const savedUser = await newUser.save()
        response.status(200).json(savedUser)
    }   
})

userRouter.delete('/', async (request, response) => {
    const token = request.token
    
})

module.exports = userRouter

