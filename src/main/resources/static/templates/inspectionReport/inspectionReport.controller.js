(function() {
	'use strict';

	angular.module('myApp.inspectionReport')
	.controller('InspectionReportController', InspectionReportController);
	InspectionReportController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http','$stateParams'];

	
	/* @ngInject */
	function InspectionReportController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http,$stateParams) {

		
		var emailUrl = ApiEndpoint.url+"email";
		var sopUrl = ApiEndpoint.url+"sop";
		var imageUrl = ApiEndpoint.url+"image";
		var sId=$stateParams.sopId;
		console.log("State Param sId:"+JSON.stringify($stateParams.sopId))
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			generatePDF:generatePDF,
		});

		(function activate() {
			getBearingInspectionFront(sId)
			getBearingInspectionRear(sId)
			getBearingCondition(sId)
			getOfferById(sId)
			getVisiualInspection(sId)
			getIncommingInspection(sId)
			getSpindleDisassembling(sId)
			getPowerCables(sId)
			getRCFA(sId)
			getMotorCheckDisassembly(sId)
			getwashingCleaning(sId)
			getInOutCoolentBySOPId(sId)
			getColloingSystemInspectionBySOPId(sId)
			getRotaryUnitBySOPId(sId)
			getRequiredSpareBySOPId(sId)
			getNewBearing(sId)
			
		})();
		
		function generatePDF(){
			
			var filename="Inspection Report_"+sId
			 $timeout(sendMail(), 3000);
			 
		/*	kendo.drawing
			    .drawDOM("#inspectionReport",
			    {
			        paperSize: "A4",
			        margin: { top: "1cm", bottom: "1cm" },
			        scale: 0.8,
			        height: 500
			    })
			        .then(function(group){
			        kendo.drawing.pdf.saveAs(group, "All registered classes.pdf")
			    });
			 */
			
			/*
		    html2canvas(document.getElementById('inspectionReport'), {
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
			*/
			/*var doc = new jsPDF();  //create jsPDF object
			  doc.fromHTML(document.getElementById("test"), // page element which you want to print as PDF
			  15,
			  15, 
			  {
			    'width': 170  //set width
			  },
			  function(a) 
			   {
			    doc.save(filename+".pdf"); // save file name as HTML2PDF.pdf
			  });*/
			  $timeout(sendMail(), 3000);
			 
		}
		function sendMail(){
			 var msg=""
				 var filename="Inspection.pdf"
					var url =emailUrl+"/sendInspectionmail"
					console.log("url: "+url)
			 var sop=vm.sop
			 sop.filename=filename;
			 console.log("filename: "+sop.filename)
				genericFactory.add(msg,url,sop).then(function(response) {
									
				});
		}
		function 	getOfferById(sId){
			var msg=""
				var url =sopUrl+"/getSOPById?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.sop = response.data;
				console.log("sop: "+JSON.stringify(vm.sop))
								
			});
		}
	//*****************************************************************************************************************
		
		function 	getVisiualInspection(sId){
			var msg=""
				console.log("sId: "+$stateParams.sopId)
				var url =sopUrl+"/getVisualIspectionBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.visualInspection = response.data;
				console.log("visualInspection: "+JSON.stringify(vm.visualInspection))
								
			});
			
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+3
			genericFactory.getAll(msg,url).then(function(response) {
				vm.visualInspectionImages = response.data;
				
				
								
			});
		}
		
		function 	getIncommingInspection(sId){
			var msg=""
				console.log("sId: "+$stateParams.sopId)
				var url =sopUrl+"/getIncomingTestInspectionBySOPId?sopId="+$stateParams.sopId
				genericFactory.getAll(msg,url).then(function(response) {
				vm.incommingInspection = response.data;
				console.log("incommingInspection: "+JSON.stringify(vm.incommingInspection))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+4
			genericFactory.getAll(msg,url).then(function(response) {
				vm.incommingInspectionImages = response.data;
				
				
								
			});
		}
		function 	getPowerCables(sId){
			var msg=""
				
				var url =sopUrl+"/getPowerCableBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.powerCables = response.data;
				console.log("powerCables: "+JSON.stringify(vm.powerCables))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+5
			genericFactory.getAll(msg,url).then(function(response) {
				vm.powerCablesImages = response.data;
				
				
								
			});
		}
		
		
		function 	getSpindleDisassembling(sId){
			var msg=""
				
				var url =sopUrl+"/getSpindleDisassemblingBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.spindleDisassemblin = response.data;
				console.log("spindleDisassemblin: "+JSON.stringify(vm.spindleDisassemblin))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+6
			genericFactory.getAll(msg,url).then(function(response) {
				vm.spindleDisassemblinImages = response.data;
				
				
								
			});
		}
		
		
		function getBearingInspectionFront(sId){
			var msg=""
				
				var url =sopUrl+"/getBearingIspectionFrontBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.bearingIspectionFront = response.data;
				console.log("bearingIspection Front: "+JSON.stringify(vm.bearingIspectionFront))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+7
			genericFactory.getAll(msg,url).then(function(response) {
				vm.bearingIspectionImages = response.data;
				
				
								
			});
		}
		
		function 	getBearingInspectionRear(sId){
			var msg=""
				
				var url =sopUrl+"/getBearingIspectionRearBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.bearingIspectionRear = response.data;
				console.log("bearingIspection Rear : "+JSON.stringify(vm.bearingIspectionRear))
								
			});
		}
		
		function 	getBearingCondition(sId){
			var msg=""
				
				var url =sopUrl+"/getBearingConditionBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.bearingCondotion = response.data;
				console.log("bearingCondotion : "+JSON.stringify(vm.bearingCondotion ))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+8
			genericFactory.getAll(msg,url).then(function(response) {
				vm.bearingCondotionImages = response.data;
				
				
								
			});
		}
		function 	getRCFA(sId){
			var msg=""
				
				var url =sopUrl+"/getRCFABySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.rcfa = response.data;
				console.log("rcfa : "+JSON.stringify(vm.rcfa))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+9
			genericFactory.getAll(msg,url).then(function(response) {
				vm.rcfaImages = response.data;
				
				
								
			});
		}
		
		function 	getNewBearing(sId){
			var msg=""
				
				var url =sopUrl+"/getNewBearingFrontBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.newBearingFront = response.data;
				console.log("newBearingFront : "+JSON.stringify(vm.newBearingFront))
								
			});
			var url =sopUrl+"/getNewBearingRearBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.newBearingRear = response.data;
				console.log("newBearingRear : "+JSON.stringify(vm.newBearingRear))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+9
			genericFactory.getAll(msg,url).then(function(response) {
				vm.newBearingImages = response.data;
				
				
								
			});
		}
		
		
		
		function 	getMotorCheckDisassembly(sId){
			var msg=""
				
				var url =sopUrl+"/getMotorCheckDisassembly?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.motorCheckDisassembly = response.data;
				console.log("motorCheckDisassembly : "+JSON.stringify(vm.motorCheckDisassembly))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+11
			genericFactory.getAll(msg,url).then(function(response) {
				vm.motorCheckDisassemblyImages = response.data;
				
				
								
			});
		}
		function 	getwashingCleaning(sId){
			var msg=""
				
				var url =sopUrl+"/getWashingCleaningBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.washing = response.data;
				console.log("washing : "+JSON.stringify(vm.washing))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+12
			genericFactory.getAll(msg,url).then(function(response) {
				vm.washingImages = response.data;
				
				
								
			});
		}
		
		function 	getInOutCoolentBySOPId(sId){
			var msg=""
				
				var url =sopUrl+"/getInOutCoolentBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.inOutCoolent = response.data;
				console.log("inOutCoolentBySOPId : "+JSON.stringify(vm.inOutCoolent))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+13
			genericFactory.getAll(msg,url).then(function(response) {
				vm.inOutCoolentImages = response.data;
				
				
								
			});
		}
		function 	getColloingSystemInspectionBySOPId(sId){
			var msg=""
				
				var url =sopUrl+"/getColloingSystemInspectionBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.colloingSystemInspection= response.data;
				console.log("colloingSystemInspection : "+JSON.stringify(vm.colloingSystemInspection))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+14
			genericFactory.getAll(msg,url).then(function(response) {
				vm.colloingSystemInspectionImages = response.data;
				
				
								
			});
		}
		function 	getRotaryUnitBySOPId(sId){
			var msg=""
				
				var url =sopUrl+"/getRotaryUnitBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.rotaryUnit= response.data;
				console.log("rotaryUnit: "+JSON.stringify(vm.rotaryUnit))
								
			});
			var url =imageUrl+"/getSOPImage?sopId="+$stateParams.sopId+"&stageNo="+15
			genericFactory.getAll(msg,url).then(function(response) {
				vm.rotaryUnitImages = response.data;
				
				
								
			});
		}
		function 	getRequiredSpareBySOPId(sId){
			var msg=""
				
				var url =sopUrl+"/getRequiredSpareBySOPId?sopId="+$stateParams.sopId
			genericFactory.getAll(msg,url).then(function(response) {
				vm.requiredSpare= response.data;
				console.log("requiredSpare: "+JSON.stringify(vm.requiredSpare))
								
			});
		}
	}
})();
