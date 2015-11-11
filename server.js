var express = require('express'),
	io = require('socket.io'),
	app = express();
	server = app.listen(3000);
	socketServer = io(server);

app.use(express.static('./'));


app.get('/', function(req, res) {
	res.sendFile('/index.html');	
});

app.get('/bars', function(req, res) {
	res.sendFile('Bars/index.html');
});

app.get('/balls', function(req, res) {
	res.sendFile('/Balls/index.html');
});

app.get('rings', function(req, res) {
	res.sendFile('Rings/index.html');
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
	socketServer.emit('render', req.query);
	if(req.headers.origin.includes("localhost")) {
		res.header('Access-Control-Allow-Origin', '*');
	}
	res.end('thank you come again');
});
