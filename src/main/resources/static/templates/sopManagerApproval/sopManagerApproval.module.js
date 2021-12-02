(function() {
	'use strict';

	angular
	.module('myApp.sopManagerApproval', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.sopManagerApproval', {
					url : "/sopManagerApproval",
					views : {
						"sub" : {
							templateUrl : "templates/sopManagerApproval/sopManagerApproval.html",
							controller : "SopManagerApprovalController as vm"
						}
					}
				})
			});

})();