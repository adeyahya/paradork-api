let jwt = require('jsonwebtoken')
let PasswordHash = require('password-hash');

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
			if (!user) {
				return res.status(403).send({ 
					success: false,
					message: 'Authentication failed. User not found.' 
				})
			}

			if (!PasswordHash.verify(req.body.password, user.password)) {
				return res.status(403).send({
						success: false,
						message: 'Authentication failed. Wrong password.' 
					})
			}

			let token = jwt.sign(user, app.get('superSecret'), {
				expiresIn: '7d'
			})

			return res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			})
		})
	})

	router.route('/register', function(req, res, next) {
		next()
	})
	.post(function(req, res, next) {
		
		if (req.body.password != null) {
			req.body.password = PasswordHash.generate(req.body.password)
		}

		let newUser = User(req.body)

		newUser.save(function(err, user) {
			if (err) {
				res.status(err.status || 500)
				return 	res.json({
					message: err.message,
					error: err
				})
			}

			return res.json({
				success: true,
				user: user
			})
		})
	})

	app.use('/', router)
}