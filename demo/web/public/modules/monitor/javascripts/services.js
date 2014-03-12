/*  Monitor Services */

var monitorServices = angular.module('monitorServices', [])

monitorServices.service('calculator', function ($rootScope) {
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