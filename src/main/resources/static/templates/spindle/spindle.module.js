(function() {
	'use strict';

	angular
	.module('myApp.spindle', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.spindle', {
					url : "/spindle",
					views : {
						"sub" : {
							templateUrl : "templates/spindle/spindle.html",
							controller : "SpindleController as vm"
						}
					}
				})
			});

})();