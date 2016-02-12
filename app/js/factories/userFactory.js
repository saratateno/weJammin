jammin.factory('UserFactory', [function() {
  var userFactory = {};
  userFactory.users = [];
  userFactory.colors = ['red', 'green', 'orange', 'blue'];
  
  userFactory.createUser = function(name) {
    var id = userFactory.users.length + 1;
    var color = userFactory.colors[id - 1];
    userFactory.users.push({
      'id': id,
      'name': name,
      'color': color
     })
  };

  return userFactory;
}]);
