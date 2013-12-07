// Bootstrap the Application
var app = angular.module('App', ['element.builder', 'ui.bootstrap']).config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/projects', {templateUrl: 'partials/projects.html', controller: 'projectCtrl'});
		$routeProvider.when('/designer', {templateUrl: 'partials/designer.html', controller: 'designerCtrl' });
		$routeProvider.otherwise({ redirectTo: '/designer' });
	}]).run(function($http, elementService) {
	
		$http.get('service/data/onboarding_step01.json').success(function(data){
			elementService.elements = data;
		});
    
	
});