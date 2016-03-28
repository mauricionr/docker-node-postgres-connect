var Sequelize = require('sequelize'),
	connection = require('../sequelize.js'),
	opts = {
	  freezeTableName: true
	};

// app/model/models.js
var message_schema = {
		id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
		title: { type: Sequelize.STRING, allowNull: false },
		body: { type: Sequelize.STRING, allowNull: false }
	};
	
var Message = connection.define('messages', message_schema, opts);

connection.sync();

// you can define relationships here

module.exports.Message = Message