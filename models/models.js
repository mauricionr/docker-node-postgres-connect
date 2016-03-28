var Sequelize = require('sequelize'),
	connection = require('../sequelize.js'),
	opts = {
	  freezeTableName: true
	};


//set up simple schema and sync
var message_schema = {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: Sequelize.STRING, validate: {len: [1,100]}},
	body: { type: Sequelize.STRING, allowNull: false, validate: {len: [1,255]}}
};	
var Message = connection.define('messages', message_schema, opts);
connection.sync();

module.exports.Message = Message