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
}

setInterval(function() {
	background(0);
	ellipse(circleSize * counter, windowHeight/2, circleSize, circleSize);
	if (counter < windowWidth/circleSize){
		counter += 1;
	} else {
		counter = 0;
	}
}, 200);


function renderDisplay(data) {
	console.log("got data: " + data);
//	width = data.x;
//	height = data.y;
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


