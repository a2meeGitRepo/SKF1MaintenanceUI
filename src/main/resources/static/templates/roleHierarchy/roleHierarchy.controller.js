(function() {
	'use strict';

	angular.module('myApp.roleHierarchy').controller('RoleHierarchyController', RoleHierarchyController);
	RoleHierarchyController.$inject = [ '$state', '$uibModal', '$log', '$scope', 'toastr','genericFactory','ApiEndpoint'];

	/* @ngInject */
	function RoleHierarchyController($state,$uibModal, $log, $scope, toastr,genericFactory,ApiEndpoint) {
		var accessUrl = ApiEndpoint.url+"access";
		var vm = angular.extend(this, {
			delet:delet,
			changeRole:changeRole,
			add:add,
			save:save,
		});

		(function activate() {
			$scope.selectRole = 'selectRole';
			$scope.showReportee=false;
			loadRolesList();
		})();
		function add(){
			$scope.addnew=true;
			loadRolesListForNew();
		}
		function loadRolesListForNew(){
			$scope.seRole
			var msg=""
				 var url =accessUrl+"/getNewByRole?roleId="+$scope.seRole.roleId;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.newRoles= response.data;
				console.log("NEW roles: "+JSON.stringify(vm.newRoles))
								
			});
		}
		function loadRolesList(){
			var msg=""
				 var url =accessUrl+"/getRoleList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.roles= response.data;
				console.log("roles: "+JSON.stringify(vm.roles))
								
			});
		}
		function save(){
			if($scope.newRole == 'selectRole'|| $scope.newRole ==undefined){
				toastr.error("Select New  Role ");
				return;
			}
			var roleHierarchy={}
			roleHierarchy.role=$scope.newRole
			roleHierarchy.reportToRole=$scope.seRole
			console.log("roleHierarchy"+JSON.stringify(roleHierarchy))
			var msg=""
				 var url =accessUrl+"/addRoleHierarchy";
				genericFactory.add(msg,url,roleHierarchy).then(function(response) {
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
								
			});
		}
		
		function changeRole(iObj){
			if($scope.selectRole == 'selectRole'){
				return;
			}
			$scope.seRole=iObj;
			$scope.showReportee=true;
			$scope.addnew=false;
			var msg=""
				 var url =accessUrl+"/getRoleHierarchyByRole?roleId="+iObj.roleId;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.reporteeRole= response.data;
				
				console.log("reporteeRole: "+JSON.stringify(vm.reporteeRole))
								
			});
			
			
		}
		
			function delet(roleHierarchy){
				var msg=""
					 var url =accessUrl+"/deleteRoleHierarchy";
					genericFactory.add(msg,url,roleHierarchy).then(function(response) {
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
									
				});
			}
	
	}

})();
