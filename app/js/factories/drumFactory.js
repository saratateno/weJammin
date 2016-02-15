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
		kickSnapEnv = new Tone.FrequencyEnvelope({
		    "attack": 0.005,
		    "decay": 0.01,
		    "sustain": 0,
		    "release": 0,
		    "baseFrequency": "A2",
		    "octaves": 2.7
		}).connect(kick.frequency);
    kick.start();

    var lowPass = new Tone.Filter({
    		    "frequency": 14000,
    		}).toMaster();
    		// we can make our own hi hats with
    		// the noise synth and a sharp filter envelope
    		var openHiHat = new Tone.NoiseSynth({
    			"volume" : -10,
    		    "filter": {
    		        "Q": 1
    		    },
    		    "envelope": {
    		        "attack": 0.01,
    		        "decay": 0.3
    		    },
    		    "filterEnvelope": {
    		        "attack": 0.01,
    		        "decay": 0.03,
    		        "baseFrequency": 4000,
    		        "octaves": -2.5,
    		        "exponent": 4,
    		    }
    		}).connect(lowPass.frequency);
        // openHiHat.start();

  drumFactory.playDrum = function(drumName) {
    if (drumName === 'bleep') { bleepEnvelope.triggerAttackRelease("2n"); }
    else if (drumName === 'bass') { bassEnvelope.triggerAttackRelease(); }
    else if (drumName === 'kick') { kickEnvelope.triggerAttackRelease("2n"); }
    else if (drumName === 'openHiHat') { openHiHat.triggerAttackRelease("2n"); }

  }

  return drumFactory;

}]);
