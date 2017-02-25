module.exports = function( app ) {
	const routers = [
		'user',
		'auth'
	]

	const linkToAuth = [
		"/user"
	]

	require('./middleware/error-middleware')( app )
	require('./middleware/auth-middleware')( app, linkToAuth )

	routers.map((route) => {
		require('./' + route + '-route')( app )
	})
}