(function() {
	'use strict';

	angular.module('myApp.inspectionCheckPoint')
	.controller('InspectionCheckPointController', InspectionCheckPointController);
	InspectionCheckPointController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter'];

	
	/* @ngInject */
	function InspectionCheckPointController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter) {

		
		var inspectionUrl = ApiEndpoint.url+"inspection";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user:userDetail,
			add:add,
			save:save,
			edit:edit,
			cancle:cancle,

			changeStatus:changeStatus,
			delet:delet,
			perPage : 10,
			total_count:0,
			pageno:1,
		});

		(function activate() {
			$scope.spindle={};
			$scope.alertType=false;
			loadCheckPoints();
			$scope.editView=false;
			$rootScope.loader=false;
			
		
		})();
		
		
		/*************************future date disabled**********************/
		
		$scope.searchByPagination=function (search){
			loadCheckPoints();
			
		}
	
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadCheckPoints();
			
		}
	
		
		function add(){
			
			window.scrollTo(0, 0)
			$scope.addNew=true;
			$scope.editView=false;
			$scope.loadSpindles={}
		
		}
		function edit(checkPoint){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.addNew=true;
			$scope.checkPoint=checkPoint
			
		}
		function cancle(){
			$scope.addNew=false;
			
		}
		
		
		
	
		
		/**************************export excel*********************/
		function delet(checkPoint){
			var msg=""
				 var url =inspectionUrl+"/deleteInspectionCheckPoint";
				genericFactory.add(msg,url,checkPoint).then(function(response) {
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						loadCheckPoints();
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
						
			});
		}
		$scope.file="Customer"
			vm.labels={'checkPointName':'CheckPoint Name','defaultValue': 'Default Value', 'defaultCondistion': 'Default Condistion','remark': 'remark','addedBy':'AddedBy','addedDate':'AddedDate'}
			
		
		$scope.newExcel= function(){
			getAllCheckPoints()
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},1000);		
			
		}
		function getAllCheckPoints(){
			var msg=""
				 var url =inspectionUrl+"/getAllInspectionCheckPointList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allcheckPoints= response.data;
				console.log("allcheckPoints: "+JSON.stringify(vm.allcheckPoints))
								
			});
		}
		
		
		/***********************************************************/
		function changeStatus(spindle){
			
			if(spindle.active==1){
				spindle.active=0
			}else{
				spindle.active=1
			}
			$rootScope.loader=true;
			var msg=""
			 var url =inspectionUrl+"/changeStatus";
			genericFactory.add(msg,url,spindle).then(function(response) {
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
		
		
		
		function loadCheckPoints(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =inspectionUrl+"/getInspectionCheckPointByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=inspectionUrl+"/getInspectionCheckPointByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.checkPoints = response.data;
				console.log("checkPoints: "+JSON.stringify(vm.checkPoints))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =inspectionUrl+"/getInspectionCheckPointCount"
				}
			else{
				url=inspectionUrl+"/getInspectionCheckPointCountBySearch?search="+$scope.search;
			}
				 //var url =customerUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
		
		
		
		
		
		/*********************date of birth********************/
		
		
		/*****************************save employee**************************/
		
		function save(checkPoint){
			console.log("checkPoint "+JSON.stringify(checkPoint))
			if(checkPoint==undefined||checkPoint.checkPointName==undefined){
				$scope.checkpointErr=true;
				return;
			}else{
				$scope.checkpointErr=false;
				
			}
			

			
			/*****************************/
			
			if(checkPoint.defaultValue==undefined){
				$scope.defaultValueErr=true;
				return;
			}else{
				$scope.defaultValueErr=false;
			}
			
			if(checkPoint.defaultCondistion==undefined){
				$scope.defaultCondistionErr=true;
				return;
			}else{
				$scope.defaultCondistionErr=false;
			}
			
			
			/*******************************/
			console.log("checkPoint "+JSON.stringify(checkPoint))
			if($scope.invalidMoNo){
				
				return;
			}
			
		
			$rootScope.loader=true;
			checkPoint.active=1;
			checkPoint.addedDate=new Date();
			checkPoint.addedBy=vm.user.firstName+" "+vm.user.lastName;
			 var url ="";
			 console.log("editView  :"+$scope.editView);
			if($scope.editView){
				checkPoint.updDatetime=new Date();
				var msg="Selected Employee has been updated"
					
					url =inspectionUrl+"/updateInspectionCheckPoint"
			}else{
				checkPoint.updDatetime=null;
				url =inspectionUrl+"/addNewInspectionCheckPoint"
			}
			console.log("url:"+url);
			
			// var url =customerUrl+"/addNewEmployee";
				genericFactory.add(msg,url,checkPoint).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					loadCheckPoints();
					$scope.addNew=false;
					$scope.checkPoint={}
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
