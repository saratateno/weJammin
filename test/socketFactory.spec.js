describe('factory: SocketFactory', function() {
  beforeEach(module('Jammin'));

  var socketFactory;
  beforeEach(inject(function(SocketFactory){
    socketFactory = SocketFactory;
  }));

  function fakeSockets() {
    return {
      on: function(msg, callback) {
        callback();
      }
    };
  }

  function fakeUsers() {
    return {
      users: []
    }
  }

  it('connects to server and calls-back result', function() {
    var setupResult;
    socketFactory.setup(function(result) {
      setupResult = result;
    }, fakeUsers, fakeSockets);

    expect(setupResult).toEqual("connected")
  });
});
