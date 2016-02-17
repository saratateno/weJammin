jammin.factory('TransportFactory', ['SocketFactory', 'DrumFactory', '$rootScope',
  function(SocketFactory, DrumFactory, $rootScope) {
  var transportFactory = {};

//transport set up
  var BPM = 120;
  var BARS = 2;
  Tone.Transport.loopStart = 0;
  Tone.Transport.loopEnd = BARS + ":0";
  Tone.Transport.loop = true;
  Tone.Transport.bpm.value = BPM;

  transportFactory.stopTransport = function() {
    Tone.Transport.stop();
  };

  transportFactory.startTransport = function() {
    Tone.Transport.start();
  };

//scope ticker
  var ticks = []
  var tickLimit = (BARS * 16) - 1;
  for (var i = 0; i<=tickLimit; i++) {
    ticks.push('0:0:' + i)
  }
  var ticker = new Tone.Part(function(time) {
    $rootScope.$apply();
  }, ticks).start(0);

//metronome setup
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
  };

//Syncing
  transportFactory.syncTransport = new Tone.Part(function(time) {
    SocketFactory.emit('sync');
  }, ["0"]).start(0);

//recording
  transportFactory.getPosition = function() {
    return Tone.Transport.position;
  };

//playing user recordings
  //userParts = { "userid": [BassPart, KickPart], "anotheruserid": [BassPart] }
  transportFactory.userParts = {};

  //pass instruments as in {'bass': Howler.soundthing, 'kick', Howler.soundthing}
  transportFactory.updateParts = function(users, localSettings) {
    //remove old parts
    for (var userId in transportFactory.userParts) {
      if (transportFactory.userParts.hasOwnProperty(userId)) {
        console.log("user parts: ", transportFactory.userParts);
        transportFactory.userParts[userId].forEach(function(part) {
          if (part) {
            part.removeAll();
          }
        });
      }
    }
   // create new parts
    if (users.length > 0) {
      users.forEach(function(user) {
        var parts = transportFactory.getRecordParts(user.recording);
        transportFactory.userParts[user.socketId] = parts;
        if (localSettings[user.socketId].mute === true) {
          transportFactory.muteUser(user.socketId)
        }
      });
    }
  };

  transportFactory.getRecordParts = function(recording) {
    var parts = [];
    for (var instrument in recording) {
      var playTimes = recording[instrument];
      console.log(instrument, playTimes);
      var instPart = transportFactory.constructPart(instrument, playTimes);
      parts.push(instPart);
    }
    return parts;
  };

  transportFactory.muteUser = function(userId) {
    transportFactory.userParts[userId].forEach(function(part) {
      part.mute = true;
      console.log("part: ", part)
    });
  };

  transportFactory.unmuteUser = function(userId) {
    transportFactory.userParts[userId].forEach(function(part) {
      part.mute = false;
    });
  };

  transportFactory.mutePart = function(part) {
    part.mute = true;
  };

  transportFactory.unmutePart = function(part) {
    part.mute = false;
  };

  transportFactory.removeUserPart = function(userId) {
    transportFactory.userParts[userId] = [];
  };

  transportFactory.constructPart = function(instrument, times) {
    return new Tone.Part(function(time) {
      DrumFactory.playDrum(instrument);
    }, times).start(0);
  };

  return transportFactory;
}]);
