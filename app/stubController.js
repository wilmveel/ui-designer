app.controller('stubController', function($scope, stubService) {
   	
	$scope.source = stubService.source;
	
	$scope.test = function(){
		alert("Test123");
	}
});
