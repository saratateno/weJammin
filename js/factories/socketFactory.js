jammin.factory('SocketFactory', [function() {
  var socketFactory = {};

  socketFactory.setup = function(callback, sockets) {
    //DI for mocking sockets in tests
    if (typeof(sockets) === 'undefined') {
      var socket = io('localhost:8080');
    } else {
      var socket = sockets();
    }
    socket.on('connect', function() {
      callback('connected');
    });
  };

  return socketFactory;
}]);
