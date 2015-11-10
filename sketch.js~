// connection 
var socket;

// data
var prevTime;
var sampleWindow;
var cpuLoadSample, ramUseSample, cpuTempSample;
var cpuLoadRan, ramUseRan, cpuTempRan;
var sampleCounter;

// drawing 
var cpuLoad, ramUse, cpuTemp;
var startHeight;
var angle;

// objects
var initBars = 3;
var bars = [];
var init;


function setup() {
	// drawing environment setup
	createCanvas(500, 500);
	background(0);
	bars.push( new Bar( 0, height, 'rgba(9, 80, 255, '));
	angle = 0;
	angleMode(DEGREES);

	// socket conncetion starts after 3 seconds beause humans like startup processes
	setTimeout( function() {
		socket = io.connect('http://localhost:3000');
		// socket = io(); // alternative instatiator
		socket.on('render', renderDisplay);
		socket.on('connected', initConnection);
		socket.on('disconnected', closeConnection);
	}, 3000);

	// data 
	sampleWindow = 1000;   // average readings every sec and use them to draw
	prevTime = 0;
	cpuLoadSample, ramUseSample, cpuTempSample = 0;
	cpuLoadRan, ramUseRan, cpuTempRan = 0;
	cpuLoad, ramUse, cpuTemp = 0;
	sampleCounter = 0;
}

function draw() {
	background(0);
	if (bars.length > 0) { // draw bars
		for (var i=0; i<bars.length; i++) {
			if (bars[i].dead) {
				bars.splice(i, 1);
			} else {
				bars[i].update();
				bars[i].display();
			}
		}
	} else { 
		drawStandby();		// standby graphic
	}
}


function renderDisplay(data) {
	var currTime = millis();

	console.log(JSON.stringify(data));

	cpuLoadSample += data.cpuLoad / 100;	
	ramUseSample  += data.ramUse  / 100;
	cpuTempSample += data.cpuTemp / 100;
	cpuLoadRan = data.cpuLoadRan;
	ramUseRan  = data.ramUseRan;
	cpuTempRan = data.cpuTempRan;
	sampleCounter += 1;
	
	if (currTime - prevTime > sampleWindow && sampleCounter > 0) {
		cpuLoad = cpuLoadSample / sampleCounter;
		ramUse  = ramUseSample  / sampleCounter;
		cpuTemp = cpuTempSample / sampleCounter;

		console.log("average cpuLoad = " + cpuLoad);

		cpuLoadSample = 0;
		ramUseSample  = 0;
		cpuTempSample = 0;
		sampleCounter = 0;
		prevTime = currTime;

		createBars(); // this is where you left off - define this
	}
}

function initConnection(data) {
	console.log(data);
}

function closeConnection(data) {
	console.log(data);
}

function Bar(startY, barHeight, color) {
	this.x     = 0;
	this.y     = startY;
	this.height= barHeight;
	this.color = color;
	this.alpha = 1;
	this.dead  = false;

	this.display = function() {
		noStroke();
		var colString = color + this.alpha + ')';
		fill(colString);
		rect(0, this.y, width, this.height);
	}

	this.update = function() {
		this.alpha <= 0 ? this.dead = true : this.alpha -= 0.01;
	}
}

function createBars() {

}

function drawStandby() {
	push();
		translate(width/2, height/2);
		fill(9,80,255);
		noStroke();
		rotate(angle);
		ellipse(125, 0, 30, 30);
		fill(9,80,255, 200);
		rotate(angle-5);
		ellipse(125, 0, 30, 30);

	pop();
	angle >= 360 ? angle=0 : angle += 2;

}
