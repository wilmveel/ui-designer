var app = angular.module('formApp', ['ui.bootstrap', 'ngDragDrop']);

app.controller('FormCtrl', function($scope, $rootScope) {
		
	$rootScope.elements = [
		{
			"id" : 1,
			"name":"Row",
			"template":"row",
			"elements" : [
				{
					"id" : 2,
					"name" : "Column",
					"columns" : 6,
					"template":"column"
				},
				{
					"id" : 3,
					"name" : "Column",
					"columns" : 3,
					"template":"column",
					"elements": [
						{
							"id" : 4,
							"name" : "Text",
							"template":"input"
						}
					]
				},
				{
					"id" : 5,
					"name" : "Column",
					"columns" : 3,
					"template":"column",
					"elements": [
						{
							"id" : 6,
							"name" : "Text",
							"template":"text",
							"text" : "Test 123"
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
					"columns" : 3,
					"template":"column",
					"elements": [
						{
							"id" : 9,
							"name" : "Text",
							"template":"text",
							"text" : "Test 456"
						}
					]
				}
			]
		}
	];
	
	$rootScope.getElements = function(){
		return $rootScope.elements;
	}
	
	$rootScope.setElements = function(elements){
		return $rootScope.elements = elements;
	}
	
	$scope.testClick = function(){
		console.log("Test click");
		console.log($scope.elements);
	}
	
	
});

app.controller('DragDropCtrl', function($scope, $rootScope) {
	
	$scope.test = "testje";
	
	$scope.templates = [
		{
			"name" : "Row",
			"template":"row"
		},
		{
			"name" : "Column",
			"columns" : 6,
			"template":"column"
		},
		{
			"name" : "Input",
			"template":"input"
		},
		{
			"name" : "Text",
			"template":"text",
			"text" : "Hallo test"
		},

	];
	
	$scope.elementRow = {"name":"Row", "template":"row"};
	$scope.elementCol = {"name" : "Column", "columns" : 5, "template":"column"};
	
	$scope.elementEmpty = {};
	
	$scope.getTemplateUrl = function(){
		return 'element/block.html'
	}
	
	$scope.startCallback = function(event, ui) {
	console.log('You started draggin');
	};

	$scope.stopCallback = function(event, ui) {
	console.log('Why did you stop draggin me?');

	};

	$scope.dragCallback = function(event, ui) {
	console.log('hey, look I`m flying');

	};

	$scope.dropCallback = function(event, ui) {
		console.log('hey, you dumped me :-(');
		console.log(event);
		console.log(ui);
		console.log($rootScope.item);
		
		var element = ui.draggable.data('element');
		console.log(element);
		
		//var target = ui.data('element');
		
		var target = angular.element(this).data();
		console.log(target);
		
		element.text = "Jan Klaas"
		replaceElement($rootScope.elements, element);

	};

	$scope.overCallback = function(event, ui) {
	console.log('Look, I`m over you');		
	};

	$scope.outCallback = function(event, ui) {
		console.log('I`m not, hehe');
	};
	
	$scope.switchElemetn = function(elm1, elm2) {
		console.log('I`m not, hehe');
	};
	
	$scope.appendElement = function(elm1, elm2) {
		console.log("appendElement");
		
		elm1.elements.push(elm2);
		replaceElement($rootScope.elements, elm1);
	};
	
	function replaceElement(o, elm) {
		for (i in o) {
			if (typeof(o[i])=="object") {
				if(o[i].id == elm.id){
					console.log("Object Found and Replace");
					o[i] = elm;
				}
				replaceElement(o[i], elm );
			}
		}
	}

	function appendElement(o, elm1, elm2) {
		for (i in o) {
			if (typeof(o[i])=="object") {
				if(o[i].id == elm1.id){
					console.log("Object Found");
					o[i].elemnts.push(elm2);
				}
				appendElement(o[i], elm );
			}
		}
	}

});

app.directive('formElement', function ($compile, $http, $rootScope) {

	return {
		restrict: 'E',
		replace: true,
		scope: {
			val: '='
		},
		transclude: true,		
		link : function(scope, iElement){
			
			scope.name = scope.val.name; 
			scope.columns = scope.val.columns; 
			scope.elements = scope.val.elements; 
			scope.text = scope.val.text; 

			scope.$watch('val', function(newValue, oldValue) {
                if (newValue)
                    $http.get('element/' + scope.val.template + '.html').success(function(html){

						var elm = $(html);
						elm.attr("data-id", "{{val.id}}");
						elm.attr("data-element", "{{val}}");
						elm.attr("draggable", true);
						
						var con = $("<div />");
						con.addClass("element");
						if(!angular.isArray(scope.elements)){
						con.attr("data-element", "{{val}}");
						con.attr("droppable", true);
						}
						
						con.html(elm);
						
						iElement.html(con);
						
						$compile(iElement.contents())(scope); 
					});
            }, true);
			
			
		}
		
		

	}	
});


app.directive('formInclude', function ($compile, $http) {

	return {
		restrict: 'E',	
		scope: {
			val: '='
		},
		transclude: true,		
		link : function(scope, element){

			
			scope.elements = scope.$parent.val.elements;
		
			var html;
			if(angular.isArray(scope.elements)){

				var elm = $("<form-element val='element'></form-element>");
				
				var html = 	$('<div ng-repeat="element in elements"></div>');
				html.html(elm);
				element.html(html);
				$compile(element.contents())(scope); 

			}else{
				html = "<div>Please drag item</div>";
				element.html(html);
				
				$compile(element.contents())(scope); 
			}

		}

	}

});

app.directive('formJson', function ($compile) {
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



// This makes any element draggable
// Usage: <div draggable>Foobar</div>
app.directive('draggable', function() {
  return {
    // A = attribute, E = Element, C = Class and M = HTML Comment
    restrict:'A',
	controler: "DragDropCtrl",
    //The link function is responsible for registering DOM listeners as well as updating the DOM.
    link: function(scope, element, attrs) {
      element.draggable({
        revert:true
      });
    }
  };
});
 
// This makes any element droppable
// Usage: <div droppable></div>
app.directive('droppable', function($compile) {
  return {
    restrict: 'A',
	controlerAs: "DragDropCtrl",
    link: function(scope,element,attrs,controller){
		
		console.log(controller.test);
		

		
      //This makes an element Droppable
      element.droppable({
        drop:function(event,ui) {
			var  dragEl = angular.element(ui.draggable);
			var  dropEl = angular.element(this);
			  
			console.log(dragEl.data('element'));
			console.log(dropEl.data('element'));
			
			scope.appendElement(dragEl.data('element'), dropEl.data('element'));
          
          if (dragEl.hasClass('list1') && !dropEl.hasClass('list1') && reject !== true) {
            scope.list2.push(scope.list1[dragIndex]);
            scope.list1.splice(dragIndex, 1);
          } else if (dragEl.hasClass('list2') && !dropEl.hasClass('list2') && reject !== true) {
            scope.list1.push(scope.list2[dragIndex]);
            scope.list2.splice(dragIndex, 1);
          }
          scope.$apply();
        },
		over:function(event,ui) {
			console.log("Over" + scope.test);
			
		}
      });
    }
  };
});    
