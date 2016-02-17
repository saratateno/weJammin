jammin.factory('UserFactory', [function() {
  var userFactory = {};

  userFactory.users = [];
  userFactory.colors = ['red', 'green', 'orange', 'blue'];

  userFactory.createUser = function(name) {
    var id = userFactory.users.length + 1; //this should be improved...
    var color = userFactory.colors[(id - 1) % 4];
    var user = {
      'id': id,
      'name': name,
      'color': color
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

//Iteration over recording for each user
function mapRecording(user){
  var recordingMap = [];
  for (var instrument in user.recording) {
    if (user.recording.hasOwnProperty(instrument)) {
      recordingMap.push(mapTimings(user.recording[instrument]));
    }
}
  var flattenedArray = recordingMap.reduce(function(a,b) {
    return a.concat(b);
});
  return flattenedArray;
}

//Translates the array["0:0:1", "0:0:4"] to [1,4]
function mapTimings(instrumentNotes){
   var map=[]
   instrumentNotes.forEach(function(position) {
     pieces = position.split([":"]);
     map.push(parseInt(pieces[2]));
   })
   return map;
}

}
  userFactory._getUser = function(socketId) {
    var me = userFactory.users.filter(function(user) {
      return user.socketId === socketId;
    });
    return me[0];
  };

  return userFactory;
}]);
