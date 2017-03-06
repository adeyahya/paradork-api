module.exports = function( app ) {
	const fs = require('fs')
	const path = require('path')
	const _ = require('lodash')
	const routers = [
		'user',
		'auth',
		'article'
	]

	const linkToAuth = [
		"/user",
		"/articles",
	]

	require('./middleware/error-middleware')( app )
	require('./middleware/auth-middleware')( app, linkToAuth )

	let files = fs.readdirSync(path.resolve('router'))
	files = _.remove(files, (n) => {
		return ['index.js','middleware'].indexOf(n) < 0
	})


	files.map((route) => {
		require('./' + route)( app )
	})
}