app.controller('projectCtrl', function($scope, $http, projectService) {
	
	$http.get('service/projects_list.php').success(function(data){
		$scope.projects = data;
	});
	
	$scope.loadProject = function(project){
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
});