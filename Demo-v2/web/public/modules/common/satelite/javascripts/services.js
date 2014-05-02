/*  Satelite Services */

var sateliteServices = angular.module('sateliteServices', [])

sateliteServices.service('sateliteDataService', function ($rootScope, $http) {
  var sateliteData = new Array(); 

  return {
    pullColorsFromServer : function() {
      sateliteData["rectFill"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      sateliteData["rectBorder"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      console.log("sateliteData boxes fill and border colors in Satelite Service: ", sateliteData.rectFill,sateliteData.rectBorder);
      $rootScope.$broadcast('boxesDataChanged', sateliteData);
    },
    pullRandomsFromServer : function() {
      sateliteData["randomA"] = Math.floor((Math.random()*100)+1);
      sateliteData["randomB"] = Math.floor((Math.random()*100)+1);
      sateliteData["randomC"] = Math.floor((Math.random()*100)+1);
      sateliteData["randomD"] = Math.floor((Math.random()*100)+1);
      sateliteData["randomE"] = Math.floor((Math.random()*100)+1);
      sateliteData["randomF"] = Math.floor((Math.random()*100)+1);
      console.log("sateliteData sum RandomA and RandomB in Satelite Service: ", sateliteData.randomA,sateliteData.randomB);
      $rootScope.$broadcast('sumDataChanged', sateliteData);
    },
    pullThermoDataFromServer : function() {
      $http.get('/services/satelite/poolData').success(function(data) {
        sateliteData.thermoColor = data.color;
        sateliteData.thermoTemperature = data.temperature;
        console.log("sateliteData thermo color and temperature in Satelite Service", sateliteData.thermoColor,sateliteData.thermoTemperature);
        $rootScope.$broadcast('thermoDataChanged', sateliteData);
      }).error(function() {
        console.log('Error in http.post');
      });
    }
 };
});