'use strict';
			
// Define main module and inject all other modules as dependencies
var synopticDemo = angular.module('SynopticDemo',
  [
    'ngRoute',
    'ngSanitize',
    'Monitor'
  ]
);

// Routing
synopticDemo.config(function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: '/modules/monitor/views/index.html',
            controller: 'MonitorCtrl'
          })
          $routeProvider.otherwise({
            templateUrl: '/modules/monitor/views/index.html',
            controller: 'MonitorCtrl'
          })  
        })
