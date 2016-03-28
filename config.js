var config = {
	development: {
	    database: {
	        host: 	(process.env.POSTGRES_PORT_5432_TCP_ADDR || "localhost"),
	        port: 	(process.env.POSTGRES_PORT_5432_TCP_PORT || "5432"),  
			db:     (process.env.POSTGRES_ENV_POSTGRES_DB || 'myapp'),
	        dialect:     'postgres',
	        user:     (process.env.POSTGRES_ENV_POSTGRES_USER || 'pg'),
	        pass:     (process.env.POSTGRES_ENV_POSTGRES_PASSWORD || 'password'),
	    },
	    server: {
	        port: (process.env.NODE_APP_PORT || '44441'),
	    }
	},
	production: {
	    database: {
	        host: 	(process.env.POSTGRES_PORT_5432_TCP_ADDR || "localhost"),
	        port: 	(process.env.POSTGRES_PORT_5432_TCP_PORT || "5432"),  
			db:     (process.env.POSTGRES_ENV_POSTGRES_DB || 'myapp'),
	        dialect:     'postgres',
	        user:     (process.env.POSTGRES_ENV_POSTGRES_USER || 'pg'),
	        pass:     (process.env.POSTGRES_ENV_POSTGRES_PASSWORD || 'password'),
	    },
	    server: {
	        port: (process.env.NODE_APP_PORT || '44441'),
	    }
	}
};

module.exports = config;