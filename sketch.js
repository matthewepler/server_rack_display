var socket;
var width, height;
var circleSize = 150;
var counter;

function setup() {
	socket = io.connect('http://localhost:3000');
	// socket = io(); // alternative instatiator
	socket.on('render', renderDisplay);
	socket.on('connected', initConnection);
	socket.on('disconnected', closeConnection);

	createCanvas(3840, 716);
	stroke(255);
	noFill();
}

function draw() {
	background(0);
}


function renderDisplay(data) {
	console.log("got data: " + JSON.stringify(data));
}

function initConnection(data) {
	console.log(data);
	fill(255);
	noStroke();
}

function closeConnection(data) {
	console.log(data);
	fill(255, 0, 0);
}


