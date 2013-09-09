app.controller('labelController', function($scope, labelService) {

	$scope.file = "global-mcp-klantakkoord";
	
	$scope.f;
	$scope.label;
	$scope.labels;
	
	$scope.service = labelService;
	
	$scope.init = function(){
		console.log("init");
		labelService.file = $scope.file;
		labelService.loadLabels();
	}
	$scope.init();
	
	$scope.$watch('service.getLabels()', function(newValue, oldValue) {
		console.log("Reload lables", newValue, oldValue);
		$scope.labels = newValue;
	});
	
	$scope.addLabel = function(file){
		console.log("addLabel");
		$scope.f = file;
		$("#labelModal").modal('show');
	}
	
	$scope.saveLabel = function(){
		console.log("saveLabel");
		labelService.addLabel($scope.f, $scope.label.key, $scope.label.value).success(function(){
			$("#labelModal").modal('hide');
		});;
		$scope.init();
	}
	
	
});