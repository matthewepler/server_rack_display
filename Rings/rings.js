// connection 
var socket;

// data
var prevTime;
var cpuLoadRan, ramUseRan, cpuTempRan;

// drawing 
var cpuLoad, ramUse, cpuTemp;
var angle;
var palettes;

// objects
var objects;

// add-ons
var freqCounter;


function setup() {
	createCanvas(500, 500);
	// createCanvas(3840, 716);
	initEnvironment();
	noSmooth();
}

function draw() {
	background(0);
	//console.log(objects.length);
	if (objects.length > 0) {
		for (var i=0; i<objects.length; i++) {
			if (!objects[i].dead) {
				objects[i].update();
				objects[i].display();
			} else {
				objects.splice(i, 1);
				console.log("dead");
			}
		}
	} else {
		drawStandby();
	}
}

function createObjects() { // assing vars to object attr.

	// ramUse = starting diameter 
	var startDiameter = map(ramUse, 0, 1, 0, width - (0.15 * width));

	// cpuTemp = color 
	var palette = floor( map(cpuTemp, 0, 1, 0, 5));
	color = palettes[palette][floor( random(0, 5))];

	// cpuLoad = speed + frequency 
	var speed = map(cpuLoad, 0, 1, 120, 30);
	//var speed = 80;
	//freqCounter += cpuLoad;
	//var threshold = map(cpuLoad, 0, 1, 2, 0.02);
	//console.log( freqCounter + " : " + threshold);
	//if (freqCounter > threshold + random(0.01, 0.5)) {
	//	objects.push( new Ring(startDiameter, speed, color ));
	//	freqCounter = 0;
	//}
	

	// frequency of new Rings generated 
	var frequency = random(0, 1);
	if (frequency < 0.35) {
		objects.push( new Ring(startDiameter, speed, color ));
	}
}

function renderDisplay(data) {
	//console.log(JSON.stringify(data));

	cpuLoad = data.cpuLoad / 100;	
	ramUse  = data.ramUse  / 100;
	cpuTemp = data.cpuTemp / 100;
		
	createObjects();
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
	prevTime = 3000;
	cpuLoad, ramUse, cpuTemp = 0;

	// drawing
	angle = 0;
	angleMode(DEGREES);

	// objects
	objects = [];

	// add-ons
	freqCounter = 0;
}
