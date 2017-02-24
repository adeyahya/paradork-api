module.exports = function( app ) {
	let express = require('express')
	let router = express.Router()
	let User = app.get('models').User

	let getUser = (username) => {
		return new Promise((resolve, reject) => {
			User.find({ username: username }, (err, user) => {
				if (err) reject(err)

				resolve(user)
			})
		})
	}

	router.route('/api/user', function(req, res, next) {
		next()
	})
	.post(function(req, res, next) {
		let newUser = User(req.body)

		newUser.save((err) => {
			if (err) throw err

			res.json(newUser)
		})
	})
	.get(function(req, res, next) {
		User.find({}, (err, users) => {
			if (err) throw err

			res.json(users)
		})
	})


	router.route('/api/user/:username', function(req, res, next) {
		next()
	})
	.get((req, res, next) => {
		getUser(req.params.username)
			.then(data => res.json(data))
			.catch(data => res.send(data))
	})
	.delete((req,res,next) => {
		getUser(req.params.username)
			.then((user) => {
				user.remove((err) => {
					if (err) throw err

					res.json({ success: true })
				})
			})
	})

	app.use('/', router)
}