'use strict';
      
// Defines Monitor module and injects all other modules as dependencies
var monitor = angular.module('Monitor',
  [
    'monitorControllers',
    'monitorDirectives',
    'monitorServices'
  ]
);


