jammin.controller('JamminController', ['$scope', 'SocketFactory', 'MetronomeFactory',
    function($scope, SocketFactory, MetronomeFactory) {

  var self = this;

  self.statusLabel = 'not connected';
  self.metronomeStatus = 'off';

  SocketFactory.setup(function(result) {
    self.statusLabel = result;
    $scope.$digest();
  });


  self.toggleMetronome = function(){
    self.metronomeStatus = MetronomeFactory.toggleMetronome(self.metronomeStatus);
  };

  self.toggleMetronome();
  
}]);
