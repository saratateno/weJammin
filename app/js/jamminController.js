jammin.controller('JamminController', ['$scope', 'SocketFactory', 'MetronomeFactory',
    function($scope, SocketFactory, MetronomeFactory) {

  var self = this;

  self.validNickname = false;
  self.statusLabel = 'not connected';
  self.metronomeStatus = 'off';

  self.toggleMetronome = function() {
    self.metronomeStatus = MetronomeFactory.toggleMetronome(self.metronomeStatus);
  };

  self.startJammin = function() {
    self.toggleMetronome();

    SocketFactory.setup(function(result) {
      self.statusLabel = result;
      $scope.$digest();
    });
  }

  self.checkNickname = function() {
    self.validNickname = true;
    self.startJammin();
  }
}]);
