keyboard.controller('KeyboardController',
    ['SoundFactory', 'KeyboardFactory', 'DrumFactory',

    function(SoundFactory, KeyboardFactory, DrumFactory) {

  var self = this;

  self.keypress = function(keyEvent) {
    KeyboardFactory.keypress(keyEvent, function(action) {
      eval(action);
    });
  }
}]);
