/* Monitor Controllers */

var monitorControllers = angular.module('monitorControllers', ['monitorServices'])

monitorControllers.controller('monitorCtrl', function($scope, monitorDataService){

  var NUMBER_SVGS;
  var INIT_INDEX;

  $scope.monitorInformation = {
    synopticsInformation: [{synopticName: '', sensibleDataListName: ''}],
    sensibleDataListsInformation: [{sensibleDataListName: '', propertiesList: [{propertyName: '', propertyValue: ''}]}]
  };

  init();

  $scope.previousSynoptic = function() {
    $scope.svgIndex -= 1; 
    if ($scope.svgIndex == -1) {
      $scope.svgIndex = NUMBER_SVGS - 1;
    }
  }
  $scope.nextSynoptic = function() {
    $scope.svgIndex = Math.abs($scope.svgIndex + 1) % $scope.svgs.length;
  }

  function init(){
    console.log ("Init monitor controller");
    $scope.monitorInformation.synopticsInformation = monitorDataService.getSynopticsInformation();      
    $scope.monitorInformation.sensibleDataListsInformation = monitorDataService.getSensibleDataListsInformation();
    var names = [];
    for (var i=0; i<$scope.monitorInformation.synopticsInformation.length; i++){
      names[i] = $scope.monitorInformation.synopticsInformation[i].synopticName;
    }  
    $scope.synoptic = {BOXES: names[0], SUM: names[1], THERMO: names[2]};
    $scope.svgs = [names[0], names[1], names[2]];
    NUMBER_SVGS = $scope.svgs.length;
    INIT_INDEX = 2;
    $scope.svgIndex = INIT_INDEX;
  }
});  

/**************/
/* TERMOMETER */
/**************/

monitorControllers.controller('thermoManagerCtrl', function($scope) {  
});  

monitorControllers.controller('svgThermoCtrl', function($scope, monitorDataService) {  

  init();

  $scope.$on('randomTemperatureChanged', function(event, sensibleDataChanges) {
    
    for (var i=0; i<sensibleDataChanges.length; i++){
      var currentUpdatedProperty = sensibleDataChanges[i];
      $scope.satelliteData[currentUpdatedProperty.propertyName] = currentUpdatedProperty.propertyValue;
    }
  }); 

  function init(){
    $scope.satelliteData = new Array();
    $scope.color = {GREEN: 'green', YELLOW: 'yellow'};
    $scope.satelliteData.thermoColor = $scope.color.GREEN;
    $scope.satelliteData.thermoTemperature = 15;
  }      
});

/**************/
/**************/

/*********/
/* BOXES */
/*********/

monitorControllers.controller('boxesManagerCtrl', function($scope) {
});

monitorControllers.controller('svgBoxesCtrl', function($scope) {  
  $scope.satelliteData = new Array();
  $scope.$on("randomColorsChanged", function(event, sensibleDataChanges) {
    $scope.satelliteData = sensibleDataChanges;
  }); 
});

/********/
/********/
/********/


/*******/
/* SUM */
/*******/

monitorControllers.controller('sumManagerCtrl', function($scope, calculatorService) {
  
  // Statistics
  const MOD_APPLIED = 8;
  $scope.statisticsLenght = MOD_APPLIED;
  $scope.resultsOcurrencies = initArrayToZero(MOD_APPLIED);
  $scope.operationPercentages = [{number:0, percentage:0},{number:1, percentage:0},{number:2, percentage:0},
                                {number:3, percentage:0},{number:4, percentage:0},{number:5, percentage:0},
                                {number:4, percentage:0},{number:7, percentage:0}];
  $scope.result = 0;
  $scope.resultAppliedMOD = $scope.result % MOD_APPLIED;
  var totalOperations = 0;
  
  // Logger
  const LOGGER_RANGE = 13;
  $scope.loggerData = [];
  logMessage('Synoptic Sum server running at => http://localhost:8000/ CTRL + C to shutdown');
  logMessage('Initial interval => 1000ms');

  /* Listening changes on dataServer */
  $scope.$on('randomNumbersChanged', function(event, sensibleDataChanges) {
    calculatorService.performOperation(sensibleDataChanges);
    totalOperations += 1;
      
      //UpdateLogger
      logMessage('RandomA=> ' + sensibleDataChanges["randomA"]);
      logMessage('RandomB=> ' + sensibleDataChanges["randomB"]);
      logMessage('RandomC=> ' + sensibleDataChanges["randomC"]);
      logMessage('RandomD=> ' + sensibleDataChanges["randomD"]);
      logMessage('RandomE=> ' + sensibleDataChanges["randomE"]);
      logMessage('RandomF=> ' + sensibleDataChanges["randomF"]);
      // ProcessStatistics
      // Result mod MOD_APPLIED
      $scope.result = calculatorService.getOperationResult();
      $scope.resultAppliedMOD = $scope.result % MOD_APPLIED;
      $scope.resultsOcurrencies[$scope.resultAppliedMOD] += 1;
      // Recalculate percentages
      for (i=0;i<$scope.operationPercentages.length;i++){
        var percentage = Math.round(($scope.resultsOcurrencies[i] / totalOperations) * 100);
        $scope.operationPercentages[i] = {number: i, percentage: percentage};
      }
      $scope.operationPercentages.sort(function comparePercentages(a, b) {
        return b.percentage - a.percentage;
    });
  });

  function getCurrentDate() {
      // Today date time which will used to set as default date.
      var todayDate = new Date();
      todayDate = todayDate.getFullYear() + "-" +
                     ("0" + (todayDate.getMonth() + 1)).slice(-2) + "-" +
                     ("0" + todayDate.getDate()).slice(-2) + " " + ("0" + todayDate.getHours()).slice(-2) + ":" +
                     ("0" + todayDate.getMinutes()).slice(-2);

      return todayDate;
  };

  function logMessage(message){
    var auxArray = [];
    $scope.loggerData.push(getCurrentDate() + '# ' + 'root@synopticDemo> ' + message);
    if ($scope.loggerData.length % LOGGER_RANGE == 0){
      for (var i=$scope.loggerData.length-1;i>=1;i--){
        auxArray[i] = $scope.loggerData[i+1];
      } 
      $scope.loggerData = auxArray.slice(0,LOGGER_RANGE-1);
      $scope.loggerData.lenght = 0;
    }
  };

  function initArrayToZero(length){
    var array = [];
    for (var i=0;i<length;i++){
      array[i] = 0;
    } 
    return array;
  };
});

monitorControllers.controller('svgSumCtrl', function($scope, calculatorService) {  
  $scope.operation = [];
  $scope.resultMod8 = 0;
  $scope.operation['A']=0; $scope.operation['B']=0; $scope.operation['C']=0;
  $scope.operation['D']=0; $scope.operation['E']=0; $scope.operation['F']=0;
  $scope.operation['resultAB']=0; $scope.operation['resultCD']= 0; $scope.operation['resultEF']=0; $scope.operation['result']=0;     
  $scope.$on('operationPerformed', function(event, operationPerformed) {   
      $scope.operation = operationPerformed;
      $scope.resultMod8 = calculatorService.getOperationResult() % 8;
  }); 
});

/*******/
/*******/
/*******/

/******** COMMON: THE REMOTE CONTROL ********/

monitorControllers.controller('remoteCtrl', function($scope, $interval, pollDataService) {

  var stop;

  init();

  $scope.startPolling = function() {
    // Don't start a new pulling if we are already pulling
    if (angular.isDefined(stop)) return;
    stop = $interval(function() {
      pollDataService.pollServer();
    }, $scope.timeInterval);
  };

  $scope.stopPolling = function() {
    if (angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop = undefined;
    }
  };

  $scope.updateInterval = function(newInterval) {
    $scope.timeInterval = newInterval;
    this.stopPolling();
    this.startPolling();      
  };

  $scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    $scope.stopPolling();
  });

  function init(){
    $scope.timeInterval = 1000;
  }
});

/******** COMMON: THE LOGGER ********/

monitorControllers.controller('loggerCtrl', function($scope, $interval, monitorDataService) {

/*
  const LOGGER_RANGE = 13;
  $scope.loggerData = [];
  logMessage('Ready to monitor...');
  $scope.$on($scope.sensibleDataList + 'Changed', function(event, sensibleDataChanges) {
      //updateLogger
      logMessage('Fill=> ' + sensibleDataChanges["rectFill"]);
      logMessage('Border=> ' + sensibleDataChanges["rectBorder"]);
  });

  function logMessage(message){
    var auxArray = [];
    $scope.loggerData.push(getCurrentDate() + ' # ' + $scope.sensibleDataList + '>' + message);
    if ($scope.loggerData.length % LOGGER_RANGE == 0){
      for (var i=$scope.loggerData.length-1;i>=1;i--){
        auxArray[i] = $scope.loggerData[i+1];
      } 
      $scope.loggerData = auxArray.slice(0,LOGGER_RANGE-1);
      $scope.loggerData.lenght = 0;
    }
  };

  function getCurrentDate() {
    // Today date time which will used to set as default date.
    var todayDate = new Date();
    todayDate = todayDate.getFullYear() + "-" +
                   ("0" + (todayDate.getMonth() + 1)).slice(-2) + "-" +
                   ("0" + todayDate.getDate()).slice(-2) + " " + ("0" + todayDate.getHours()).slice(-2) + ":" +
                   ("0" + todayDate.getMinutes()).slice(-2);

    return todayDate;
  };*/
});

