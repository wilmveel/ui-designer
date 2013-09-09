app.directive('elementFrame', function ($compile, $http, elementService) {
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