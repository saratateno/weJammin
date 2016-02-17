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
//
// function numArray(){
//     var kickNotes, lastNum, map, pieces;
//     map = [];
//     var mock = ["0:0:12", "0:0:7", "0:0:4"]
    // kickNotes = userFactory.users[0].recording.kick[0].split[":"]);
//     mock.forEach(function(position) {
//       console.log(position);
//
//       pieces = position.split([":"]);
//       console.log(pieces);
//
//       map.push(parseInt(pieces[2]));
//       console.log(map);
//
//     })
//     return map;
// }

function numArray(){
    var kickNotes, lastNum, map, pieces;
    map = [];
    var mock = ["0:0:12", "0:0:7", "0:0:4"]
    mock.forEach(function(position) {
      console.log(position);

      pieces = position.split([":"]);
      console.log(pieces);

      map.push(parseInt(pieces[2]));
      console.log(map);

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
