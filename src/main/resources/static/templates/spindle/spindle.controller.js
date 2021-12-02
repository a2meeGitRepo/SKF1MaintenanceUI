(function() {
	'use strict';

	angular.module('myApp.spindle')
	.controller('SpindleController', SpindleController);
	SpindleController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http'];

	
	/* @ngInject */
	function SpindleController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http) {

		;
		var spindleUrl = ApiEndpoint.url+"spindle";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user:userDetail,
			add:add,
			save:save,
			edit:edit,
			cancle:cancle,
			upload:upload,
			changeStatus:changeStatus,
			delet:delet,
			perPage : 10,
			total_count:0,
			pageno:1,
			uploadSpindle:uploadSpindle
		});

		(function activate() {
			$scope.spindle={};
			$scope.alertType=false;
			loadSpindles();
			$scope.editView=false;
			$rootScope.loader=false;
			
		
		})();
		
		
		/*************************future date disabled**********************/
		
		$scope.searchByPagination=function (search){
			loadSpindles();
			
		}
	
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadSpindles();
			
		}
		
	$scope.checkSerailNo= function (serialNo){
		var msg=""
			 var url =spindleUrl+"/checkSerialNo?serialNo="+serialNo;
			genericFactory.getAll(msg,url).then(function(response) {
			vm.spindleExits= response.data;
			if(vm.spindleExits){
				$scope.duplicateSpindleErr=true
			}else{
				$scope.duplicateSpindleErr=false
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
		$scope.editView=false;
		$scope.uploadtab=false;
			$scope.loadSpindles={}
		
		}
		function edit(spindle){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.uploadtab=false;
			$scope.addNew=true;
			$scope.spindle=spindle
			
		}
		function cancle(){
			$scope.addNew=false;
			$scope.uploadtab=false;
		}
		
		
		
		$scope.capitalName=function(name){
			$scope.customer.companyName= name.charAt(0).toUpperCase() + name.slice(1);
		}
		
	
		
		/**************************export excel*********************/
		function delet(spindle){
			var msg=""
				 var url =spindleUrl+"/deletSpindle";
				genericFactory.add(msg,url,spindle).then(function(response) {
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						loadSpindles();
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
						
			});
		}
		$scope.file="Customer"
			vm.labels={'serialNo':'Serial No','spindleBrand': 'Spindle Brand', 'machineBrand': 'Machine Brand','spindleModel': 'Spindle Model','machineModel': 'Machine Model','power':'Power','maxSpeed':'Max Speed','operatingSpeed':'Operating Speed','poles':'Poles','toolTaper':'Tool Taper','current':'Current','voltage':'Voltage','lubrication':'Lubrication','assemblyDrawing':'Assembly Drawing','addedBy':'AddedBy','addedDate':'AddedDate'}
			
		
		$scope.newExcel= function(){
			getAllSpindle()
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},1000);		
			
		}
		function getAllSpindle(){
			var msg=""
				 var url =spindleUrl+"/getAllSpindleList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allSpindles= response.data;
				console.log("allSpindles: "+JSON.stringify(vm.allSpindles))
								
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
			 var url =spindleUrl+"/changeStatus";
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
		
		
		
		function loadSpindles(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =spindleUrl+"/getSpindleByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=spindleUrl+"/getSpindleByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.spindles = response.data;
				console.log("spindles: "+JSON.stringify(vm.spindles))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =spindleUrl+"/getSpindleCount"
				}
			else{
				url=spindleUrl+"/getSpindleCountBySearch?search="+$scope.search;
			}
				 //var url =customerUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
		
		
		$scope.checkemployeeCode=function (employeeCode){
			var msg=""

				 var url =spindleUrl+"/checkEmployeeCode?employeeCode="+employeeCode;
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
				
		
		
		
		/*********************date of birth********************/
		
		
		/*****************************save employee**************************/
		
		function save(spindles){
			console.log("spindles "+JSON.stringify(spindles))
			if(spindles==undefined||spindles.serialNo==undefined){
				$scope.serialNoErr=true;
				return;
			}else{
				$scope.serialNoErr=false;
				if($scope.duplicateSpindleErr){
					return;
				}
			}
			

			if(spindles.spindleBrand==undefined){
				$scope.spindleBrandErr=true;
				return;
			}else{
				$scope.spindleBrandErr=false;
			}
			
			if(spindles.spindleModel==undefined){
				$scope.spindleModelErr=true;
				return;
			}else{
				$scope.spindleModelErr=false;
			}
			
			if(spindles.machineBrand==undefined){
				$scope.machineBrandErr=true;
				return;
			}else{
				$scope.machineBrandErr=false;
			}
			/*******************************/
			
			/*****************************/
			
			if(spindles.machineModel==undefined){
				$scope.machineModelErr=true;
				return;
			}else{
				$scope.machineModelErr=false;
			}
			
			if(spindles.power==undefined){
				$scope.powerErr=true;
				return;
			}else{
				$scope.powerErr=false;
			}
			
			if(spindles.maxSpeed==undefined){
				$scope.maxSpeedErr=true;
				return;
			}else{
				$scope.maxSpeedErr=false;
			}
			
			if(spindles.operatingSpeed==undefined){
				$scope.operatingSpeedErr=true;
				return;
			}else{
				$scope.operatingSpeedErr=false;
			}
			
			

			if(spindles.poles==undefined){
				$scope.polesErr=true;
				return;
			}else{
				$scope.polesErr=false;
			}
			
			
			
			

			if(spindles.toolTaper==undefined){
				$scope.toolTaperErr=true;
				return;
			}else{
				$scope.toolTaperErr=false;
			}
			
			
			

			if(spindles.current==undefined){
				$scope.currentErr=true;
				return;
			}else{
				$scope.currentErr=false;
			}
			
			

			if(spindles.voltage==undefined){
				$scope.voltageErr=true;
				return;
			}else{
				$scope.voltageErr=false;
			}
			
			
			
			

			if(spindles.lubrication==undefined){
				$scope.lubricationErr=true;
				return;
			}else{
				$scope.lubricationErr=false;
			}
			

			if(spindles.assemblyDrawing==undefined){
				$scope.assemblyDrawingErr=true;
				return;
			}else{
				$scope.assemblyDrawingErr=false;
			}
			
			
			
			/*******************************/
			console.log("spindles "+JSON.stringify(spindles))
			if($scope.invalidMoNo){
				
				return;
			}
			
		
			$rootScope.loader=true;
			spindles.active=1;
			spindles.addedDate=new Date();
			spindles.addedBy=vm.user.firstName+" "+vm.user.lastName;
			 var url ="";
			 console.log("editView  :"+$scope.editView);
			if($scope.editView){
				spindles.updDatetime=new Date();
				var msg="Selected Employee has been updated"
					
					url =spindleUrl+"/updateSpindle"
			}else{
				spindles.updDatetime=null;
				url =spindleUrl+"/addNewSpindle"
			}
			console.log("url:"+url);
			
			// var url =customerUrl+"/addNewEmployee";
				genericFactory.add(msg,url,spindles).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					loadSpindles();
					$scope.addNew=false;
					$scope.spindles={}
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
			
		
		function uploadSpindle(){
			
			
			//	return
				var file = document.getElementById('uploadSpindle').files[0];
			
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
			var url = spindleUrl + "/upload";
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
				loadSpindles();
				$scope.uploadtab=false;
			}, function errorCallback(response) {
		    	$('.loading').hide();
		    	
				//window.alert("File upload - unsuccessfull!");
				//init();
				toastr.error('Upload....', 'UnSuccesful !!');
				loadSpindles();
				$scope.uploadtab=false;
					    });

			angular.element("input[type='file']").val(null);
		}
		

	}
})();
