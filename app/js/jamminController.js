jammin.controller('JamminController',
    ['SocketFactory', 'SoundFactory', 'UserFactory',
    'KeyboardFactory', 'DrumFactory', 'TransportFactory',
    function(SocketFactory, SoundFactory, UserFactory,
      KeyboardFactory, DrumFactory, TransportFactory) {

  var self = this;
  self.localSettings = {};
  self.validNickname = false;
  self.statusLabel = 'not connected';
  self.metronomeStatus = 'off';
  self.messages = [];

  self.updateVisData = function() {
    var scores = [];
    UserFactory.users.forEach(function(user) {
      scores.push(user.scoreMap);
    });
    self.visData = scores;
  };

  self.updateColors = function() {
    self.colors = UserFactory.userColors();
  };

  self.transportPosition = function() {
    var currentPosition = UserFactory.fullBeatToInt(TransportFactory.getPosition());
    angular.element(document.getElementsByClassName(currentPosition.toString())).addClass("light");
    if (currentPosition === 0) {
      angular.element(document.getElementsByClassName("31")).removeClass("light");
    } else {
      angular.element(document.getElementsByClassName((currentPosition - 1).toString())).removeClass("light");
    }
    return currentPosition;
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
      self.users = UserFactory.users;
      self.otherUsers = UserFactory.otherUsers(self.mySocketId);
      if (UserFactory.isMaster(self.mySocketId)) {
        TransportFactory.unmutePart(TransportFactory.syncTransport);
      } else {
        TransportFactory.mutePart(TransportFactory.syncTransport);
      }
      UserFactory.users.forEach(function(user) {
        if (self.localSettings[user.socketId] === undefined) {
          self.localSettings[user.socketId] = { mute: false };
        }
      })
      UserFactory.writeToScore();
      self.updateColors();
      self.updateVisData();
      console.log('users: ', UserFactory.users);
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
      TransportFactory.updateParts(UserFactory.users, self.localSettings);
      TransportFactory.startTransport();
    });

    SocketFactory.on('play sound', function(tone, color) {
      console.log('playing', tone, color);
      SoundFactory.playSound(tone);
      self.addColor(color, tone);
    });

    SocketFactory.on('play drum', function(drumName) {
      DrumFactory.playDrum(drumName);
    });

    SocketFactory.on('user departed', function(socketId) {
      UserFactory.users = UserFactory.otherUsers(socketId);
    });

    callback();
  };

  self.addColor = function(bkgrdcolor, key) {
    var isWhite = (key.indexOf('#') === -1);
    var color = (isWhite ? 'white':'black');
    angular.element(document.getElementById(key)).addClass(bkgrdcolor + color + 'key');
    setTimeout(function() {
      document.getElementById(key).classList.remove(bkgrdcolor + color + 'key');
    }, 500)
  }

  self.checkNickname = function() {
    if (!self.nickname) { self.nickname = "Marley"; }
    self.validNickname = true;
    self.startJammin();
  }

  self.startJammin = function() {
    self.setupSockets(function() {
      self.toggleMetronome();
      var user = UserFactory.createUser(self.nickname);
      SocketFactory.emit('new user', user);
    });
  }

  self.toggleMetronome = function() {
    self.metronomeStatus = TransportFactory.toggleMetronome(self.metronomeStatus);
  };

  self.removeSound = function(index, userIndex) {
    if (userIndex == UserFactory.myIndex(self.mySocketId)) {
      SocketFactory.emit('remove sound', index);
    }
  };

  self.toggleMute = function(user) {
    if (self.localSettings[user.socketId].mute === true) {
      TransportFactory.unmuteUser(user.socketId);
      self.localSettings[user.socketId].mute = false;
    } else {
      TransportFactory.muteUser(user.socketId);
      self.localSettings[user.socketId].mute = true;
    }
  }

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
    SocketFactory.emit('transmit drum', drumName);
    SocketFactory.emit('record sound', [drumName, TransportFactory.getPosition()]);
  }
}]);
