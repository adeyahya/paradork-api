let Sequelize = require('sequelize')
let config = require('config').database

let sequelize = new Sequelize(
	config.name,
	config.user,
	config.password,
	config.options
)

let models = [
	'User'
]

models.map((model) => {
	module.exports[model] = sequelize.import(__dirname + '/' + model)
})

module.exports.sequelize = sequelize