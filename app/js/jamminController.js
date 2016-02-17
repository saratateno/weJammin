jammin.controller('JamminController',
    ['SocketFactory', 'SoundFactory', 'UserFactory',
    'KeyboardFactory', 'DrumFactory', 'TransportFactory',
    function(SocketFactory, SoundFactory, UserFactory,
      KeyboardFactory, DrumFactory, TransportFactory) {

  var self = this;

  self.validNickname = false;
  self.statusLabel = 'not connected';
  self.metronomeStatus = 'off';
  self.messages = [];

  self.transportPosition = function() {
    return TransportFactory.getPosition();
  }

  SocketFactory.on('connect', function() {
    self.statusLabel = 'connected';
  });

  self.setupSockets = function(callback) {
    SocketFactory.on('assign socket id', function(id) {
      self.mySocketId = id;
    });

    SocketFactory.on('update users', function(users) {
      UserFactory.users = users;
      self.otherUsers = UserFactory.otherUsers(self.mySocketId);
      if (UserFactory.isMaster(self.mySocketId)) {
        TransportFactory.unmutePart(TransportFactory.syncTransport);
      } else {
        TransportFactory.mutePart(TransportFactory.syncTransport);
      }
    });

    self.sendMessage = function(newMessage) {
      newMessage = {user: self.nickname, content: self.newMessage};
      SocketFactory.emit('store message', newMessage);
    }

    SocketFactory.on('update messages', function(newMessage) {
      self.messages.push(newMessage);
      self.newMessage = '';
    });


    SocketFactory.on('connect users', function(users) {
      UserFactory.users = users;
      self.otherUsers = UserFactory.otherUsers(self.mySocketId);
    });

    SocketFactory.on('start transport', function() {
      TransportFactory.stopTransport();
      TransportFactory.updateParts(UserFactory.users);
      TransportFactory.startTransport();
    });

    SocketFactory.on('play sound', function(tone, color) {
      console.log('playing', tone, color);
      SoundFactory.playSound(tone);
      self.addColor(color, tone);
    });

    SocketFactory.on('user departed', function(socketId) {
      UserFactory.users = UserFactory.otherUsers(socketId);
    });

    callback();
  };

  self.addColor = function(bkgrdcolor, key) {
    var isWhite = (key.indexOf('#') === -1);
    var color = (isWhite ? 'white':'black');
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
    SocketFactory.emit('record sound', [drumName, TransportFactory.getPosition()]);
    console.log([drumName, TransportFactory.getPosition()]);
    DrumFactory.playDrum(drumName);
  }

}]);
