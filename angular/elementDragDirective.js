app.directive('elementDrag', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		link : function(scope, iElement){
		// watch drag and drop behavoure change when selected is changed
		scope.$watch('selected', function(newValue, oldValue) {
			
			console.log("I element is selected in elementDrag", scope.value);
			
			// make dragable when selected
			if(newValue){
				if(scope.selected){
					iElement.draggable({
						revert:true,
						disabled: false,
						start:function(event,ui) {
							console.log("Start draging", scope.value); 
							angular.element(this).addClass("drag-active");
							elementService.dragElement = scope.value;
						},
						stop:function(event,ui) {
							console.log("Stop draging", scope.value); 
							angular.element(this).removeClass("drag-active");
						}
					});
				}
			}
			
			// delete drageble when not selected
			if(oldValue){
				iElement.draggable('disable');	
			}
		});
	  }
	}
});
		