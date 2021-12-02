(function() {
	'use strict';

	angular
	.module('myApp.roleHierarchy', [ 'datatables'])	//,'ngMaterial', 'ngMessages' 
	.config(function($stateProvider) {
				$stateProvider
				.state('main.roleHierarchy', {
					url : "/roleHierarchy",
					views : {
						"sub" : {
							templateUrl : "templates/roleHierarchy/roleHierarchy.html",
							controller : "RoleHierarchyController as vm"
						}
					}
				})
			});

})();