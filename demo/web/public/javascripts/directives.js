angular.module('SynopticDemo').directive('footer', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/footer.html'
    };
  })

angular.module('SynopticDemo').directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/navbar.html'
    };
  })