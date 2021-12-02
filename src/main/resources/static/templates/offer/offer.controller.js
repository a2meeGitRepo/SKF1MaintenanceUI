(function() {
	'use strict';

	angular.module('myApp.offer')
	.controller('OfferController', OfferController);
	OfferController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http','$stateParams'];

	
	/* @ngInject */
	function OfferController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http,$stateParams) {

		
		var emailUrl = ApiEndpoint.url+"email";
		var sopUrl = ApiEndpoint.url+"sop";
		var offerUrl = ApiEndpoint.url+"offer";
		var sId=$stateParams.sopId;
		console.log("State Param sId:"+JSON.stringify($stateParams.sopId))
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			generatePDF:generatePDF,
			points:[],
			addPoint:addPoint,
		
		});

		(function activate() {
			$scope.total=0;
			$scope.offerPoint={}
			$scope.offer={}
			getOfferById(sId)
			calculateTotalAmount();
			$scope.showtab=true
			
		})();
	
		
		function calculateTotalAmount(){
				var msg=""
					 var url =sopUrl+"/getRequiredSpareBySOPId?sopId="+$stateParams.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.sparesRequired = response.data;
				    angular.forEach($scope.sparesRequired, function(spare) {
						console.log("Price: "+JSON.stringify( spare.price))	
						$scope.total+=spare.price
				    	});
				});
		}
		function addPoint(scopeOfWork){
			var point={}
			point.pointNo=vm.points.length+1  
			point.scopeOfWork=scopeOfWork
				vm.points.push(point);
			$scope.offerPoint.scopeOfWork=""
		}
		function generatePDF(){
			$scope.showtab=false
			$scope.offer.sop=vm.sop
			$scope.offer.createdBy=userDetail.id
			var quatation={}
			quatation.quotation=$scope.offer;
			quatation.points=vm.points
			quatation.totalAmount=$scope.total
			//return ;
			var msg=""
				/* var url =offerUrl+"/addOffer";
				genericFactory.add(msg,url,quatation).then(function(response) {
					console.log("response: "+JSON.stringify(response))
					if(response.data.code==200){
						
						toastr.success(response.data.message);
						$rootScope.loader=false;
						
					}else{
						toastr.error(response.data.message);
						$rootScope.loader=false;
					}
						
			});*/
				var filename="Offer_"+sId
				
			    html2canvas(document.getElementById('test1'), {
		            onrendered: function (canvas) {
		                var data = canvas.toDataURL();
		                var docDefinition = {
		                    content: [{
		                        image: data,
		                        width: 500,
		                    }]
		                };
		                pdfMake.createPdf(docDefinition).download(filename+".pdf");
		            }
		        });
			
			
			/*
			console.log("NAME : "+filename)
			var doc = new jsPDF();  //create jsPDF object
			  doc.fromHTML(document.getElementById("test"), // page element which you want to print as PDF
			  15,
			  15, 
			  {
			    'width': 250  //set width
			  },
			  function(a) 
			   {
			    doc.save(filename+".pdf"); // save file name as HTML2PDF.pdf
			  });*/
			  $timeout(sendMail(), 3000);
			 
		}
		function sendMail(){
			 var msg=""
				 console.log("sop: "+JSON.stringify(vm.sop))
					var filename="SOP_"+sId+".pdf"
					var url =emailUrl+"/sendOffermail?fileName="+filename
					console.log("url: "+url)
				genericFactory.add(msg,url,vm.sop).then(function(response) {
					vm.sop = response.data;
					
									
				});
		}
		function 	getOfferById(sId){
			var msg=""
				var url =sopUrl+"/getSOPById?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.sop = response.data;
				console.log("sop: "+JSON.stringify(vm.sop.spindleServiceRequest.sscNo))
								
			});
			
		}
	

	}
})();
