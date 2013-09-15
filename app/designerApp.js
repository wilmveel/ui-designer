// Bootstrap the Application
var app = angular.module('App', ['element.builder', 'ui.bootstrap']).config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/projects', {templateUrl: 'projects.html', controller: 'projectCtrl'});
		$routeProvider.when('/designer', {templateUrl: 'designer.html', controller: 'designerCtrl' });
		$routeProvider.otherwise({ redirectTo: '/designer' });
	}]).run(function(elementService) {
    elementService.elements = [
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
						}
					]
				}
			]
		}
	];
});