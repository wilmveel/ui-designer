app.controller('studioCtrl', function($scope, elementService) {
     
	//get all elements from the service
	$scope.getElements = function (){
		return elementService.elements;
	}
	
   $scope.templates = [
		{
			"name" : "Row",
			"template":"row"
		},
		{
			"name" : "Column",
			"columns" : 6,
			"template":"column"
		},
		{
			"name" : "Input",
			"template":"input",
			"label":"Test Input"
		},
		{
			"name" : "Text",
			"template":"text",
			"text" : "Hallo test"
		},
		{
			"name" : "Panel",
			"template":"panel",
			"title" : "Title panel",
			"text" : "Hallo test"
		},
		{
			"name" : "Tabset",
			"template":"tabset",
		},
		{
			"name" : "Tab",
			"template":"tab",
		},

	];
	
	$scope.element = new Object();
   
	$scope.icons = new Array(
		".glyphicon-adjust",
		".glyphicon-align-center", 
		".glyphicon-align-justify", 
		".glyphicon-align-left", 
		".glyphicon-align-right",
		".glyphicon-arrow-down",
		".glyphicon-arrow-left",
		".glyphicon-arrow-right",
		".glyphicon-arrow-up",
		"1.glyphicon-adjust",
		"1.glyphicon-align-center", 
		"1.glyphicon-align-justify", 
		"1.glyphicon-align-left", 
		"1.glyphicon-align-right",
		"1.glyphicon-arrow-down",
		"1.glyphicon-arrow-left",
		"1.glyphicon-arrow-right",
		"1.glyphicon-arrow-up",
		"2.glyphicon-adjust",
		"2.glyphicon-align-center", 
		"2.glyphicon-align-justify", 
		"2.glyphicon-align-left", 
		"2.glyphicon-align-right",
		"2.glyphicon-arrow-down",
		"2.glyphicon-arrow-left",
		"2.glyphicon-arrow-right",
		"2.glyphicon-arrow-up"
		
	);
	
	$scope.open = function(){		
		
	}
	
	$scope.setIcon = function(icon){	
		console.log("Set Icon", icon);
		$scope.element.icon = icon;
	}
	

	$scope.save = function(){	
		console.log("Save", $scope.element);
		$("#myModal").modal('hide');
		console.log("DragElement", elementService.dragElement);
		console.log("DropElement", elementService.dropElement);
	}
	
	$scope.edit = function(element){	
		$scope.element = element;
		$("#myModal").modal('show');
	}
});
