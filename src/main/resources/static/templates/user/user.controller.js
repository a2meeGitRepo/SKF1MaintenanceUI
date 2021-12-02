(function() {
	'use strict';

	angular.module('myApp.user').controller('UserController', UserController);

	UserController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$location','$filter'];
	
	/* @ngInject */
	function UserController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$location,$filter) {
		var accessUrl = ApiEndpoint.url+"access";
		var departmentUrl = ApiEndpoint.url+"department";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user : userDetail,
			add:add,
			edit:edit,
			save:save,
			cancle:cancle,
			perPage : 10,
			total_count:0,
			pageno:1,
			changeStatus:changeStatus,
			checkUsername:checkUsername,
			deleteUser:deleteUser
		});

		(function activate() {
			$scope.disabledClick=false
			$window.scrollTo(0,0);
			$scope.viewPass=false;
			$scope.user={}
			$scope.user.user_name=''
			$scope.user.passward=''
			loadAllUsers();
			$scope.inptyp='password';
		
		})();

		
		
	
		
		$scope.viewHide = function(){
			if($scope.viewPass){
				$scope.viewPass=false;
			}else{
				$scope.viewPass=true;
			}
		}
		  
		 

	

      function checkUsername(user_name){
    	  var msg="";
    	  var  url =accessUrl+"/checkUsername/"+user_name
			genericFactory.getAll(msg,url).then(function(usernameresponse) {
				vm.usernameresponse=usernameresponse
			})
      }
		
		// ******************************************************
      
      
      function loadAllUsers(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =accessUrl+"/getUserByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=accessUrl+"/getUserByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				//
				// var url =employeeUrl+"/getAllEmployees";
				console.log("Call EMPLOYEE : "+url)
				genericFactory.getAll(msg,url).then(function(response) {
				vm.users = response.data;
				console.log("users: "+JSON.stringify(vm.users))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =accessUrl+"/getUserCount"
				}
			else{
				url=accessUrl+"/getUserCountBySearch?search="+$scope.search;
			}
				 //var url =employeeUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
		
		
      $scope.file="AllUserReport"
			vm.labels={'firstName': 'First Name','lastName':'lastName','username':'User Name','branch.branchName':'Branch','active':'User Status'}
			
		
		$scope.newExcel= function(){
    	  getAllUsersexl();
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},3000);		
			
		}
      
      function getAllUsersexl(){
    	  var msg=""
    	  var url =accessUrl+"/getAllUser";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.allUsers=response.data	
			
			console.log("allUsers: "+JSON.stringify(vm.allUsers))
      });
     }
    /**************************************************************************************/
      $scope.searchByPagination=function (search){
    	  loadAllUsers();
			
		}
      /************************************************************************************/
		
      
		
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadAllUsers();
			
		}
		
		$scope.total=0;
		var count=0;
		
		//list users by limit 
	/*	function loadAllUsers() {			

			var url;
			//loadCount();
			var msg=""
			
				if($scope.search==""||$scope.search==undefined){
					url =accessUrl+"/list"+"/"+vm.pageno+'/'+vm.perPage;
				}
			else{
				url=accessUrl+"/getlistUserByLimitAndSearch?searchText="+$scope.search+"&pageNo="+vm.pageno+'&perPage='+vm.perPage;
			}

				var url =accessUrl+"/getAllUser";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.users = response.data;
				console.log("User: "+JSON.stringify(vm.users))
								
			});			
		
			genericFactory.getAll(msg,url).then(function(response) {
				vm.users = response.data;
				console.log("users "+JSON.stringify(vm.users))				
				
			});
		}*/
		
		
		/***********************************************************/
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =accessUrl+"/getUserCount"
				}
			else{
				url=accessUrl+"/getUserCountAndSearch?searchText="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
		
		
		/**************************************************************/
	
		
		
		function cancle(user){
			
			loadAllUsers();
		$scope.addRow=false
		}
		
		
		
		$scope.gooChangePassword=function (userId){
		
			$location.path('main/ChangePassword/'+userId);
		}
	/******************************************************************/
		function save(user){
			$rootScope.loader=true;
			var msg=""
				var userData={}
			
			userData.role=user.role;
			userData.addedBy=userDetail.firstName+""+userDetail.lastName;
			userData=user
			if($scope.savetype="edit"){				
				userData.updatedDatetime=new Date();
			}else{
				userData.updatedDatetime=null;
			}
			console.log("role:"+JSON.stringify(userData))
			var url =accessUrl+"/addUser";
			genericFactory.add(msg,url,userData).then(function(response) {
				var responceObj=response.data
				loadAllUsers();
				$scope.addRow=false				
				if(response.data.code==200){
					toastr.success(response.data.msg);
					$rootScope.loader=false;
				}else{
					toastr.error(response.data.msg);
					$rootScope.loader=false;
				}
				console.log("User ADDEA"+JSON.stringify(response))
				
			});
	/*****************************************************************************/		
		/*	console.log("EXIT OL DUSER NAME "+$scope.exitsUname)
			var containt={};
			containt.title="Mandetory"
				
			if(!user.fname || user.fname== ''){
				containt.massage="First name is required"
					genericFactory.showAlert(containt);
				document.getElementById("firstName").focus();
				
				return;
			}
			if(!user.lname || user.lname== ''){
				containt.massage="Last name is required"
					genericFactory.showAlert(containt);
				document.getElementById("lastName").focus();
				
				return;
			}
			if(!user.user_name || user.user_name== ''){
				containt.massage="User name name is required"
					genericFactory.showAlert(containt);
				document.getElementById("uName").focus();
				
				return;
			}
			if(!user.password || user.password== ''){
				containt.massage="Password name is required"
					genericFactory.showAlert(containt);
				document.getElementById("pass").focus();
				
				return;
			}
			
			if(!user.role || user.role== undefined){
				containt.massage="Role name is required"
					genericFactory.showAlert(containt);
				return;
			}
			if(!user.userType || user.userType== undefined){
				containt.massage="User Type name is required"
					genericFactory.showAlert(containt);
				return;
			}
			if(!user.department|| user.department== undefined){
				containt.massage="Department name is required"
					genericFactory.showAlert(containt);
				return;
			}
			$scope.disabledClick=true
			var msg = null;
			if($scope.savetype=="new"){
				msg ="New User is added..... Successfully!!!"
			} else{
				msg =" User is edited ..... Successfully"
			}
			user.added_by_id=userDetail.user_id
			user.added_by_name=userDetail.fname+" "+userDetail.lname+" - "+userDetail.role.role_name;
			user.add_date=new Date();
			
			console.log("Login User "+JSON.stringify(userDetail))
		if(userDetail.role.role_id !=1){
			user.department= userDetail.department
			
		}else{
			user.active= 1;
		}			
			
			if($scope.savetype=="new"){
				if(vm.usernameresponse.data.code==500){
					containt.massage="User name is aleady exits"
						genericFactory.showAlert(containt);
				
					return;
				}else{	
					var url =accessUrl+"/create";
					genericFactory.add(msg,url,user).then(function(response) {
						vm.roles= response.data;
						console.log("User ADDEA"+JSON.stringify(response))
						if(response.code=200){
							$scope.addRow=false
							$scope.user={};
							loadAllUsers();
							$scope.disabledClick=false
						}
					});
					
					}
					
			}else{
				if(user.user_name==$scope.exitsUname){
					var url =accessUrl+"/create";
					genericFactory.add(msg,url,user).then(function(response) {
						vm.roles= response.data;
						console.log("User ADDEA"+JSON.stringify(response))
						if(response.code=200){
							$scope.addRow=false
							$scope.user={};
							loadAllUsers();
						}
					});
				}else{	
					if(vm.usernameresponse.data.code==500){
						containt.massage="User name is aleady exits"
							genericFactory.showAlert(containt);
					
						return;
					}else{	
						var url =accessUrl+"/create";
						genericFactory.add(msg,url,user).then(function(response) {
							vm.roles= response.data;
							console.log("User ADDEA"+JSON.stringify(response))
							if(response.code=200){
								$scope.disabledClick=false
								$scope.addRow=false
								$scope.user={};
								loadAllUsers();
							}
						});
						
						}		
					
					}
					
			}
				*/
			
		
			
			
			
			
		}
		function add(){
			
			$scope.user={};
			$scope.savetype="new"
				$scope.user.user_name=''
				$scope.user.passward=''
				$scope.addRow=true
				loadAllRoles();
				loadAllUserTypess();
				loadAllDepartment();
		}
		
		function edit(user){ 
			$scope.savetype="edit"
			$scope.exitsUname=user.username
			$window.scrollTo(0,0);
			$scope.user=user
			$scope.addRow=true
			loadAllRoles();
			
		}
		
		// load Roles
		function loadAllRoles() {
			var msg = null;
			
			var url =accessUrl+"/getAllRole";
			
			genericFactory.getAll(msg,url).then(function(response) {
				vm.roles= response.data;
				console.log("Role"+JSON.stringify(vm.roles))
				
			});
		}
		
		
		// load user type
		function loadAllUserTypess() {
			var msg = null;
			
			var url =accessUrl+"/listAllUserType";
			
			genericFactory.getAll(msg,url).then(function(response) {
				vm.userTypes= response.data;
				console.log("UserTypes"+JSON.stringify(vm.userTypes))
				
			});
		}
		
		// Load Department 
		function loadAllDepartment() {
			var msg = null;
			
			var url =departmentUrl+"/listAllDepartment";
			
			genericFactory.getAll(msg,url).then(function(response) {
				vm.departments= response.data;
				console.log("Department"+JSON.stringify(vm.departments))
				
			});
		}
		//********************************************************
		function changeStatus(user){
			//console.log("AVTIVE BEFORE"+user.active);
			$rootScope.loader=true;
			var msg;
			if(user.active==0){
				user.active=1
				msg = "User Active successfully.....!!!!";
			}
			else{
				user.active=0;
				msg = "User InActive successfully.....!!!!";
			}
			
			
			var url =accessUrl+"/updateUser";
			genericFactory.add(msg,url,user).then(function(response) {
			loadAllUsers();
			if(response.data.code==200){
				toastr.success(response.data.msg);
				$rootScope.loader=false;
			}else{
				toastr.error(response.data.msg);
				$rootScope.loader=false;
			}
			});
		}
		
		//********************************************************
		function deleteUser(user){
			//console.log("AVTIVE BEFORE"+user.active);
			var msg;
	
				msg = "selected User has been deleted successfully.....!!!!";			
			$rootScope.loader=true;
			var url =accessUrl+"/deletUser";
			genericFactory.add(msg,url,user).then(function(response) {
			loadAllUsers();
			
			console.log("response"+JSON.stringify(response))
			if(response.data.code==200){
				toastr.success(response.data.message);
				$rootScope.loader=false;
			}else{
				toastr.error(response.data.message);
				$rootScope.loader=false;
			}
			});
		}
		
	}

	
})();
