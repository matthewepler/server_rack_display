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
var palettes;

// objects
var initBars = 3;
var bars = [];
var init;


function setup() {
	// drawing environment setup
	createCanvas(500, 500);
	// createCanvas(3840, 716);
	background(0);
	bars.push( new Bar( 0, height, 'rgba(9, 80, 255, '));
	angle = 0;
	angleMode(DEGREES);
	initPalettes();

	// socket conncetion starts after 3 seconds beause humans like startup processes
	setTimeout( function() {
		socket = io.connect('http://localhost:3000');
		// socket = io(); // alternative instatiator
		socket.on('render', renderDisplay);
		socket.on('connected', initConnection);
		socket.on('disconnected', closeConnection);
	}, 500);

	// data 
	sampleWindow = 500;   // average readings every sec and use them to draw
	sampleRate = 0;
	prevTime = 0;
	cpuLoadSample, ramUseSample, cpuTempSample = 50;
	cpuLoad, ramUse, cpuTemp = 50;
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

	//console.log(JSON.stringify(data));

	cpuLoadSample += data.cpuLoad / 100;	
	ramUseSample  += data.ramUse  / 100;
	cpuTempSample += data.cpuTemp / 100;
	sampleCounter += 1;
	
	if (currTime - prevTime > sampleWindow) {
		cpuLoad = cpuLoadSample / sampleCounter;
		ramUse  = ramUseSample  / sampleCounter;
		cpuTemp = cpuTempSample / sampleCounter;

		//console.log("average cpuLoad = " + cpuLoad);

		cpuLoadSample = 0;
		ramUseSample  = 0;
		cpuTempSample = 0;
		sampleCounter = 0;
		prevTime = currTime;

		createBars();
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
		var colString = this.color + this.alpha + ')';
		fill(colString);
		rect(0, this.y, width, this.height);
	}

	this.update = function() {
		this.alpha <= 0.1 ? this.dead = true : this.alpha -= 0.01;
	}
}

function createBars() {
	// cpuLoad = overall height
	var maxHeight = cpuLoad * height;

	// cpuTemp = color of bars
	var palette = floor( map(cpuTemp, 0, 1, 0, 5));

	// ramUse  = number of bars and refresh time
	var numBars = map(ramUse, 0, 1, maxHeight/15, 0);
	for (var i=0; i<numBars; i++) {
		bars.push( new Bar(random( height, height - maxHeight), maxHeight/numBars, palettes[palette][floor(random(0, 5))])); 
	}

	// sample window
	var sampleRate = map(ramUse, 0, 1, 0, 1500) || 500; 
	sampleWindow = sampleRate;
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

function keyPressed() {
	if (key == '1') {
		resizeCanvas(3840, 716);
	} else if (key == '2') {
		resizeCanvas(500, 500);
	}
}

function initPalettes() { // if you change number of palettes/color, be sure to also change variables in createBars();
	palettes = [
		[
			['rgba(9, 80, 255, '],
			['rgba(68, 178, 255, '],
			['rgba(20, 52, 135, '],
			['rgba(63, 66, 135, '],
			['rgba(22, 40, 135, ']
		],
		[
			['rgba(12, 120, 135, '],
			['rgba(76, 135, 132, '],
			['rgba(94, 234, 218, '],
			['rgba(26, 234, 167, '],
			['rgba(10, 141, 114, ']
		],
		[
    		['rgba(11, 141, 69, '],
			['rgba(20, 233, 60, '],
			['rgba(45, 82, 40, '],
			['rgba(99, 175, 63, '],
			['rgba(133, 175, 62, ']
		],
		[
			['rgba(175, 156, 37, '],
			['rgba(236, 211, 5, '],
			['rgba(211, 161, 27, '],
			['rgba(160, 121, 21, '],
			['rgba(241, 102, 13, ']
		],
		[
    		['rgba(241, 48, 8, '],
			['rgba(151, 30, 5, '],
			['rgba(151, 32, 55, '],
			['rgba(240, 50, 88, '],
			['rgba(240, 26, 7, ']
		]
	];
}
