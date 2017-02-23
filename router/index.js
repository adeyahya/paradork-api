let routers = [
	'user'
]

module.exports = function( app ) {
	routers.map((route) => {
		require('./' + route + '-route')( app )
	})
}