var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})
var io = require('socket.io').listen(server);
var chats;
io.sockets.on('connection', function (socket) {
	socket.on('got_new_user', function(data){
		var name = data.name 
		io.emit('new_user', {name: name})
	});
	socket.on('sending_chat', function (data){
    	chats = data.name+":  "+data.chat;
    	io.emit('update_convo', {response: chats});
  	});
  	socket.on('leave_convo', function(data){
  		var name = data.name;
    	socket.broadcast.emit('user_leave', {response: name});
  	});
});
   