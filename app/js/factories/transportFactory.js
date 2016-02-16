jammin.factory('TransportFactory', [function() {
  var transportFactory = {};

  //{ "userid": [Part, Part],  }
  transportFactory.userParts = {};

  //pass instruments as in {'bass': Howler.soundthing, 'kick', Howler.soundthing}
  transportFactory.updateParts = function(users, instruments) {
    //remove old parts
    for (var userId in transportFactory.userParts) {
      if (!transportFactory.userParts.hasOwnProperty(userId)) {
        transportFactory.userParts[userId].forEach(function(part) {
          part.dispose();
        });
      }
    }
    //create new parts
    users.forEach(function(user) {
      // record = { "bass": ["0:0:4", "0:0:8"], "kick": ["0:0:4"]
      // instParts = [Part, Part]
      var instrumentParts = transportFactory.getRecordParts(user.record, instruments);
      transportFactory.parts[user.socketId] = instrumentParts;
    });
  };

  transportFactory.getRecordParts = function(record, instruments) {
    var parts = [];
    for (var instrument in record) {
      if(!record.hasOwnProperty(instrument)) {
        var part = new Tone.Part(function(time, note){
          instruments[instrument].play();
        }, record[instrument]).start(0);
        parts.push(part);
      }
    }
    return parts;
  }

  transportFactory.muteUser = function(userId) {
    transportFactory.userParts[userId].forEach(function(part) {
      part.mute();
    });
  };

  transportFactory.unmuteUser = function(userId) {
    transportFactory.userParts[userId].forEach(function(part) {
      part.unmute();
    });
  }

  transportFactory.removeUserPart = function(userId) {
    transportFactory.userParts[userId] = [];
  };

  return transportFactory;
}]);
