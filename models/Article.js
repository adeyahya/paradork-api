let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ArticleSchema = new Schema({
	_creator: { type: Schema.Types.ObjectId, ref: 'User' },
	slug: { type: String, unqiue: true },
	title: String,
	created_at: Date,
	updated_at: Date
})

// add the on every save
ArticleSchema.pre('save', (next) => {

	// Set timestamps
	let currentDate = new Date()
	this.updated_at = currentDate
	if (!this.created_at)
		this.created_at = currentDate

	next()
})

let Article = mongoose.model('Article', ArticleSchema)

module.exports = Article