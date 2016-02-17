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

  userFactory._getUser = function(socketId) {
    var me = userFactory.users.filter(function(user) {
      return user.socketId === socketId;
    });
    return me[0];
  };

  return userFactory;
}]);
