app.service('labelService', function($http) {
	
	this.labels;
	this.files;
	
	this.loadLabels = function(file){
		return $http.get("../label-service/getLabels.php?file=" + file);
	}
	
	this.addLabel = function(file, key, value){
		$http.get("../label-service/addLabel.php?file=" + file + "&key=" + key + "&value=" + value);
	}
	
});