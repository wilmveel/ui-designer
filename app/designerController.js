app.controller('designerCtrl', function($scope, $rootScope, elementService, projectService, designerService) {
    	
	$scope.templates = designerService.templates;
	
	$scope.selected = true;
	
	$scope.element = {};
	$scope.validation = {};
	 
	// get all elements from the service
	$scope.getElements = function (){
		return elementService.elements;
	}
		
	$scope.groups = new Array();
	angular.forEach(designerService.templates, function(value, key){
		if($scope.groups.indexOf(value.group) < 0 && value.group){
			$scope.groups.push(value.group);
		}
		console.log("Groups", value.group);
	});
	console.log("Groups", $scope.groups);

   
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
		console.log("Save123", $scope.element);	
		
		if($scope.element.data.columns){
		var columnsInv = 12 - $scope.element.data.columns
		console.log("columnsInv", columnsInv);	
		$scope.element.data.columnsInv = columnsInv;
		}
		
		console.log("validator", $scope.validation);
		console.log("element", $scope.element);
		
		// set data
		elementService.element.data = $scope.element.data;
		
		// set angular binding varible
		if($scope.angular){
			if($scope.angular.model) elementService.element.attributes.model.ngModel = $scope.angular.model;
			if($scope.angular.binding) elementService.element.attributes.binding.ngBinding = $scope.angular.binding;
			if($scope.angular.click) elementService.element.attributes.click.ngClick = $scope.angular.click;
			$scope.angular = null;
		}
		
		// Loop all validation rules
		if($scope.validation && elementService.element.attributes){
			console.log("$scope.validation", $scope.validation);
			var validation = {};
			angular.forEach($scope.validation, function(value, key){
				console.log("validation", key, value);
				if(value.enable){
					if(value.value){
						validation[key] = value.value;
					}else{
						validation[key] = true;
					}
					
				}
			});
			elementService.element.attributes.validation = validation;
			$scope.validation = null;
		}
		
		// orientation
		var temp = elementService.element.template.split("-");
		if($scope.element.data.orientation && $scope.element.data.orientation != ""){
			template = temp[0] + "-" + $scope.element.data.orientation; 
		}else{
			template = temp[0];
		}
		elementService.element.template = template;

		$scope.$broadcast("deselect");
		
		$("#myModal").modal('hide');
		projectService.save();
	}
	
	$scope.edit = function(event, element){	
		console.log("Edit", element);
		elementService.element = element;
		$scope.element = angular.copy(element);
		
		// Populate angular bindings
		var attributes = $scope.element.attributes
		if(attributes){		
			$scope.angular = {};
			if(attributes.model) $scope.angular.model = attributes.model.ngModel;
			if(attributes.binding) $scope.angular.binding = attributes.binding.ngBinding;
			if(attributes.click) $scope.angular.click = attributes.click.ngClick;
				
			// Populate validations
			$scope.validation = {};
			angular.forEach(elementService.element.attributes.validation, function(value, key){
				$scope.validation[key] = {};
				$scope.validation[key].value = value;
				$scope.validation[key].enable = true;
			});
		}
		$("#myModal").modal('show');
	}
	
	$scope.remove = function(){	
		elementService.removeElement($scope.element);
		$("#myModal").modal('hide');
	}
	
	// Open model for edit after drop element
	$scope.$on("element-add", function(event, dragElement, dropElement){
		$scope.edit(event, dragElement);
	});
	
	// Open model for edit after drop element
	$scope.$on("element-edit", function(event, dragElement, dropElement){
		$scope.edit(event, dragElement);
	});
	
	// Save on element update event
	$scope.$on("element-update", function(event, dragElement, dropElement){
		projectService.save();
	});
})