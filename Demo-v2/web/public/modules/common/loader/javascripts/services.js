/*  Loader Services */

var loaderServices = angular.module('loaderServices', ['monitorServices'])

loaderServices.service('loadConfigurationService', function ($http, monitorDataService) {

  var configurationData = {
    synopticsInformation: {
      data:
        [{synopticName: '', sensibleDataListName: ''}],
      isLoaded: false
    },
    dynamicsInformation: {
      data: {
        dynamicPaths: []
      },
      isLoaded: false
    },
    sensibleDataListsInformation: {
      data:
        [{sensibleDataListName: '', defaultPropertiesContent: [{propertyName: '', propertyValue: ''}]}],
      isLoaded: false  
    }  
  };


  return {

    loadSynopticsInformation : function(deferred) {
      if (!configurationData.synopticsInformation.isLoaded) {
        console.log("No Cache for synoptics information");
        deferred.notify("0-Retrieving synoptics information from server...");
        return $http.get('/services/configuration/loadSynopticsData').success(function(data) {

          configurationData.synopticsInformation.data = data;
          configurationData.synopticsInformation.isLoaded = true;         
          deferred.notify("35-Synoptics information loaded....");      
          
          // Adding synoptics info to the module monitor
          monitorDataService.setSynopticsInformation(configurationData.synopticsInformation.data);
          deferred.notify("5-Synoptics information set...");
          return deferred.resolve();

          //console.log(configurationData.data.synopticNames[0], configurationData.data.synopticNames[1], configurationData.data.synopticNames[2]);
        }).error(function() {
          console.error('Failed to load synoptics information.');
          return deferred.reject('Failed to load synoptics information.');
        });
      } else {
          return deferred.resolve();
      }
    },

    loadSensibleDataListsInformation : function(deferred) {
      if (!configurationData.sensibleDataListsInformation.isLoaded) {
        console.log("No Cache for sensible data lists information");
        deferred.notify("0-Retrieving sensible data lists from server...");
        return $http.get('/services/configuration/loadSensibleListsData').success(function(data) {

          deferred.notify("35-Sensible data lists information loaded....");

          configurationData.sensibleDataListsInformation.data = data;
          console.log("loadSensibleDataListsInformation[0] " + data[0].sensibleDataListName);
          configurationData.sensibleDataListsInformation.isLoaded = true;         
          
          // Adding sensible data lists to monitor
          monitorDataService.setSensibleDataListsInformation(configurationData.sensibleDataListsInformation.data);

          deferred.notify("5-Sensible data information set...");
          return deferred.resolve();

          //console.log(configurationData.data.synopticNames[0], configurationData.data.synopticNames[1], configurationData.data.synopticNames[2]);
        }).error(function() {
          console.error('Failed to load sensible data lists information.');
          return deferred.reject('Failed to load sensible data lists information.');
        });
      } else {
          return deferred.resolve();
      }
    },

    loadDynamicsInformation : function(deferred) {
      if (!configurationData.dynamicsInformation.isLoaded) {
        console.log("No Cache for dynamics information");
        deferred.notify("0-Retrieving synoptics information from server...");
        return $http.get('/services/configuration/loadDynamicsData').success(function(data) {
          
          configurationData.dynamicsInformation.isLoaded = true;
          deferred.notify("15-Dynamics information loaded...");
          
          // Seting up the module dynamics
          //setupMonitorService.setupComponentMonitor(synopticsInformation);
          deferred.notify("5-Dynamics information set...");
          return deferred.resolve();

        }).error(function() {
          console.error('Failed to load dynamics information.');
          if (deferred) {
            return deferred.reject();
          }
        });
      } else {
          return deferred.resolve();
      }
    }  
  };
});