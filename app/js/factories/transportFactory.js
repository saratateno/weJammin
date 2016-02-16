jammin.factory('TransportFactory', ['SocketFactory', function(SocketFactory) {
  var transportFactory = {};

  Tone.Transport.loopStart = 0;
  Tone.Transport.loopEnd = "2:0";
  Tone.Transport.loop = true;
  Tone.Transport.bpm.value = 120;

  transportFactory.stopTransport = function() {
    Tone.Transport.stop();
  }

  transportFactory.startTransport = function() {
    Tone.Transport.start();
  };

  //{ "metronome": [MetPart], "userid": [BassPart, KickPart] }
  transportFactory.userParts = {};

  var kickEnvelope = new Tone.AmplitudeEnvelope({
      "attack": 0.01,
      "decay": 0.2,
      "sustain": 0,
      "release": 0
  }).toMaster();

  var kick = new Tone.Oscillator("A2").connect(kickEnvelope).start();

  var kickSnapEnv = new Tone.FrequencyEnvelope({
      "attack": 0.005,
      "decay": 0.01,
      "sustain": 0,
      "release": 0,
      "baseFrequency": "A2",
      "octaves": 2.7
  }).connect(kick.frequency);

  var metronome = new Tone.Part(function(time) {
    kickEnvelope.triggerAttack(time);
    kickSnapEnv.triggerAttack(time);
  }, ['0:0', '0:1', '0:2', '0:3', '0:4', '0:5', '0:6', '0:7']).start(0);

  transportFactory.toggleMetronome = function(metronomeStatus) {
    if (metronomeStatus === 'off'){
      metronome.mute = false;
      return 'on';
    } else {
      metronome.mute = true;
      return 'off';
    }
  }

//Syncing
  transportFactory.syncTransport = new Tone.Part(function(time){
    SocketFactory.emit('sync');
    console.log('sending sync message');
  }, ["0"]).start(0);

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
        var part = new Tone.Part(function(time){
          instruments[instrument].play();
        }, record[instrument]).start(0);
        parts.push(part);
      }
    }
    return parts;
  }

  transportFactory.muteUser = function(userId) {
    transportFactory.userParts[userId].forEach(function(part) {
      part.mute = true;
    });
  };

  transportFactory.unmuteUser = function(userId) {
    transportFactory.userParts[userId].forEach(function(part) {
      part.mute = false;
    });
  }

  transportFactory.mutePart = function(part) {
    part.mute = true;
  };

  transportFactory.unmutePart = function(part) {
    part.mute = false;
  };

  transportFactory.removeUserPart = function(userId) {
    transportFactory.userParts[userId] = [];
  };

  return transportFactory;
}]);
