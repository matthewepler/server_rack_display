// connection 
var socket;

// drawing 
var cpuLoad, ramUse, cpuTemp;
var startHeight;

// objects
var initBars = 3;
var bars = [];
var init;


function setup() {
	createCanvas(500, 500);
	background(0);
	for (var i=0; i<initBars; i++) {
		bars.push( new Bar( (height/initBars) * i, 'rgba(9, 80, 255, '));
	}

	setTimeout( function() {
		background(0);
		socket = io.connect('http://localhost:3000');
		// socket = io(); // alternative instatiator
		socket.on('render', renderDisplay);
		socket.on('connected', initConnection);
		socket.on('disconnected', closeConnection);
	}, 3000);
}

function draw() {
	if (bars.length > 0) {
		background(255);
		for (var i=0; i<bars.length; i++) {
			if (bars[i].dead) {
				bars.splice(i, 1);
			} else {
				bars[i].update();
				bars[i].display();
			}
		}
	}
}


function renderDisplay(data) {
	console.log("got data: " + JSON.stringify(data));
	cpuLoad = data.cpuLoad / 100;
	ramUse  = data.ramUse  / 100;
	cpuTemp = data.cpuTemp / 100;
	
	//startHeight = height - cpuLoad*height;

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

function Bar(startY, color) {
	this.x = 0;
	this.y = startY;
	this.color = color;
	this.alpha = 1;
	this.dead = false;

	this.display = function() {
		noStroke();
		var colString = color + this.alpha + ')';
		fill(colString);
		rect(0, this.y, width, height - this.y);
	}

	this.update = function() {
		this.alpha <= 0 ? this.dead = true : this.alpha -= 0.01;
		console.log(this.alpha);
	}
}


