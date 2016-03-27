angular.module("jsonTester")
.config( function ($routeProvider, $locationProvider) {

	$routeProvider
	.when("/" ,{
		templateUrl: 'templates/interface.html',
        controller: 'interfaceController'
	}).when("/:id", {
		templateUrl: 'templates/interface.html',
        controller: 'interfaceController'
	}).otherwise({
		redirectTo: "/"
	});
	
	
}).run(function(AuthService) {
	AuthService.initUserInfo()
});