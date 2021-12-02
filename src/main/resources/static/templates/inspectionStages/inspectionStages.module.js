(function() {
	'use strict';

	angular
	.module('myApp.inspectionStages', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.inspectionStages', {
					url : "/inspectionStages",
					views : {
						"sub" : {
							templateUrl : "templates/inspectionStages/inspectionStages.html",
							controller : "InspectionStagesController as vm"
						}
					}
				})
			});

})();