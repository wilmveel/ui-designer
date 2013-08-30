app.service('elementService', function($http, $q) {
	
	this.dragElement;
	this.dropElement;
	
	this.elements = [
		{
			"id" : 1,
			"name":"Row",
			"template":"row",
			"elements" : [
				{
					"id" : 2,
					"name" : "Column",
					"columns" : 4,
					"template":"column"
				},
				{
					"id" : 3,
					"name" : "Column",
					"columns" : 8,
					"template":"column",
					"elements": [
						{
							"id" : 42,
							"name" : "Text",
							"template":"input",
							"label" : "Last Name",
							"ngmodel" : ""
						},
						{
							"id" : 43,
							"name" : "Text",
							"template":"input",
							"label" : "Email"
						}
					]
				}
			]
		},
		{
			"id" : 7,
			"name":"test4",
			"template":"row",
			"elements": [
				{
					"id" : 8,
					"name" : "Column",
					"columns" : 6,
					"template":"column",
					"elements": [
						{
							"id" : 9,
							"name" : "Text",
							"template":"text",
							"text" : "Test 456"
						},
						{
							"id" : 10,
							"name" : "Text",
							"template":"text",
							"text" : "Test 789"
						}
					]
				}
			]
		}
	];

	this.switchElement = function(elm1, elm2) {
		if(typeof elm1!='undefined' && typeof elm2!='undefined'){
			var felm1 = this.findElement(this.elements, elm1);
			var felm2 = this.findElement(this.elements, elm2);
			console.log("Found", felm1, felm2);
			felm1.data[felm1.i] = elm2;
			felm2.data[felm2.i] = elm1;
			
			console.log("Found", felm1, felm2);
		}else{
			console.log("One of the elements is not selected");
		}
	};
	
	this.removeElement = function(elm) {
		var felm = this.findElement(this.elements, elm);
		felm.data.splice(felm.i, 1);
	}
	
	this.addElement = function(elm1, elm2) {
		var felm = this.findElement(this.elements, elm2);
		if(!(felm.data[felm.i].elements instanceof Array)){
			felm.data[felm.i].elements = new Array();
		}
		felm.data[felm.i].elements.push(elm1);
		console.log("AddElm", elm1, felm.data[felm.i]);
	}
	
	this.findElement = function(data, elm) {
        for (var i in data) {
            console.log(data[i]);
            if(data[i].id && data[i].id == elm.id){
				console.log("Found");
                return {"data" : data, "i": i};
			}
			if (typeof(data[i].elements) == 'object') {
				var retVal = this.findElement(data[i].elements, elm);
				if (typeof retVal!='undefined') {
					console.log("retVal");
					return retVal;
				}
			}
		}
	};
	
	this.replaceElement = function(o, elm) {
		for (i in o) {
			if (typeof(o[i])=="object") {
				if(o[i].id == elm.id){
					console.log("Object Found and Replace");
					o[i] = elm;
				}
				this.replaceElement(o[i], elm );
			}
		}
	};
	
});