jammin.factory('DrumFactory', [function() {
  var drumFactory = {};

  var bleepEnvelope = new Tone.AmplitudeEnvelope({
    "attack": 0.01,
    "decay": 0.4,
    "sustain": 0,
    "release": 0,
  }).toMaster();
  var bleep = new Tone.Oscillator("A4").connect(bleepEnvelope);
  bleep.start();

  var bassEnvelope = new Tone.AmplitudeEnvelope({
    "attack": 0.01,
    "decay": 0.2,
    "sustain": 0,
    "release": 0,
  }).toMaster();
  var bassFilter = new Tone.Filter({
    "frequency": 600,
    "Q": 8
  });
  var bass = new Tone.PulseOscillator("A2", 0.4).chain(bassFilter, bassEnvelope);
  bass.start();

  var kickEnvelope = new Tone.AmplitudeEnvelope({
		    "attack": 0.01,
		    "decay": 0.2,
		    "sustain": 0,
		    "release": 0
		}).toMaster();
		var kick = new Tone.Oscillator("A2").connect(kickEnvelope);
		var kickSnapEnv = new Tone.FrequencyEnvelope({
		    "attack": 0.005,
		    "decay": 0.01,
		    "sustain": 0,
		    "release": 0,
		    "baseFrequency": "A2",
		    "octaves": 2.7
		}).connect(kick.frequency);
    kick.start();

      var hihat = new Howl ({
        urls: ['wav/hihat.wav']
      })

      var snare = new Howl ({
        urls: ['wav/snare.wav']
      })

      var drum = new Howl ({
        urls: ['wav/deepdrum.mp3']
      })

  drumFactory.playDrum = function(drumName) {
    if (drumName === 'bleep') { bleepEnvelope.triggerAttackRelease("2n"); }
    else if (drumName === 'bass') { bassEnvelope.triggerAttackRelease(); }
    else if (drumName === 'kick') { kickEnvelope.triggerAttackRelease("2n"); }
    else if (drumName === 'hihat') { hihat.play(); }
    else if (drumName === 'snare') { snare.play(); }
    else if (drumName === 'drum') { drum.play(); }


  }

  return drumFactory;

}]);
