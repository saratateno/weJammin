jammin.factory('KeyboardFactory', [function() {
  var keyboardFactory = {};

  keyboardFactory.keypress = function(keyEvent,callback) {
    var key = keyEvent.which;
    if (key ===  99 ) {
      callback("self.playSound('C4')");
    }
    else if (key ===  100 ) {
      callback("self.playSound('D4')");
    }
    else if (key ===  101 ) {
      callback("self.playSound('E4')");
    }
    else if (key ===  102 ) {
      callback("self.playSound('F4')");
    }
    else if (key ===  103 ) {
      callback("self.playSound('G4')");
    }
    else if (key ===  97 ) {
      callback("self.playSound('A4')");
    }
    else if (key ===  98 ) {
      callback("self.playSound('B4')");
    }
    else {
      callback('console.log(keyEvent.which)');
    }
  };



  return keyboardFactory;

}]);
