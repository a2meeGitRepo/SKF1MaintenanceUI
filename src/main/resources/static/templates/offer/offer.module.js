(function() {
	'use strict';

	angular
	.module('myApp.offer', [])
	.config(function($stateProvider) {
			
		$stateProvider
		.state('main.offer/:sopId', {
            url: "/offer/:sopId",
            views: {
            	"sub" : {
					templateUrl : "templates/offer/offer.html",
					controller : "OfferController as vm"
				}
            }
        })
			});

})();