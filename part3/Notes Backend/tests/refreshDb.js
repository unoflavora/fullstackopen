const Note = require('../models/notes')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

const refreshDb = async () => {
  await Note.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('admin', 10)
  const newUser = new User({
    username: 'root',
    name: 'admin',
    passwordHash,
    notes: []
  })
  await newUser.save()

  for (let note of helper.initialNotes) {
    const savedNote = new Note(note)
    await savedNote.save()
    newUser.notes = newUser.notes.concat(savedNote._id)
    await newUser.save()
  } 
}

module.exports = refreshDb
