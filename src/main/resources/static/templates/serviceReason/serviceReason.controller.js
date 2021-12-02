(function() {
	'use strict';

	angular.module('myApp.serviceReason')
	.controller('ServiceReasonController', ServiceReasonController);
	ServiceReasonController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter'];

	
	/* @ngInject */
	function ServiceReasonController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter) {

		var serviceUrl = ApiEndpoint.url+"service";
		
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user:userDetail,
			add:add,
			save:save,
			edit:edit,
			cancle:cancle,
			delet:delet,
			changeStatus:changeStatus,
		
			perPage : 10,
			total_count:0,
			pageno:1,
		});

		(function activate() {
			$scope.reason={};
			$scope.alertType=false;
			loadReasons();
			$scope.editView=false;
			$rootScope.loader=false;
			
		
		})();
		
		
		/*************************future date disabled**********************/
		
		$scope.searchByPagination=function (search){
			loadReasons();
			
		}
	
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadReasons();
			
		}
		
	
		
		function add(){
			
			window.scrollTo(0, 0)
			$scope.addNew=true;
		
			$scope.editView=false;
			$scope.reason={}
		
		}
		function edit(reason){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.reason=reason
			$scope.addNew=true;
			
		}
		function cancle(){
			$scope.addNew=false;
			
		}
		
		
	
		
		/**************************export excel*********************/
		
		$scope.file="Reasons"
			vm.labels={'reasonName':'Reason Name','addedBy':'AddedBy','addedDate':'AddedDate'}
			
		
		$scope.newExcel= function(){
			getAllReasons()
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},1000);		
			
		}
		function getAllReasons(){
			var msg=""
				 var url =serviceUrl+"/getAllServiceReasonList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allReasons = response.data;
				console.log("allReasons: "+JSON.stringify(vm.allReasons))
								
			});
		}
		
		
		/***********************************************************/
		function delet(reason){
			var msg=""
				 var url =serviceUrl+"/deletServiceReason";
				genericFactory.add(msg,url,reason).then(function(response) {
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						 loadReasons();
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
						
			});
		}
		function changeStatus(reason){
			
			if(reason.active==1){
				reason.active=0
			}else{
				reason.active=1
			}
			$rootScope.loader=true;
			var msg=""
			 var url =serviceUrl+"/changeStatus";
			genericFactory.add(msg,url,reason).then(function(response) {
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
		
		function loadReasons(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =serviceUrl+"/getServiceReasonByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=serviceUrl+"/getServiceReasonByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.reasons = response.data;
				console.log("reasons: "+JSON.stringify(vm.reasons))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =serviceUrl+"/getServiceReasonCount"
				}
			else{
				url=serviceUrl+"/getServiceReasonByPaginationAndSerach?search="+$scope.search;
			}
				 //var url =serviceUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
				
		
		
		/*****************************save employee**************************/
		
		function save(reason){
			console.log("reason "+JSON.stringify(reason))
			if(reason==undefined||reason.reasonName==undefined){
				$scope.reasonNameErr=true;
				return;
			}else{
				$scope.reasonNameErr=false;
			}
			

			
			
			
			
			/*******************************/
			console.log("reason "+JSON.stringify(reason))
			
			
		
			$rootScope.loader=true;
			reason.active=1;
			reason.addedDate=new Date();
			reason.addedBy=vm.user.firstName+" "+vm.user.lastName;
			 var url ="";
			 console.log("editView  :"+$scope.editView);
			if($scope.editView){
				reason.updDatetime=new Date();
				var msg="Selected Employee has been updated"
					
					url =serviceUrl+"/updateServiceReason"
			}else{
				reason.updDatetime=null;
				url =serviceUrl+"/addNewServiceReason"
			}
			console.log("url:"+url);
			
			// var url =serviceUrl+"/addNewEmployee";
				genericFactory.add(msg,url,reason).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					loadReasons();
					$scope.addNew=false;
					$scope.reason={}
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
			
	
	
		

	}
})();
