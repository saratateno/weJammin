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
    }
    userFactory.users.push(user)
    return user;
  };

  userFactory.otherUsers = function(myName) {
    return userFactory.users.filter(function(user) {
      return user.name !== myName;
      //names are not unique so check by ids
    });
  };

  userFactory.isMaster = function(socketId) {
    return (userFactory._getUser(socketId).master === true);
  }

  userFactory._getUser = function(socketId) {
    var me = userFactory.users.filter(function(user) {
      return user.socketId === socketId;
    });
    return me[0];
  }

  return userFactory;
}]);
