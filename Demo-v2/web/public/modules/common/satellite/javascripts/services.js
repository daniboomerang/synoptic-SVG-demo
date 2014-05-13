/*  satellite Services */

var satelliteServices = angular.module('satelliteServices', ['monitorServices'])

satelliteServices.service('satelliteDataService', function ($http, $rootScope, monitorDataService) {
  var satelliteData = new Array(); 

  return {
    pollColorsFromServer : function() {
      satelliteData["rectFill"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      satelliteData["rectBorder"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      console.log("satelliteData boxes fill and border colors in satellite Service: ", satelliteData.rectFill,satelliteData.rectBorder);
      $rootScope.$broadcast("randomColorsChanged", satelliteData);
    },
    pollRandomsFromServer : function() {
      satelliteData["randomA"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomB"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomC"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomD"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomE"] = Math.floor((Math.random()*100)+1);
      satelliteData["randomF"] = Math.floor((Math.random()*100)+1);
      console.log("satelliteData sum RandomA and RandomB in satellite Service: ", satelliteData.randomA,satelliteData.randomB);
      $rootScope.$broadcast('randomNumbersChanged', satelliteData);
    },
    pollThermoDataFromServer : function() {
      $http.get('/services/satellite/pollData').success(function(data) {
        monitorDataService.processSatelliteNotification(data);
      }).error(function() {
        console.log('Error in http.post');
      });
    }
  };
});