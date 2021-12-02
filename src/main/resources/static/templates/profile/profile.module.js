(function() {
	'use strict';

	angular
	.module('myApp.profileUpdate', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.profileUpdate', {
					url : "/profileUpdate",
					views : {
						"sub" : {
							templateUrl : "templates/profile/profile.html",
							controller : "ProfileControllerJs as vm"
						}
					}
				})
			});

})();