let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	fullname: String,
	password: { type: String, required: true },
	articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
	created_at: Date,
	updated_at: Date
})

// add the on every save
userSchema.pre('save', (next) => {
	// Set fullname
	this.fullname = `${this.firstname} ${this.lastname}`

	// Set timestamps
	let currentDate = new Date()
	this.updated_at = currentDate
	if (!this.created_at)
		this.created_at = currentDate

	next()
})

let User = mongoose.model('User', userSchema)

module.exports = User