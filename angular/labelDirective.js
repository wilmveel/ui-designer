app.directive('i18n', function ($compile, $http, labelService) {

	return {
		restrict: 'E',
		scope: {
			key: '@'
		},
		controller: 'labelController',
		link : function(scope, iElement){
			
			scope.service = labelService;
						
			console.log("Directive i18n", scope.key, scope.value);
						
			var html = '<span>{{value}}</span>'

			// Add and compile elements
			iElement.html(html);
			$compile(iElement.contents())(scope); 

			
			scope.$watch('service.getLabels()', function(newValue, oldValue) {
				console.log("Reload lables 213", newValue, oldValue);
				scope.labels = newValue;
				
				for( file in scope.service.getLabels()){
					labels = scope.service.getLabels()[file];
					console.log("Labels", labels, scope.key);
					if(labels[scope.key]){
						console.log("Label found", labels[scope.key]);
						scope.value = labels[scope.key];
					}
				}
				
			});
		}
	}
});