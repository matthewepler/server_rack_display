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
var objects;


function setup() {
	createCanvas(500, 500);
	// createCanvas(3840, 716);
	initEnvironment();
}

function draw() {
	background(0);
	if (objects.size > 0) {
	} else {
		drawStandby();
	}
	// call object update/draw methods 
}

function createObjects() { // assing vars to object attr.
	// cpuLoad = 

	// cpuTemp = 
	var palette = floor( map(cpuTemp, 0, 1, 0, 5));

	// ramUse = 
}

function renderDisplay(data) {
	var currTime = millis();

	//console.log(JSON.stringify(data));

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

		//console.log("average cpuLoad = " + cpuLoad);

		cpuLoadSample = 0;
		ramUseSample  = 0;
		cpuTempSample = 0;
		sampleCounter = 0;
		prevTime = currTime;

		createObjects();
	}
}

function initConnection(data) {
	console.log(data);
}

function closeConnection(data) {
	console.log(data);
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

function initEnvironment() {
	background(0);
	initPalettes();

	setTimeout( function() {
		socket = io.connect('http://localhost:3000');
		// socket = io(); // alternative instatiator
		socket.on('render', renderDisplay);
		socket.on('connected', initConnection);
		socket.on('disconnected', closeConnection);
	}, 3000);

	// data 
	sampleWindow = 50;   // average readings every sec and use them to draw
	prevTime = 0;
	cpuLoadSample, ramUseSample, cpuTempSample = 0;
	cpuLoadRan, ramUseRan, cpuTempRan = 0;
	cpuLoad, ramUse, cpuTemp = 0;
	sampleCounter = 0;

	// drawing
	angle = 0;
	angleMode(DEGREES);

	// objects
	objects = [];

}
