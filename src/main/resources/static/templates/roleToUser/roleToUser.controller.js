(function() {
	'use strict';

	angular.module('myApp.roleToUser').controller('RoleToUserController', RoleToUserController);
	RoleToUserController.$inject = [ '$state', '$uibModal', '$log', '$scope', 'toastr','genericFactory','ApiEndpoint'];

	/* @ngInject */
	function RoleToUserController($state,$uibModal, $log, $scope, toastr,genericFactory,ApiEndpoint) {
		var accessUrl = ApiEndpoint.url+"access";
		var vm = angular.extend(this, {
			rolesList : [],
			changeRole : changeRole,
			assignRoleToMultipleUsers : assignRoleToMultipleUsers,
			removeRoleOfMultipleUsers : removeRoleOfMultipleUsers
		});

		(function activate() {
			$scope.selectRole = 'selectRole';
			
			loadRolesList();
		})();

		
		function loadRolesList(){
			var msg=""
				 var url =accessUrl+"/getRoleList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.roles= response.data;
				console.log("roles: "+JSON.stringify(vm.roles))
								
			});
		}
		
		function changeRole(iObj){
			if($scope.selectRole == 'selectRole'){
				return;
			}
			$scope.seRole=iObj;
			var msg=""
				 var url =accessUrl+"/getUserByRole?roleId="+iObj.roleId;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.rolesuser= response.data;
				vm.usersWithoutRoles=response.data.userwithoutrole
				vm.usersWithRoles=response.data.userwithrole
				console.log("rolesuser: "+JSON.stringify(vm.rolesuser))
								
			});
			
			
		}
		
			function assignRoleToMultipleUsers(){
				if($scope.selectRole == 'selectRole'){
					toastr.error('Please select role');
					document.getElementById('selectRole').focus();
					return;
				}
				var idsArr = [];
				var flag = true;
				for(var i = 0; i < vm.usersWithoutRoles.length; i++){
					if(vm.usersWithoutRoles[i].select){
						var userRole={};
						userRole.role=$scope.seRole
						userRole.userDetails=vm.usersWithoutRoles[i]
						console.log("Selected USER: "+JSON.stringify(userRole))
						idsArr.push(userRole);
						vm.usersWithoutRoles[i].select=false
						
					}
				}
				console.log("idsArr: "+JSON.stringify(idsArr))
	//			var roleArray = idsArr.concat(vm.userRolesList);
				
				
				var msg=""
					 var url =accessUrl+"/addUserRoles";
					genericFactory.add(msg,url,idsArr).then(function(response) {
						changeRole($scope.seRole)
						if(response.data.code==200){
							
							if($scope.editView==true){
								toastr.success(response.data.message);
							//$rootScope.loader=false;
							}else{
								toastr.success(response.data.message);
							//	$rootScope.loader=false;
							}
							
						}else{
							toastr.error(response.data.message);
							//$rootScope.loader=false;
						}
					console.log("rolesuser: "+JSON.stringify(response))
									
				});
			}
			
		function removeRoleOfMultipleUsers(){
			if($scope.selectRole == 'selectRole'){
				toastr.error('Please select role');
				document.getElementById('selectRole').focus();
				return;
			}
			var idsArr = [];
			var flag = true;
			for(var i = 0; i < vm.usersWithRoles.length; i++){
				if(vm.usersWithRoles[i].select){
					var userRole={};
					userRole.role=$scope.seRole
					userRole.userDetails=vm.usersWithRoles[i]
					console.log("Selected USER: "+JSON.stringify(userRole))
					idsArr.push(userRole);
					vm.usersWithRoles[i].select=false
					
				}
			}
			console.log("idsArr: "+JSON.stringify(idsArr))
			
			var msg=""
					 var url =accessUrl+"/removeUserRoles";
					genericFactory.add(msg,url,idsArr).then(function(response) {
						changeRole($scope.seRole)
						if(response.data.code==200){
							
							if($scope.editView==true){
								toastr.success(response.data.message);
							
							}else{
								toastr.success(response.data.message);
								
							}
							
						}else{
							toastr.error(response.data.message);
							
						}
					console.log("rolesuser: "+JSON.stringify(response))
									
				});
			
			
			
		}
		
	}

})();
