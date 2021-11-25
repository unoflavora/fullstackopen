const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {    
      type: String,
      minLength: 4,
      validate: {
        validator: function(v) {return !(/[@#$%^&*()-]/.test(v))},
        message: props => `${props.value} is not a valid username!`
      },
      required: true,
      unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  },
  notes : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User