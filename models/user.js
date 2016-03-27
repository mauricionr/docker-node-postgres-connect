var Sequelize = require('sequelize');

var schema = {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	username: { type: Sequelize.STRING, allowNull: false },
	email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true }, unique: true },
	homepage: Sequelize.STRING,
	password: { type: Sequelize.STRING, allowNull: false }
}

var options = {
  freezeTableName: true
}

module.exports.schema = schema;
module.exports.options = options;