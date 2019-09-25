var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 2000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket) {
	socket.on('username', function(client) {
		console.log('new user connected');
    	socket.broadcast.emit('username', client);
	})
  	socket.on('chat message', function(msg){
    	socket.broadcast.emit('chat message', msg);
  	});
	socket.on('inactive', function(msg) {
		console.log('user disconnected');
    	socket.broadcast.emit('inactive', msg);
    })
    socket.on('typing', function(msg) {
    	socket.broadcast.emit('typing', msg);
    })
    socket.on('connected', function(msg) {
    	console.log(msg);
    	socket.broadcast.emit('connected', msg);
    })
})

app.use('*', function (req, res) {	
	res.send("<center><h1>File Not Found!</h1></center>")
})

http.listen(port, function(){
  console.log('listening on *:' + port);
});
