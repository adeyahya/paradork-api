module.exports = function( app ) {
	let express = require('express')
	let router = express.Router()

	router.route('/api/user', function(req, res, next) {
		next()
	})
	.get(function(req, res, next) {
		res.send("Showing all users")
	})

	app.use('/', router)
}