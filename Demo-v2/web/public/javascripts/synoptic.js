'use strict';
			
// Define main module and inject all other modules as dependencies
var synopticDemo = angular.module('SynopticDemo',
  [
    'ngRoute',
    'ngSanitize',
    'Monitor',
    'Loader',
    'Dynamics'

  ]
);

// Routing
synopticDemo.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/modules/common/loader/views/index.html',
      controller: 'loaderCtrl'
    })
    .when('/monitor', {
      templateUrl: '/modules/monitor/views/index.html',
      controller: 'monitorCtrl'
    })
    .otherwise({
      templateUrl: '/modules/common/loader/views/index.html',
      controller: 'loaderCtrl'
    });  
})
