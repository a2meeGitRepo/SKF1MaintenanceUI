(function() {
	'use strict';

	angular.module('myApp.mailManager')
	.controller('MailManagerController', MailManagerController);
	MailManagerController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http'];

	
	/* @ngInject */
	function MailManagerController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http) {

		
		var spindleUrl = ApiEndpoint.url+"spindle";
		var commonUrl = ApiEndpoint.url+"common";
		var spareUrl = ApiEndpoint.url+"spare";

		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user:userDetail,
			add:add,
			save:save,
			edit:edit,
			cancle:cancle,
			changeStatus:changeStatus,
			
		});

		(function activate() {
			
			loadMailManger();
			$scope.editView=false;
			$rootScope.loader=false;
			
		
		})();
		
		
		/*************************future date disabled**********************/
		

		function add(){
			
			window.scrollTo(0, 0)
			$scope.addNew=true;
			$scope.editView=false;
			
		
		}
		function edit(mailManager){
			window.scrollTo(0,0);
			$scope.editView=true;
			$scope.addNew=true;
		
			$scope.mailManager=mailManager
			console.log("mailManager: "+JSON.stringify(mailManager))
			
		}
		function cancle(){
			$scope.addNew=false;
			$scope.editView=false;
			$scope.uploadtab=false;
			
		}
		
		
		
		
		
		function loadMailManger(){
			var msg=""
				 var url =commonUrl+"/getAllMailManager";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.mailMangers= response.data;
				
								
			});
		}
		
		
		/***********************************************************/
		function changeStatus(mailManager){
			
			
			$rootScope.loader=true;
			var msg=""
			 var url =commonUrl+"/changeStatusMailManager";
			genericFactory.add(msg,url,mailManager).then(function(response) {
				loadMailManger();
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
		
		
		
		/*****************************save employee**************************/
		
		function save(mailManager){
			console.log("mailManager "+JSON.stringify(mailManager))
			if(mailManager==undefined||mailManager.mailFor==undefined){
				$scope.mailReson=true;
				return;
			}else{
				$scope.mailReson=false;
				
			}
			

			if(mailManager.name==undefined){
				$scope.nameErr=true;
				return;
			}else{
				$scope.nameErr=false;
			}
			
			if(mailManager.mailTo==undefined){
				$scope.mailToErr=true;
				return;
			}else{
				$scope.mailToErr=false;
			}
			
			
			
			
			

			
			
			/*******************************/
			console.log("mailManager "+JSON.stringify(mailManager))
			
			var msg=""
		
			$rootScope.loader=true;
			mailManager.active=1;
			mailManager.addedDate=new Date();
			mailManager.addedBy=vm.user.firstName+" "+vm.user.lastName;
			 var url =commonUrl+"/addNewMailManager"

			// var url =customerUrl+"/addNewEmployee";
				genericFactory.add(msg,url,mailManager).then(function(response) {
					
					loadMailManger();
					$scope.addNew=false;
					$scope.mailManager={}
					if(response.data.code==200){
						
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
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
