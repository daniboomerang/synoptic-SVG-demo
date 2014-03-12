/* Monitor Controllers */

var monitorControllers = angular.module('monitorControllers', ['sateliteServices'])

monitorControllers.controller('MonitorCtrl', function($scope){

  var NUMBER_SVGS;
  var INIT_INDEX;

  init();


  $scope.previousSynoptic = function() {
    console.log($scope.svgs[$scope.svgIndex]);
    console.log($scope.svgIndex);
    console.log("Math.abs($scope.svgIndex - 1)", Math.abs($scope.svgIndex - 1));
    $scope.svgIndex -= 1; 
    if ($scope.svgIndex == -1) {
      $scope.svgIndex = NUMBER_SVGS - 1;
    }
    console.log($scope.svgs[$scope.svgIndex]);
    console.log($scope.svgIndex);
  }
  $scope.nextSynoptic = function() {
    console.log($scope.svgIndex);      
    console.log($scope.svgs[$scope.svgIndex]);
    console.log("Math.abs($scope.svgIndex + 1)", Math.abs($scope.svgIndex + 1));
    $scope.svgIndex = Math.abs($scope.svgIndex + 1) % $scope.svgs.length;
    console.log($scope.svgIndex);      
    console.log($scope.svgs[$scope.svgIndex]);
  }

  function init(){
    $scope.synoptic = {BOXES: 'boxes', SUM: 'sum', THERMO: 'thermo'};
    $scope.svgs = ['boxes', 'sum', 'thermo'];
    NUMBER_SVGS = $scope.svgs.length;
    INIT_INDEX = 2;
    $scope.svgIndex = INIT_INDEX;;
  }
});  

monitorControllers.controller('thermoManagerCtrl', function($scope, dataServerService) {  
  $scope.timeInterval = 1000;

  // The remote control
  $scope.updateInterval = function(timeInterval) {
    $scope.timeInterval = timeInterval;
    this.stopPulling();
    this.startPulling();      
  };

  $scope.startPulling = function() {
    $scope.timer = setInterval(this.refresh, $scope.timeInterval);
  };

  $scope.stopPulling = function() {
    clearInterval($scope.timer);
  };  

  $scope.refresh = function() {
    dataServerService.pullThermoDataFromServer();
  };
}); 

monitorControllers.controller('svgThermoCtrl', function($scope, dataServerService) {  

  init();

  $scope.$on('degreesChanged', function(event, dataServerArray) {
    $scope.serverData = dataServerArray;  
  }); 

  function init(){
    $scope.serverData = new Array();
    $scope.green = 'green';
    $scope.yellow = 'yellow';
  }      
});

monitorControllers.controller('boxesManagerCtrl', function($scope, dataServerService) {  
  $scope.timeInterval = 1000;
  const LOGGER_RANGE = 13;
  $scope.loggerData = [];
  logMessage('Synoptic Boxes server running at => http://localhost:8000/ CTRL + C to shutdown');
  logMessage('Initial interval => 1000ms');
  $scope.$on('colorsServerChanged', function(event, dataServerArray) {
    $scope.$apply(function () {
      //updateLogger
      logMessage('Fill=> ' + dataServerArray["rectFill"]);
      logMessage('Border=> ' + dataServerArray["rectBorder"]);
      //processStatistics
      //* TO  DO */
      if (dataServerArray["rectFill"] == dataServerArray["rectBorder"]){
        logMessage("Match fill and border => " + dataServerArray["rectBorder"]);          
      }
    });
  });

  // The remote control
  $scope.updateInterval = function(timeInterval) {
    logMessage('timermeInterval = ' + timeInterval);
    logMessage('Synchronizing...');  
    $scope.timeInterval = timeInterval;
    this.stopPulling();
    this.startPulling();      
  };

  $scope.startPulling = function() {
    logMessage('Pulling data from server...');  
    $scope.timer = setInterval(this.refresh, $scope.timeInterval);
  };

  $scope.stopPulling = function() {
    logMessage('Stopping simulation...');  
    clearInterval($scope.timer);
  };  

  $scope.refresh = function() {  
    dataServerService.pullcolorsFromServer();
  };

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
    console.log(" logMessage is finishing");     
  };

});

monitorControllers.controller('svgBoxesCtrl', function($scope, dataServerService) {  
  $scope.serverData = new Array();
  $scope.$on('colorsServerChanged', function(event, dataServerArray) {
    $scope.serverData = dataServerArray;
  }); 
});

monitorControllers.controller('sumManagerCtrl', function($scope, dataServerService, calculator) {
  $scope.timeInterval = 1000; 

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
  $scope.$on('randomsServerChanged', function(event, randomsServerArray) {
    calculator.performRandomOperation(randomsServerArray);
    totalOperations += 1;
    $scope.$apply(function () {
      
      //UpdateLogger
      logMessage('RandomA=> ' + randomsServerArray["randomA"]);
      logMessage('RandomB=> ' + randomsServerArray["randomB"]);
      logMessage('RandomC=> ' + randomsServerArray["randomC"]);
      logMessage('RandomD=> ' + randomsServerArray["randomD"]);
      logMessage('RandomE=> ' + randomsServerArray["randomE"]);
      logMessage('RandomF=> ' + randomsServerArray["randomF"]);
      // ProcessStatistics
      // Result mod MOD_APPLIED
      $scope.result = calculator.getOperationResult();
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
  });

  // The remote control
  $scope.updateInterval = function(timeInterval) {
    logMessage('timermeInterval = ' + timeInterval);
    logMessage('Synchronizing...');  
    $scope.timeInterval = timeInterval;
    this.stopPulling();
    this.startPulling();      
  };

  $scope.startPulling = function() {
    logMessage('Pulling data from server...');  
    $scope.timer = setInterval(this.refresh, $scope.timeInterval);
  };

  $scope.stopPulling = function() {
    logMessage('Stopping simulation...');  
    clearInterval($scope.timer);
  };  

  $scope.refresh = function() {  
    dataServerService.pullRandomsFromServer();
  };

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
    console.log(" logMessage is finishing");     
  };

  function initArrayToZero(length){
    var array = [];
    for (var i=0;i<length;i++){
      array[i] = 0;
    } 
    return array;
  };
});

monitorControllers.controller('svgSumCtrl', function($scope, calculator) {  
  $scope.operation = [];
  $scope.resultMod8 = 0;
  $scope.operation['A']=0; $scope.operation['B']=0; $scope.operation['C']=0;
  $scope.operation['D']=0; $scope.operation['E']=0; $scope.operation['F']=0;
  $scope.operation['resultAB']=0; $scope.operation['resultCD']= 0; $scope.operation['resultEF']=0; $scope.operation['result']=0;     
  $scope.$on('operationPerformed', function(event, operationPerformed) {   
      $scope.operation = operationPerformed;
      $scope.resultMod8 = calculator.getOperationResult() % 8;
  }); 
});


