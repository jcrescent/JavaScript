
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
var io = require('socket.io').listen(server)

io.sockets.on('connection', function (socket) {
  var count = 0;
	socket.on("button_clicked", function (){
      count++ 
    	io.emit('add_count', {response:count});
    });
  socket.on('reset', function(){
    count = 0;
    io.emit('restart_count');
    });
  });
   