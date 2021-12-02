(function() {
	'use strict';

	angular
	.module('myApp.customer', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.customer', {
					url : "/customer",
					views : {
						"sub" : {
							templateUrl : "templates/customer/customer.html",
							controller : "CustomerController as vm"
						}
					}
				})
			});

})();