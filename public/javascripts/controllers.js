angular.module("jsonTester").controller("interfaceController", function($scope, $routeParams, $location, EntriesFactory, AuthService) {
	
	$scope.error = 0;
	
	$scope.server = {
		up: true,
		connecting : false
	}
	
	$scope.auth = {
		username: "",
		password: ""
	}
	
	$scope.user = {};
	$scope.current = {};
	
	$scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
		$scope.isLoggedIn = isLoggedIn;
		$scope.currentUser = AuthService.currentUser();
	});
	
	//server functions 
	$scope.loadList = [];

	//create a new entry with the current scope
	$scope.create = function() {
		EntriesFactory.single.create($scope.current,
			function(res) {
				$location.path(res.id);
			},function(err) {
				if(err.status == -1) {
					$scope.offlineMode(function() {$location.path("") }, true);
				}
		});
		
		$scope.closeAll();
		
	}
	
	$scope.read = function(id) {
		
		//basically just reload the scope
		$location.path(id);

		$scope.closeAll()
		
	}
	
	$scope.del = function() {
		console.log("here");
		//basically just reload the scope
		EntriesFactory.single.delete({id : $scope.current.id},
			function(res) {
				$location.path("");
			},function(err) {
				if(err.status == -1) {
					$scope.offlineMode(function() {$location.path("") }, true);
				}
		});
				
		$scope.closeAll()
		
	}

	
	$scope.new = function() {
		
		//basically just reload the scope
		$location.path("");
		
		$scope.closeAll();
				
		
	}
	$scope.fork = function() {
		
		$scope.current.title = $scope.current.title + "-fork";
		
		$scope.create();
	}
	
	$scope.update = function() {
		EntriesFactory.single.update({id : $scope.current.id},$scope.current,
			function(res) {
				
			},function(err) {
				if(err.status == -1) {
					$scope.offlineMode(function() {$location.path("") }, true);
				}
		});
		
		$scope.closeAll();
	}
	
	$scope.delete = function() {
		
	}
	
	$scope.query = function(user) {
		searchUser = {}
		if(user != null)
			searchUser = {user : user}
		$scope.loadList = false;
		EntriesFactory.list.query(searchUser, $scope.current,
			function(res) {
				$scope.loadList = res;
			},function(err) {
				if(err.status == -1) {
					$scope.offlineMode(function() {$location.path("") }, true);
				}
		});
	}
	
	
	$scope.hasError = false;
	$scope.inview = "input";
		
	$scope.run = function() {
		$scope.hasError = false;
		try {
			input = $scope.current.input
			var parse = JSON.stringify(JSON.parse($scope.current.input));
			$scope.current.output = JSON.stringify(eval($scope.current.transform.replace("input","(" + parse + ")")),undefined,4);
		} catch (e) {
			$scope.hasError = true;
			$scope.current.output = e.message
		}
	}
	
	//user functions	
	$scope.login = function(u,p) {
		AuthService.login(u,p,function() {
			$scope.setError("Bad Credentials","Email/Password combination is incorrect, try again.",function(){});
		},function() {
			$scope.closeAll();
			$scope.auth = {}
		});
	}
	
	$scope.register = function(u,e,p) {
		AuthService.register(u,e,p,function(){
			//todo--reminder email
			$scope.setError("Duplicate User","A user with that email address already exists.",function(){});
		},function() {
			$scope.setError("Unspecified Error","There was an unspecified erro creating your account, check that your credentials are completely filled in and try again.",function(){});	
		},function(){
			$scope.setError("Success","You may now save entries to you account",function(){});	
			$scope.closeAll();
		});
	}
	$scope.logout = function() {
		AuthService.logout(function(){
			
		},function(){
			$scope.closeAll();
			$scope.auth = {};
		});
	}
	
	$scope.offlineMode = function(closeCallback,showMessage) {
		$scope.server.up = false;
		if(showMessage)
			$scope.setError("Server Down","Server is down, you may continue working in offline mode",closeCallback);
	}
	
	$scope.setError = function(title,description,closeCallback) {
		$scope.error = {
			show: true,
			title: title,
			description: description,
			class: "error",
			id: "error",
			closeCallback : closeCallback
		}
	}
	$scope.clearError = function() {
		if($scope.error.closeCallback)
			$scope.error.closeCallback();
		$scope.error = {};
	}
	
	$scope.closeAll = function () {
		
		$scope.controls.showSavePane = false;
		$scope.controls.showLoadPane = false;
		$scope.controls.showLoginPane = false;
		$scope.controls.showRegisterPane = false;
		$scope.controls.open = false
	}
	
	//possibly read from teh server
	//TODO watch
	if($routeParams.id != null) {

		EntriesFactory.single.get({id: $routeParams.id}).$promise.then(function (res) {
			$scope.current = res
		},function(err) {
			if(err.status == -1) {
				$scope.offlineMode(function() {$location.path("") }, true);
			}
		});
		
	 }
	
});