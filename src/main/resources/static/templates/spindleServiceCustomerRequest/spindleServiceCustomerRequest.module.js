(function() {
	'use strict';

	angular
	.module('myApp.spindleServiceCustomerRequest', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.spindleServiceCustomerRequest', {
					url : "/spindleServiceCustomerRequest",
					views : {
						"sub" : {
							templateUrl : "templates/spindleServiceCustomerRequest/spindleServiceCustomerRequest.html",
							controller : "SpindleServiceCustomerRequestController as vm"
						}
					}
				})
			});

})();