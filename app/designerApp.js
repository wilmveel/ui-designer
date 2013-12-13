// Bootstrap the Application
var app = angular.module('App', ['element.builder', 'ui.bootstrap']).config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/projects', {templateUrl: 'partials/projects.html', controller: 'projectCtrl'});
		$routeProvider.when('/designer', {templateUrl: 'partials/designer.html', controller: 'designerCtrl' });
		$routeProvider.otherwise({ redirectTo: '/designer' });
	}]).run(function($http, elementService, projectService) {
	
		$http.get('../element-service/data/onboarding_step01.ui').success(function(data){
			elementService.elements = data;
			projectService.project = "onboarding_step01.ui";
		});
    
	
});