(function() {
	'use strict';

	angular
	.module('myApp.uploads', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.uploads', {
					url : "/uploads",
					views : {
						"sub" : {
							templateUrl : "templates/uploads/uploads.html",
							controller : "UploadsController as vm"
						}
					}
				})
			});

})();