(function() {
	'use strict';

	angular
	.module('myApp.mailManager', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.mailManager', {
					url : "/mailManager",
					views : {
						"sub" : {
							templateUrl : "templates/mailManager/mailManager.html",
							controller : "MailManagerController as vm"
						}
					}
				})
			});

})();