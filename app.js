var express = require('express');
var app = express();
app.use(express.static('/'));

app.get('/', function (req, res) {
	console.log('GET /');
	res.sendFile('index.html');
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening at http://%s:%s', host, port);
});
