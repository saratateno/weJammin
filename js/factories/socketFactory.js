jammin.factory('SocketFactory', [function() {
  var socketFactory = {};

  socketFactory.setup = function(callback) {
    var socket = io('localhost:8080');
    socket.on('connect', function() {
      callback('connected');
    });
  };

  return socketFactory;
}]);
