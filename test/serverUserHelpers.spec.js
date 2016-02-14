describe('Server UserHelpers', function() {
  var userHelpers = require('serverUserHelpers.js');

  userHelpers.users = [
    { 'name': 'Joe B', 'color': 'red', 'socketId': '67dka' },
    { 'name': 'Wendy B', 'color': 'green', 'socketId': 'fa7fs' },
    { 'name': 'Danny E', 'color': 'blue', 'socketId': 'u88u7' }
  ]

  describe('#getUser', function() {
    it('returns the user obj with a given socketId', function() {
      expect(userHelpers.getUser(users[1].socketId)).toEqual(users[1]);
    });
  });

  describe('#getOthers', function() {
    it('returns users with non-mathcing socketIds', function() {
      expect(userHelpers.getOthers(user[0].socketId)).toEqual(users.slice(1, 2));
    });
  });

  describe('#removeUser', function() {
  });

  describe('#userColour', function() {
  });

});
