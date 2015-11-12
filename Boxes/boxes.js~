// connection 
var socket;

// data 
var cpuLoad, ramUse, cpuTemp;

// drawing 
var angle;
var palettes;
var palette;
var strokeColor;

// objects
var objects;


function setup() {
	//createCanvas(500, 500, WEBGL);
	createCanvas(3840, 716, WEBGL);
	initEnvironment();
}

function draw() {
	background(0);
	//console.log(objects.length);

	directionalLight(200, 0, 0, 0.25, 0.25, 0.25);
	pointLight(red(strokeColor), green(strokeColor), blue(strokeColor), 0, 1, 0); 
	if (objects.length > 0) {
		for (var i=0; i<objects.length; i++) {
			objects[i].display();
		}
	}
}	

function createObjects() { // assing vars to object attr.
	// cpuLoad = speed of spin
	var rotation = map(cpuLoad, 0, 1, 0.05, 0.75);
	for (var i=0; i<objects.length; i++) {
		objects[i].rotation = rotation;
	}

	// cpuTemp = color
	var incomingPalette = floor( map(cpuTemp, 0, 1, 0, 5));
	if (incomingPalette != palette) {
		palette = incomingPalette;
		strokeColor = color(palettes[palette]);
	}

	// ramUse = number of boxes
	var numBoxes = floor( map(ramUse, 0, 1, 20, 150));
	if (objects.length < numBoxes) {
		for (var i=0; i<numBoxes - objects.length; i++) {
			objects.push( new Box(random(0, TWO_PI)));
		}
	} else if (objects.length > numBoxes) {
		objects.splice(numBoxes, objects.length - numBoxes);
	}
}

function renderData(data) {
	//console.log(JSON.stringify(data));

	cpuLoad = data.cpuLoad / 100;	// normalize, incoming 0-100
	ramUse  = data.ramUse  / 100;
	cpuTemp = data.cpuTemp / 100;
	
	createObjects();
}

function keyPressed() {
	if (key =='1') {
		resizeCanvas(3840, 716);
	} else if (key = '2') {
		resizeCanvas(500, 500);
	}
}

function initEnvironment() {
	background(0);
	initPalettes();

	setTimeout( function() {
		socket = io.connect('http://localhost:3000');
		// socket = io(); // alternative instatiator
		socket.on('render', renderData);
		socket.on('connected', initConnection);
		socket.on('disconnected', closeConnection);
	}, 500);

	// data 
	cpuLoad, ramUse, cpuTemp = 0;

	// drawing
	angle = 0;
	angleMode(DEGREES);
	palette = 0;
	strokeColor = color(0);

	// objects
	objects = [];

}

function initPalettes() { // if you change number of palettes/color, be sure to also change variables in createBars();
	palettes = [ 'rgb(68, 178, 255)', 'rgb(26, 234, 167)', 'rgb(20, 233, 60)', 'rgb(240, 154, 15)', 'rgb(255, 0, 0)' ];
}


function initConnection(data) {
	console.log(data);
}

function closeConnection(data) {
	console.log(data);
}


