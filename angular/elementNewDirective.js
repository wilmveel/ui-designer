app.directive('elementNew', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		scope: {
			value: '='
		},	
		link : function(scope, iElement){
			
			console.log("New element is selected in elementDrag", scope.value);
	
			iElement.draggable({
				revert:true,
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
});
		