var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

http.listen(8080, function() {
  console.log('Node app is running on port' + app.get('port'));
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
