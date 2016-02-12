jammin.factory('UserFactory', [function() {
  var userFactory = {};
  userFactory.users = [];
  userFactory.colors = ['red', 'green', 'orange', 'blue'];

  userFactory.createUser = function(name) {
    var id = userFactory.users.length + 1;
    var color = userFactory.colors[id - 1];
    var user = {
      'id': id,
      'name': name,
      'color': color
    }
    userFactory.users.push(user)
    return user;
  };

  userFactory.otherUsers = function() {
    userFactory.users.filter(function(user) {
      return user.name !== self.nickname;
    });
  };

  return userFactory;
}]);
