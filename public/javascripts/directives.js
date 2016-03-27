angular.module("jsonTester")
.directive("showEditor",function() {
	return {
    	templateUrl: "/templates/singleeditor.html",
    	scope: {
            model: '=',
            id: '@',
            mode: '@',
            title: '@'
        }
  	};
})