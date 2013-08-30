app.directive('element', function ($compile, $http, elementService) {

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
				scope.name = scope.value.name; 
				scope.columns = scope.value.columns; 
				scope.id = scope.value.id; 
				scope.text = scope.value.text; 
				scope.label = scope.value.label; 
				scope.title = scope.value.title; 
				scope.template = scope.value.template;
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
				drag.attr("data-id", "{{value.id}}");
				drag.attr("data-element", "{{value}}");
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
			});

		}
	}	
});