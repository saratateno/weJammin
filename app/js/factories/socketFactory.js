jammin.factory('SocketFactory', [function() {
  var socketFactory = {};

  socketFactory.socket = { emit: function(){} };

  socketFactory.setup = function(callback, userFactory, sockets) {
    //DI for mocking sockets in tests
    if (typeof(sockets) === 'undefined') {
      socketFactory.socket = io();
    } else {
      socketFactory.socket = sockets();
    }

    socketFactory.socket.on('connect', function() {
      callback('connected');
    });

    socketFactory.socket.on('update users', function(users) {
      userFactory.users = users;
    });
  };

  socketFactory.emit = function(msg, data) {
    socketFactory.socket.emit(msg, data);
  };

  return socketFactory;
}]);
