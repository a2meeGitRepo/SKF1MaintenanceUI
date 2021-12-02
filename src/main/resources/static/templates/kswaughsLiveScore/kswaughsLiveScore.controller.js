(function() {
	'use strict';

	angular.module('myApp.kswaughsLiveScore')
	.controller('LiveController', LiveController);
	LiveController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http','$stomp'];

	
	/* @ngInject */
	function LiveController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http,$stomp) {

		var employeeUrl = ApiEndpoint.url+"employee";
	
		var vm = angular.extend(this, {
			
		});

		(function activate() {
		
		
		})();
		   $scope.myres = [];
		   
		      $stomp.connect('http://localhost:8080/livescore-websocket', {})
		            .then(function (frame) {
		                var subscription = $stomp.subscribe('/topic/myscores', 
		                    function (payload, headers, res) {
		                        $scope.myres = payload;
		                        $scope.$apply($scope.myres);
		                });
		            
		                $stomp.send('/app/score', '');
		         });
		
	
	
		

		
		
		
		
	}
})();
