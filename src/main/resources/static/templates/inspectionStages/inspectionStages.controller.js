(function() {
	'use strict';

	angular.module('myApp.inspectionStages')
	.controller('InspectionStagesController', InspectionStagesController);
	InspectionStagesController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter'];

	
	/* @ngInject */
	function InspectionStagesController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter) {

		
		var inspectionUrl = ApiEndpoint.url+"inspection";
		var spindleUrl = ApiEndpoint.url+"spindle";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			selCheckPoints:[], 	
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
			$scope.inspectionStage={};
			$scope.alertType=false;
			loadInspectionStages();
			$scope.editView=false;
			$rootScope.loader=false;
			
		
		})();
		
		
		/*************************future date disabled**********************/
		
		$scope.searchByPagination=function (search){
			loadInspectionStages();
			
		}
	
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadInspectionStages();
			
		}
	
		
		function add(){
			
			window.scrollTo(0, 0)
			$scope.addNew=true;
			$scope.editView=false;
			$scope.inspectionStage={}
			loadSpindleModel();
			loadCheckPoints();
		
		}
		function edit(inspectionStage){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.addNew=true;
			$scope.inspectionStage=inspectionStage
			loadSpindleModel();
			loadCheckPoints();
			getInspeactionStagesMappedCheckPoint(inspectionStage);
			
		}
		function cancle(){
			$scope.addNew=false;
			
		}
		function getInspeactionStagesMappedCheckPoint(inspectionStage){
			var msg=""
				 var url =inspectionUrl+"/getInspeactionStagesMappedCheckPoint?inspectionStage="+inspectionStage.inspectionStageId;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.mappedCheckPoints= response.data;
				angular.forEach(vm.mappedCheckPoints, function(value) {
					
					vm.selCheckPoints.push(value.inspectionCheckPoint);
					
					angular.forEach(vm.checkPoints, function(value1) {
						console.log("value1: "+JSON.stringify(value1))
						console.log("value: "+JSON.stringify(value1))
						if(value.inspectionCheckPoint.inspectionCheckpointId==value1.inspectionCheckpointId){
							value1.add=true
						}
						
						
						})
					})
				console.log("selCheckPoints: "+JSON.stringify(vm.mappedCheckPoints))
								
			});
		}
		function loadSpindleModel(){
			var msg=""
				 var url =spindleUrl+"/getSpindleModels";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.models= response.data;
				console.log("models: "+JSON.stringify(vm.models))
								
			});
		}
		$scope.getnewStageNo=function(spindleModel){
			var msg=""
				 var url =inspectionUrl+"/getNewStageNoByModel?model="+spindleModel;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.stageNo= response.data;
				$scope.inspectionStage.stageNo=response.data
				console.log("stageNo: "+JSON.stringify(vm.stageNo))
								
			});
		}
		function loadCheckPoints(){
			
			var msg=""
				 var url =inspectionUrl+"/getActiveInspectionCheckPointList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.checkPoints= response.data;
				console.log("checkPoints: "+JSON.stringify(vm.checkPoints))
								
			});
			
			
		}
		
		$scope.addNewCheckpoint=function (checkPoint){
			
				vm.selCheckPoints.push(checkPoint)
				checkPoint.add=true
				
			
	
		}
		$scope.removeCheckPoint=function (index,checkPoint){
			console.log("index: "+JSON.stringify(vm.selCheckPoints[index]))
			vm.selCheckPoints.splice(index,1);
			checkPoint.add=false
		}
		
		/**************************export excel*********************/
		function delet(inspectionStage){
			var msg=""
				 var url =inspectionUrl+"/deleteInspectionStage";
				genericFactory.add(msg,url,inspectionStage).then(function(response) {
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						loadInspectionStages();
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
						
			});
		}
		$scope.file="Customer"
			vm.labels={'stageNo':'Stage No ','stageName': 'Stage Name', 'spindleModel': 'Spindle Model','addedBy':'AddedBy','addedDate':'AddedDate'}
			
		
		$scope.newExcel= function(){
			loadIAllnspectionStages ()
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},1000);		
			
		}
		function loadIAllnspectionStages(){
			var msg=""
				 var url =inspectionUrl+"/getAllInspectionStage";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allnspectionStages= response.data;
				console.log("allnspectionStages: "+JSON.stringify(vm.allnspectionStages))
								
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
			 var url =inspectionUrl+"/changeStatusInspecationStage";
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
		
		
		
		function loadInspectionStages(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =inspectionUrl+"/getInspectionStageByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=inspectionUrl+"/getInspectionStageByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.inspeactionStages = response.data;
				console.log("inspeactionStages: "+JSON.stringify(vm.inspeactionStages))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =inspectionUrl+"/getInspectionStageCount"
				}
			else{
				url=inspectionUrl+"/getInspectionStageCountBySearch?search="+$scope.search;
			}
				 //var url =customerUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
		
		
		
		
		
		/*********************date of birth********************/
		
		
		/*****************************save employee**************************/
		
		function save(inspectionStage){
			console.log("inspectionStage "+JSON.stringify(inspectionStage))
			if(inspectionStage==undefined||inspectionStage.spindleModel==undefined){
				$scope.modelErr=true;
				return;
			}else{
				$scope.modelErr=false;
				
			}
			

			
			/*****************************/
			
			if(inspectionStage.stageName==undefined){
				$scope.stageNameErr=true;
				return;
			}else{
				$scope.stageNameErr=false;
			}
			
			if(vm.selCheckPoints.length==0){
				$scope.checkListERR=true;
				return;
			}else{
				$scope.checkListERR=false;
			}
			
			
			/*******************************/
			var inspeacctionStageCheckPoint={}
			inspeacctionStageCheckPoint.inspectionStage=inspectionStage
			inspeacctionStageCheckPoint.checkpoints=vm.selCheckPoints
		
			$rootScope.loader=true;
			inspeacctionStageCheckPoint.active=1;
			inspeacctionStageCheckPoint.addedDate=new Date();
			inspeacctionStageCheckPoint.addedBy=vm.user.firstName+" "+vm.user.lastName;
			 var url ="";
			 console.log("editView  :"+$scope.editView);
			if($scope.editView){
				inspeacctionStageCheckPoint.updDatetime=new Date();
				var msg="Selected Employee has been updated"
					
					url =inspectionUrl+"/updatenspectionStageCheckPoint"
			}else{
				inspeacctionStageCheckPoint.updDatetime=null;
				url =inspectionUrl+"/addNewInspectionStageCheckPoint"
			}
			console.log("url:"+url);
			console.log("inspeacctionStageCheckPoint :"+JSON.stringify(inspeacctionStageCheckPoint))
			// var url =customerUrl+"/addNewEmployee";
				genericFactory.add(msg,url,inspeacctionStageCheckPoint).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					loadInspectionStages();
					$scope.addNew=false;
					$scope.checkPoint={}
					vm.selCheckPoints=[]
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
