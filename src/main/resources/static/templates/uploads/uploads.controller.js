(function() {
	'use strict';

	angular.module('myApp.uploads').controller('UploadsController', UploadsController);

	UploadsController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','fileUpload','$http'];
	
	/* @ngInject */
	function UploadsController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,fileUpload,$http) {
		var commonUrl = ApiEndpoint.url+"common";
		var supplierUrl = ApiEndpoint.url+"supplier";
		var materialUrl = ApiEndpoint.url+"material";
		var employeeUrl = ApiEndpoint.url+"employee";
		var uploadsUrl = ApiEndpoint.url+"upload";
		var vm = angular.extend(this, {
			customer:customer,
			cancel:cancel,
						
			
			
			
		});

		(function activate() {
			
			$scope.listView=false;
			$scope.showList=true;
			
		})();
		function customer(){
			$scope.deskTab=true
			$scope.projectTab=false
			$scope.roomTab=false
			$scope.departmentTab=false
			$scope.brandTab=false
			$scope.branchTab=false
			$scope.supplierTab=false
			$scope.materialTab=false
			$scope.employeeTab=false
			$scope.designationTab=false
			$scope.workLocationTab=false
			$scope.costCenterTab=false
			$scope.subsidiaryTab=false
			
			
		}
		function cancel(){}
		
		/**************************list view ******************************/
		$scope.showlist=function(){
			$scope.listView=true;
			$scope.showList=false;
			$scope.viewMenu=true;
			$scope.listviewcardStyle={
			"border": "3px solid #64c5b1",
			"height":"795px"
			}
		}
		
		$scope.listview=function(){
			$scope.listView=false;
			$scope.showList=true;
			$scope.viewMenu=false;
			$scope.listviewcardStyle={
			"border": "3px solid #64c5b1",
			"height":"100px"
			}
		}
		
		
		
		//--------DESK--------//
		
		
		
		function uploadDesk(){
			var file = document.getElementById('uploadDesk').files[0];
		
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
		var url = uploadsUrl + "/uploadDesk";
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
			loadDesks();
		}, function errorCallback(response) {
	    	$('.loading').hide();
			//window.alert("File upload - unsuccessfull!");
			//init();
			toastr.error('Upload....', 'UnSuccesful !!');
			loadDesks();
				    });

		angular.element("input[type='file']").val(null);
	}
		
		
		
	}

	
})();
