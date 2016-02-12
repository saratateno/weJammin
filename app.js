var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8080;

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules'));


http.listen(port, function() {
  console.log('Node app is running on port' + port);
});

app.get('/', function(request, response) {
  response.render('index');
});

io.on('connection', function (socket) {
  console.log('user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
