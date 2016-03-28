var config = {
	development: {

	    //postgre connection settings
	    database: {
	        host: 	(process.env.POSTGRES_PORT_5432_TCP_ADDR || "localhost"),
	        port: 	(process.env.POSTGRES_PORT_5432_TCP_PORT || "5432"),  
			db:     (process.env.POSTGRES_ENV_POSTGRES_DB || 'myapp'),
	        dialect:     'postgres',
	        user:     (process.env.POSTGRES_ENV_POSTGRES_USER || 'pg'),
	        pass:     (process.env.POSTGRES_ENV_POSTGRES_PASSWORD || 'password'),
	    },
	    //server details
	    server: {
	        port: '44441'
	    }
	},
	production: {

	    //postgre connection settings
	    database: {
	        host: 	(process.env.POSTGRES_PORT_5432_TCP_ADDR || "localhost"),
	        port: 	(process.env.POSTGRES_PORT_5432_TCP_PORT || "5432"),  
			db:     (process.env.POSTGRES_ENV_POSTGRES_DB || 'myapp'),
	        dialect:     'postgres',
	        user:     (process.env.POSTGRES_ENV_POSTGRES_USER || 'pg'),
	        pass:     (process.env.POSTGRES_ENV_POSTGRES_PASSWORD || 'password'),
	    },
	    //server details
	    server: {
	        port: '44441'
	    }
	}
};
module.exports = config;
