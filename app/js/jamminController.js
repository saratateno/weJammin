jammin.controller('JamminController',
    ['SocketFactory', 'SoundFactory', 'UserFactory',
    'KeyboardFactory', 'DrumFactory', 'VocalFactory', 'TransportFactory',
    function(SocketFactory, SoundFactory, UserFactory,
      KeyboardFactory, DrumFactory, VocalFactory, TransportFactory) {

  var self = this;

  self.validNickname = false;
  self.statusLabel = 'not connected';
  self.metronomeStatus = 'off';

  self.setupSockets = function(callback) {
    SocketFactory.on('connect', function() {
      self.statusLabel = 'connected';
    });

    SocketFactory.on('assign socket id', function(id) {
      self.mySocketId = id;
    });

    SocketFactory.on('update users', function(users) {
      UserFactory.users = users;
      self.otherUsers = UserFactory.otherUsers(self.nickname);
      if (UserFactory.isMaster(self.mySocketId)) {
        TransportFactory.unmutePart(TransportFactory.syncTransport);
      } else {
        TransportFactory.mutePart(TransportFactory.syncTransport);
      }
    });

    SocketFactory.on('start transport', function() {
      TransportFactory.stopTransport();
      //TransportFactory.updateParts(UserFactory.users, DrumFactory.getDrums());
      TransportFactory.startTransport();
    });

    SocketFactory.on('play sound', function(tone, color) {
      console.log('playing', tone, color);
      SoundFactory.playSound(tone);
      self.addColor(color, tone);
    });

    callback();
  };

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
    self.setupSockets(function() {
      self.toggleMetronome();
      var user = UserFactory.createUser(self.nickname);
      console.log('user',user);
      SocketFactory.emit('new user', user);
    });
  }

  self.toggleMetronome = function() {
    self.metronomeStatus = TransportFactory.toggleMetronome(self.metronomeStatus);
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

  self.playDrum = function(drumName) {
    io.emit('record sound', [drumName, TransportFactory.getPosition()]);
    DrumFactory.playDrum(drumName);
  }

  self.playVocal = function(vocalName) {
    VocalFactory.playVocal(vocalName);
  }

}]);
