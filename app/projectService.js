app.service('projectService', function($http, elementService) {
    	
	this.project;
	
	this.projects = new Array();
		
	this.loadProject = function(project){
		console.log("Select project ", project);
		this.project = project;
		$http.get('../element-service/projects_get.php?id=' + project).success(function(data){
			elementService.elements = data;
		});
	};
	
	this.undo = function(){
		console.log("Undo project ", this.project);
		$http.get('../element-service/projects_undo.php?id=' + this.project).success(function(data){
			
			elementService.elements = data;
		});
	};
	
	this.save = function(){
		console.log("Save project ", this.project);
		$http.post('../element-service/projects_save.php?file=' + this.project, elementService.elements).success(function(data){
			console.log("Save succes ", data);
		}).error(function(data){
			console.log("Save error ", data);
		});
	};
	
	this.create = function(name){
		console.log("Create project ");
		$http.post('../element-service/projects_create.php?name=' + name).success(function(data){
			console.log("Create succes ", data);
		}).error(function(data){
			console.log("Create error ", data);
		});
	};
	
	
});