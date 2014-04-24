/* Monitor Directives */

var monitorDirectives = angular.module('monitorDirectives', [ 'sticky', 'ui.bootstrap'])

monitorDirectives.directive('svgThermo', function() {
    return {
      restrict: 'E',
      templateUrl: '/modules/monitor/svgs/thermometer.svg'
    };
  })

monitorDirectives.directive('thermoDescription', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/thermo-description.html'
  };
})

monitorDirectives.directive('thermoManager', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/thermo-manager.html'
  };
})

monitorDirectives.directive('svgBoxes', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/svgs/boxes.svg'
  };
})

monitorDirectives.directive('boxesDescription', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/boxes-description.html'
  };
})

monitorDirectives.directive('boxesManager', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/boxes-manager.html'
  };
})

monitorDirectives.directive('svgSum', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/svgs/sum.svg'
  };
})

monitorDirectives.directive('sumDescription', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/sum-description.html'
  };
})

monitorDirectives.directive('sumManager', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/sum-manager.html'
  };
})


monitorDirectives.directive('remoteControl', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/remote-control.html'
  };
})

monitorDirectives.directive('monitor', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/index.html'
  };
})

monitorDirectives.directive('logger', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/monitor/views/logger.html'
  };
})

monitorDirectives.directive('backgroundImage', function () {
  return function (scope, element, attrs) {
    element.css({
      'background-image': 'url(' + attrs.backgroundImage + ')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': 'center center'
    });
  };
});


