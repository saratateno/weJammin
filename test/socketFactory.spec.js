describe('factory: SocketFactory', function() {
  beforeEach(module('Jammin'));

  var socketFactory;
  beforeEach(inject(function(SocketFactory){
    socketFactory = SocketFactory;
  }));


  function fakeSockets() {}
  fakeSockets.prototype.on = function(msg, cb) {
    cb();
  }

  it('connects to server and calls-back result', function() {
    socketFactory.setup(function(result, fakeSockets) {
      expect(result).toEqual("connected")
    });
  });

 });
