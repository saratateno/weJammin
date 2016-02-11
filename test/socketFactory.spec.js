describe('factory: SocketFactory', function() {
  beforeEach(module('Jammin'));

  var socketFactory;
  beforeEach(inject(function(SocketFactory){
    socketFactory = SocketFactory;
  }));

  //var Server = require('socket.io');
  //beforeEach(function(done) {
  //  var that = this;
  //  this.io = Server(8080);
  //  this.io.on('connection', function (socket) {
  //    that.activeSocket = socket;
  //    done();
  //  });
  //});

  it('connects to server and calls-back result', function() {
    socketFactory.setup(function(result) {
      expect(result).toEqual("connected")
    });
  });

  //afterEach(function (done) {
  //  this.io.close();
  //  this.activeSocket.on('disconnect', function () {
  //    done();
  //  });
  //});

});
