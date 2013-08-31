app.controller('designerCtrl', function($scope, $rootScope, elementService) {
     
	$scope.selected = true;
	 
	//get all elements from the service
	$scope.getElements = function (){
		return elementService.elements;
	}
	
	$scope.groups;
	$scope.getGroups = function (){
		if(!$scope.groups){
			$scope.groups = new Array();
			angular.forEach($scope.templates, function(value, key){
				if($scope.groups.indexOf(value.group) < 0 && value.group){
					$scope.groups.push(value.group);
				}
				console.log("Groups", value.group);
			});
			console.log("Groups", $scope.groups);
		}
		return $scope.groups;
	}
	
	$scope.templates = [
		{
			"group" : "grid",
			"name" : "Row",
			"template":"row"
		},
		{	
			"group" : "grid",
			"name" : "Column",
			"columns" : 6,
			"template":"column"
		},
		{
			"group" : "form",
			"name" : "Form",
			"template":"form",
		},
		{
			"group" : "form",
			"name" : "Input",
			"template":"input",
			"label":"Input label",
			"placeholder": "Input placeholder"
		},
//		{
//			"group" : "form",
//			"name" : "Select",
//			"template":"select",
//			"label":"Input label",
//			"placeholder": "Input placeholder"
//		},
		{
			"group" : "form",
			"name" : "Button",
			"template":"button",
			"label":"Button",
			"color":"default"
		},
		{
			"group" : "form",
			"template":"button_group",
			"label":"Button",
			"size":""
		},
		{
			"group" : "panel",
			"name" : "Panel",
			"template":"panel",
			"title" : "Title panel",
			"color" : "default"
		},
		{
			"group" : "tab",
			"name" : "Tabset",
			"template":"tabset",
		},
		{
			"group" : "tab",
			"name" : "Tab",
			"template":"tab",
		},

	];

	
	$scope.element = new Object();
   
	$scope.icons = new Array(
		"glyphicon-adjust",
		"glyphicon-align-center", 
		"glyphicon-align-justify", 
		"glyphicon-align-left", 
		"glyphicon-align-right",
		"glyphicon-arrow-down",
		"glyphicon-arrow-left",
		"glyphicon-arrow-right",
		"glyphicon-arrow-up"
	);
	
	$scope.refresh = function (){
		console.log("Refresh");
	}
	
	$scope.deselect = function (){
		console.log("deselect all");
		$rootScope.$broadcast('deselect');
	}
	
	$scope.open = function(){		
		
	}
	
	$scope.setIcon = function(icon){	
		console.log("Set Icon", icon);
		$scope.element.icon = icon;
	}
	
	$scope.save = function(){	
		console.log("Save", $scope.element);
		//elementService.dragElement = $scope.element;
		//elementService.dragElement.label = "Piet";
		
		for (var key in $scope.element) {
		  if ($scope.element.hasOwnProperty(key)) {
			elementService.dragElement[key] = $scope.element[key];
		  }
		}
		$("#myModal").modal('hide');
	}
	
	$scope.edit = function(element){	
		$scope.element = angular.copy(element);
		$("#myModal").modal('show');
	}
	
	$scope.remove = function(){	
		elementService.removeElement($scope.element);
		$("#myModal").modal('hide');
	}
	
	// Open model for edit after drop element
	$scope.$on("element-add", function(event, dragElement, dropElement){
		$scope.edit(dragElement);
	});
	
	// Open model for edit after drop element
	$scope.$on("element-edit", function(event, dragElement, dropElement){
		$scope.edit(dragElement);
	});
})