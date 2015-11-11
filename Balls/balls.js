// connection 
var socket;

// data
var prevTime;
var sampleWindow;
var cpuLoadSample, ramUseSample, cpuTempSample;
var cpuLoadRan, ramUseRan, cpuTempRan;
var sampleCounter;
var cpuLoad, ramUse, cpuTemp;

// drawing
var angle;

// objects
var palettes;
var balls;


function setup() {
	createCanvas(500, 500);
	// createCanvas(3840, 716);
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
	angleMode(DEGREES);
	angle = 0;

	// objects
	balls = [];
}

function draw() {
	background(0);
	
	if (balls.length > 0) {

	} else {
		drawStandby();
	}
	
	for (var i=0; i<balls.length; i++) {
		balls[i].update();
		balls[i].checkEdges();
		balls[i].display();
	}
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

	    createBalls();
	}
}

function createBalls() {
	// Ram Use  = number
	var numBalls = floor( map(ramUse, 0, 1, 0, 100));
	if (balls.length < numBalls) {
		for (var i=0; i< numBalls - balls.length; i++) {
			balls.push( new Ball() );
		}
	} else if (balls.length > numBalls) {
		balls.splice(numBalls, balls.length - numBalls);
	}

	// CPU Load = speed
	var baseSpeed = floor( map(cpuLoad, 0, 1, 0.5, 17));
	for (var i=0; i<balls.length; i++) {
		if( baseSpeed > 0) {
			var currXaccel = balls[i].acceleration.x;
			var newXaccel  = random (baseSpeed - 2, baseSpeed + 2);
			if (currXaccel < 0 ) newXaccel *= -1;
			balls[i].acceleration.x = newXaccel;

			var currYaccel = balls[i].acceleration.y;
			var newYaccel  = baseSpeed;
			if (currYaccel < 0) newYaccel *= -1;
			balls[i].acceleration.y = newYaccel;
		}
	}

	// CPU Temp = color
	var palette = floor( map(cpuTemp, 0, 1, 0, 5));
	for (var i=0; i<balls.length; i++) {
		balls[i].color = palettes[palette][floor( random(0, 5))]; 
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
			['rgb(9, 80, 255)'],
			['rgb(68, 178, 255)'],
			['rgb(20, 52, 135)'],
			['rgb(63, 66, 135)'],
			['rgb(22, 40, 135)']
		],
		[
			['rgb(12, 120, 135)'],
			['rgb(76, 135, 132)'],
			['rgb(94, 234, 218)'],
			['rgb(26, 234, 167)'],
			['rgb(10, 141, 114)']
		],
		[
    		['rgb(11, 141, 69)'],
			['rgb(20, 233, 60)'],
			['rgb(45, 82, 40)'],
			['rgb(99, 175, 63)'],
			['rgb(133, 175, 62)']
		],
		[
			['rgb(175, 156, 37)'],
			['rgb(236, 211, 5)'],
			['rgb(211, 161, 27)'],
			['rgb(160, 121, 21)'],
			['rgb(241, 102, 13)']
		],
		[
    		['rgb(241, 48, 8)'],
			['rgb(151, 30, 5)'],
			['rgb(151, 32, 55)'],
			['rgb(240, 50, 88)'],
			['rgb(240, 26, 7)']
		]
	];
}
