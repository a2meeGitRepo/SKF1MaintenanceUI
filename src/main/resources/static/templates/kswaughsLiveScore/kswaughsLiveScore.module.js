(function(){
	'use strict';

	angular.module('myApp.kswaughsLiveScore',[

		])
	.config(function($stateProvider){
		$stateProvider
		.state('main.kswaughsLiveScore', {
            url: "/kswaughsLiveScore",
            views: {
                "sub": {templateUrl: "templates/kswaughsLiveScore/kswaughsLiveScore.html",
                		controller : "LiveController as vm"}
            }
        })
      
	});

})();