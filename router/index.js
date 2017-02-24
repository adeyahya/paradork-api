let jwt = require('jsonwebtoken')

module.exports = function( app ) {
	let routers = [
		'user',
		'auth'
	]

	let express = require('express')
	let router = express.Router()

	router.use(function(req, res, next) {
		let token = req.body.token || req.query.token || req.headers['x-access-token']

		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token' })
				} else {
					req.decoded = decoded
					next()
				}
			})
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided'
			})
		}
	})

	app.use('/user', router)

	routers.map((route) => {
		require('./' + route + '-route')( app )
	})
}