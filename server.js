var http = require('http');
var path = require('path');
var fs   = require('fs');

var server = http.createServer(handleRequest);
server.listen(3000);

var io = require('socket.io').listen(server);

console.log('Server started on port 3000');

function handleRequest(req, res) {
	var pathname = req.url;

	if (pathname == '/') {
		pathname = '/index.html';
	}
	
	var ext = path.extname(pathname);

	var typeExt = {
		'.html': 'text/html',
		'.js'  : 'text/javascript',
		'.css' : 'text/css'
	};

	var contentType = typeExt[ext] || 'text/plain';

	fs.readFile(__dirname + pathname, function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading ' + pathname);
		}
		res.writeHead(200, {'Content-Type' : contentType });
		res.end(data);
	});
}
	
