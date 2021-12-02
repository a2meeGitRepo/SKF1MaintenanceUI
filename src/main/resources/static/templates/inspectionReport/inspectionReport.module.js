(function() {
	'use strict';

	angular
	.module('myApp.inspectionReport', [])
	.config(function($stateProvider) {
			
		$stateProvider
		.state('main.inspectionReport/:sopId', {
            url: "/inspectionReport/:sopId",
            views: {
            	"sub" : {
					templateUrl : "templates/inspectionReport/inspectionReport.html",
					controller : "InspectionReportController as vm"
				}
            }
        })
			});

})();