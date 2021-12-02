(function() {
	'use strict';

	angular
	.module('myApp.order', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.order', {
					url : "/order",
					views : {
						"sub" : {
							templateUrl : "templates/order/order.html",
							controller : "OrderController as vm"
						}
					}
				})
			});

})();