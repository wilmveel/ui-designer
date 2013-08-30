app.directive('elementJson', function ($compile) {
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