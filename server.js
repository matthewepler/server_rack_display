var express = require('express'),
	io = require('socket.io'),
	app = express();
	server = app.listen(3000);
	socketServer = io(server);

app.use(express.static('./'));


app.get('/', function(req, res) {
	res.sendFile('/index.html');	
});

socketServer.on('connection', function(socket) {

	console.log('new connection @: ' + socket.handshake.address);
	socket.emit('connected', "server sez: hello!");
	
	socket.on('disconnect', function() {
		console.log('disconnected');
		socket.emit('disconnected', "server sez: goodbye!");
	});

	socket.on('update', function(data) {
		console.log('update rcvd ' + data);
		socket.broadcast.emit('render', data);
	});
});

app.get('/update', function(req, res) {
	console.log("app rec'd query: " + req.query);
	socketServer.emit('render', req.query);
	res.header('Access-Control-Allow-Origin', '*');
	res.end('bye');
});
