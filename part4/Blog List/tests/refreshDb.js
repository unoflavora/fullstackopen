const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const refreshDb = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('admin', 10)
  const newUser = new User({
    username: 'root',
    name: 'admin',
    passwordHash,
    blogs: []
  })
  newUser.save()
}

module.exports = refreshDb
