jammin.factory('KeyboardFactory', [function() {
  var keyboardFactory = {};

  keyboardFactory.keypress = function(keyEvent,callback) {
    switch(keyEvent.which) {
      case 122:
        callback("self.playSound('C3')");
        break;
      case 120:
        callback("self.playSound('D3')");
        break;
      case 99:
        callback("self.playSound('E3')");
        break;
      case 118:
        callback("self.playSound('F3')");
        break;
      case 98:
        callback("self.playSound('G3')");
        break;
      case 110:
        callback("self.playSound('A3')");
        break;
      case 109:
        callback("self.playSound('B3')");
        break;
      case 44:
        callback("self.playSound('C4')");
        break;
      case 46:
        callback("self.playSound('D4')");
        break;
      case 47:
        callback("self.playSound('E4')");
        break;
      case 115:
        callback("self.playSound('C#3')");
        break;
      case 100:
        callback("self.playSound('D#3')");
        break;
      case 103:
        callback("self.playSound('F#3')");
        break;
      case 104:
        callback("self.playSound('G#3')");
        break;
      case 106:
        callback("self.playSound('A#3')");
        break;
      case 108:
        callback("self.playSound('C#4')");
        break;
      case 59:
        callback("self.playSound('D#4')");
        break;
// drum sounds
      case 49:
        callback("self.playDrum('bleep')");
        break;
      case 50:
        callback("self.playDrum('bass')");
        break;
      case 51:
        callback("self.playDrum('kick')");
        break;
      case 52:
        callback("self.playDrum('drum')");
        break;
      case 53:
        callback("self.playDrum('hihat')");
        break;
      case 54:
        callback("self.playDrum('snare')");
        break;
      case 55:
        callback("self.playDrum('cantouch')");
        break;
      case 56:
        callback("self.playDrum('pushat')");
        break;
      case 57:
        callback("self.playDrum('jayz')");
        break;
    }
  };

  return keyboardFactory;

}]);
