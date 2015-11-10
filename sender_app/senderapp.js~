var slider1, slider2, slider3;
var cpuLoad, ramUse, cpuTemp;
var slider1Y = 20;
var slider2Y = 140;
var slider3Y = 260;
var spacer = 20;


function setup() {
	createCanvas(400, 400);
	textSize(15);
	noStroke();
	
	slider1 = createSlider(0, 100, 50);
	slider1.position(20, slider1Y + spacer); // room for text on top
	slider1.changed(sendVals);
	slider2 = createSlider(0, 100, 50);
	slider2.position(20, slider2Y + spacer);
	slider2.changed(sendVals);
	slider3 = createSlider(0, 100, 50);
	slider3.position(20, slider3Y + spacer);
	slider3.changed(sendVals);
}

function draw() {
	background(255);
	cpuLoad = slider1.value();
	text("CPU Load", 20, slider1Y);
	text(cpuLoad, 20, slider1Y + spacer*3);

	ramUse = slider2.value();
	text("RAM use", 20, slider2Y);
	text(ramUse, 20, slider2Y + spacer*3);

	cpuTemp = slider3.value();
	text("CPU Temp", 20, slider3Y);
	text(cpuTemp, 20, slider3Y + spacer*3);
}

function sendVals() {
	console.log("CPU Load = " + cpuLoad + ", " + "RAM Use  = " + ramUse	+ ", " + "CPU Temp = " + cpuTemp);
	
	// GET request to other server, running locally @
	var baseURL = "http://localhost:3000/update?";
	baseURL += "cpuLoad="  + cpuLoad;
	baseURL += "&ramUse="  + ramUse;
	baseURL += "&cpuTemp=" + cpuTemp;

	httpGet(baseURL, null, null, null, function(err) {
		console.log(err);
	});





}
