let jwt = require('jsonwebtoken')
let PH = require('password-hash');

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
			if (err) {
				res.status(403).send({
					success: false,
					message: err
				})
			}

			if (!user) {
				res.status(403).send({ 
					success: false,
					message: 'Authentication failed. User not found.' 
				})
			}

			if (!PH.verify(req.body.password, user.password)) {
				res.status(403).send({
						success: false,
						message: 'Authentication failed. Wrong password.' 
					})
			}

			let token = jwt.sign(user, app.get('superSecret'), {
				expiresIn: '7d'
			})

			res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			})

			// bcrypt.compare(req.body.password, user.password).then(function(hash) {
			// 	if (!hash)
			// 		res.status(403).send({
			// 			success: false,
			// 			message: 'Authentication failed. Wrong password.' 
			// 		})

			// 	let token = jwt.sign(user, app.get('superSecret'), {
			// 		expiresIn: '7d'
			// 	})

			// 	res.json({
			// 		success: true,
			// 		message: 'Enjoy your token!',
			// 		token: token
			// 	})
			// })
		})
	})

	router.route('/register', function(req, res, next) {
		next()
	})
	.post(function(req, res, next) {
		
		req.body.password = PH.generate(req.body.password)
		let newUser = User(req.body)

		newUser.save(function(err, user) {
			if (err) {
				res.status(403).send({
					success: false,
					message: err
				})
			}

			res.json({
				success: true,
				user: user
			})
		})
	})

	app.use('/', router)
}