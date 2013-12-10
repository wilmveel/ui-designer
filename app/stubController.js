app.controller('stubController', function($scope, stubService, elementService) {
   	
	$scope.source = stubService.source;
		
	$scope.test = function(){
		console.log("Send data to server", stubService.data);
	}
	
	$scope.getData = function(key){
		var binding = stubService.data;
		var result = true;
		key.split(".").forEach(function(index){
			if(binding[index]){
				binding = binding[index];
			}else{
				result = false;
			}
		});
		if(result){
			return binding;
		}
		
	}
	
	$scope.setData = function(key, value){
		var binding = stubService.data
		key.split(".").forEach(function(index){
			binding = binding[index];
		});
		binding = value;
	}
	
	// get all elements from the service
	$scope.getBindings = function(){
		return stubService.bindings;
	};
	
	$scope.$watch("elementService.elements", function(){
		stubService.bindings = [];
		elementService.elements.forEach(function(element){
			findBinding(element);
		});
		
		// Listen to vallue change of binding data
		stubService.bindings.forEach(function(input){
			var root = input.split(".")[0];
			$scope.$watch(input,function(){
				stubService.data[root] = $scope[root];
		    }, true);
		});
	}, true);
	
	// recursive methode to find bindings in json object
	findBinding = function(element){
		if(element.elements){
			element.elements.forEach(function(element){
				findBinding(element);
				if(element.attributes && element.attributes.model){
					stubService.bindings.push(element.attributes.model.ngModel);
				}				
			});
		}
	}
	
	
	
});
