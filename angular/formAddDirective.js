app.directive('formAdd', function () {

	return {
		restrict: 'A',
		link : function(scope, iElement){
			//make dropable
			iElement.draggable({
				revert:true,
				start:function(event,ui) {
					angular.element(this).addClass("drag-active");
				},
				stop:function(event,ui) {
					angular.element(this).removeClass("drag-active");
				}
			});
		}
	}	
});