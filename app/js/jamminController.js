jammin.controller('JamminController', ['$scope', 'SocketFactory', 'MetronomeFactory', 'SoundFactory',
    function($scope, SocketFactory, MetronomeFactory, SoundFactory) {

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

  self.playSound = function(tone) {
    SoundFactory.playSound(tone);
  }

  self.checkNickname = function() {
    self.validNickname = true;
    self.startJammin();
  }
}]);
