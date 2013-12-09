app.controller('projectCtrl', function($scope, $rootScope, $http, projectService) {
	
	$http.get('../element-service/projects_list.php').success(function(data){
		$scope.projects = data;
	});
	
	$scope.loadProject = function(project){
		console.log("loadProject");
		projectService.loadProject(project);
	};
	
	$scope.save = function(){
		console.log("save");
		projectService.save();
		return false;
	};
	
	$scope.undo = function (){
		console.log("undo");
		projectService.undo();
		return false;
	}
	
	$scope.deselect = function (){
		console.log("deselect all");
		$rootScope.$broadcast('deselect');
	}	

	$scope.create = function (){
		console.log("create project");
		var name = $scope.name;
		projectService.create(name);
	}
});