/*  Dynamics Services */

var dynamicsServices = angular.module('dynamicsServices', [])

dynamicsServices.service('dynamicsConfigurationService', function () {
  
  var configurationData = {
    dynamicsFilePath: []
  };

  return {
    setDynamicsConfiguration : function(data) {
    configurationData = data;
    }
 };
});

dynamicsServices.service('dynamicsProcessorService', function () {
  
  // List of new values in the properties of the synoptics
  var propertyValueChangesList = [];

  function applyRules(newData){

    propertyValueChangesList = []; //Emptying the list of changes

    /* Hardcoding Thermometer dynamic */
    if (newData.name == "Temperature"){
      if (newData.value > 60)
        propertyValueChangesList.push({ThermoColor: "yellow"});
      if (newData.value > 85)
        propertyValueChangesList.push({ThermoColor: "red"});
      else
        propertyValueChangesList.push({ThermoColor: "green"});
    }
  }

  return {

    processDynamics : function(sateliteData) {
      for (var i=0;sateliteData.length;i++)
      { applyRules(sateliteData[i]); }  
    return propertyValueChangesList;
    }

 };
});