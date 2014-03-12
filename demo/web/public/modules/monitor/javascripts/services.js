/*  Monitor Services */

var monitorServices = angular.module('monitorServices', [])

monitorServices.service('calculator', function ($rootScope) {
    var randomsServerArray = new Array(); 
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