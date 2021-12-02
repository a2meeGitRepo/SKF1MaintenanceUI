(function() {
	'use strict';

	angular.module('myApp.spare')
	.controller('SpareController', SpareController);
	SpareController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http'];

	
	/* @ngInject */
	function SpareController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http) {

		
		var spindleUrl = ApiEndpoint.url+"spindle";
		var spareUrl = ApiEndpoint.url+"spare";

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
			uploadSpare:uploadSpare
		});

		(function activate() {
			$scope.spindle={};
			$scope.alertType=false;
			loadSpare();
			$scope.editView=false;
			$rootScope.loader=false;
			
		
		})();
		
		
		/*************************future date disabled**********************/
		function upload(){
			$scope.uploadtab=true;
			$scope.addNew=false;
			$scope.editView=false;
		}
		$scope.searchByPagination=function (search){
			loadSpare();
			
		}
	
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadSpare();
			
		}
		

		function add(){
			
			window.scrollTo(0, 0)
			$scope.addNew=true;
			$scope.editView=false;
			$scope.uploadtab=false;
			$scope.loadSpare={}
			loadSpindleModel();
		
		}
		function edit(spare){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.addNew=true;
			$scope.uploadtab=false;
			$scope.spare=spare
			 loadSpindleModel()
			
		}
		function cancle(){
			$scope.addNew=false;
			$scope.editView=false;
			$scope.uploadtab=false;
			
		}
		
		
		
		
		
		function loadSpindleModel(){
			var msg=""
				 var url =spindleUrl+"/getSpindleModels";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.models= response.data;
				console.log("models: "+JSON.stringify(vm.models))
								
			});
		}
		
		/**************************export excel*********************/
		function delet(spare){
			var msg=""
				 var url =spareUrl+"/deletSpare";
				genericFactory.add(msg,url,spare).then(function(response) {
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						loadSpare();
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
						
			});
		}
		$scope.file="Customer"
			vm.labels={'spareName':'Spare Name','description': 'Description', 'spindleModel': 'Spindle Model','uom': 'UOM','price': 'Price','addedBy':'AddedBy','addedDate':'AddedDate'}
			
		
		$scope.newExcel= function(){
			getAllSpare()
			 $rootScope.loader=true;
			 setTimeout(function(){
				 
				 document.getElementById('btnExport').click();
				 $rootScope.loader=false;
				  $rootScope.$digest();
				},1000);		
			
		}
		function getAllSpare(){
			var msg=""
				 var url =spareUrl+"/getAllSpareList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allSpares= response.data;
				console.log("allSpares: "+JSON.stringify(vm.allSpares))
								
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
			 var url =spareUrl+"/changeStatus";
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
		
		
		
		function loadSpare(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =spareUrl+"/getSpareByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=spareUrl+"/getSpareByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.spares = response.data;
				console.log("spare: "+JSON.stringify(vm.spares))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =spareUrl+"/getSpareCount"
				}
			else{
				url=spareUrl+"/getSpareCountBySearch?search="+$scope.search;
			}
				 //var url =customerUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
		
		
		
		
		
		/*********************date of birth********************/
		
		
		/*****************************save employee**************************/
		
		function save(spare){
			console.log("spare "+JSON.stringify(spare))
			if(spare==undefined||spare.spindleModel==undefined){
				$scope.modelErr=true;
				return;
			}else{
				$scope.modelErr=false;
				
			}
			

			if(spare.spareName==undefined){
				$scope.spareNameErr=true;
				return;
			}else{
				$scope.spareNameErr=false;
			}
			
			if(spare.spindleModel==undefined){
				$scope.spindleModelErr=true;
				return;
			}else{
				$scope.spindleModelErr=false;
			}
			
			if(spare.description==undefined){
				$scope.descriptionErr=true;
				return;
			}else{
				$scope.descriptionErr=false;
			}
			/*******************************/
			
			/*****************************/
			
			if(spare.uom==undefined){
				$scope.uomErr=true;
				return;
			}else{
				$scope.uomErr=false;
			}
			
			if(spare.price==undefined){
				$scope.priceErr=true;
				return;
			}else{
				$scope.priceErr=false;
			}
			
			
			
			
			

			
			
			/*******************************/
			console.log("spare "+JSON.stringify(spare))
			
			
		
			$rootScope.loader=true;
			spare.active=1;
			spare.addedDate=new Date();
			spare.addedBy=vm.user.firstName+" "+vm.user.lastName;
			 var url ="";
			 console.log("editView  :"+$scope.editView);
			if($scope.editView){
				spare.updDatetime=new Date();
				var msg="Selected Employee has been updated"
					
					url =spareUrl+"/updateSpare"
			}else{
				spare.updDatetime=null;
				url =spareUrl+"/addNewSpare"
			}
			console.log("url:"+url);
			
			// var url =customerUrl+"/addNewEmployee";
				genericFactory.add(msg,url,spare).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					loadSpare();
					$scope.addNew=false;
					$scope.spare={}
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
			
	
	function uploadSpare(){
			
			
			//	return
				var file = document.getElementById('uploadSpare').files[0];
			
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
			var url = spareUrl + "/upload";
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
				loadSpare();
				$scope.uploadtab=false;
			}, function errorCallback(response) {
		    	$('.loading').hide();
		    	
				//window.alert("File upload - unsuccessfull!");
				//init();
				toastr.error('Upload....', 'UnSuccesful !!');
				loadSpare();
				$scope.uploadtab=false;
					    });

			angular.element("input[type='file']").val(null);
		}
		

	}
})();
