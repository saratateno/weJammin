jammin.controller('JamminController',
    ['SocketFactory', 'MetronomeFactory', 'SoundFactory', 'UserFactory', 'KeyboardFactory',
    function(SocketFactory, MetronomeFactory, SoundFactory, UserFactory, KeyboardFactory) {

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
    console.log('playing', tone, color);
    SoundFactory.playSound(tone);
    self.addColor(color, tone);
  });

  self.addColor = function(bkgrdcolor, key) {
    var isWhite = (key.indexOf('#') === -1)
    var color = (isWhite ? 'white':'black')
    console.log('test1',bkgrdcolor, color);
    angular.element(document.getElementById(key)).addClass(bkgrdcolor + color + 'key');
    setTimeout(function() {
      document.getElementById(key).classList.remove(bkgrdcolor + color + 'key');
    }, 500)
  }

  self.checkNickname = function() {
    self.validNickname = true;
    self.startJammin();
  }

  self.startJammin = function() {
    self.toggleMetronome();
    var user = UserFactory.createUser(self.nickname);
    console.log('user',user);
    SocketFactory.emit('new user', user);
  }

  self.toggleMetronome = function() {
    self.metronomeStatus = MetronomeFactory.toggleMetronome(self.metronomeStatus);
  };

  self.playSound = function(tone) {
    SocketFactory.emit('transmit sound', tone);
  }

  window.onbeforeunload = function() {
    SocketFactory.emit('disconnect');
    alert('disconnected');
  }

  self.keypress = function(keyEvent) {
    KeyboardFactory.keypress(keyEvent, function(action) {
      eval(action);
    });
  }
}]);
