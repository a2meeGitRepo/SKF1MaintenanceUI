(function() {
	'use strict';

	angular
	.module('myApp.serviceReason', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.serviceReason', {
					url : "/serviceReason",
					views : {
						"sub" : {
							templateUrl : "templates/serviceReason/serviceReason.html",
							controller : "ServiceReasonController as vm"
						}
					}
				})
			});

})();