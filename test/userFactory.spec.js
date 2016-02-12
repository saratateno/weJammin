describe('factory: UserFactory', function() {
  beforeEach(module('Jammin'));

  var userFactory;
  beforeEach(inject(function(UserFactory){
    userFactory = UserFactory;
  }));

  var edUser = {id: 1, name: 'ed', color: 'red'}

  describe('#createUser', function() {
    it('creates a user', function() {
      userFactory.createUser('ed');
      expect(userFactory.users[0]).toEqual(edUser);
    });
  });
});
