angular.module('synopticDemo', ['sticky'])

  .service('dataServerService', function ($rootScope) {
    var dataServerArray = new Array(); 
        console.log("dataServerService dataServerArray", dataServerArray); 

    return {
      pullDataFromServer : function() {
        dataServerArray["rectFill"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        dataServerArray["rectBorder"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        $rootScope.$broadcast('dataServerChanged', dataServerArray);
        console.log("pullDataFromServer", dataServerArray["rectFill"], dataServerArray["rectBorder"]); 
      },
      getDataServer : function() {
        return dataServerArray;
      }
   };
  })
  
  .controller('synopticCtrl', function($scope){
    $scope.synoptic = {BOXES: 'boxes', OTHER: 'other'};
    $scope.svgs = ['boxes', 'other'];
    $scope.svgIndex = 0;
    $scope.previousSynoptic = function() {
      $scope.svgIndex = Math.abs($scope.svgIndex - 1) % $scope.svgs.length;
    }
    $scope.nextSynoptic = function() {
      $scope.svgIndex = ($scope.svgIndex + 1) % $scope.svgs.length;
    }
  })

  .controller('boxesManagerCtrl', function($scope, dataServerService) {  
    $scope.timeInterval = 1000;
    $scope.loggerData = [];

    logMessage('Synoptic Demo server running at => http://localhost:8000/ CTRL + C to shutdown');
    logMessage('Initial interval => 1000ms');
    $scope.serverData = new Array();
    $scope.statistics = new Array();
   

    $scope.$on('dataServerChanged', function(event, dataServerArray) {
      $sserverData = dataServerArray;
      $scope.$apply(function () {
        //updateLogger
        logMessage('Fill=> ' + dataServerArray["rectFill"]);
        logMessage('Border=> ' + dataServerArray["rectBorder"]);
        //processStatistics
        $scope.statistics = dataServerArray;
      });
    });

    // The remote control
    $scope.updateInterval = function(timeInterval) {
      logMessage('timeInterval = ', timeInterval);
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
      dataServerService.pullDataFromServer();
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
      if ($scope.loggerData.length % 13 == 0){
        for (var i=$scope.loggerData.length-1;i>=1;i--){
          auxArray[i] = $scope.loggerData[i+1];
        } 
        $scope.loggerData = auxArray.slice(0,12);
        $scope.loggerData.lenght = 0;
      }
      console.log(" logMessage is finishing");     
    };
  }) 

  .controller('svgBoxesCtrl', function($scope, dataServerService) {  
    $scope.serverData = new Array();
    $scope.$on('dataServerChanged', function(event, dataServerArray) {
      $scope.serverData = dataServerArray;
      $scope.$apply(function () {
        $scope.serverData = dataServerArray;
      });
    }); 
  })

  .controller('simpleSwitchCtrl', function($scope, dataServerService) {  
    $scope.timeInterval = 1000;
    $scope.serverData = new Array();
    $scope.$on('dataServerChanged', function(event, dataServerArray) {$scope.serverData = dataServerArray;}); 

    console.log("startPulling timeInterval", $scope.timeInterval);    
    $scope.updateInterval = function(timeInterval) {    
      $scope.timeInterval = timeInterval;
      this.stopPulling();
      this.startPulling();      
    };

    $scope.startPulling = function() {
      console.log("startPulling BxCtrl");
      $scope.timer = setInterval(this.refresh, $scope.timeInterval);
    };

    $scope.stopPulling = function() {
      clearInterval($scope.timer);
    };  

    $scope.refresh = function() {  
      console.log("refresh BxCtrl");
      dataServerService.pullDataFromServer();
      $scope.updateView(dataServerService.getDataServer());
    };

    $scope.updateView = function(dataServerArray) {   
          console.log("updateView BxCtrl", dataServerArray);
 
      $scope.$apply(function () {
        $scope.serverData = dataServerArray;
      });
    };
  })

  .directive('svgBoxes', function() {
    return {
      restrict: 'E',
      templateUrl: '/app/svgs/boxes.svg'
    };
  })

  .directive('boxesDescription', function() {
    return {
      restrict: 'E',
      templateUrl: '/app/templates/boxes-description.html'
    };
  })

  .directive('boxesManager', function() {
    return {
      restrict: 'E',
      templateUrl: '/app/templates/boxes-manager.html'
    };
  })

  .directive('svgSimpleSwitch', function() {
    return {
      restrict: 'E',
      templateUrl: '/app/svgs/ARMSoCBlockDiagram.svg'
    };
  })

  .directive('simpleSwitchMonitor', function() {
    return {
      restrict: 'E',
      templateUrl: '/app/templates/simple-switch-monitor.html'
    };
  })

  .directive('backgroundImage', function () {
    return function (scope, element, attrs) {
      element.css({
        'background-image': 'url(' + attrs.backgroundImage + ')',
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center center'
      });
    };
  });
