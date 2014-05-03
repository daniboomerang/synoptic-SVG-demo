/*  satellite Services */

var satelliteServices = angular.module('satelliteServices', [])

satelliteServices.service('satelliteDataService', function ($rootScope, $http) {
  var satelliteData = new Array(); 

  return {
    pullColorsFromServer : function() {
      satelliteData["rectFill"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      satelliteData["rectBorder"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      console.log("satelliteData boxes fill and border colors in satellite Service: ", satelliteData.rectFill,satelliteData.rectBorder);
      $rootScope.$broadcast('boxesDataChanged', satelliteData);
    },
    pullRandomsFromServer : function() {
      satelliteData["randomA"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomB"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomC"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomD"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomE"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomF"] = Math.floor((Math.random()*100)+1);
      console.log("satelliteData sum RandomA and RandomB in satellite Service: ", satelliteData.randomA,satelliteData.randomB);
      $rootScope.$broadcast('sumDataChanged', satelliteData);
    },
    pullThermoDataFromServer : function() {
      $http.get('/services/satellite/poolData').success(function(data) {
        satelliteData.thermoColor = data.color;
        satelliteData.thermoTemperature = data.temperature;
        console.log("satelliteData thermo color and temperature in satellite Service", satelliteData.thermoColor,satelliteData.thermoTemperature);
        $rootScope.$broadcast('thermoDataChanged', satelliteData);
      }).error(function() {
        console.log('Error in http.post');
      });
    }
 };
});