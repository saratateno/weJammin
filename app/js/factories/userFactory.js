jammin.factory('UserFactory', [function() {
  var userFactory = {};

  userFactory.users = [];

  userFactory.createUser = function(name) {
    var user = {
      'name': name,
    };
    userFactory.users.push(user);
    return user;
  };

  userFactory.otherUsers = function(socketId) {
    return userFactory.users.filter(function(user) {
      return user.socketId !== socketId;
    });
  };

  userFactory.isMaster = function(socketId) {
    if (userFactory._getUser(socketId).master) {
      return (userFactory._getUser(socketId).master === true);
    } else {
      return false;
    }
  };

  userFactory.writeToScore = function() {
    userFactory.users.forEach(function(user) {
      var positions = userFactory._mapRecording(user);
      user.scoreMap = userFactory._positionsToBools(positions);
    })
  }

  userFactory._positionsToBools = function(arr) {
    var result = [];
    for (var i = 0; i<=31; i++) {
      if (arr.indexOf(i) !== -1) {
        result.push(true);
      } else {
        result.push(false);
      }
    }
    return result;
  }
  //Iteration over recording for a given user
  userFactory._mapRecording = function(user){
    var recordingMap = [];
    for (var instrument in user.recording) {
      if (user.recording.hasOwnProperty(instrument)) {
        recordingMap.push(userFactory._mapTimings(user.recording[instrument]));
      }
    }
    if (recordingMap.length > 0) {
      var flattenedArray = recordingMap.reduce(function(a,b) {
              return a.concat(b);
          });

      return flattenedArray;
    } else {
      return [];
    }
  }

  //Translates the array["0:0:1", "0:0:4"] to [1,4]
  userFactory._mapTimings = function(instrumentNotes){
     var map=[]
     instrumentNotes.forEach(function(position) {
       map.push(userFactory._beatToInt(position));
     })
     return map;
  }

  userFactory._beatToInt = function(string) {
    var pieces = string.split([":"]);
    return parseInt(pieces[2]);
  }

  userFactory.fullBeatToInt = function(string) {
    return userFactory._beatToInt(userFactory._snapToBeat(string));
  }

  userFactory._snapToBeat = function(transportPosition) {
    var cleanPosition, pieces, lastNum, roundLastNum, sixteenths;
    pieces = transportPosition.split([":"]);
    lastNum = parseFloat(pieces[pieces.length - 1]);
    roundLastNum = Math.round(lastNum);
    sixteenths = (parseInt((pieces[0])) * 16) +
      (parseInt(pieces[1]) * 4) + roundLastNum;
    cleanPosition = "0:0:" + sixteenths;
    return cleanPosition;
  }

  userFactory._getUser = function(socketId) {
    var me = userFactory.users.filter(function(user) {
      return user.socketId === socketId;
    });
    return me[0];
  };

  return userFactory;
}]);
