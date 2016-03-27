var config = require('./config')[process.env.NODE_ENV || 'development'];

// app/sequelize.js
var Sequelize = require('sequelize'),
	sequelize = new Sequelize(
		(config.database.db),
		(config.database.user),
		(config.database.pass),{
			host: (config.database.host),
			port: (config.database.port),
			dialect: (config.database.dialect),
			
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		}
	);

module.exports = sequelize