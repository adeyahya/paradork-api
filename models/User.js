let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
	firstname: String,
	lastname: String,
	fullname: String,
	username: { type: String, required: true, unique: true },
	password: String,
	created_at: Date,
	updated_at: Date
})

// add the on every save
userSchema.pre('save', (next) => {
	let currentDate = new Date()

	this.updated_at = currentDate

	if (!this.created_at)
		this.created_at = currentDate

	next()
})

let User = mongoose.model('User', userSchema)

module.exports = User