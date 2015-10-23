var socket;
var width, height;

function setup() {
	socket = io.connect('http://localhost:3000');
	// socket = io(); // alternative instatiator
	socket.on('render', renderDisplay);
	socket.on('connected', initConnection);
	socket.on('disconnected', closeConnection);

	createCanvas(2600, 480);
}

function draw() {
	ellipse(5, 5, 5, 5);
}


function renderDisplay(data) {
	width = data.x;
	height = data.y;

	ellipse(width, height, 100, 100);
}

function initConnection(data) {
	console.log(data);
	fill(0, 255, 0);
}

function closeConnection(data) {
	console.log(data);
	fill(255, 0, 0);
}


