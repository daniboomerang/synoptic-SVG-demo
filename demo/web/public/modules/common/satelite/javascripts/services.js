/*  Satelite Services */

var sateliteServices = angular.module('sateliteServices', [])

sateliteServices.service('sateliteDataService', function ($rootScope, $http) {
  var dataServerArray = new Array(); 
  var randomsServerArray = new Array(); 

  return {
    pullcolorsFromServer : function() {
      dataServerArray["rectFill"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      dataServerArray["rectBorder"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      $rootScope.$broadcast('colorsServerChanged', dataServerArray);
    },
    pullRandomsFromServer : function() {
      randomsServerArray["randomA"] = Math.floor((Math.random()*100)+1);
      randomsServerArray["randomB"] = Math.floor((Math.random()*100)+1);
      randomsServerArray["randomC"] = Math.floor((Math.random()*100)+1);
      randomsServerArray["randomD"] = Math.floor((Math.random()*100)+1);
      randomsServerArray["randomE"] = Math.floor((Math.random()*100)+1);
      randomsServerArray["randomF"] = Math.floor((Math.random()*100)+1);
      $rootScope.$broadcast('randomsServerChanged', randomsServerArray);
    },
    pullThermoDataFromServer : function() {
      $http.post('/services/satelite/poolData').success(function(data) {
        dataServerArray.thermoColor = data.color;
        dataServerArray.thermoTemperature = data.temperature;
        console.log('data.color', data.color);
        console.log('data.temperature', data.temperature);
        $rootScope.$broadcast('degreesChanged', dataServerArray);
      }).error(function() {
        console.log('Error in http.post');
      });
    },
 };
});