jammin.controller('JamminController', ['SocketFactory',
    function(SocketFactory) {

  var self = this;

  self.statusLabel = 'not connected';

  SocketFactory.setup(function(result) {
    self.statusLabel = result;
    $scope.$digest();
  });
}]);
