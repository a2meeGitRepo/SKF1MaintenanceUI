(function() {
	'use strict';

	angular
		.module('myApp.main')
		.controller('mainController', mainController);

		mainController.$inject = ['localStorageService', 'ApiEndpoint', '$state','loginFactory','$rootScope','genericFactory','$timeout','$scope'];

	/* @ngInject */
	function mainController(localStorageService, ApiEndpoint, $state,loginFactory,$rootScope,genericFactory,$timeout,$scope) {
		var userDetails = localStorageService.get(ApiEndpoint.userKey);
		var tansactionUrl = ApiEndpoint.url+"tansaction";
		var accessUrl = ApiEndpoint.url+"access";
		var authenticationUrl = ApiEndpoint.url+"authentication";

		var vm = angular.extend(this, {
			user:userDetails,
			doLogout : doLogout,
			user : userDetails,
			doLogout:doLogout,
		});

		(function activate() {
			$rootScope.loader=false;
			$scope.permissions  = localStorageService.get('permissions');
			givePermissions()
			 
			 
		})();

		// ******************************************************
		$scope.goToChangePassword=function(userId){
			
			$location.path('main/ChangePassword/'+userId);
		}
		/********************************************************/
		function givePermissions(){
			console.log("Permissions : "+JSON.stringify( $scope.permissions))
			for(var i = 0; i < $scope.permissions.length; i++){
				
				if($scope.permissions[i].value == "customer"){
					$scope.showCustomer = true;
					
				}
				if($scope.permissions[i].value == "employee"){
					$scope.showEmployee = true;
					
				}
				if($scope.permissions[i].value == "spindleregistration"){
					$scope.showSpindleregistration = true;
					
				}
				if($scope.permissions[i].value == "userAndRoles"){
					$scope.showUserAndRoles = true;
					
				}
				if($scope.permissions[i].value == "spindle"){
					$scope.showSpindle = true;
					
				}
				if($scope.permissions[i].value == "serviceReason"){
					$scope.showServiceReason = true;
					
				}
				if($scope.permissions[i].value == "spare"){
					$scope.showSpare = true;
					
				}
				if($scope.permissions[i].value == "order"){
					$scope.showOrder = true;
					
				}
				if($scope.permissions[i].value == "sopUpdatation"){
					$scope.showSopUpdatation = true;
					
				}
				if($scope.permissions[i].value == "sopUpdatation"){
					$scope.showSopUpdatation = true;
					
				}
				if($scope.permissions[i].value == "sopUpdatation"){
					$scope.showSopUpdatation = true;
					
				}
				
				
					
					
			}

			$('.loading').hide();
		
		}
		
	
		function doLogout (){
			
			loginFactory.ClearCredentials();
			$state.go('login');
			localStorageService.remove(ApiEndpoint.userKey);
		}

	}
})();
