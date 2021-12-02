(function() {
	'use strict';

	angular.module('myApp.sopManagerApproval')
	.controller('SopManagerApprovalController', SopManagerApprovalController);
	SopManagerApprovalController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$location'];

	
	/* @ngInject */
	function SopManagerApprovalController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$location) {

		var sopUrl = ApiEndpoint.url+"sop";
		var spindleUrl=ApiEndpoint.url+"spindle";
		var serviceUrl = ApiEndpoint.url+"service";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			user:userDetail,
			cancle:cancle,
		
			perPage : 10,
			total_count:0,
			pageno:1,
			edit:edit,
			
			pagef1:pagef1,
			pagef2:pagef2,
			pagef3:pagef3,
			pagef4:pagef4,
			pagef5:pagef5,
			pagef6:pagef6,
			pagef7:pagef7,
			
			createOffer:createOffer,
			createInspectionReport:createInspectionReport,
			
			
			editVisualInsp:editVisualInsp,
			saveVisualInsp:saveVisualInsp,
			editIncTestInsp:editIncTestInsp,
			saveTestInsp:saveTestInsp,
			editPowerCable:editPowerCable,
			savePoerCable:savePoerCable,
			editspindleDiss:editspindleDiss,
			saveSpindleDiss:saveSpindleDiss,
			editBearingInsp:editBearingInsp,
			saveBearingInsp:saveBearingInsp,
			editBearingCon:editBearingCon,
			saveBearingCond:saveBearingCond,
			saveRCFA:saveRCFA,
			editRCFA:editRCFA,
			editNewBearing:editNewBearing,
			saveNewBearing:saveNewBearing,
			editMotor:editMotor,
			saveMotor:saveMotor,
			saveWash:saveWash,
			editWash:editWash,
			editInOutCoolent:editInOutCoolent,
			saveInOutCoolent:saveInOutCoolent,
			editCoolingSystem:editCoolingSystem,
			saveCoolingSystem:saveCoolingSystem,
			saveRotary:saveRotary,
			editRotary:editRotary,
			editComInsA:editComInsA,
			saveComInsA:saveComInsA,
			editspareRequred:editspareRequred,
			saveSpareRequred:saveSpareRequred,
			saveComInsBf:saveComInsBf,
			editComInsB:editComInsB,
			savePlock:savePlock,
			editPlock:editPlock,
			saveRside:saveRside,
			editRside:editRside,
			editClampingSys:editClampingSys,
			saveClampingSys:saveClampingSys,
			editEncoder:editEncoder,
			saveEncoder:saveEncoder,
			
			
			
			
			
			
			
			
			getSpindleBySop:getSpindleBySop,
			getSopDetials:getSopDetials,
			getPage2:getPage2,
			getPage3:getPage3,
			getPage4:getPage4,
			getPage5:getPage5,
			getPage6:getPage6,
			getPage7:getPage7,
			editVisualInspection:editVisualInspection,
			editBearingCon:editBearingCon,
			editInOutCoolent:editInOutCoolent,
			saveInOutCoolent:saveInOutCoolent,
			savePositiveLock:savePositiveLock,
			editPositiveLock:editPositiveLock,
			saveRearSide:saveRearSide,
			editRearSide:editRearSide,
			saveClampSystem:saveClampSystem,
			editClampSystem:editClampSystem,
			saveEncoder:saveEncoder,
			editEncoder:editEncoder,
			saveBeltInspection:saveBeltInspection,
			editBeltInspection:editBeltInspection,
			saveDrawerSpring:saveDrawerSpring,
			editDrawerSpring:editDrawerSpring,
			saveLubricationSystem:saveLubricationSystem,
			editLubricationSystem:editLubricationSystem,
			saveSealingInspection:saveSealingInspection,
			editSealingInspection:editSealingInspection,
			saveShaftBalancing:saveShaftBalancing,
			editShaftBalancing:editShaftBalancing,
			saveDrawbarAssembling:saveDrawbarAssembling,
			editDrawbarAssembling:editDrawbarAssembling,
			saveSpindleRunOutInspection:saveSpindleRunOutInspection,
			editSpindleRunOutInspection:editSpindleRunOutInspection,
			saveSpindleClearanceInspection:saveSpindleClearanceInspection,
			editSpindleClearanceInspection:editSpindleClearanceInspection,
			saveTimeSpent:saveTimeSpent,
			editTimeSpent:editTimeSpent,
			
		
		
//			saveSpindle:saveSpindle,
//			editSpindle:editSpindle
//			
		});

		(function activate() {
			$scope.sopDetials=false
			$scope.page1=true
			$scope.alertType=false;
			loadSOPs();
			$scope.editView=false;
			$rootScope.loader=false;
			//getAllSpindle();
			$scope.incTestIns=true
			$scope.powerCab=true
			$scope.spindleDiss=true
			$scope.visual=true
			$scope.spindl=true
			$scope.tech=true
			$scope.bearingInsp=true
			$scope.bearingCon=true
			$scope.rcf=true
			$scope.motor=true
			$scope.clean=true
			$scope.coolent=true
			$scope.coolSystem=true
			$scope.plock=true
			$scope.rside=true
			$scope.clampsystem=true
			$scope.encoderTab=true
			$scope.belt=true
			$scope.drawer=true
			$scope.lubric=true
			$scope.seal=true
			$scope.roter=true
			$scope.shaft=true
			$scope.drassembly=true
			$scope.runout=true
			$scope.clear=true
			$scope.spent=true
			$scope.spareReq=true
			$scope.comInsA=true
			$scope.comInsBf=true
			$scope.rside=true	
			$scope.encoder=true
			$scope.clampingSys=true
			$scope.newBearing=true
			$scope.drawbarAssemb=true
		})();
		
		
		function createOffer(sop){
			console.log("Offer Creatting "+JSON.stringify(sop))
			$location.path('main/offer/'+sop.sopId);
		}
		
		function createInspectionReport(sop){
			console.log("Inspection Report "+JSON.stringify(sop))
			$location.path('main/inspectionReport/'+sop.sopId);
		}
		
		function pagef1(){
			$scope.page1=true
			$scope.page2=false
			$scope.page3=false
			$scope.page4=false
			$scope.page5=false
			$scope.page6=false
			$scope.page7=false
		}
		function pagef2(){
			$scope.page1=false
			$scope.page2=true
			$scope.page3=false
			$scope.page4=false
			$scope.page5=false
			$scope.page6=false
			$scope.page7=false		
		}
		function pagef3(){
			$scope.page1=false
			$scope.page2=false
			$scope.page3=true
			$scope.page4=false
			$scope.page5=false
			$scope.page6=false
			$scope.page7=false		
		}
		function pagef4(){
			
			$scope.page1=false
			$scope.page2=false
			$scope.page3=false
			$scope.page4=true
			$scope.page5=false
			$scope.page6=false
			$scope.page7=false		
			
			
		}
		function pagef5(){
			
			$scope.page1=false
			$scope.page2=false
			$scope.page3=false
			$scope.page4=false
			$scope.page5=true
			$scope.page6=false
			$scope.page7=false		
			
			
		}
		function pagef6(){
			
			$scope.page1=false
			$scope.page2=false
			$scope.page3=false
			$scope.page4=false
			$scope.page5=false
			$scope.page6=true
			$scope.page7=false		
			
			
		}
		
		function pagef7(){
			
			$scope.page1=false
			$scope.page2=false
			$scope.page3=false
			$scope.page4=false
			$scope.page5=false
			$scope.page6=false
			$scope.page7=true		
			
			
		}
	//******************************** POINT NO 3 *************************************//

		function editVisualInspection(){
			
			$scope.visual=false;
			
		
	   }
	 function saveVisualInsp(){
			
				var msg=""
			var url=sopUrl+"/addListVisualInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.visualInspection).then(function(response) {
			
				 if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
					   
					   $scope.visual=true;
			});
			
	}
		
	//******************************** POINT NO 4 *************************************//	
		
	 function editIncTestInsp(sop){
			$scope.incTestIns=false
		}
		function saveTestInsp(){
			console.log("incomingTest: "+JSON.stringify( $scope.incomingTest))	
				var msg=""
			var url=sopUrl+"/addIncomingTestInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.incomingTest).then(function(response) {
				
				 if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				 
				 
				 $scope.incTestIns=true
				});
			
		}
		
		//******************************** POINT NO 5 *************************************//	
		
		function editPowerCable(){
			$scope.powerCab=false
		}
		function savePoerCable(){
			console.log("powerCable: "+JSON.stringify( $scope.powerCable))	
				var msg=""
			var url=sopUrl+"/addPowerCable";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.powerCable).then(function(response) {
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.powerCab=true	
				});
			
			
			
		}
		//******************************** POINT NO 6 *************************************//		
		
		
		function editspindleDiss(){
			$scope.spindleDiss=false
		}
		function saveSpindleDiss(){
			console.log("spindleDisassembly: "+JSON.stringify( $scope.spindleDisassembly))	
				var msg=""
			var url=sopUrl+"/addLisySpindleDisassembling";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.spindleDisassembly).then(function(response) {
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.spindleDiss=true
				});
			
		}
		
		
		//******************************** POINT NO 7 *************************************//		

		
		
		function editBearingInsp(sop){
			$scope.bearingInsp=false
		}
		function saveBearingInsp(){
			console.log("bearingInspection: "+JSON.stringify( $scope.bearingInspection))	
				var msg=""
			var url=sopUrl+"/addListBearingInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.bearingInspectionFront).then(function(response) {
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.bearingInsp=true
				});
				var url=sopUrl+"/addListBearingInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.bearingInspectionRear).then(function(response) {
				
				});
			
		}
		
		
		//******************************** POINT NO 8 *************************************//
		
		function editBearingCon(){
			$scope.bearingCon=false
		}
		function saveBearingCond(){
			
				var msg=""
			var url=sopUrl+"/addBearingCondition";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.bearingCondition).then(function(response) {
				console.log("bearingCondition: "+JSON.stringify( response))	
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.bearingCon=true	
				});
			
		}
		
		
		//******************************** POINT NO 9 *************************************//	
		
		function editRCFA(){
			$scope.rcf=false
		}
		function saveRCFA(){
			console.log("rcfa: "+JSON.stringify( $scope.rcfa))	
				var msg=""
			var url=sopUrl+"/addRCFA";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.rcfa).then(function(response) {
				
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.rcf=true	
				});
			
		}
		
		//******************************** POINT NO 10 *************************************//		
		
		
		function editNewBearing(sop){
			$scope.newBearing=false
		}
		function saveNewBearing(){
			console.log("bearingInspection: "+JSON.stringify( $scope.bearingInspection))	
				var msg=""
			var url=sopUrl+"/addListBearingInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.bearingFront).then(function(response) {
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.newBearing=true
				});
				genericFactory.add(msg,url, $scope.bearingRear).then(function(response) {
					
					});
			
		}
		
		//******************************** POINT NO 11*************************************//		

		
		
		
		function editMotor(){
			$scope.motor=false
		}
		function saveMotor(){
			console.log("motorcheck: "+JSON.stringify( $scope.motorcheck))	
				var msg=""
			var url=sopUrl+"/addMotorCheckDisassembly";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.motorcheck).then(function(response) {
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.motor=true
				});
			
		}
		//******************************** POINT NO 12*************************************//	
		
		function editWash(){
			$scope.clean=false
		}
		function saveWash(){
			console.log("washingCleaning: "+JSON.stringify( $scope.washingCleaning))	
				var msg=""
			var url=sopUrl+"/addWashingCleaning";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.washingCleaning).then(function(response) {
				
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.clean=true
				});
			
		}
		//******************************** POINT NO 13 *************************************//	
		
		function editInOutCoolent(){
			$scope.coolent=false
			}
		function saveInOutCoolent(){
			console.log("inOutCooloent: "+JSON.stringify( $scope.inOutCooloent))	
				var msg=""
			var url=sopUrl+"/addInOutCoolent";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.inOutCooloent).then(function(response) {
				
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.coolent=true
				});
			
		}
		
		//******************************** POINT NO 14*************************************//	
		function editCoolingSystem(){
			$scope.coolSystem=false
			}
		function saveCoolingSystem(){
			console.log("coolingSystem: "+JSON.stringify( $scope.coolingSystem))	
				var msg=""
			var url=sopUrl+"/addColloingSystemInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.coolingSystem).then(function(response) {
				
						if(response.data.code==200){
							   toastr.success(response.data.message);
						   }else{
							   toastr.error(response.data.message);
						 }
						$scope.coolSystem=true
				});
			
		}
		
		//******************************** POINT NO 15 *************************************//	
		
		
		//15 Rotary Unit
		function editRotary(){
			$scope.roter=false
			}
		function saveRotary(){
			console.log("rotaryUnit: "+JSON.stringify( $scope.rotaryUnit))	
				var msg=""
			var url=sopUrl+"/addRotaryUnit";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.rotaryUnit).then(function(response) {
									
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.roter=true	
				});
			
		}
		
		
		//******************************** POINT NO 16 *************************************//		
		function editComInsA(){
			$scope.comInsA=false
		}
		function saveComInsA(){
			console.log("rotaryUnit: "+JSON.stringify( $scope.rotaryUnit))	
			var msg=""
		var url=sopUrl+"/addComponentInspection1";
			console.log("url: "+url)
		genericFactory.add(msg,url, $scope.componentInspection1).then(function(response) {
								
			if(response.data.code==200){
				   toastr.success(response.data.message);
			   }else{
				   toastr.error(response.data.message);
			 }
			$scope.comInsA=true	
			});
			var url=sopUrl+"/addComponentInspection2";
			genericFactory.add(msg,url, $scope.componentInspection2).then(function(response) {
				
				
				});
			var url=sopUrl+"/addComponentInspection3";
			genericFactory.add(msg,url, $scope.componentInspection3).then(function(response) {
				
				
				});
		}
		
		
		
		
		//******************************** POINT NO 17 *************************************//		
		
		
		//******************************** POINT NO 18 *************************************//		
		
		function editspareRequred(){
			$scope.spareReq=false
		}
		
		function saveSpareRequred(){
			
			var msg=""
				var url=sopUrl+"/addListSpareRequired";
					console.log("url: "+url)
				genericFactory.add(msg,url, $scope.sparesRequired).then(function(response) {
					
					if(response.data.code==200){
						   toastr.success(response.data.message);
					   }else{
						   toastr.error(response.data.message);
					 }
					$scope.spareReq=true	
					});
			
			
			
		}
		
		
		//******************************** POINT NO 19 *************************************//		
		
		
		function editComInsB(){
			$scope.comInsBf=false
		}
		
		function saveComInsBf(){
			
			var msg=""
				var url=sopUrl+"/addComponentInspection1_19";
					console.log("url: "+JSON.stringify($scope.componentInspection1))
				genericFactory.add(msg,url, $scope.componentInspection1_19).then(function(response) {
					
					if(response.data.code==200){
						   toastr.success(response.data.message);
					   }else{
						   toastr.error(response.data.message);
					 }
					$scope.comInsBf=true	
					});
					var url=sopUrl+"/addComponentInspection2_19";
					console.log("url: "+url)
				genericFactory.add(msg,url, $scope.componentInspection2_19).then(function(response) {
					
					
					});
					var url=sopUrl+"/addComponentInspection3_19";
					console.log("url: "+url)
				genericFactory.add(msg,url, $scope.componentInspection3_19).then(function(response) {
					
						
					});
			
			
			
		}
		
		
//******************************** POINT NO 20 *************************************//		
		
		
		function editPlock(){
			$scope.plock=false
		}
		
		function savePlock(){
			
			var msg=""
				var url=sopUrl+"/addPositiveLockFrontSideBearing";
					console.log("url: "+url)
				genericFactory.add(msg,url, $scope.positiveLock).then(function(response) {
					
					if(response.data.code==200){
						   toastr.success(response.data.message);
					   }else{
						   toastr.error(response.data.message);
					 }
					$scope.plock=true	
					});
			
			
			
		}
//******************************** POINT NO 21 *************************************//		
		
		
		function editRside(){
			$scope.rside=false
		}
		
		function saveRside(){
			
			var msg=""
				var url=sopUrl+"/addRearSideBearingClearance";
					console.log("url: "+url)
				genericFactory.add(msg,url, $scope.rearSide).then(function(response) {
					
					if(response.data.code==200){
						   toastr.success(response.data.message);
					   }else{
						   toastr.error(response.data.message);
					 }
					$scope.rside=true	
					});
			
			
			
		}	
		
//******************************** POINT NO 22 *************************************//		
		
		
		function editClampingSys (){
			$scope.clampingSys=false
		}
		
		function saveClampingSys(){
			
			var msg=""
				var url=sopUrl+"/addSpindleCSS";
					console.log("url: "+url)
				genericFactory.add(msg,url, $scope.clampingSensor).then(function(response) {
					
					if(response.data.code==200){
						   toastr.success(response.data.message);
					   }else{
						   toastr.error(response.data.message);
					 }
					$scope.clampingSys=true	
					});
			
			
			
		}		
		
		
//******************************** POINT NO 23 *************************************//		
		
		
		function editEncoder(){
			$scope.encoderTab=false
		}
		
		function saveEncoder(){
			
			var msg=""
				var url=sopUrl+"/addSpindleEncoder";
					console.log("url: "+url)
				genericFactory.add(msg,url, $scope.encoder).then(function(response) {
					
					if(response.data.code==200){
						   toastr.success(response.data.message);
					   }else{
						   toastr.error(response.data.message);
					 }
					$scope.encoderTab=true	
					});
			
			
			
		}		
		
		
		
		
		
		//spindleDissasembling
		
		
		//Visual Inspection
		function editVisualInsp(sop){
			$scope.visual=false
		}
		
		
		//Bearing Inspection
		
		
		
		
	
		
		
		//20 Positive Lock
		function editPositiveLock(sop){
			$scope.plock=false
			}
		function savePositiveLock(){
			console.log("positiveLock: "+JSON.stringify( $scope.positiveLock))	
				var msg=""
			var url=sopUrl+"/addPositiveLockFrontSideBearing";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.positiveLock).then(function(response) {
				
		   var responceObj=response.data	
				});
			
		}
		
		//21 Rear Side
		function editRearSide(sop){
			$scope.rside=false
			}
		function saveRearSide(){
			console.log("rearSide: "+JSON.stringify( $scope.rearSide))	
				var msg=""
			var url=sopUrl+"/addRearSideBearingClearance";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.rearSide).then(function(response) {
				
		   var responceObj=response.data	
				});
			
		}
		//22 Clamp System
		function editClampSystem(sop){
			$scope.clampsystem=false
			}
		function saveClampSystem(){
			console.log("clampingSensor: "+JSON.stringify( $scope.clampingSensor))	
				var msg=""
			var url=sopUrl+"/addSpindleCSS";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.clampingSensor).then(function(response) {
				
		   var responceObj=response.data	
				});
			
		}
		//23 Spindle Encoder
	
		//24 Belt Inspection
		function editBeltInspection(sop){
			$scope.belt=false
			}
		function saveBeltInspection(){
			console.log("beltInsp: "+JSON.stringify( $scope.beltInsp))	
				var msg=""
			var url=sopUrl+"/addBeltInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.beltInsp).then(function(response) {
				
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.belt=true	
				});
			
		}
		//25 Drawbar Spring
		function editDrawerSpring(sop){
			$scope.drawer=false
			}
		function saveDrawerSpring(){
			console.log("drawbarSpring: "+JSON.stringify( $scope.drawbarSpring))	
				var msg=""
			var url=sopUrl+"/addSpindleDSI";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.drawbarSpring).then(function(response) {
				
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.drawer=true	
				});
			
		}
		//26 Lubrication System
		function editLubricationSystem(sop){
			$scope.lubric=false
			}
		function saveLubricationSystem(){
			console.log("lubrication: "+JSON.stringify( $scope.lubrication))	
				var msg=""
			var url=sopUrl+"/addSpindleLSI";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.lubrication).then(function(response) {
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.lubric=true	
				});
			
		}
		//27 Sealing Inspection
		function editSealingInspection(sop){
			$scope.seal=false
			}
		function saveSealingInspection(){
			console.log("sealing: "+JSON.stringify( $scope.sealing))	
				var msg=""
			var url=sopUrl+"/addSpindleSI";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.sealing).then(function(response) {
				
				if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.seal=true	
				});
			
		}
		
		
		
		//28 Shaft Balancing
		function editShaftBalancing(sop){
			$scope.shaft=false
			}
		function saveShaftBalancing(){
			console.log("shaftBalancing: "+JSON.stringify( $scope.shaftBalancing))	
				var msg=""
			var url=sopUrl+"/addSpindleStaffBalancing";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.shaftBalancing).then(function(response) {
				
		   if(response.data.code==200){
					   toastr.success(response.data.message);
				   }else{
					   toastr.error(response.data.message);
				 }
				$scope.shaftt=true	
			
				});
			
		}
		
		//29 Drawbar Assembling
		function editDrawbarAssembling(sop){
			$scope.drassembly=false
			}
		function saveDrawbarAssembling(){
			console.log("drawbarAss: "+JSON.stringify( $scope.drawbarAss))	
				var msg=""
			var url=sopUrl+"/addDrawbarAssembling";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.drawbarAss).then(function(response) {
				
		   var responceObj=response.data	
				});
			
		}
		
		//30 Spindle Run Out Inspection
		function editSpindleRunOutInspection(sop){
			$scope.runout=false
			}
		function saveSpindleRunOutInspection(){
			console.log("spindlerunout: "+JSON.stringify( $scope.spindlerunout))	
				var msg=""
			var url=sopUrl+"/addSpindleRunOutInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.spindlerunout).then(function(response) {
				
		   var responceObj=response.data	
				});
			
		}
		
		//31 Spindle Clearance Inspection
		function editSpindleClearanceInspection(sop){
			$scope.clear=false
			}
		function saveSpindleClearanceInspection(){
			console.log("spindleClear: "+JSON.stringify( $scope.spindleClear))	
				var msg=""
			var url=sopUrl+"/addSpindleClearanceInspection";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.spindleClear).then(function(response) {
				
		   var responceObj=response.data	
				});
			
		}
		//33 Time Spent
		function editTimeSpent(sop){
			$scope.spent=false
			}
		function saveTimeSpent(){
			console.log("timeSpent: "+JSON.stringify( $scope.timeSpent))	
				var msg=""
			var url=sopUrl+"/addTimeSpentSpindleService";
				console.log("url: "+url)
			genericFactory.add(msg,url, $scope.timeSpent).then(function(response) {
				
		   var responceObj=response.data	
				});
			
		}
		
		
		
		
		//Spindle
//		function editSpindle(sop){
//			$scope.spindl=false
//		}
//		function saveSpindle(){
//			console.log("Spindle: "+JSON.stringify( $scope.Spindle))	
//				var msg=""
//			var url=sopUrl+"/addVisualInspection";
//				console.log("url: "+url)
//			genericFactory.add(msg,url, $scope.Spindle).then(function(response) {
//				
//		   var responceObj=response.data	
//				});
//			
	//	}
		
		
		
		function getPage2(){
			$scope.page1=false;
			$scope.page2=true;
			$scope.page3=false;
			$scope.page4=false;
			$scope.page5=false;
			$scope.page6=false;
			$scope.page7=false;
			
			
		}
		function getPage3(){
			$scope.page1=false;
			$scope.page2=false;
			$scope.page3=true;
			$scope.page4=false;
			$scope.page5=false;
			$scope.page6=false;
			$scope.page7=false;
		}
		function getPage4(){
			$scope.page1=false;
			$scope.page2=false;
			$scope.page3=false;
			$scope.page4=true;
			$scope.page5=false;
			$scope.page6=false;
			$scope.page7=false;
		}
		function getPage5(){
			$scope.page1=false;
			$scope.page2=false;
			$scope.page3=false;
			$scope.page4=false;
			$scope.page5=true;
			$scope.page6=false;
			$scope.page7=false;
		}
		function getPage6(){
			$scope.page1=false;
			$scope.page2=false;
			$scope.page3=false;
			$scope.page4=false;
			$scope.page5=false;
			$scope.page6=true;
			$scope.page7=false;
		}
		function getPage7(){
			$scope.page1=false;
			$scope.page2=false;
			$scope.page3=false;
			$scope.page4=false;
			$scope.page5=false;
			$scope.page6=false;
			$scope.page7=true;
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		function getSopDetials(sop){
			$scope.sopDetials=true
								console.log("sop: "+JSON.stringify(sop.sopId))
								$scope.page1=true;

			// for Point 1
			var msg=""
					 var url =sopUrl+"/getTechnicalDetialsBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response){
					$scope.technical = response.data;
					console.log("technical: "+JSON.stringify($scope.technical))
									
				});
				
				
				//For Point 2 
				
				
				
				
				var msg=""
					 var url =sopUrl+"/getSpindleDetialsBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					$scope.spindle = response.data;
					console.log("Spindle: "+JSON.stringify($scope.spindle))
					
				});
				
				
				
				//For Point 3
				
				var msg=""
					 var url =sopUrl+"/getVisualIspectionBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.visualInspection = response.data;
					console.log("visualInspection: "+JSON.stringify($scope.visualInspection))	
				});
			
				//For Point 4
				
				var msg=""
					 var url =sopUrl+"/getPowerCableBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.powerCable = response.data;
					console.log("powerCable: "+JSON.stringify($scope.powerCable))	
				});
				
				//For Point 5
			   var msg=""
					 var url =sopUrl+"/getSpindleDisassemblingBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.spindleDisassembly = response.data;
					console.log("spindleDisassembly: "+JSON.stringify( $scope.spindleDisassembly))	
				});
				
				//For Point 6
			   var msg=""
					 var url =sopUrl+"/getBearingIspectionFrontBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.bearingInspectionFront = response.data;
					console.log("bearingInspection: "+JSON.stringify($scope.bearingInspection))	
				});
				
					   var msg=""
							 var url =sopUrl+"/getBearingIspectionRearBySOPId?sopId="+sop.sopId;
							genericFactory.getAll(msg,url).then(function(response) {
							
						    $scope.bearingInspectionRear = response.data;
							console.log("bearingInspection: "+JSON.stringify($scope.bearingInspection))	
						});
						
				//For Point 7
			   var msg=""
					 var url =sopUrl+"/getRCFABySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.rcfa = response.data;
					console.log("rcfa: "+JSON.stringify($scope.rcfa))	
				});
				
				//For Point 8
			   var msg=""
					 var url =sopUrl+"/getNewBearingFrontBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.bearingFront = response.data;
					console.log("bearing: "+JSON.stringify($scope.bearingFront))	
				});
					  var msg=""
							 var url =sopUrl+"/getNewBearingRearBySOPId?sopId="+sop.sopId;
							genericFactory.getAll(msg,url).then(function(response) {
							
						    $scope.bearingRear = response.data;
							console.log("bearingRear: "+JSON.stringify($scope.bearingRear))	
						});
			
			//For Point 9
			   var msg=""
					 var url =sopUrl+"/getWashingCleaningBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.washingCleaning = response.data;
					console.log("washingCleaning: "+JSON.stringify($scope.washingCleaning))	
				});
				
				//For Point 10
			   var msg=""
					 var url =sopUrl+"/getInOutCoolentBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.inOutCooloent = response.data;
					console.log("inOutCooloent: "+JSON.stringify( $scope.inOutCooloent))	
				});
				
				//For Point 8
			   var msg=""
					 var url =sopUrl+"/getBearingConditionBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.bearingCondition = response.data;
					console.log("bearingCondition: "+JSON.stringify( $scope.bearingCondition))	
				});
				
			//For Point 16 part 1
			   var msg=""
					 var url =sopUrl+"/getComponentInspection1BySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.componentInspection1 = response.data;
					console.log("componentInspection1: "+JSON.stringify( $scope.componentInspection1))	
				});
					//For Point 16
					   var msg=""
							 var url =sopUrl+"/getComponentInspection2BySOPId?sopId="+sop.sopId;
							genericFactory.getAll(msg,url).then(function(response) {
							
						    $scope.componentInspection2 = response.data;
							console.log("componentInspection2: "+JSON.stringify( $scope.componentInspection2))	
						});
							//For Point 16
							   var msg=""
									 var url =sopUrl+"/getComponentInspection3BySOPId?sopId="+sop.sopId;
									genericFactory.getAll(msg,url).then(function(response) {
									
								    $scope.componentInspection3 = response.data;
									console.log("componentInspection3: "+JSON.stringify( $scope.componentInspection3))	
								});					
				//For Point 19-1
			   var msg=""
					 var url =sopUrl+"/getComponentInspection1_19BySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.componentInspection1_19 = response.data;
					console.log("componentInspection1_19: "+JSON.stringify( $scope.componentInspection1_19))	
				});
				
					//For Point 19-2
			   var msg=""
					 var url =sopUrl+"/getComponentInspection2_19BySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.componentInspection2_19 = response.data;
					console.log("componentInspection2_19: "+JSON.stringify( $scope.componentInspection2_19))	
				});
					//For Point 19-3
			   var msg=""
					 var url =sopUrl+"/getComponentInspection3_19BySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.componentInspection3_19 = response.data;
					console.log("componentInspection3_19: "+JSON.stringify( $scope.componentInspection3_19))	
				});
				
				 var msg=""
					 var url =sopUrl+"/getComponentInspection2BySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.componentInspection2 = response.data;
					console.log("componentInspection2: "+JSON.stringify( $scope.componentInspection2))	
				});
				 var msg=""
					 var url =sopUrl+"/getComponentInspection3BySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.componentInspection3 = response.data;
					console.log("componentInspection3: "+JSON.stringify( $scope.componentInspection3))	
				});
				//For Point 4
			   var msg=""
					 var url =sopUrl+"/getIncomingTestInspectionBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.incomingTest = response.data;
				 //   $scope.incomingTest.bt40 =true
					console.log("incomingTest: "+JSON.stringify( $scope.incomingTest))	
				});
				//For Point 14
				  var msg=""
					 var url =sopUrl+"/getColloingSystemInspectionBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.coolingSystem = response.data;
					console.log("coolingSystem: "+JSON.stringify( $scope.coolingSystem))	
				});
				
				//For Point 11
				  var msg=""
					 var url =sopUrl+"/getMotorCheckDisassembly?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.motorcheck = response.data;
					console.log("motorcheck: "+JSON.stringify( $scope.motorcheck))	
				});
				
				//For Point 18
				  var msg=""
					 var url =sopUrl+"/getRequiredSpareBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.sparesRequired = response.data;
					console.log("sparesRequired: "+JSON.stringify( $scope.sparesRequired))	
				});
				
				//For Point 22
				  var msg=""
					 var url =sopUrl+"/getSpindleCSSbySopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.clampingSensor = response.data;
					console.log("clampingSensor: "+JSON.stringify( $scope.clampingSensor))	
				});
				//For Point 23
				  var msg=""
					 var url =sopUrl+"/getSpindleEncoderbySopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.encoder = response.data;
					console.log("encoder: "+JSON.stringify( $scope.encoder))	
				});
				//For Point 25
				  var msg=""
					 var url =sopUrl+"/getSpindleDSIbySopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.drawbarSpring = response.data;
					console.log("drawbarSpring: "+JSON.stringify( $scope.drawbarSpring))	
				});
				//For Point 26
				  var msg=""
					 var url =sopUrl+"/getSpindleLSIbySopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.lubrication = response.data;
					console.log("lubrication: "+JSON.stringify( $scope.lubrication))	
				});
				//For Point 27
				  var msg=""
					 var url =sopUrl+"/getSpindleSIbySopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.sealing = response.data;
					console.log("sealing: "+JSON.stringify( $scope.sealing))	
				});
					//For Point 28
					  var msg=""
						 var url =sopUrl+"/getSpindleSIbySopId?sopId="+sop.sopId;
						genericFactory.getAll(msg,url).then(function(response) {
						
					    $scope.sealing = response.data;
						console.log("sealing: "+JSON.stringify( $scope.sealing))	
					});
						//For Point 29
						  var msg=""
							 var url =sopUrl+"/getDrawbarAssemblingSopId?sopId="+sop.sopId;
							genericFactory.getAll(msg,url).then(function(response) {
							
						    $scope.drawbarAssembling = response.data;
							console.log("drawbarAssembling: "+JSON.stringify( $scope.drawbarAssembling))	
						});
				//For Point 30
				  var msg=""
					 var url =sopUrl+"/getSpindleROIbySopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.spindlerunout = response.data;
					console.log("spindlerunout: "+JSON.stringify( $scope.spindlerunout))	
				});
				//For Point 32
				  var msg=""
					 var url =sopUrl+"/getRunningTestResultbySopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.spindlerunTest = response.data;
					console.log("spindlerunTest: "+JSON.stringify( $scope.spindlerunTest))	
				});
			//For Point 28
				  var msg=""
					 var url =sopUrl+"/getSpindleStaffBalanceNew?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.shaftBalancing = response.data;
					console.log("shaftBalancing: "+JSON.stringify( $scope.shaftBalancing))	
				});
				//For Point 15
				  var msg=""
					 var url =sopUrl+"/getRotaryUnitBySOPId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.rotaryUnit = response.data;
					console.log("rotaryUnit: "+JSON.stringify( $scope.rotaryUnit))	
				});
				
				//For Point 20
				  var msg=""
					 var url =sopUrl+"/getPositiveLockFrontSideBearingSopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.positiveLock = response.data;
					console.log("positiveLock: "+JSON.stringify( $scope.positiveLock))	
				});
				//For Point 21
				  var msg=""
					 var url =sopUrl+"/getRearSideBearingClearanceSopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.rearSide = response.data;
					console.log("rearSide: "+JSON.stringify( $scope.rearSide))	
				});
			
				//For Point 24
				  var msg=""
					 var url =sopUrl+"/getBeltInspectionSopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.beltInsp = response.data;
					console.log("beltInsp: "+JSON.stringify( $scope.beltInsp))	
				});
				//For Point 29
				  var msg=""
					 var url =sopUrl+"/getDrawbarAssemblingSopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.drawbarAss = response.data;
					console.log("drawbarAss: "+JSON.stringify( $scope.drawbarAss))	
				});
				//For Point 31
				  var msg=""
					 var url =sopUrl+"/getSpindleClearanceInspectionbySopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.spindleClear = response.data;
					console.log("spindleClear: "+JSON.stringify( $scope.spindleClear))	
				});
				//For Point 33
				  var msg=""
					 var url =sopUrl+"/getTimeSpentSpindleServiceSopId?sopId="+sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					
				    $scope.timeSpent = response.data;
					console.log("timeSpent: "+JSON.stringify( $scope.timeSpent))	
				});
			
		}
		 function getAllSpindle(){
				var msg=""
					 var url =spindleUrl+"/getAllSpindleList";
					genericFactory.getAll(msg,url).then(function(response) {
					vm.allsop = response.data;
					console.log("Spindle: "+JSON.stringify(vm.allsop))
									
				});
			}
		
		 function getSpindleBySop(sopId){
				var msg=""
					 var url =sopUrl+"/getSpindleDetialsBySOPId?sopId="+$scope.sop.sopId;
					genericFactory.getAll(msg,url).then(function(response) {
					vm.allsop = response.data;
					console.log("Spindle: "+JSON.stringify(vm.allsop))
					
				});
			}
		
		
		/*************************future date disabled**********************/
		function edit(sop){
			$scope.pagenNO1=true;
		}
	
		// current page
		$scope.pagination = {
		        current: 1
		    };
		
		// page changed 
		$scope.pageChanged = function(pageNo){
			vm.pageno=pageNo;
			loadSOPs();
			
		}
		
	
		
		function cancle(){
			$scope.addNew=false;
			
		}
		
		
	
	
		
		
		
		/*****************************************************************/
		
		function loadSOPs(){
			
			
			loadCount();
			var msg=""
				var url="";
				if($scope.search==""||$scope.search==undefined){
					url =sopUrl+"/getAllSOPByPagination?page_no="+vm.pageno+'&item_per_page='+vm.perPage;
				}
			else{
				url=sopUrl+"/getAllSOPByPaginationAndSerach?page_no="+vm.pageno+'&item_per_page='+vm.perPage+"&search="+$scope.search;
			}
				
				genericFactory.getAll(msg,url).then(function(response) {
				vm.sops = response.data;
				console.log("sops: "+JSON.stringify(vm.sops))
								
			});
		}
		
		function loadCount(){
			
			var msg=""
				 var url =""
				if($scope.search==""||$scope.search==undefined){
					url =sopUrl+"/getAllSOPCount"
				}
			else{
				url=sopUrl+"/getAllSOPCountBySearch?search="+$scope.search;
			}
				 //var url =orderUrl+"/getEmployeesCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.total_count = response.data;
				console.log("total_count: "+JSON.stringify(vm.total_count))
								
			});
		}
	
			
	
	
		

	}
})();
