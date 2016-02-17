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
      user.scoreMap = userFactory._mapRecording(user);
    })
    console.log(userFactory.users);
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
       var pieces = position.split([":"]);
       map.push(parseInt(pieces[2]));
     })
     return map;
  }

  userFactory._getUser = function(socketId) {
    var me = userFactory.users.filter(function(user) {
      return user.socketId === socketId;
    });
    return me[0];
  };

  return userFactory;
}]);
