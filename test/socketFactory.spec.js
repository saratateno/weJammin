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

  it('connects to server and calls-back result', function() {
    var setupResult;
    socketFactory.setup(function(result) {
      setupResult = result;
    }, fakeSockets);

    expect(setupResult).toEqual("connected")
  });
});
