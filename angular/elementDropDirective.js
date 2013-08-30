app.directive('elementDrop', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		link : function(scope, iElement){
		// watch drag and drop behavoure change when selected is changed
		scope.$watch('selected', function(newValue, oldValue) {
			
			console.log("I element is selected in elementDrag", scope.value);
		
			//make dropable when selected
			if(newValue){
				if(scope.selected){
					scope.drop.droppable({
						drop:function(event,ui) {
							
							elementService.dropElement = scope.value;
							
							var dragElement = elementService.dragElement;
							var dropElement = scope.value;
							
							console.log("dragElement Value", dragElement);  
							console.log("dropElement Value",  scope.value);  
							
							if(dragElement.id){
								scope.switchElement(dragElement, dropElement);
							}else{
								scope.addElement(dragElement, dropElement);
							}
							angular.element(this).removeClass("drop-active");
							
							
							
							scope.$apply();
						},
						
						over:function(event,ui) {
							angular.element(this).addClass("drop-active");
							console.log("Enter drop area", scope.value); 
							scope.$apply();
						},
						
						out:function(event,ui) {
							angular.element(this).removeClass("drop-active");
							console.log("Exit drop area", scope.value); 
							scope.$apply();
						}
					  });
				}
			}
			
			// Remove dropable when not selected
			if(oldValue){
				console.log("Disable drop", scope.drop);
				scope.drop.droppable('destroy');
			}
		});
	}}
});
		