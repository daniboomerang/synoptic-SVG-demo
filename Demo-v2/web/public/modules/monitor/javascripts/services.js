/*  Monitor Services */

var monitorServices = angular.module('monitorServices', ['satelliteServices'])

monitorServices.service('monitorConfigurationService', function ($rootScope) {
  
  var configurationData = {
    synopticNames: []
  };

  return {
    setMonitorConfiguration : function(data) {
    configurationData = data;
    },
    getMonitorConfiguration : function() {
    return configurationData;
    }
 };
});

monitorServices.service('calculatorService', function ($rootScope) {
    var numbers = new Array(); 
    var operation = {
      A: 0, B: 0, C: 0, D: 0, E: 0, F: 0,
      resultAB: 0,
      resultCD: 0,
      resultEF: 0,
      result: 0, 
    }    
    return {
      performOperation : function(numbers) {
        operation.A = numbers["randomA"]; operation.B = numbers["randomB"];
        operation.C = numbers["randomC"]; operation.D = numbers["randomD"];
        operation.E = numbers["randomA"]; operation.F = numbers["randomA"];
        operation.resultAB = numbers["randomA"] + numbers["randomB"];
        operation.resultCD = numbers["randomC"] + numbers["randomD"];
        operation.resultEF = numbers["randomE"] + numbers["randomF"];
        operation.result = operation.resultAB + operation.resultCD + operation.resultEF;
        console.log("performing operation and result is ", operation.result);
        $rootScope.$broadcast('operationPerformed', operation);
      },
      getOperationResult : function(){
        return operation.result;
      }
   };
  });

monitorServices.service('sensibleDataService', function (satelliteDataService) {
  var newSensibleData = new Array();
  return {
    getSensibleData : function(sensibleData) {
      if (sensibleData == 'thermoData'){
        console.log("refresh", sensibleData);
        satelliteDataService.pullThermoDataFromServer();
      }  
      else if (sensibleData == 'boxesData'){
        console.log("refresh", sensibleData);
        satelliteDataService.pullColorsFromServer();
      }  
      else if (sensibleData == 'sumData'){
        console.log("refresh", sensibleData);
        satelliteDataService.pullRandomsFromServer();
      }
      /*$rootScope.$on('boxesDataChanged', function(event, satelliteData) {
        console.log('sensibleDataService just listened and event: $rootScope.$on boxesDataChanged');
        newSensibleData = satelliteData;
        console.log("boxesSensibleData in MonitorService: fill & border colors: ", newSensibleData.rectFill, newSensibleData.rectBorder);
      });
      $scope.$on('sumDataChanged', function(event, satelliteData) {
        console.log('sensibleDataService just listened and event: $rootScope.$on sumDataChanged');
        newSensibleData = satelliteData;
        console.log("sumSensibleData in MonitorService RandomA & RandomB: ", newSensibleData.randomA, newSensibleData.randomB);
      }); 
      $scope.$on('thermoDataChanged', function(event, satelliteData) {
        console.log('sensibleDataService just listened and event: $rootScope.$on thermoDataChanged');
        newSensibleData = satelliteData;
        console.log("thermoSensibleData in MonitorService Color & Temperature: ", newSensibleData.thermoColor, newSensibleData.thermoTemperature);      });*/
    }
  }    
});