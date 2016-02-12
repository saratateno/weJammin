jammin.controller('JamminController', ['$scope', 'SocketFactory',
    function($scope, SocketFactory) {

  var self = this;

  self.statusLabel = 'not connected';

  SocketFactory.setup(function(result) {
    self.statusLabel = result;
    $scope.$digest();
  });
}]);
