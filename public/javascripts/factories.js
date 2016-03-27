angular.module("jsonTester")
.factory("EntriesFactory",function ($resource) {
	endpoint = "/entries";
	return { 
		single: $resource(endpoint + '/:id', {id:'@id'},
		{ 
			'get':    {method:'GET'},
			'create': {method:'POST',withCredentials: true},
			'update': {method:'PUT',withCredentials: true},
			'remove': {method:'DELETE',withCredentials: true}
		}),
		list: $resource(endpoint + '/list/:user', {user:'@user'},
		{ 
			'query':    {method:'GET',isArray: true}
		})
	};
})
.factory("AuthService", function($resource){
	var currentUser = {};
	
	endpoint = "/users";
	
	rs = $resource(endpoint + '/:action', {action:'@action'},
		{
			'login':    {method:'POST',withCredentials: true},
			'register': {method:'POST',withCredentials: true},
			'logout': {method:'GET',withCredentials: true},
			'initUserInfo' : {method:'GET',withCredentials: true}
		}
	);
	
	return {
		login: function(username,password,errorCallback,successCallback) {
			rs.login({action : "login"},{username: username, password: password},function(res) {
				currentUser = res;
				successCallback();
				return currentUser;
			}, function(err) {
				if(err.status == 404)
				{
					errorCallback();
				}
			});
		},
		logout: function(errorCallback,successCallback) {
			rs.logout({action: "logout"}, function(res) {
				currentUser = {};
				successCallback();
			}, function(err) {
				errorCallback();
			});
			
		},
		initUserInfo: function() {
			rs.initUserInfo({action:"inituserinfo"}, function(res) {
				currentUser = res;
			}, function(err) {
			});
			
		},
		register: function(username,email,password,dupeCallback,otherCallback,successCallback) {
			rs.register({action: "register"},{username: username,email: email, password: password},function(res) {
				currentUser = res;
				successCallback();
			}, function(err) {
				console.log(err);
				if(err.status == 409)
					dupeCallback();
				else
					otherCallback();
			});
			
		},
		isLoggedIn: function() {
			//todo check a cookie
			if(currentUser.id != null)
				return true;
			return false;
		},
		currentUser: function() { return currentUser; }
	};
});

