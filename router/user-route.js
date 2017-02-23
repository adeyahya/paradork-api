module.exports = function( app ) {
	let express = require('express')
	let router = express.Router()
	let User = app.get('models').User

	router.route('/api/user', function(req, res, next) {
		next()
	})
	.post(function(req, res, next) {
		User.sync({ force: false }).then(() => {
			return User.create(req.body)
		}).then((user) => {
			res.json(user.get())
		})
	})
	.get(function(req, res, next) {
		User.all()
			.then((users) => {
				res.json(users)
			})
	})

	app.use('/', router)
}