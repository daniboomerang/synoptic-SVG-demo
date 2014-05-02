
var loaderControllers = angular.module('loaderControllers', ['loaderServices'])

loaderControllers.controller('loaderCtrl', function($scope, $q, $timeout, $location, loadConfigurationService){

  $scope.loadingMessage = "Starting module loader...";
  $scope.loadingPercentage = 0;
  
  function loadMonitorInformation() {
    var deferred = $q.defer(); 
    loadConfigurationService.loadMonitorInformation(deferred);
    return deferred.promise;
  }

  function loadDynamicsInformation() {
    var deferred = $q.defer(); 
    loadConfigurationService.loadDynamicsInformation(deferred);
    return deferred.promise;
  }

  function loadMonitorPage(){
    $timeout(function() {$location.url('/modules/monitor/views/index.html');}, 2000);

  }

  var promiseMonitor = loadMonitorInformation();
  promiseMonitor.then(function() {
    if ($scope.loadingPercentage == 100)
      loadMonitorPage();
  }, function(reason) {
    $scope.loadingMessage = 'Ups...it has been an error loading monitor information: ' + reason;
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