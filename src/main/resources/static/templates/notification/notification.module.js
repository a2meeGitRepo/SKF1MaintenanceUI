(function() {
	'use strict';

	angular
	.module('myApp.notification', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.notification', {
					url : "/notification",
					views : {
						"sub" : {
							templateUrl : "templates/notification/notification.html",
							controller : "NotificationController as vm"
						}
					}
				})
			});

})();