app.controller('projectCtrl', function($scope, $rootScope, $http, projectService) {
	
	$http.get('service/projects_list.php').success(function(data){
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
});