app.directive('formRemove', function ($compile, $http, $rootScope) {

	return {
		restrict: 'A',
		link : function(scope, iElement){
			//make dropable
			iElement.droppable({
				drop:function(event,ui) {

					var dragEl = angular.element(ui.draggable);
					
					console.log("dragEl", dragEl.data('element'));  
					console.log("remove element"); 

					console.log(scope.value);
					
					scope.removeElement(dragEl.data('element'));

					scope.$apply();
				},
				over:function(event,ui) {
					angular.element(this).addClass("drop-active");
					console.log("Enter drop area"); 
					scope.$apply();
				},
				out:function(event,ui) {
					angular.element(this).removeClass("drop-active");
					console.log("Exit drop area"); 
					scope.$apply();
				}
	
			});
		}
	}	
});