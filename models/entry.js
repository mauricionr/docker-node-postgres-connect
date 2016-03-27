var Sequelize = require('sequelize');

var schema = {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	title: Sequelize.STRING,
	input: Sequelize.JSON,
	transform: Sequelize.TEXT,
	owner: {
		type: Sequelize.INTEGER,
		references: {
	     // This is a reference to another model
	     model: User,
	     // This is the column name of the referenced model
	     key: 'id',
	     // This declares when to check the foreign key constraint. PostgreSQL only.
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	},
	creation: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}

var options = {
  freezeTableName: true
}

module.exports.schema = schema;
module.exports.options = options;