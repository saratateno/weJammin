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







  drumFactory.playDrum = function(drumName) {
    if (drumName === 'bleep') { bleepEnvelope.triggerAttackRelease("2n");}
    // else if (drumName === 'bass') { bleepEnvelope.triggerAttackRelease}
    // else if
  }

  return drumFactory;

}]);
