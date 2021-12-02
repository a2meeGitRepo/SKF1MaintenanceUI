(function() {
	'use strict';

	angular.module('myApp.order')
	.controller('OrderController', OrderController);
	OrderController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter'];

	
	/* @ngInject */
	function OrderController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter) {

		var orderUrl = ApiEndpoint.url+"order";
		var serviceUrl = ApiEndpoint.url+"service";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user:userDetail,
			add:add,
			save:save,
			edit:edit,
			cancle:cancle,
		
			changeStatus:changeStatus,
		
			perPage : 10,
			total_count:0,
			pageno:1,
		});

		(function activate() {
			$scope.reason={};
			$scope.alertType=false;
			loadOrders();
			$scope.editView=false;
			$rootScope.loader=false;
			
		
		})();
		
		
		/*************************future date disabled**********************/
		
	
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadOrders();
			
		}
		
	
		
		function add(){
			
			window.scrollTo(0, 0)
			$scope.addNew=true;
			loadServiceRequest();
			$scope.editView=false;
			$scope.reason={}
		
		}
		function edit(order){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.order=order
			$scope.addNew=true;
			
		}
		function cancle(){
			$scope.addNew=false;
			
		}
		
		
	
		
		/**************************export excel*********************/
		
		$scope.file="Reasons"
			vm.labels={'orderNo':'Order No','orderDate':'Order Date','orderPrice':'Order Price','spindleServiceRequest.spindle.spindleBrand':'Prindle Brand','spindleServiceRequest.spindle.spindleModel':'Prindle Brand','spindleServiceRequest.customer.companyName':'Company Name','addedBy':'AddedBy','addedDate':'AddedDate'}
			
		
		$scope.newExcel= function(){
			getAllOrrders()
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},1000);		
			
		}
		function getAllOrrders(){
			var msg=""
				 var url =orderUrl+"/getAllOrderList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allorders = response.data;
				console.log("allReasons: "+JSON.stringify(vm.allorders))
								
			});
		}
		function loadServiceRequest(){
			var msg=""
				 var url =serviceUrl+"/getAllSpindleServiceRequestList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.serviceRequests = response.data;
				console.log("serviceRequests: "+JSON.stringify(vm.serviceRequests))
								
			});
		}
		
		
		/***********************************************************/
		/*function delet(reason){
			var msg=""
				 var url =orderUrl+"/deletServiceReason";
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
		}*/
		function changeStatus(order){
			
			if(order.active==1){
				order.active=0
			}else{
				order.active=1
			}
			$rootScope.loader=true;
			var msg=""
			 var url =orderUrl+"/changeStatus";
			genericFactory.add(msg,url,order).then(function(response) {
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
		
		function loadOrders(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =orderUrl+"/getOrderByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=orderUrl+"/getOrderByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.orders = response.data;
				console.log("orders: "+JSON.stringify(vm.orders))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =orderUrl+"/getOrderCount"
				}
			else{
				url=orderUrl+"/getOrderCountBySearch?search="+$scope.search;
			}
				 //var url =orderUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
				
		
		
		/*****************************save employee**************************/
		
		function save(order){
			console.log("order "+JSON.stringify(order))
			if(order==undefined||order.serviceRequest==undefined){
				$scope.serviceRequestErr=true;
				return;
			}else{
				$scope.serviceRequestErr=false;
			}
			if(order.orderNo==undefined||order.orderNo==""){
				$scope.orderNoErr=true;
				return;
			}else{
				$scope.orderNoErr=false;
			}
			if(order.orderDate==undefined||order.orderDate==""){
				$scope.orderDateErr=true;
				return;
			}else{
				$scope.orderDateErr=false;
			}
			if(order.orderPrice==undefined||order.orderPrice==""){
				$scope.orderPriceErr=true;
				return;
			}else{
				$scope.orderPriceErr=false;
			}
			order.spindleServiceRequest=order.serviceRequest
			
			
			
			/*******************************/
			console.log("order "+JSON.stringify(order))
			
			
		
			$rootScope.loader=true;
			order.active=1;
			order.addedDate=new Date();
			order.addedBy=vm.user.firstName+" "+vm.user.lastName;
			 var url ="";
			 console.log("editView  :"+$scope.editView);
			if($scope.editView){
				order.updDatetime=new Date();
				var msg=""
					
					url =orderUrl+"/updateOrder"
			}else{
				order.updDatetime=null;
				url =orderUrl+"/addNewOrder"
			}
			console.log("url:"+url);
			
			// var url =orderUrl+"/addNewEmployee";
				genericFactory.add(msg,url,order).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					loadOrders();
					$scope.addNew=false;
					$scope.order={}
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
