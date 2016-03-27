var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs')

module.exports = function(app) {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use('local-signup',new LocalStrategy({usernameField: 'username', passwordField: 'password', passReqToCallback: true},
    	function(req, username, password, done) {
	    	if(	!req.body.username || req.body.username == "" ||
			!req.body.password || req.body.password == "" ||
			!req.body.email || req.body.email =="" ) {
				return done(true, false, {
	                message: 'Duplicate credentials.'
	            });
	        }
	        slt = bcrypt.genSaltSync();
	        usr = {
		        username: req.body.username,
		        password: bcrypt.hashSync(req.body.password,slt),
		        salt: slt,
		        email: req.body.email
	        }
	        
	    	app.get("models").User.create(usr).then(function(user) {
				
				return done(null, user)
				
	        }).catch(function(err){
		        //usually a duplicate error
		        return done(err, false, {
	                message: 'Error creating user, possibly becasue of a user already existing with that username or email address.'
	            })
	        })
    	})
    )
    passport.use('local-signin',new LocalStrategy({usernameField: 'username', passwordField: 'password'},
	    function(username, password, done) {
	        app.get("models").User.findOne({
	            where: {
		            $or: [
	                	{'username': username},
						{'email': username}
					]
	            }
	        }).then(function(user) {
	            if (user == null) {
	                return done(null, false, {
	                    message: 'Incorrect credentials.'
	                })
	            }
				if (bcrypt.compareSync(password,user.password)) {
	                return done(null, user)
	            }
	            return done(null, false, {
	                message: 'Incorrect credentials.'
	            })
	        })
    	})
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    passport.deserializeUser(function(id, done) {
        app.get("models").User.findOne({
            where: {
                'id': id
            }
        }).then(function(user) {
            if (user == null) {
                done(new Error('Wrong user id.'))
            }
            done(null, user)
        })
    })
}