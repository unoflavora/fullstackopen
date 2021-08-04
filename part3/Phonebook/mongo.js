const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log('connected to MongoDB'))

const phonebookSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  Num: {
    type: String,
    minLength: 8
  }
})

phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)
module.exports = Phonebook
