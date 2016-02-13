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

  SocketFactory.on('assign socket id', function(id) {
    self.mySocketId = id;
  });

  SocketFactory.on('update users', function(users) {
    UserFactory.users = users;
    self.otherUsers = UserFactory.otherUsers(self.nickname);
  });

  SocketFactory.on('play sound', function(tone, color) {
    SoundFactory.playSound(tone);
    //addColour(color, tone);
  });

  self.addColour = function(bkgrdcolor,key) {
    angular.element(document.getElementById(key)).addClass(bkgrdcolor);
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
    SocketFactory.emit('transmit sound', tone);
  }
}]);
