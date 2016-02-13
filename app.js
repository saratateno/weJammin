var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules'));


http.listen(app.get('port'), function() {
  console.log('Node app is running on port' + app.get('port'));
});

app.get('/', function(request, response) {
  response.render('index');
});

io.on('connection', function(socket) {
  console.log('user connected');
  socket.emit('update users', users);

  socket.on('disconnect', function() {
    removeUser(socket.id, function() {
      io.emit('update users', users);
      console.log('user disconnected');
    });
  });

  socket.on('new user', function(user) {
    user.socketId = socket.id;
    users.push(user);
    io.emit('update users', users);
    console.log(users);
  });
});

function removeUser(socketId, callback) {
  users = users.filter(function(user) {
    return user.socketId !== socketId;
  });
  if (callback) { callback(); }
}
