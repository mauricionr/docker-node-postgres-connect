var Sequelize = require('sequelize'),
	connection = require('../sequelize.js'),
	opts = {
	  freezeTableName: true
	};

// app/model/models.js
var user = {
		id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
		username: { type: Sequelize.STRING, allowNull: false, unique: true},
		email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true }, unique: true },
		homepage: Sequelize.STRING,
		password: { type: Sequelize.STRING, allowNull: false }
	};
var User = connection.define('users', user, opts);

User.sync();

var	entry = {
		id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
		title: Sequelize.STRING,
		input: Sequelize.JSON,
		transform: Sequelize.TEXT,
		secret: Sequelize.BOOLEAN
	};
var Entry = connection.define('entries', entry, opts);

Entry.belongsTo(User, {foreignKey: 'owner', targetKey: 'username'});

Entry.sync();


// you can define relationships here

module.exports.User = User;
module.exports.Entry = Entry;