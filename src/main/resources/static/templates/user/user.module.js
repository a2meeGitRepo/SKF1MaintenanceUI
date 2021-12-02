(function() {
	'use strict';

	angular
	.module('myApp.user', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.user', {
					url : "/user",
					views : {
						"sub" : {
							templateUrl : "templates/user/user.html",
							controller : "UserController as vm"
						}
					}
				})
				
				.state('main.changePassword',{
					
					url:"/ChangePassword/user_id:id",
					templateUrl:"templates/changePassword/changePassword.html",
					controller:"ChangePasswordcontroller as vm"
					
					
				})
			});

})();