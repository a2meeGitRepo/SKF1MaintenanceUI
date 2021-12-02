(function() {
	'use strict';

	angular
	.module('myApp.spare', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.spare', {
					url : "/spare",
					views : {
						"sub" : {
							templateUrl : "templates/spare/spare.html",
							controller : "SpareController as vm"
						}
					}
				})
			});

})();