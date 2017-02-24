module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		username: { type: DataTypes.STRING, unique: 'compositeIndex' },
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		avatar: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		bio: DataTypes.TEXT,
	})
}