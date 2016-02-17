var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userHelpers = require('./serverHelpers/userHelpers.js');

var users = [];
var messages = [];

app.set('port', (process.env.PORT || 8080));
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
    console.log(messages);
    messages.push(newMessage);
    console.log(messages);
    io.emit('update messages', newMessage);
  });

  socket.on('disconnect', function() {
    if (users.length > 1 && userHelpers.getUser(users, socket.id)) {
      if (userHelpers.getUser(users, socket.id).master === true) {
        userHelpers.getOthers(users, socket.id)[0].master = true;
        console.log('disconnected: ', userHelpers.getUser(users, socket.id));
      }
    }
    userHelpers.removeUser(users, socket.id, function(remainingUsers) {
      users = remainingUsers;
      io.emit('user departed', socket.id);
      io.emit('update users', users);
      console.log("remaining users:", users);
    });
  });

  socket.on('new user', function(user) {
    console.log('newuser:', user);
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
    console.log('transmit sound:', tone);
    io.emit('play sound', tone, userHelpers.userColor(users, socket.id));
  });

  //soundMap = ['bass', '0:0:1.03234']
  socket.on('record sound', function(soundMap) {
    //recording = {'bass': ['0:0:1', '0:0:2'] }
    var cleanPosition = userHelpers.snapToBeat(soundMap[1]);
    var userRecording = userHelpers.getUser(users, socket.id).recording;
    if (userRecording[soundMap[0]] === undefined) {
      userHelpers.getUser(users, socket.id).recording[soundMap[0]] = new Array(cleanPosition);
    } else {
      userHelpers.getUser(users, socket.id).recording[soundMap[0]].push(cleanPosition);
    }
    io.emit('update users', users);
    console.log(users);
  });

  socket.on('sync', function() {
    console.log('syncing transport!')
    io.emit('update users', users);
    io.emit('start transport');
  });
});
