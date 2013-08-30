app.directive('elementEdit', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		controller : "elementController",
		link : function(scope, iElement){
			
			iElement.droppable({
				drop:function(event,ui) {
				
					console.log("Drop in edit element", scope.value);
										
					var dragElement = elementService.dragElement;
					
					console.log("dragElement Value", dragElement);  

					scope.edit(dragElement);

					iElement.removeClass("drop-active");

					scope.$apply();
				},
				
				over:function(event,ui) {
					iElement.addClass("drop-active");
					console.log("Enter drop area", scope.value); 
					scope.$apply();
				},
				
				out:function(event,ui) {
					iElement.removeClass("drop-active");
					console.log("Exit drop area", scope.value); 
					scope.$apply();
				}
			  });

		}
	}
});
		