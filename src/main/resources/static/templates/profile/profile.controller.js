(function() {
	'use strict';

	angular.module('myApp.profileUpdate').controller('ProfileControllerJs', ProfileControllerJs);

	ProfileControllerJs.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','fileUpload'];
	
	/* @ngInject */
	function ProfileControllerJs($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,fileUpload) {
		var employeeUrl = ApiEndpoint.url+"employee";
		var userLoginUrl = ApiEndpoint.url+"userLogin";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		
		console.log("requestDetials: "+JSON.stringify(userDetail))
		var vm = angular.extend(this, {
			edit:edit,
			cancel:cancel,
			updateProfile:updateProfile
			
		});

		(function activate() {
			loadEmployeeDetails()
			$scope.tableView=true
			$scope.editTab=true
			$scope.cancelTab=false
			$scope.editInfo=true
			$scope.updateButton=false
			
		})();
	
		/*****************************************edit information*********************************************/
		
		function edit(){
			$rootScope.loader=true
			$scope.editTab=false
			$scope.cancelTab=true
			$scope.editInfo=false
			$rootScope.loader=false
			$scope.updateButton=true
			$scope.closeTab=false
		}
		
		/*****************************************cancel information*********************************************/
		
		function cancel(){
			$rootScope.loader=true
			$scope.editTab=true
			$scope.cancelTab=false
			$scope.editInfo=true
			$rootScope.loader=false
			$scope.updateButton=false
			$scope.closeTab=false
		}
		
		
		/*****************************************employee information*********************************************/
		
		function loadEmployeeDetails(){
		
			var msg=""
				 var url =userLoginUrl+"/myProfile?userId="+userDetail.user_id;
					genericFactory.getAll(msg,url).then(function(response) {
					vm.employeeDetails = response.data;
					$scope.profile=vm.employeeDetails;
					$rootScope.loader=false;
					console.log("employee details: "+JSON.stringify(vm.employeeDetails))
									
				});
		}
		/******************************************update profile****************************************************/
		
		function updateProfile(profile){
			console.log("employee details: "+JSON.stringify(profile))
			$rootScope.loader=true
			var msg=""
				 var url =userLoginUrl+"/upadteMyProfile";
					genericFactory.add(msg,url,profile).then(function(response) {
					vm.employeeDetails = response.data;
					if(response.data.code==200){
						$scope.closeTab=true
						$scope.cancelTab=false
						toastr.success("Profile updated successfully...!");
						$rootScope.loader=false;
					}
					else{
						
						toastr.error("Error....!");
						$rootScope.loader=false;
					}
					
					console.log("employee details: "+JSON.stringify(vm.employeeDetails))
									
				});
		}
	}

	
})();
