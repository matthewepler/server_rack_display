var slider1, slider2, slider3;
var checkbox1, checkbox2, checkbox3;
var cpuLoad, ramUse, cpuTemp;
var cpuLoadRan, ramUseRan, cpuTempRan;
var slider1Y;
var slider2Y;
var slider3Y;
var spacer;
var button1;

function setup() {
	createCanvas(400, 400);
	textSize(15);
	noStroke();
	initInterface();	
	setInterval(sendVals, 150);
//	button1 = createButton('bars');
//	button1.id('bars');
//	button1.mouseClicked(gotopage);
}

function gotopage(data) {
	var baseURL = "http://localhost:3000/";
	if (data.path[0].id == 'bars') {
		baseURL += "bars"
		//httpGet(baseURL, null, null, null, function(err) {
			//if(err) console.log(err);
		//});
	}
}


function draw() {
	background(255);

	cpuLoad = slider1.value();
	text("CPU Load", 20, slider1Y);
	text(cpuLoad, 20, slider1Y + spacer*3);
	

	ramUse = slider2.value();
	text("RAM Use", 20, slider2Y);
	text(ramUse, 20, slider2Y + spacer*3);

	cpuTemp = slider3.value();
	text("CPU Temp", 20, slider3Y);
	text(cpuTemp, 20, slider3Y + spacer*3);
}

function sendVals() {
//	console.log("CPU Load = " + cpuLoad + ", " + "RAM Use  = " + ramUse	+ ", " + "CPU Temp = " + cpuTemp);

	var ranAmnt = 5;
	if (cpuLoadRan === true) cpuLoad += random(ranAmnt * -1, ranAmnt);
	if (ramUseRan  === true) ramUse  += random(ranAmnt * -1, ranAmnt);
	if (cpuTempRan === true) cpuTemp += random(ranAmnt * -1, ranAmnt);

	// GET request to other server, running locally @
	var baseURL = "http://localhost:3000/update?";
	baseURL += "cpuLoad="  + cpuLoad;
	baseURL += "&cpuLoadRan=" + cpuLoadRan;
	baseURL += "&ramUse="  + ramUse;
	baseURL += "&ramUseRan="  + ramUseRan;
	baseURL += "&cpuTemp=" + cpuTemp;
	baseURL += "&cpuTempRan=" + cpuTempRan;

	httpGet(baseURL, null, null, null, function(err) {
		console.log(err);
	});
}

function initInterface() {
	slider1Y = 20;
	slider2Y = 140;
	slider3Y = 260;
	spacer = 20;

	cpuLoadRan, ramUseRan, cpuTempRan = false;

	fill(0);
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

