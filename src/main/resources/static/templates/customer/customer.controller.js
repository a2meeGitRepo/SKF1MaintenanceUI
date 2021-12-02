(function() {
	'use strict';

	angular.module('myApp.customer')
	.controller('CustomerController', CustomerController);
	CustomerController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http'];

	
	/* @ngInject */
	function CustomerController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http) {

		var customerUrl = ApiEndpoint.url+"customer";
		var commonUrl = ApiEndpoint.url+"common";
		var employeeUrl = ApiEndpoint.url+"employee";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user:userDetail,
			add:add,
			save:save,
			edit:edit,
			cancle:cancle,
			upload:upload,
			uploadCustomer:uploadCustomer,
			changeStatus:changeStatus,
			delet:delet,
			perPage : 10,
			total_count:0,
			pageno:1,
		});

		(function activate() {
			$scope.customer={};
			$scope.alertType=false;
			loadCustomers();
			$scope.editView=false;
			$rootScope.loader=false;
			
		
		})();
		
		
		/*************************future date disabled**********************/
		
		$scope.searchByPagination=function (search){
			loadCustomers();
			
		}
	
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadCustomers();
			
		}
		
	
		function delet(customer){
			var msg=""
				 var url =customerUrl+"/deleteCustomer";
				genericFactory.add(msg,url,customer).then(function(response) {
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						loadCustomers();
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
						
			});
		}
		function upload(){
			$scope.uploadtab=true;
			$scope.addNew=false;
			$scope.editView=false;
		}
		function add(){
			
			window.scrollTo(0, 0)
			$scope.addNew=true;
			$scope.uploadtab=false;
			loadBranches();
			loadStates();
			$scope.editView=false;
			$scope.customer={}
		
		}
		function edit(customer){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.uploadtab=false;
			$scope.customer=customer
			console.log("CONTACT NO :: "+customer.phoneNo)
			
			
			$scope.customer.phoneNo=parseInt(customer.phoneNo)
			$scope.customer.state=customer.city.state;
			$scope.addNew=true;
			loadBranches();
			loadStates();
			$scope.loadCities(customer.city.state.stateId)
		}
		function cancle(){
			$scope.addNew=false;
			$scope.uploadtab=false;
		}
		
		
		
		$scope.capitalName=function(name){
			$scope.customer.companyName= name.charAt(0).toUpperCase() + name.slice(1);
		}
		
	
		
		/**************************export excel*********************/
		
		$scope.file="Customer"
			vm.labels={'branch.branchName':'Branch','customerCode': 'Customer Code ', 'companyName': 'Company Name','contactPerson': 'Contact Person','phoneNo': 'Contact No','emailId':'email Id','faxNo':'Fax No','address':'Address','city.cityName':'City','city.state.stateName':'State','pincode':'Pincode','addedBy':'AddedBy','addedDate':'AddedDate'}
			
		
		$scope.newExcel= function(){
			getAllCustomerss()
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},1000);		
			
		}
		function getAllCustomerss(){
			var msg=""
				 var url =customerUrl+"/getAllCustomerList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allCustomers = response.data;
				console.log("allCustomers: "+JSON.stringify(vm.allCustomers))
								
			});
		}
		
		
		/***********************************************************/
		function changeStatus(customer){
			
			if(customer.active==1){
				customer.active=0
			}else{
				customer.active=1
			}
			$rootScope.loader=true;
			var msg=""
			 var url =customerUrl+"/changeStatus";
			genericFactory.add(msg,url,customer).then(function(response) {
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
					$rootScope.loader=false;
				}else{
					toastr.error(response.data.message);
					$rootScope.loader=false;
				}
					
		});
		}
		/*****************************************************************/
		function loadBranches(){
			var msg=""
				 var url =employeeUrl+"/getBranchList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.branches = response.data;
				console.log("branches: "+JSON.stringify(vm.branches))
								
			});
		}
		function loadStates(){
			var msg=""
				 var url =commonUrl+"/getAllState";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.states = response.data;
				console.log("states: "+JSON.stringify(vm.states))
								
			});
		}
		$scope.loadCities=function(stateId){
			var msg=""
				 var url =commonUrl+"/getCitiesByState?stateId="+stateId;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.cities = response.data;
				console.log("cities: "+JSON.stringify(vm.cities))
								
			});
		}
		
		function loadCustomers(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =customerUrl+"/getCustomerByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=customerUrl+"/getCustomerByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.customers = response.data;
				console.log("customers: "+JSON.stringify(vm.customers))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =customerUrl+"/getCustomerCount"
				}
			else{
				url=customerUrl+"/getCustomerCountBySearch?search="+$scope.search;
			}
				 //var url =customerUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
		
		
		$scope.checkemployeeCode=function (employeeCode){
			var msg=""

				 var url =customerUrl+"/checkEmployeeCode?employeeCode="+employeeCode;
				genericFactory.getAll(msg,url).then(function(response) {
				var employeeCodeisAvailable = response.data;
				console.log("employeeCodeisAvailable: "+JSON.stringify(employeeCodeisAvailable))
				if(employeeCodeisAvailable){
					$scope.invalidemployeeCodeERR=true;
					$scope.invalidemployeeCodemsg="Already exits"
				}else{
					$scope.invalidemployeeCodeERR=false;
				}
								
			});
		}
				
		
		$scope.validateContatNo=function (contactNo){
			
		

				if(contactNo.toString().length!=10){
					
					$scope.invalidMoNo=true;
					$scope.contactNo1ErrMsg="Contact must be 10 digit only"
				}else{
					$scope.invalidMoNo=false;
				}
		
		}
		$scope.validateEmail=function (mail) 
		{
			
		 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		  {
			 $scope.emialErr=false
		  }else{
			  $scope.emailErrMsg="Invalid email address"
				  $scope.emialErr=true
		  }
			
		}
		
		/*********************date of birth********************/
		
		
		/*****************************save employee**************************/
		
		function save(customer){
			console.log("Customer "+JSON.stringify(customer))
			if(customer==undefined||customer.branch==undefined){
				$scope.branchErr=true;
				return;
			}else{
				$scope.branchErr=false;
			}
			

			if(customer.customerCode==undefined){
				$scope.custCodeErr=true;
				return;
			}else{
				$scope.custCodeErr=false;
			}
			
			if(customer.companyName==undefined){
				$scope.comNameErr=true;
				return;
			}else{
				$scope.comNameErr=false;
			}
			
			if(customer.contactPerson==undefined){
				$scope.conPerErr=true;
				return;
			}else{
				$scope.conPerErr=false;
			}
			/*******************************/
			
			/*****************************/
			
			if(customer.phoneNo==undefined){
				$scope.MoNoErr=true;
				return;
			}else{
				$scope.MoNoErr=false;
			}
			
			if(customer.emailId==undefined){
				$scope.emailErr=true;
				return;
			}else{
				$scope.emailErr=false;
			}
			
			if(customer.address==undefined){
				$scope.addressErr=true;
				return;
			}else{
				$scope.addressErr=false;
			}
			
			if(customer.city==undefined){
				$scope.cityErr=true;
				return;
			}else{
				$scope.cityErr=false;
			}
			
			
			
			
			/*******************************/
			console.log("customer "+JSON.stringify(customer))
			if($scope.invalidMoNo){
				
				return;
			}
			
		
			$rootScope.loader=true;
			customer.active=1;
			customer.addedDate=new Date();
			customer.addedBy=vm.user.firstName+" "+vm.user.lastName;
			 var url ="";
			 console.log("editView  :"+$scope.editView);
			if($scope.editView){
				customer.updDatetime=new Date();
				var msg="Selected Employee has been updated"
					
					url =customerUrl+"/updateCustomer"
			}else{
				customer.updDatetime=null;
				url =customerUrl+"/addNewCustomer"
			}
			console.log("url:"+url);
			
			// var url =customerUrl+"/addNewEmployee";
				genericFactory.add(msg,url,customer).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					loadCustomers();
					$scope.addNew=false;
					$scope.customer={}
					if(response.data.code==200){
						
						if($scope.editView==true){
							toastr.success(response.data.message);
						$rootScope.loader=false;
						}else{
							toastr.success(response.data.message);
							$rootScope.loader=false;
						}
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
					
			});
		}
			
	
		function uploadCustomer(){
			
			
		//	return
			var file = document.getElementById('uploadCustomer').files[0];
		
		console.dir(file);

		if (file == undefined) {
			toastr.error('Please Select a xlsx File');
			return;
		}

		var fileName = file.name;
		var extension = ".xlsx";
		var extension1 = ".xls";
		console.log("Format  "+fileName.includes(extension))

		console.log("Format 1 "+fileName.includes(extension1))
		if(!fileName.includes(extension1)){
			toastr.error('Selected File is not a xlsx or xls');
			return;
		}			

		$('.loading').show();
		var fd = new FormData();
		fd.append('file', file);
		var url = customerUrl + "/upload";
		console.log("URL :: "+url)
		$http.post(url, fd, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		})
		.then(function successCallback(response) {
			
			$('.loading').hide();
			//window.alert("File uploaded successfully!");
		
			toastr.success('Uploaded....', 'Succesful !!',{ timeOut: 10000 });					
			loadCustomers();
			$scope.uploadtab=false;
		}, function errorCallback(response) {
	    	$('.loading').hide();
	    	
			//window.alert("File upload - unsuccessfull!");
			//init();
			toastr.error('Upload....', 'UnSuccesful !!');
			loadCustomers();
			$scope.uploadtab=false;
				    });

		angular.element("input[type='file']").val(null);
	}
		

	}
})();
