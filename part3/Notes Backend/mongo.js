/* eslint-disable no-unused-vars */
require('dotenv').config()

const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch(e => {
		console.log('error connecting', e)
	})
const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	important: Boolean
})

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note