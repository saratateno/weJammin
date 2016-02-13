jammin.controller('JamminController',
    ['SocketFactory', 'MetronomeFactory', 'SoundFactory', 'UserFactory',
    function(SocketFactory, MetronomeFactory, SoundFactory, UserFactory) {

  var self = this;

  self.validNickname = false;
  self.statusLabel = 'not connected';
  self.metronomeStatus = 'off';

  SocketFactory.on('connect', function() {
    self.statusLabel = 'connected';
  });

  SocketFactory.on('update users', function(users) {
    UserFactory.users = users;
    self.otherUsers = UserFactory.otherUsers(self.nickname);
    console.log(self.otherUsers);
  });

  SocketFactory.on('play sound', function(tone, color) {
    SoundFactory.playSound(tone);
    addColour(color, tone);
  }

  self.checkNickname = function() {
    self.validNickname = true;
    self.startJammin();
  }

  self.startJammin = function() {
    self.toggleMetronome();
    var user = UserFactory.createUser(self.nickname);
    SocketFactory.emit('new user', user);
  }

  self.toggleMetronome = function() {
    self.metronomeStatus = MetronomeFactory.toggleMetronome(self.metronomeStatus);
  };

  self.playSound = function(tone) {
    socket.emit('transmit sound', tone, socket.id);
  }
}]);
