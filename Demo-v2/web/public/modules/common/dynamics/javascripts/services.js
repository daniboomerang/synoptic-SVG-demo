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
  
  // List of new propertyValues in the properties of the synoptics
  var propertyChangesList = [];

  return {

    applyDynamics : function(satelliteData) {

      function applyRules(newData){
        console.log("ApplyRules");
        propertyChangesList = []; //Emptying the list of changes
        /* Hardcoding Thermometer dynamic */
        if (newData.name == "temperature"){
          propertyChangesList.push({propertyName: "thermoTemperature", propertyValue: newData.value});
          if (newData.value <= 60) 
            propertyChangesList.push({propertyName: "thermoColor", propertyValue: "green"});
          if (newData.value > 60)
            propertyChangesList.push({propertyName: "thermoColor", propertyValue: "yellow"});
          if (newData.value > 85)
            propertyChangesList.push({propertyName: "thermoColor", propertyValue: "red"});
        }
      }
      
      for (var i=0; i<satelliteData.length; i++){
        applyRules(satelliteData[i]);
      }  
      return propertyChangesList;
    }

 };
});