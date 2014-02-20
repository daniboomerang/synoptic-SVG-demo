angular.module('synopticDemo', ['sticky'])

  .service('dataServerService', function ($rootScope) {
    var dataServerArray = new Array(); 
        console.log("dataServerService dataServerArray", dataServerArray); 

    return {
      pullDataFromServer : function() {
        dataServerArray["rect2985Fill"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        dataServerArray["rect2985Border"] = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        $rootScope.$broadcast('dataServerChanged', dataServerArray);
        console.log("pullDataFromServer", dataServerArray["rect2985Fill"], dataServerArray["rect2985Border"]); 
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
    $scope.serverData = new Array();
    $scope.loggerData = new Array();
    $scope.statistics = new Array();
    $scope.$on('dataServerChanged', function(event, dataServerArray) {
      $sserverData = dataServerArray;
      $scope.$apply(function () {
      //updateLogger
      $scope.loggerData = dataServerArray;
      //processStatistics
      $scope.statistics = dataServerArray;
      console.log("loggerData", $scope.loggerData);
      console.log("Statistics", $scope.statistics);
      });
    });

    // The remote control

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
      console.log("refresh managementBoxesCtrl");
      dataServerService.pullDataFromServer();
      /*$scope.updateView(dataServerService.getDataServer());*/
    };

    // The logger

    $scope.updateLogger = function(dataServerArray) {   
      console.log("updateLogger ", dataServerArray);
      $scope.$on('dataServerChanged', function(event, dataServerArray) {
        $scope.$apply(function () {
          $scope.loggerData = dataServerArray;
        });
      }); 
    };

    // The statistics

    $scope.processStatistics = function(dataServerArray) {   
      console.log("processStatistics ", dataServerArray);
      $scope.$on('dataServerChanged', function(event, dataServerArray) {
        $scope.$apply(function () {
          $scope.statistics = dataServerArray;
        });
      }); 
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

  .directive('svgSimpleSwitch', function() {
    return {
      restrict: 'E',
      templateUrl: '/app/svgs/ARMSoCBlockDiagram.svg'
    };
  })

  .directive('boxesManager', function() {
    return {
      restrict: 'E',
      templateUrl: '/app/templates/boxes-manager.html'
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
