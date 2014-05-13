
var loaderControllers = angular.module('loaderControllers', ['loaderServices'])

loaderControllers.controller('loaderCtrl', function($scope, $q, $timeout, $location, loadConfigurationService){

  $scope.loadingMessage = "Starting module loader...";
  $scope.loadingPercentage = 0;
  
  function loadSynopticsInformation() {
    var deferred = $q.defer(); 
    loadConfigurationService.loadSynopticsInformation(deferred);
    return deferred.promise;
  }

  function loadSensibleDataListsInformation() {
    var deferred = $q.defer(); 
    loadConfigurationService.loadSensibleDataListsInformation(deferred);
    return deferred.promise;
  }

  function loadDynamicsInformation() {
    var deferred = $q.defer(); 
    loadConfigurationService.loadDynamicsInformation(deferred);
    return deferred.promise;
  }

  function loadMonitorPage(){
    console.log("Loading monitor page...");
    $timeout(function() {$location.url('/monitor');}, 4000);

  }

  var promiseSynoptics = loadSynopticsInformation();
  promiseSynoptics.then(function() {
    if ($scope.loadingPercentage == 100)
      loadMonitorPage();
  }, function(reason) {
    $scope.loadingMessage = 'Ups...it has been an error loading the synoptics information: ' + reason;
  }, function(update) {
    $scope.loadingPercentage = $scope.loadingPercentage + parseInt(update.split("-")[0]);
    $scope.loadingMessage = update.split("-")[1];
  }); 

  var promiseSensibleData = loadSensibleDataListsInformation();
  promiseSensibleData.then(function() {
    if ($scope.loadingPercentage == 100)
      loadMonitorPage();
  }, function(reason) {
    $scope.loadingMessage = 'Ups...it has been an error loading the sensible data lists information: ' + reason;
  }, function(update) {
    $scope.loadingPercentage = $scope.loadingPercentage + parseInt(update.split("-")[0]);
    $scope.loadingMessage = update.split("-")[1];
  }); 

  var promiseDynamics = loadDynamicsInformation();
  promiseDynamics.then(function() {
    if ($scope.loadingPercentage == 100)
      loadMonitorPage();
  }, function(reason) {
    $scope.loadingMessage = 'Ups...it has been an error loading dynamics information: ' + reason;
  }, function(update) {
    $scope.loadingPercentage = $scope.loadingPercentage + parseInt(update.split("-")[0]);
    $scope.loadingMessage = update.split("-")[1];
  });

 }); 