(function() {
	'use strict';

	angular.module('myApp.spindleServiceRequest')
	.controller('SpindleServiceRequestController', SpindleServiceRequestController);
	SpindleServiceRequestController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http'];

	
	/* @ngInject */
	function SpindleServiceRequestController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http) {

		
		var serviceUrl = ApiEndpoint.url+"service";
		var customerUrl = ApiEndpoint.url+"customer";
		var spindleUrl = ApiEndpoint.url+"spindle";
		var employeeUrl = ApiEndpoint.url+"employee";
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
			addfrontBearing:addfrontBearing,
			addRearBearing:addRearBearing,
			deletfrontRearBearing:deletfrontRearBearing,
			deletRearBearing:deletRearBearing,
			addEmail:addEmail,
			deletemail:deletemail,
			assingEng:assingEng,
			saveAssign:saveAssign,
			upload:upload,
			uploadService:uploadService,
			qrcode:qrcode,
			print:print
			
		});

		(function activate() {
			$scope.spindle={};
			$scope.qrcodeTab=false
			$scope.alertType=false;
			loadSpindleRequest();
			$scope.editView=false;
			$rootScope.loader=false;
			$scope.qrcodeDate=""
		
		})();
		function print(){
			
    		var dataUrl = document.getElementById('anycanvas').innerHTML

			var windowContent = '<div style="page-break-after: always ;important;"><div style="width:188px;height:68px; margin-top:70px"><span style=" "><span style="padding:5px;margin-left:40px" src="'  + dataUrl + '</span><span style=" font-size: 30px;"></span></div>';

			var popupWinindow = window.open('','_blank','width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
			popupWinindow.document.write('<html><body onload="window.print()">' + windowContent + '</html>');
			popupWinindow.document.write('<style> @page {  margin: 15;} </style>');
			popupWinindow.document.close();
		}
		function qrcode(spindleServiceReuest){
			console.log("spindleServiceReuest  "+JSON.stringify(spindleServiceReuest))
			$scope.qrcodeDate=spindleServiceReuest.sscNo
			$scope.qrcodeTab=true
			$scope.editView=false;
			$scope.assingeEng=false;
			$scope.addNew=false;
			$scope.uploadTab=false;
		}
		function upload(){
			$scope.uploadTab=true;
			$scope.qrcodeTab=false
			$scope.addNew=false;
			$scope.editView=false;
			$scope.assingeEng=false;
		}
		function uploadService(){
			var file = document.getElementById('uploadService').files[0];
			
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
			var url = serviceUrl + "/uploadServiceRequest";
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
				loadSpindleRequest();
				$scope.uploadTab=false;
			}, function errorCallback(response) {
		    	$('.loading').hide();
		    	
				//window.alert("File upload - unsuccessfull!");
				//init();
				toastr.error('Upload....', 'UnSuccesful !!');
				loadSpindleRequest();
				$scope.uploadTab=false;
					    });

			angular.element("input[type='file']").val(null);
		}
		$scope.checkReplacementYes=function(replacement){
			if(replacement){
				$scope.resplacement.no=false
			}
		}
		$scope.checkReplacementNo=function(replacement){
			if(replacement){
				$scope.resplacement.yes=false
			}
		}
		
		$scope.checkReplacementEmergency=function(replacement){
			if(replacement){
				$scope.serRequested.standard=false
			}
		}
		$scope.checkReplacementStandard=function(replacement){
			if(replacement){
				$scope.serRequested.emergency=false
			}
		}
		/*************************future date disabled**********************/
		function assingEng(spindleServiceRequest){
			$scope.spindleServiceRequest=spindleServiceRequest
			$scope.assingeEng=true;
			$scope.addNew=false;
			$scope.editView=false;
			$scope.qrcodeTab=false
			
			loadEngineer();
		}
		function addEmail(){
			var email={}
			email.name="";
			email.emailId=""
				$scope.emails.push(email);
						
		}
		function deletemail(index){
			$scope.emails.splice(index,1);
			
		}
		function addRearBearing(){
			var brearing={}
			brearing.detials="";
			brearing.qty=""
				$scope.rearBearings.push(brearing);
			
			
		}
		function addfrontBearing(){
			var brearing={}
			brearing.detials="";
			brearing.qty=""
				$scope.frontBearings.push(brearing);
			
			
		}
		
		function deletfrontRearBearing(index){
			$scope.frontBearings.splice(index,1);
			
		}
		function deletRearBearing(index){
			$scope.rearBearings.splice(index,1);
			
		}
		$scope.searchByPagination=function (search){
			loadSpindleRequest();
			
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
		function loadEngineer(){
			
			var msg=""
				 var url =employeeUrl+"/getAllEngineer";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.engineers= response.data;
				console.log("engineers: "+JSON.stringify(vm.engineers))
								
			});
			
			
		}
	$scope.checkSerailNo= function (serialNo){
		var msg=""
			 var url =serviceUrl+"/checkSerialNo?serialNo="+serialNo;
			genericFactory.getAll(msg,url).then(function(response) {
			vm.spindleExits= response.data;
			if(vm.spindleExits){
				$scope.duplicateSpindleErr=true
			}else{
				$scope.duplicateSpindleErr=false
			}
							
		});
	}
		
		function add(){
			
			window.scrollTo(0, 0)
			$scope.addNew=true;
			$scope.editView=false;
			$scope.assingeEng=false;
			$scope.uploadTab=false;
			$scope.qrcodeTab=false
			loadBranch();
			loadCustomers()
			loadSpindles()
			loadServiceReasons()
			$scope.frontBearings=[]
			$scope.rearBearings=[]
			$scope.emails=[]
			$scope.resplacemen={}
			
			$scope.serRequested.standard=false
			$scope.serRequested.emergency=false
			$scope.resplacement.yes=false
			$scope.resplacement.no=false
			
		}
		function edit(spindleServiceReuest){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.assingeEng=false;
			$scope.addNew=true;
			
			$scope.uploadTab=false;
			$scope.qrcodeTab=false
			loadBranch();
			loadCustomers()
			loadSpindles()
			loadServiceReasons()
			$scope.resplacement={}
			$scope.serRequested={}
			$scope.spindleServiceRequest=spindleServiceReuest
			
			if(spindleServiceReuest.replacementSpindle=="Yes"){
				$scope.resplacement.yes=true
				
			}
			if(spindleServiceReuest.replacementSpindle=="No"){
				$scope.resplacement.no=true
			}
			if(spindleServiceReuest.serviceRequested=="Standard"){
				$scope.serRequested.standard=true
			}
			if(spindleServiceReuest.replacementSpindle=="Emergency"){
				$scope.serRequested.emergency=true
			}
			//console.log("spindleServiceReuest : "+JSON.stringify(spindleServiceReuest))
			loadBearingAccessoryByServiceRequest(spindleServiceReuest.sscNo);
			
		}
		function cancle(){
			$scope.addNew=false;
			$scope.assingeEng=false;
			$scope.qrcodeTab=false
			scope.uploadTab=false;
		}
		function loadBearingAccessoryByServiceRequest(sscNo){
			console.log("SSC NO :: "+sscNo)
			
			var msg=""
				 var url =serviceUrl+"/bearingListBySSCNo?sscNo="+sscNo;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.bearings= response.data;
				$scope.rearBearings=vm.bearings.rearBearing
				$scope.frontBearings=vm.bearings.frontBearing
				console.log("bearings: "+JSON.stringify(vm.bearings))
								
			});
		}
		
		function loadBranch(){
			var msg=""
				 var url =employeeUrl+"/getBranchList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.branches= response.data;
				//console.log("branches: "+JSON.stringify(vm.branches))
								
			});
		}
		function loadCustomers(){
			var msg=""
				 var url =customerUrl+"/getActiveCustomerList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.customers= response.data;
				//console.log("customers: "+JSON.stringify(vm.customers))
								
			});
		}
		function loadSpindles(){
			var msg=""
				 var url =spindleUrl+"/getActiceSpindleList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.spindles= response.data;
			//	console.log("spindles: "+JSON.stringify(vm.spindles))
								
			});
		}
		
		function loadServiceReasons(){
			var msg=""
				 var url =serviceUrl+"/getActiveServiceReasonList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.serviceResons= response.data;
				//console.log("serviceResons: "+JSON.stringify(vm.serviceResons))
								
			});
		}

		
		/**************************export excel*********************/
		function delet(spindleServiceReuest){
			var msg=""
				 var url =serviceUrl+"/deletSpindleServiceRequest";
				genericFactory.add(msg,url,spindleServiceReuest).then(function(response) {
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						loadSpindleRequest();
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
						
			});
		}
		$scope.file="Customer"
			vm.labels={'sscNo':'SSC No','spindle.spindleBrand': 'Spindle Brand', 'spindle.spindleModel': 'Spindle Model','branch.branchName':'Bramch Name','customer.customerCode': 'Customer Code','customer.companyName': 'Company Name ','reason.reasonName':'Reason','spindleDesign':'Spindle Design','application':'Application','drive':'drive','moutingType':'moutingType','orientation':'orientation','replacementSpindle':'Replacement Spindle','serviceRequested':'Service Requested','additionDetials':'additionDetials','engineer.emoloyeeCode':'Engineer','addedBy':'AddedBy','addedDate':'AddedDate'}
			
		
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
				 var url =serviceUrl+"/getAllSpindleServiceRequestList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allSpindleServiceRequests= response.data;
				console.log("allSpindleServiceRequests: "+JSON.stringify(vm.allSpindleServiceRequests))
								
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
			 var url =serviceUrl+"/changeStatusSpindleServiceRequest";
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
		
		
		
		function loadSpindleRequest(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =serviceUrl+"/getSpindleServiceRequestByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=serviceUrl+"/getSpindleServiceRequestByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.spindleServiceReuests = response.data;
				console.log("spindleServiceReuests: "+JSON.stringify(vm.spindleServiceReuests))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =serviceUrl+"/getSpindleServiceRequestCount"
				}
			else{
				url=serviceUrl+"/getSpindleServiceRequestCountBySearch?search="+$scope.search;
			}
				 //var url =customerUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
		
		
		$scope.checkemployeeCode=function (employeeCode){
			var msg=""

				 var url =serviceUrl+"/checkEmployeeCode?employeeCode="+employeeCode;
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
				
		
		
		
		function saveAssign(spindleServiceRequest){
			
			if(spindleServiceRequest.engineer==undefined){
				$scope.engineerErr=true;
				return;
			}else{
				$scope.engineerErr=false;
			}
			var url=serviceUrl+"/assignEngineer";
			var msg=""
			
			genericFactory.add(msg,url,spindleServiceRequest).then(function(response) {
				console.log("resp:"+JSON.stringify(response))
				loadSpindleRequest();
				$scope.assingeEng=false;
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
				
			})
		}
		
		
		/*****************************save employee**************************/
		
		function save(spindleServiceRequest){
			console.log("spindleServiceRequest "+JSON.stringify(spindleServiceRequest))
			if(spindleServiceRequest==undefined||spindleServiceRequest.branch==undefined){
				$scope.branchErr=true;
				return;
			}else{
				$scope.branchErr=false;
				
			}
			

			if(spindleServiceRequest.customer==undefined){
				$scope.customerErr=true;
				return;
			}else{
				$scope.customerErr=false;
			}
			
			if(spindleServiceRequest.spindle==undefined){
				$scope.spindleErr=true;
				return;
			}else{
				$scope.spindleErr=false;
			}
			
			if(spindleServiceRequest.reason==undefined){
				$scope.reasonErr=true;
				return;
			}else{
				$scope.reasonErr=false;
			}
			/*******************************/
			
			/*****************************/
			
			if(spindleServiceRequest.spindleDesign==undefined){
				$scope.designErr=true;
				return;
			}else{
				$scope.designErr=false;
			}
			
			if(spindleServiceRequest.application==undefined){
				$scope.appilcationErr=true;
				return;
			}else{
				$scope.appilcationErr=false;
			}
			
			if(spindleServiceRequest.drive==undefined){
				$scope.driveErr=true;
				return;
			}else{
				$scope.driveErr=false;
			}
			
			if(spindleServiceRequest.moutingType==undefined){
				$scope.mountingErr=true;
				return;
			}else{
				$scope.mountingErr=false;
			}
			
			

			if(spindleServiceRequest.orientation==undefined){
				$scope.orientationErr=true;
				return;
			}else{
				$scope.orientationErr=false;
			}
			
			
				spindleServiceRequest.emails=$scope.emails
				spindleServiceRequest.rearBearings=$scope.rearBearings
				spindleServiceRequest.frontBearings=$scope.frontBearings
			
			$rootScope.loader=true;
			spindleServiceRequest.active=1;
			spindleServiceRequest.addedDate=new Date();
			spindleServiceRequest.addedBy=vm.user.firstName+" "+vm.user.lastName;
			
			console.log("$scope.resplacement :"+JSON.stringify($scope.resplacement));
			if($scope.resplacement==undefined||$scope.resplacement.yes==false && $scope.resplacement.no==false){
				$scope.replacementErr=true
				return ;
			}else{
				$scope.replacementErr=false
				if($scope.resplacement.yes==true){
					spindleServiceRequest.replacementSpindle="Yes"
				}
				if($scope.resplacement.no==true){
					spindleServiceRequest.replacementSpindle="No"
				}
			}
			if($scope.serRequested==undefined||$scope.serRequested.standard==false && $scope.serRequested.emergency==false){
				$scope.serviceReErr=true
				return ;
			}else{
				$scope.serviceReErr=false
				if($scope.serRequested.standard==true){
					spindleServiceRequest.serviceRequested="Standard"
				}
				if($scope.serRequested.emergency==true){
					spindleServiceRequest.serviceRequested="Emergency"
				}
			}
		
			console.log("spindleServiceRequest  :"+JSON.stringify(spindleServiceRequest));
			
			
			
			 var url ="";
			 console.log("editView  :"+$scope.editView);
			if($scope.editView){
				spindleServiceRequest.updDatetime=new Date();
				var msg=""
					
					url =serviceUrl+"/updateSpindleServiceRequest"
			}else{
				spindleServiceRequest.updDatetime=null;
				url =serviceUrl+"/addNewSpindleServiceRequest"
			}
			console.log("url:"+url);
			
			// var url =customerUrl+"/addNewEmployee";
				genericFactory.add(msg,url,spindleServiceRequest).then(function(response) {
					console.log("resp:"+JSON.stringify(response))
					loadSpindleRequest();
					$scope.addNew=false;
					$scope.spindleServiceRequest={}
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
