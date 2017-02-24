let jwt = require('jsonwebtoken')

module.exports = function( app ) {
	let express = require('express')
	let router = express.Router()
	let User = require('../models').User

	router.route('/auth', function(req, res, next) {
		next()
	})
	.post(function(req, res) {
		User.findOne({
			username: req.body.username
		}, function(err, user) {
			if (err) throw err

			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found.' })
			} else if (user) {
				if (user.password != req.body.password) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' })
				} else {
					let token = jwt.sign(user, app.get('superSecret'), {
						expiresIn: '7d'
					})

					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					})
				}
			}
		})
	})

	app.use('/', router)
}