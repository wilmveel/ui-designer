// Bootstrap the element builder module
var elementModule = angular.module('element.builder', []);
elementModule.service('elementService', function($http, $q) {
	
	this.dragElement;
	this.dropElement;
	
	this.elements = [
		{
			"uid" : 1,
			"name":"Row",
			"template":"row",
			"elements" : [
				{
					"uid" : 3,
					"name" : "Column",
					"columns" : 4,
					"template":"column",
					"elements": [
						{
							"uid" : 42,
							"name" : "Panel",
							"template":"panel",
							"title" : "Panel",
							"color" : "default",
							"elements": [
								{
									"uid" : 42,
									"name" : "Text",
									"template":"input",
									"label" : "Last Name",
									"placeholder" : "Last Name",
									"ngmodel" : ""
								},
								{
									"uid" : 43,
									"name" : "Text",
									"template":"input",
									"placeholder":"input",
									"label" : "Email"
								},
								{
									"uid" : 44,
									"name" : "Button",
									"template":"button",
									"label" : "Click Me",
									"pull" : "right",
									"ngclick" : "info()"
								}
							]
						}
					]
				},
				{
					"uid" : 2,
					"name" : "Column",
					"columns" : 8,
					"template":"column"
				}
			]
		},
		{
			"uid" : 7,
			"name":"test4",
			"template":"row",
			"elements": [
				{
					"uid" : 8,
					"name" : "Column",
					"columns" : 6,
					"template":"column",
					"elements": [
						{
							"uid" : 9,
							"name" : "Text",
							"template":"text",
							"text" : "This is a normal text element"
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
            if(elements[i].uid && elements[i].uid == elment.uid){
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
elementModule.controller('elementController', function($scope, elementService) {

	$scope.selected = false;
	
	// Select the element to drag
	$scope.select = function($event){
		
		console.log("Selected clicked");
		
		$event.stopPropagation();
		
		var parent = $scope;
		var selected = null;
		
		while(parent != null){

			console.log("Loop selected", parent, parent.selected);
			
			if(parent.selected){
				selected = parent;
			}
			
			if(selected && selected != parent && parent.value){
				selected.selected = false;
				parent.$parent.$broadcast("deselect");
				parent.$parent.selected = true;
				selected = parent;
				return;
			}
			
			parent = parent.$parent;
			
		}
		
		if(selected){
			selected.selected = false;
		}else{
			console.log("Set true");
			$scope.$broadcast("deselect");
			$scope.selected = true;	
		}
		
	};
	
	// Element transmormation actions
	$scope.switchElement = function(dragEl,dropEl){
		console.log("switchElement", "dragEl", dragEl, "dropEl", dropEl);
		elementService.switchElement(dragEl, dropEl);
	}
	
	$scope.addElement = function(dragEl,dropEl){
		console.log("addElement", "dragEl", dragEl, "dropEl", dropEl);
		elementService.addElement(dragEl, dropEl);
	}
	
	$scope.appendElement = function(dragEl,dropEl){
		console.log("appendElement", "dragEl", dragEl, "dropEl", dropEl);
		elementService.appendElement(dragEl, dropEl);
	}
	
	$scope.removeElement = function(elm){
		console.log("RM");
		$scope.element = elementService.dragElement;
		$("#myModal").modal('show');
	}
		
});
elementModule.directive('element', function ($compile, $http, elementService) {

	return {
		restrict: 'E',
		scope: {
			value: '='
		},	
		controller: "elementController",
		link : function(scope, iElement){
			
			console.log("Init element", scope.value);
			
			//Set some attributes of the value. should be latere replaced by loop
			scope.reload = function(){
				for (var key in scope.value) {
				  if (scope.value.hasOwnProperty(key)) {
					scope[key] = scope.value[key];
				  }
				}
			}
			scope.reload();
			
			//deselect elements by broadcasting
			scope.$on("deselect", function(){
				console.log("deselect", scope.value);
				scope.selected = false;
			});
						
			// get the template and add html tages to enable drag and drop
			$http.get('element/' + scope.value.template + '.html').success(function(html){
				
				console.log("Load template: " + scope.value.template);
				
				// Genetrate jquery object base on template
				var drag = $(html);
				drag.addClass("drag");
				drag.attr("ng-click", "select($event)");
				drag.attr("element-drag", "true");
				
				// Add extra style class when element is on higes level
				if(!angular.isArray(scope.elements)){
					drag.addClass("drag-top");
				}
				
				// Plop is the name of the element wich is visible when selected
				var plop = $("<div>{{id}}:{{template}}:{{name}}</div>");
				plop.addClass("plop");
				plop.attr("ng-show", "selected");
				drag.append(plop);
				
				// Border is inside te element to indicate that it is selected
				var border = $("<div/>");
				border.addClass("border");
				drag.append(border);
				
				// Drop area only active when an item is draged 
				var drop = $("<div />");
				drop.addClass("drop");
				border.attr("ng-show", "selected");
				border.attr("element-drop", "true");
				drag.append(drop);
				
				// Add and compile elements
				iElement.html(drag);
				$compile(iElement.contents())(scope); 
				
			});
			
			scope.$watch("value", function(){
				console.log("value change");
				scope.reload();
			}, true);

		}
	}	
});
elementModule.directive('elementInclude', function ($compile, $http) {

	return {
		restrict: 'E',
		link : function(scope, iElement){
			
			// Loop trough the child elements and add to the view
			var html = 	$('<element value="element" ng-repeat="element in value.elements" />');
			iElement.html(html);
					
			// Add tekst to element when no childeren availible
			var please = $('<div ng-show="!value.elements || value.elements.length == 0" class="please">Please Drag Element</div>');
			iElement.append(please);
			
			$compile(iElement.contents())(scope); 
			
			

		}

	}

});
elementModule.directive('elementJson', function ($compile) {
    return {
        restrict: 'E',
        scope: { val: '=' },
		link: function(scope, element, attrs) {
			
			render (scope, element);
			
			scope.$watch('val', function(newValue, oldValue) {
                if (newValue)
                    render (scope, element);
            }, true);
		} 
    }
	
	function render (scope, element){
		var html = "<div><pre>" + syntaxHighlight(scope.val) + "</pre></div>";	
		element.html(html);	
		$compile(element.contents())(scope); 
	}
	
	function syntaxHighlight(json) {
		if (typeof json != 'string') {
			 json = JSON.stringify(json, undefined, 2);
		}
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
		
	}

});
elementModule.directive('elementFrame', function ($compile, $http, elementService) {
    return {
        restrict: 'E',
		scope: { value: '=' },
		controller: "previewCtrl",
		link: function(scope, element, attrs) {
			scope.$watch('value', function(){
				
				console.log("Rerender Html");
				var html = renderElement (elementService.elements);

				element.html(html);
			
				$compile(element.contents())(scope); 
			}, true);
			
		} 
    }
	
	function renderElement (elements){
		var html = "";
		
		for (var i=0;i<elements.length;i++){
 			element = elements[i];
			console.log("Loop", element, elements.length);
			
			var template = '<div class="frame"><span>' + element.name + ":" + element.template   + '</span>';
			
			if(element.elements){
				var childeren = renderElement (element.elements);
				//var size = 100/elements.length;
				//console.log("SSSSSSize",size);
				
				template += childeren;
				
			}
			
			template += '</div>';
			
			html += template;
			
		}	

		return html;
	}
});
elementModule.directive('elementHtml', function ($compile, $http) {
    return {
        restrict: 'E',
        scope: { value: '=' },
		link: function(scope, element, attrs) {
			
			scope.$watch('value', function(){
				
				console.log("Rerender Html");
				var html = renderElement (scope.value);
				
				element.html('<pre class="prettyprint">'  + escapeHtml(html) + '</pre>'	);
			
				$compile(element.contents())(scope); 
			}, true);
			
		} 
    }
	
	function renderElement (elements){
		var html = "";
		
		for (var i=0;i<elements.length;i++){
 			element = elements[i];
			console.log("Loop", element, elements.length);
			var template;
			
			// get template
			jQuery.ajax({
				url: 'element/' + element.template + '.html',
				success: function(data) {
					template = data;
				},
				async:false
			});
			
			// replace variables
			for (var key in element) {
			  if (element.hasOwnProperty(key)) {
				template = template.replace('{{' + key + '}}', element[key]);
			  }
			}
			
			if(element.elements){
				var child = renderElement (element.elements);
				
				template = template.replace('<element-include />', child);
				
			}
			
			html += template;
			
		}	

		return html;
	}
	
	function escapeHtml(text) {
	  return text
		  .replace(/&/g, "&amp;")
		  .replace(/</g, "&lt;")
		  .replace(/>/g, "&gt;")
		  .replace(/"/g, "&quot;")
		  .replace(/'/g, "&#039;");
	}
});
elementModule.directive('elementPreview', function ($compile, $http, elementService) {
    return {
        restrict: 'E',
		scope: { value: '=' },
		link: function(scope, element, attrs) {
			
			scope.$watch('value', function(){
				
				console.log("Rerender Html");
				var html = renderElement (elementService.elements);
				
				//element.html('<pre class="prettyprint">'  + escapeHtml(html) + '</pre>'	);
			
				element.html(html);
			
				$compile(element.contents())(scope); 
			}, true);
			
		} 
    }
	
	function renderElement (elements){
		var html = "";
		
		for (var i=0;i<elements.length;i++){
 			element = elements[i];
			console.log("Loop", element, elements.length);
			var template;
			
			// get template
			jQuery.ajax({
				url: 'element/' + element.template + '.html',
				success: function(data) {
					template = data;
				},
				async:false
			});
			
			// replace variables
			for (var key in element) {
			  if (element.hasOwnProperty(key)) {
				template = template.replace('{{' + key + '}}', element[key]);
			  }
			}
			
			if(element.elements){
				var child = renderElement (element.elements);
				
				template = template.replace('<element-include />', child);
				
			}
			
			html += template;
			
		}	

		return html;
	}
	
	function escapeHtml(text) {
	  return text
		  .replace(/&/g, "&amp;")
		  .replace(/</g, "&lt;")
		  .replace(/>/g, "&gt;")
		  .replace(/"/g, "&quot;")
		  .replace(/'/g, "&#039;");
	}
});
elementModule.directive('elementNew', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		scope: {
			value: '='
		},	
		link : function(scope, iElement){
			
			console.log("New element is selected in elementDrag", scope.value);
	
			iElement.draggable({
				revert:true,
				start:function(event,ui) {
					console.log("Start draging", scope.value); 
					angular.element(this).addClass("drag-active");
					elementService.dragElement = scope.value;
				},
				stop:function(event,ui) {
					console.log("Stop draging", scope.value); 
					angular.element(this).removeClass("drag-active");
				}
				

			
		});
	  }
	}
});
		
elementModule.directive('elementEdit', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		controller : "elementController",
		link : function(scope, iElement){
			
			iElement.droppable({
				drop:function(event,ui) {
				
					console.log("Drop in edit element", scope.value);
										
					var dragElement = elementService.dragElement;
					
					console.log("dragElement Value", dragElement);  

					scope.edit(dragElement);

					iElement.removeClass("drop-active");

					scope.$emit("element-edit", dragElement);
					
					scope.$apply();
				},
				
				over:function(event,ui) {
					iElement.addClass("drop-active");
					console.log("Enter drop area", scope.value); 
					scope.$apply();
				},
				
				out:function(event,ui) {
					iElement.removeClass("drop-active");
					console.log("Exit drop area", scope.value); 
					scope.$apply();
				}
			  });

		}
	}
});
		
elementModule.directive('elementDrag', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		link : function(scope, iElement){
		// watch drag and drop behavoure change when selected is changed
		scope.$watch('selected', function(newValue, oldValue) {
			
			console.log("I element is selected in elementDrag", scope.value);
			
			// make dragable when selected
			if(newValue){
				if(scope.selected){
					iElement.draggable({
						revert:true,
						disabled: false,
						cancel:false,	
						start:function(event,ui) {
							console.log("Start draging", scope.value); 
							angular.element(this).addClass("drag-active");
							elementService.dragElement = scope.value;
						},
						stop:function(event,ui) {
							console.log("Stop draging", scope.value); 
							angular.element(this).removeClass("drag-active");
						}
					});
				}
			}
			
			// delete drageble when not selected
			if(oldValue){
				iElement.draggable('disable');	
			}
		});
	  }
	}
});
		
elementModule.directive('elementDrop', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		link : function(scope, iElement){
		// watch drag and drop behavoure change when selected is changed
		scope.$watch('selected', function(newValue, oldValue) {
			
			console.log("I element is selected in elementDrag", scope.value);
		
			//make dropable when selected
			if(newValue){
				if(scope.selected){
					iElement.droppable({
						disabled: false,
						drop:function(event,ui) {
							
							// Set drop element
							elementService.dropElement = scope.value;
							
							var dragElement = elementService.dragElement;
							var dropElement = scope.value;
							
							console.log("dragElement Value", dragElement);  
							console.log("dropElement Value",  scope.value);  
							
							if(dragElement.id){
								scope.switchElement(dragElement, dropElement);
								scope.$emit("element-move", dragElement, dropElement);
							}else{
								var dragElement = angular.copy(dragElement);
								var uniqid = Date.now();
								dragElement.id = uniqid;
								scope.addElement(dragElement, dropElement);
								scope.$emit("element-add", elementService.dragElement, dropElement);
							}
														
							angular.element(this).removeClass("drop-active");

							scope.$apply();
						},
						
						over:function(event,ui) {
							angular.element(this).addClass("drop-active");
							console.log("Enter drop area", scope.value); 
							scope.$apply();
						},
						
						out:function(event,ui) {
							angular.element(this).removeClass("drop-active");
							console.log("Exit drop area", scope.value); 
							scope.$apply();
						}
					  });
				}
			}
			
			// Remove dropable when not selected
			if(oldValue){
				console.log("Disable drop", scope.drop);
				iElement.droppable('disable');
			}
		});
	}}
});
		