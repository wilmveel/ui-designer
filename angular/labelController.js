app.controller('labelController', function($scope, labelService) {

	$scope.file = "global-mcp-klantakkoord";
	
	$scope.label;
	$scope.labels;
	
	function init(){
		labelService.loadLabels($scope.file).success(function(json){
			console.log("Label Json", json);
			$scope.labels = json;
		});
	}
	init();
	
	$scope.addLabel = function(file){
		$("#labelModal").modal('show');
	}
	
	$scope.saveLabel = function(){
		
		labelService.addLabel($scope.file, $scope.label.key, $scope.label.value);
		$("#labelModal").modal('hide');
		init();
	}
	
	
});