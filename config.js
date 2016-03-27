var config = {
	development: {
	    //url to be used in link generation
	    url: 'http://scrupulo.com',
	    //mongodb connection settings
	    database: {
	        host:   '127.0.0.1',
	        port:   '5432',
	        db:     'transformerapp_dev',
	        dialect:     'postgres',
	        user:     'transformer',
	        pass:     'password'
	    },
	    //server details
	    server: {
	        host: '127.0.0.1',
	        port: '44441'
	    }
	},
	production: {
	    //url to be used in link generation
	    url: 'http://scrupulo.com',
	    //mongodb connection settings
	    database: {
	        host:   '127.0.0.1',
	        port:   '5432',
	        db:     'transformerapp_dev',
	        dialect:     'postgres',
	        user:     'transformer',
	        pass:     'password'
	    },
	    //server details
	    server: {
	        host: '127.0.0.1',
	        port: '3422'
	    }
	},
};
module.exports = config;