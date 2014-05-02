/*  Loader Services */

var loaderServices = angular.module('loaderServices', ['monitorServices'])

loaderServices.service('loadConfigurationService', function ($http, monitorConfigurationService) {

  var configurationData = {
    synopticsInformation: {
      data: {
        synopticNames: []
      },
      isLoaded: false
    },
    dynamicsInformation: {
      data: {
        dynamicPaths: []
      },
      isLoaded: false
    }
  };


  return {

    loadMonitorInformation : function(deferred) {
      if (!configurationData.synopticsInformation.isLoaded) {
        console.log("No Cache");
        deferred.notify("0-Retrieving synoptics information from server...");
        return $http.get('/services/configuration/loadSynopticsData').success(function(data) {

          configurationData.synopticsInformation.data = data;
          configurationData.synopticsInformation.isLoaded = true;         
          deferred.notify("45-Synoptics information loaded....");
          
          // Seting up the module monitor
          monitorConfigurationService.setMonitorConfiguration(configurationData.synopticsInformation.data);
          deferred.notify("10-Module monitor set...");
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

    loadDynamicsInformation : function(deferred) {
      if (!configurationData.dynamicsInformation.isLoaded) {
        deferred.notify("0-Retrieving synoptics information from server...");
        return $http.get('/services/configuration/loadDynamicsData').success(function(data) {
          
          configurationData.dynamicsInformation.isLoaded = true;
          deferred.notify("35-Dynamics information loaded...");
          
          // Seting up the module dynamics
          //setupMonitorService.setupComponentMonitor(synopticsInformation);
          deferred.notify("10-Module dynamics set...");
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