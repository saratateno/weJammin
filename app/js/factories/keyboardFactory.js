jammin.factory('KeyboardFactory', [function() {
  var keyboardFactory = {};

  keyboardFactory.keypress = function(keyEvent,callback) {
    var key = keyEvent.which;
    if (key ===  122 ) {
      callback("self.playSound('C3')");
    }
    else if (key ===  120 ) {
      callback("self.playSound('D3')");
    }
    else if (key ===  99 ) {
      callback("self.playSound('E3')");
    }
    else if (key ===  118 ) {
      callback("self.playSound('F3')");
    }
    else if (key ===  98 ) {
      callback("self.playSound('G3')");
    }
    else if (key ===  110 ) {
      callback("self.playSound('A3')");
    }
    else if (key ===  109 ) {
      callback("self.playSound('B3')");
    }
    else {
      callback('console.log(keyEvent.which)');
    }
  };

  return keyboardFactory;

}]);
