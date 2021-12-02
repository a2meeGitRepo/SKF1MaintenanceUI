(function() {
	'use strict';

	angular.module('myApp.notification').controller('NotificationController', NotificationController);

	NotificationController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','fileUpload'];
	
	/* @ngInject */
	function NotificationController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,fileUpload) {
		var tansactionUrl  = ApiEndpoint.url+"tansaction";
		var vm = angular.extend(this, {
			read:read
		});

		(function activate() {
			
			loadNotifications()
		
		})();
			function loadNotifications(){
				
						var msg=""
						 var url =tansactionUrl+"/getNotificationList";
						genericFactory.getAll(msg,url).then(function(response) {
						vm.notifications = response.data;
						console.log("notification: "+JSON.stringify(vm.notifications))
						
						
					});
			}
		function read(notification){
						notification.view_bit=1
					 var msg="Notification updated"
					 var url =tansactionUrl+"/updateNotification";
					genericFactory.add(msg,url,notification).then(function(response) {
						loadNotificationCount();
						loadNotifications()
						
					
				});
		}		
	
	function loadNotificationCount(){
		var msg=""
			 var url =tansactionUrl+"/getNotificationCount";
			genericFactory.getAll(msg,url).then(function(response) {
				$rootScope.notificationCount = response.data;
			console.log("notification Count: "+JSON.stringify($rootScope.notificationCount))
			
			
		});
	}

	
	}
})();
