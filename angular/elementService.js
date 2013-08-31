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
					"id" : 3,
					"name" : "Column",
					"columns" : 4,
					"template":"column",
					"elements": [
						{
							"id" : 42,
							"name" : "Panel",
							"template":"panel",
							"title" : "Panel",
							"color" : "alert",
							"elements": [
								{
									"id" : 42,
									"name" : "Text",
									"template":"input",
									"label" : "Last Name",
									"placeholder" : "Last Name",
									"ngmodel" : ""
								},
								{
									"id" : 43,
									"name" : "Text",
									"template":"input",
									"placeholder":"input",
									"label" : "Email"
								}
							]
						}
					]
				},
				{
					"id" : 2,
					"name" : "Column",
					"columns" : 8,
					"template":"column"
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

	this.switchElement = function(dragElement, dropElement) {
		this.dragElement = dragElement;
		this.dropElement = dropElement;
		
		// Find elements in json
		var dragElementFound = this.findElement(this.elements, dragElement);
		var dropElementFound = this.findElement(this.elements, dropElement);
		console.log("Found", dragElementFound, dropElementFound);
		
		// Switch positions
		dragElementFound.data[dragElementFound.i] = dropElement;
		dropElementFound.data[dropElementFound.i] = dragElement;
	};
	
	this.removeElement = function(dragElement) {
		this.dragElement = dragElement;
		
		var dragElementFound = this.findElement(this.elements, dragElement);
		
		dragElementFound.data.splice(dragElementFound.i, 1);
	}
	
	this.addElement = function(dragElement, dropElement) {
		this.dragElement = dragElement;
		this.dropElement = dropElement;
		
		// Find drop element
		var dropElementFound = this.findElement(this.elements, dropElement);
		
		if(!(dropElementFound.data[dropElementFound.i].elements instanceof Array)){
			dropElementFound.data[dropElementFound.i].elements = new Array();
		}
		
		dropElementFound.data[dropElementFound.i].elements.push(dragElement);
		console.log("AddElement", dragElement, dropElementFound.data[dropElementFound.i]);
	}
	
	this.replaceElement = function(dragElement) {
		this.dragElement = dragElement;
		
		// Find drop element
		var dragElementFound = this.findElement(this.elements, dropElement);
		
		dragElementFound.data[dragElementFound.i] = dragElement;
		console.log("replaceElement", dragElement, dragElementFound.data[dragElementFound.i]);
	}
	
	this.findElement = function(elements, elment) {
        for (var i in elements) {
            console.log(elements[i]);
            if(elements[i].id && elements[i].id == elment.id){
				console.log("Found");
                return {"data" : elements, "i": i};
			}
			if (typeof(elements[i].elements) == 'object') {
				var retVal = this.findElement(elements[i].elements, elment);
				if (typeof retVal!='undefined') {
					console.log("retVal");
					return retVal;
				}
			}
		}
	};
	
});