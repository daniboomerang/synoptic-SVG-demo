/*  Monitor Services */

var monitorServices = angular.module('monitorServices', [])

monitorServices.service('dataServerService', function ($rootScope, $http) {
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
})

monitorServices.service('calculator', function ($rootScope) {
    var operation = {
      A: 0, B: 0, C: 0, D: 0, E: 0, F: 0,
      resultAB: 0,
      resultCD: 0,
      resultEF: 0,
      result: 0, 
    }    
    return {
      performRandomOperation : function(randomsServerArray) {
        operation.A = randomsServerArray["randomA"]; operation.B = randomsServerArray["randomB"];
        operation.C = randomsServerArray["randomC"]; operation.D = randomsServerArray["randomD"];
        operation.E = randomsServerArray["randomA"]; operation.F = randomsServerArray["randomA"];
        operation.resultAB = randomsServerArray["randomA"] + randomsServerArray["randomB"];
        operation.resultCD = randomsServerArray["randomC"] + randomsServerArray["randomD"];
        operation.resultEF = randomsServerArray["randomE"] + randomsServerArray["randomF"];
        operation.result = operation.resultAB + operation.resultCD + operation.resultEF;
        console.log("performing operation and result is ", operation.result);
        $rootScope.$broadcast('operationPerformed', operation);
      },
      getOperationResult : function(){
        return operation.result;
      }
   };
  });


