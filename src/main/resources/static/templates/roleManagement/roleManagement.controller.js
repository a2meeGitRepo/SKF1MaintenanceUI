/**
  * @author 		: ABS
  * @name			: materialIssueController
  * @description 	: controller for material issue module
  * @date 			: 20/06/2018
  */
(function() {
	'use strict';

	angular.module('myApp.roleManagement').controller('roleManagementController', roleManagementController);

	roleManagementController.$inject = ['$state', '$scope','toastr', '$compile','DTColumnDefBuilder', 'DTOptionsBuilder','genericFactory','ApiEndpoint','$route'];
	/* @ngInject */
	function roleManagementController($state, $scope, toastr, $compile,DTColumnDefBuilder, DTOptionsBuilder,genericFactory,ApiEndpoint,$route) {
		var accessUrl = ApiEndpoint.url+"access";
		var vm = angular.extend(this, {
			roleDetailsList : [],
			permissionsList : [],
			assignPermissionsToRole : assignPermissionsToRole,
			getSelect : getSelect,
			manageUserRole : manageUserRole
//			save : save
		});

		(function activate() {
			$('.loading').show();
			loadAllPermissions();
			loadAllRoleDetails();
		})();
		
		function loadAllRoleDetails(){
			var msg=""
				 var url =accessUrl+"/allRoleDetails";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.roleDetailsList= response.data;
				console.log("roles: "+JSON.stringify(vm.roleDetailsList))
								
			});
			
		}
		function loadAllPermissions(){
			
			var msg=""
				 var url =accessUrl+"/allPermissions";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.permissionsList= response.data;
				console.log("permissionsList: "+JSON.stringify(vm.permissionsList))
								
			});
	}
		function getSelect(permissions, userPermissions){
			for(var i = 0; i < userPermissions.permission.length; i++){
				if(permissions.permissionId == userPermissions.permission[i].permissionId){
					return true;
				}
			}
		}
		
		function manageUserRole(permissions, userPermissions){
			var flag = true;
			for(var i = 0; i < userPermissions.permission.length; i++){
				if(permissions.permissionId == userPermissions.permission[i].permissionId){
					userPermissions.permission.splice(i,1);
					flag = false;
				}
			}
			
			if(flag){
				var obj = Object.assign({}, permissions);
				obj.type= 'E';
				obj.permission = obj.name;
				delete obj.name;
				delete obj['@id'];
				
				userPermissions.permission.push(obj);
			}
		}
		
		
		
		
		function assignPermissionsToRole(iObj){
			console.log("SAVE PERMISSION : "+JSON.stringify(iObj))
			
			
			if(!iObj.roleName || iObj.roleName == ''){
				toastr.error('Role name can not be blank');
				return;
			}
			var msg=""
				 var url =accessUrl+"/assignPermissions";
				genericFactory.add(msg,url,iObj).then(function(response) {
					
					$route.reload()
					if(response.data.code==200){
						
						if($scope.editView==true){
							toastr.success(response.data.message);
						
						}else{
							toastr.success(response.data.message);
							
						}
						
					}else{
						toastr.error(response.data.message);
						
					}
				console.log("permissionsList: "+JSON.stringify(vm.permissionsList))
								
			});
		};
		
		

		/**
		 * @author : Anurag
		 * @Description : init controller
		 * @date : 03/10/2019
		 */
		var init = function () {
			$scope.dtOptions = DTOptionsBuilder.newOptions().withDOM(
				'C<"clear">lfrtip')
				.withOption('responsive', true)
				.withOption('scrollX', 'auto')      
				.withOption('scrollCollapse', true)
				.withOption('autoWidth', false);
			$scope.dtColumnDefs = [
				DTColumnDefBuilder.newColumnDef(9).notSortable(),
				DTColumnDefBuilder.newColumnDef(9).notSortable()];

		}
		init();
		
	}
})();


