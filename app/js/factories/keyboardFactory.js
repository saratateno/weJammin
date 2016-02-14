jammin.factory('KeyboardFactory', [function() {
  var keyboardFactory = {};

  keyboardFactory.keypress = function(keyEvent,callback) {
    var key = keyEvent.which;
    switch(key){
      case 99:
        callback("self.playSound('C4')");
        break;
      case 100:
        callback("self.playSound('D4')");
        break;
      case 101:
        callback("self.playSound('E4')");
        break;
      case 102:
        callback("self.playSound('F4')");
        break;
      case 103:
        callback("self.playSound('G4')");
        break;
      case 97:
        callback("self.playSound('A4')");
        break;
      case 98:
        callback("self.playSound('B4')");
        break;

      default:
        callback('console.log(keyEvent.which)');
    }
  };



  return keyboardFactory;

}]);
