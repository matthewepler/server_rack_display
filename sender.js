// every 100 ms, send an update
// update = two random numbers between 10, 40

var app = require('express')();
var io = require('socket.io');
var server = app.listen(3000);
var socketServer = io(server);

setInterval( function() {
	var randX = getRandomInt(10, 40);
	var randY = getRandomInt(10, 40);
	data = {
		x: randX,
		y: randY
	}	
	socketServer.emit('update', data);
	console.log('update random');
}, 100);

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min + 1) + min);
}
