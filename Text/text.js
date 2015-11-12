// connection 
var socket;

// data 
var cpuLoad, ramUse, cpuTemp;


function setup() {
	createCanvas(500, 500);
	cpuLoad= 0;
	ramUse = 0;
	cpuTemp = 0;
	// createCanvas(3840, 716);
	initEnvironment();
}

function draw() {
	background(0);
	fill(255);
	textSize(600);
	text(cpuLoad, 50, height - 50);
}

function renderData(data) {
	//console.log(JSON.stringify(data));

	cpuLoad = data.cpuLoad / 100;	// normalize, incoming 0-100
	ramUse  = data.ramUse  / 100;
	cpuTemp = data.cpuTemp / 100;
}

function keyPressed() {
	if (key =='1') {
		resizeCanvas(3840, 716);
	} else if (key == '2') {
		resizeCanvas(500, 500);
	}
}

function initEnvironment() {
	background(0);

	setTimeout( function() {
		socket = io.connect('http://localhost:3000');
		// socket = io(); // alternative instatiator
		socket.on('render', renderData);
		socket.on('connected', initConnection);
		socket.on('disconnected', closeConnection);
	}, 500);
}

function initConnection(data) {
	console.log(data);
}

function closeConnection(data) {
	console.log(data);
}


