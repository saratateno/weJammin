describe('factory: UserFactory', function() {
  beforeEach(module('Jammin'));

  var userFactory;
  beforeEach(inject(function(UserFactory){
    userFactory = UserFactory;
  }));

  var edUser = {id: 1, name: 'ed', color: 'red'}
  var fakeUsers = [
    {'id': 1, 'name': 'ed', 'color': 'red'},
    {'id': 2, 'name': 'fred', 'color': 'blue'}
  ]

  describe('#createUser', function() {
    it('creates a user', function() {
      userFactory.createUser('ed');
      expect(userFactory.users[0]).toEqual(edUser);
    });
  });

  describe('#otherUsers', function() {
    it('displays all other users', function() {
      userFactory.users = fakeUsers
      expect(userFactory.otherUsers('ed')).toEqual([{'id': 2, 'name': 'fred', 'color': 'blue'}]);
    });
  });
});
