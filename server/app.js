var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userHelpers = require('helpers/userHelpers.js');

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
  socket.emit('assign socket id', socket.id)
  socket.emit('update users', userHelpers.users);

  socket.on('disconnect', function() {
    userHelpers.removeUser(socket.id, function() {
      io.emit('update users', userHelpers.users);
      console.log('user disconnected');
    });
  });

  socket.on('new user', function(user) {
    user.socketId = socket.id;
    userHelpers.users.push(user);
    io.emit('update users', userHelpers.users);
    console.log(userHelpers.users);
  });

  socket.on('transmit sound', function(tone) {
    io.emit('play sound', tone, userHelpers.userColor(socket.id));
  });
});
