keyboard.controller('KeyboardController',
  ['SocketFactory', 'SoundFactory', 'UserFactory',
  'KeyboardFactory', 'DrumFactory', 'TransportFactory',
  function(SocketFactory, SoundFactory, UserFactory,
    KeyboardFactory, DrumFactory, TransportFactory) {


  var self = this;

  self.keypress = function(keyEvent) {
    KeyboardFactory.keypress(keyEvent, function(action) {
      eval(action);
    });
  }
}]);
