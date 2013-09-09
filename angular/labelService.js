app.service('labelService', function($http) {
	
	this.file;
	
	var labels;
	
	this.loadLabels = function(){
		return $http.get("../label-service/getLabels.php?file=" + this.file).success(function (json){
			console.log("loadLabels", json);
			labels = json;
		});
	}
	
	this.addLabel = function(file, key, value){
		return $http.get("../label-service/addLabel.php?file=" + file + "&key=" + key + "&value=" + value);
	}
	
	this.getLabels = function(){
		return labels;
	}
	
});