/*  Monitor Services */

var monitorServices = angular.module('monitorServices', ['satelliteServices', 'dynamicsServices'])

monitorServices.service('pollDataService', function (satelliteDataService) {
  return {
    pollServer : function() {
      satelliteDataService.pollThermoDataFromServer();
      satelliteDataService.pollColorsFromServer();
      satelliteDataService.pollRandomsFromServer();
    }
  };    
});

monitorServices.service('monitorDataService', function (dynamicsProcessorService, $rootScope) {
  
  var synopticsInformation = [];  //[{synopticName: '', sensibleDataListName: ''}]
  var sensibleDataLists = [];  //[{sensibleDataListName: '', propertiesList: [{propertyName: '', propertyValue: ''}]}]
  
  function broadcastChanges(sensibleDataListName, updatedPropertiesList){
    $rootScope.$broadcast(sensibleDataListName + 'Changed', updatedPropertiesList);
  }

  function updateSensibleContent(propertyChangesList){

    function belongsAndUpdates(property, propertiesList){
      // Returns the index of the property with a different property value (This means that will be updated)
      // Otherwise, returns null
      for (var i=0; i<propertiesList.length; i++){
        if ((propertiesList[i].propertyName == property.propertyName) && !(propertiesList[i].propertyValue == property.propertyValue))
          return i;
      }
      return null;
    }
    
    if (!(propertyChangesList == null)){
      for (var i=0; i<sensibleDataLists.length; i++){
        var currentDataList = sensibleDataLists[i];
        var currentDataListName = currentDataList.sensibleDataListName;
        var currentUpdatedProperties = [];
        for (var j=0; j<propertyChangesList.length; j++){
          var currentPropertyValueChange = propertyChangesList[j];
          // if belongs and updates the properties list, we update the list and push the updated value
          var propertyIndexToUpdate = belongsAndUpdates(currentPropertyValueChange, currentDataList.propertiesList);
          if (!(propertyIndexToUpdate == null)){
            // We update the value and create the list of properties that will be broadcasted
            currentDataList.propertiesList[propertyIndexToUpdate].propertyValue = currentPropertyValueChange.propertyValue;
            currentUpdatedProperties.push(currentPropertyValueChange);
          }
        }  
        if (currentUpdatedProperties.length > 0){
            broadcastChanges(currentDataListName, currentUpdatedProperties);
        }  
      }  
    }
  }

  return {

    setSynopticsInformation : function(synopticsInfo) {
      synopticsInformation = synopticsInfo;
    },
    setSensibleDataListsInformation : function(sensibleDataListsInfo) {
      sensibleDataLists = sensibleDataListsInfo;
    },
    getSynopticsInformation : function(){
      return synopticsInformation;
    },
    getSensibleDataListsInformation : function(){
      return sensibleDataLists;
    },
    processSatelliteNotification : function(satelliteData) {
      var propertyChangesList = dynamicsProcessorService.applyDynamics(satelliteData);
      updateSensibleContent(propertyChangesList);
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
      $rootScope.$broadcast('operationPerformed', operation);
    },
    getOperationResult : function(){
      return operation.result;
    }
  };
}); 


/*monitorServices.service('monitorInformationService', function () {
  
  var synopticsInformation = [];  //[{synopticName: '', sensibleDataListName: ''}]
  var sensibleDataLists = [];  //[{sensibleDataListName: '', propertiesList: [{propertyName: '', propertyValue: ''}]}]

  return {
    setSynopticsInfo : function(synopticsInfo) {
      synopticsInformation = synopticsInfo;
    },
    setSensibleDataListsInf : function(sensibleDataListsDefs) {
     sensibleDataLists = sensibleDataListsDefs;
     console.log("monitorInfoService.sensibleDataLists[0]: " + sensibleDataListsDefs[0].sensibleDataListName);
    },
    getSensibleDataListsInfo : function(){
      return sensibleDataLists;
    },
    getSynopticsInfo : function(){
      return synopticsInformation;
    }
  };
});*/ 