jammin.factory('TransportFactory', ['SocketFactory', 'DrumFactory',
  function(SocketFactory, DrumFactory) {
  var transportFactory = {};

//transport set up

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
  }

//Syncing
  transportFactory.syncTransport = new Tone.Part(function(time){
    SocketFactory.emit('sync');
    console.log('sending sync message');
  }, ["0"]).start(0);

//recording
  transportFactory.getPosition = function() {
    return Tone.Transport.position;
  }

//playing user recordings
  //{ "metronome": [MetPart], "userid": [BassPart, KickPart] }
  transportFactory.userParts = {};

  //pass instruments as in {'bass': Howler.soundthing, 'kick', Howler.soundthing}
  transportFactory.updateParts = function(users) {
    console.log('users: ', users)
    //remove old parts
    for (var userId in transportFactory.userParts) {
      if (!transportFactory.userParts.hasOwnProperty(userId)) {
        transportFactory.userParts[userId].forEach(function(part) {
          part.dispose();
        });
      }
    }
   // 
   // //create new parts
   // users.forEach(function(user) {
   //   // record = { "bass": ["0:0:4", "0:0:8"], "kick": ["0:0:4"]}
   //   // instParts = [Part, Part]
   //   var instrumentParts = transportFactory.getRecordParts(user.recording);
   //   console.log('inst parts:', instrumentParts)
   //   transportFactory.userParts[user.socketId] = instrumentParts;
   // });
    if (users.length > 0) {
      transportFactory.getRecordParts(users[0].recording);
    }
    console.log('updted parts: ', transportFactory.userParts);
  };

  transportFactory.getRecordParts = function(recording) {
    if (recording['bleep'] !== undefined) {
      var bleepTimes = recording['bleep'];
    } else {
      var bleepTimes = [];
    }
    return new Tone.Part(function(time) {
      DrumFactory.playDrum('bleep');
    }, bleepTimes).start(0);
  //  var parts = [];
  //  for (var instrument in recording) {
  //    if (!recording.hasOwnProperty(instrument)) {
  //      var part = new Tone.Part(function(time){
  //        DrumFactory.playDrum(instrument);
  //      }, recording[instrument]).start(0);
  //      parts.push(part);
  //    }
  //  }
  //  return parts;
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
