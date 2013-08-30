app.controller('elementController', function($scope, elementService) {

	$scope.selected = false;
	
	// Select the element to drag
	$scope.select = function($event){
		
		console.log("Selected clicked");
		
		$event.stopPropagation();
		
		var parent = $scope;
		var selected = null;
		
		while(parent != null){

			console.log("Loop selected", parent, parent.selected);
			
			if(parent.selected){
				selected = parent;
			}
			
			if(selected && selected != parent && parent.value){
				selected.selected = false;
				parent.$parent.$broadcast("deselect");
				parent.$parent.selected = true;
				selected = parent;
				return;
			}
			
			parent = parent.$parent;
			
		}
		
		if(selected){
			selected.selected = false;
		}else{
			console.log("Set true");
			$scope.$broadcast("deselect");
			$scope.selected = true;	
		}
		
	};
	
	// Element transmormation actions
	$scope.switchElement = function(dragEl,dropEl){
		console.log("switchElement", "dragEl", dragEl, "dropEl", dropEl);
		elementService.switchElement(dragEl, dropEl);
	}
	
	$scope.addElement = function(dragEl,dropEl){
		console.log("addElement", "dragEl", dragEl, "dropEl", dropEl);
		var elm = angular.copy(dragEl);
		elm.id = Math.floor((Math.random()*10000000000)+1);
		elementService.addElement(elm, dropEl);
	}
	
	$scope.appendElement = function(dragEl,dropEl){
		console.log("appendElement", "dragEl", dragEl, "dropEl", dropEl);
		elementService.appendElement(dragEl, dropEl);
	}
	
	$scope.removeElement = function(elm){
		console.log("RM");
		//elementService.removeElement(elm);
		
		$scope.element = elementService.dragElement;
		
		$("#myModal").modal('show');
		
		
	}
	
});