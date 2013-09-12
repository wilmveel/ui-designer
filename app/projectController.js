app.controller('projectCtrl', function($scope, $http, elementService) {
    
	$scope.projects = new Array();
	
	$http.get('service/projects_get.php').success(function(data){
		$scope.projects = data;
	});
	
	$scope.loadProject = function(project){
		console.log("Select row");
		$http.get('service/data/' + project).success(function(data){
			elementService.elements = data;
		});
	};
	
	
});