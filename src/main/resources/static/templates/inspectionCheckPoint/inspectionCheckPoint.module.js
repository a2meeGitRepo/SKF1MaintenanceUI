(function() {
	'use strict';

	angular
	.module('myApp.inspectionCheckPoint', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.inspectionCheckPoint', {
					url : "/inspectionCheckPoint",
					views : {
						"sub" : {
							templateUrl : "templates/inspectionCheckPoint/inspectionCheckPoint.html",
							controller : "InspectionCheckPointController as vm"
						}
					}
				})
			});

})();