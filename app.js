var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userHelpers = require('./serverHelpers/userHelpers.js');

var users = [];
var messages = [];

app.set('port', (process.env.PORT || 8347));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));

http.listen(app.get('port'), function() {
  console.log('Node app is running on port ' + app.get('port'));
});

app.get('/', function(request, response) {
  response.render('index');
});

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('store message', function(newMessage){
    messages.push(newMessage);
    io.emit('update messages', newMessage);
  });

  socket.on('disconnect', function() {
    var user = userHelpers.getUser(users, socket.id);
    if (users.length > 1 && user && user.master === true) {
      userHelpers.getOthers(users, socket.id)[0].master = true;
      console.log(user.name, 'disconnected');
    }
    userHelpers.removeUser(users, socket.id, function(remainingUsers) {
      users = remainingUsers;
      io.emit('user departed', socket.id);
      io.emit('update users', users);
    });
  });

  socket.on('new user', function(user) {
    console.log('new user:', user.name);
    socket.emit('assign socket id', socket.id);
    user.color = userHelpers.chooseColor();
    user.socketId = socket.id;
    user.recording = {};
    io.emit('connect users', users);
    if (users.length === 0) {
      socket.emit('start transport');
      user.master = true;
    } else {
      user.master = false;
    }
    users.push(user);
    io.emit('update users', users);
  });

  socket.on('transmit sound', function(tone) {
    io.emit('play sound', tone, userHelpers.userColor(users, socket.id));
  });

  socket.on('transmit drum', function(drumName) {
    io.emit('play drum', drumName);
  });

  socket.on('record sound', function(soundMap) {
    var userRecording = userHelpers.getUser(users, socket.id).recording;
    var snappedPosition = userHelpers.snapToBeat(soundMap[1]);
    if (userRecording[soundMap[0]] === undefined) {
      userRecording[soundMap[0]] = new Array(snappedPosition);
    } else {
      userRecording[soundMap[0]].push(snappedPosition);
    }
    io.emit('update users', users);
  });

  socket.on('remove sound', function(index) {
    var recording = userHelpers.getUser(users, socket.id).recording;
    var timeToRemove = '0:0:' + index;

    Object.keys(recording).forEach(function(key) {
      recording[key] = recording[key].filter(function(time) {
        return time !== timeToRemove;
      });
    });
    io.emit('update users', users);
  });

  socket.on('sync', function() {
    io.emit('update users', users);
    io.emit('start transport');
  });
});
