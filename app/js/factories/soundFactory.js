jammin.factory('SoundFactory', [function() {
  var soundFactory = {};
  var synth = new Tone.SimpleSynth().toMaster();

  soundFactory.playSound = function(tone) {
    synth.triggerAttackRelease(tone, "4n");
  }

  return soundFactory;
}]);
