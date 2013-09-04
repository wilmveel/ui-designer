app.directive('elementPreview', function ($compile, $http, elementService) {
    return {
        restrict: 'E',
		scope: { value: '=' },
		controller: "previewCtrl",
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