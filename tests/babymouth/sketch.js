var sm; // small screen boolean
var bg; // background color, chageable by keystroke
var c;  // current stroke color;
var diam, ellipseColor;
var invertCenter;

function setup() {
	if (windowWidth > 2000) {
		createCanvas(3840, 716);
		sm = false;
	} else {
		createCanvas(windowWidth, windowHeight);
		sm = true;
	}
	bg = color(255);
	c = color(0, 0, 255);
	renderBackground();
	diam = 0.5 * windowHeight;
	ellipseColor = c;
	noStroke();
}

function draw() {
	background(bg);
	renderBackground();
	noStroke();
	if (invertCenter) {
		noStroke()
		fill(red(c), green(c), blue(c), alpha(c));
		rect(windowWidth/3, 0, windowWidth/3, windowHeight);
		fill(bg);
		ellipse(mouseX, mouseY, diam, diam * 0.7);
		fill(255);
		ellipse(mouseX, mouseY, diam * 0.7, (diam * 0.7) );
		rectMode(CENTER);
		rect(mouseX, mouseY, diam * 0.5, (diam * 0.55555) * 0.5);
		rectMode(CORNER);
	} else {
		fill(ellipseColor);
		ellipse(mouseX, mouseY, diam, diam * 0.7);
fill(255);
		ellipse(mouseX, mouseY, diam * 0.7, (diam * 0.7) );

	}
}

function renderBackground() {
//	for (var i=0; i<windowWidth/3; i++) {
//		var alphaVal = map(i, 0, windowWidth/3, 0, 255);
//		stroke(red(c), green(c), blue(c), alphaVal);
//		line(i, 0, i, windowHeight);
//		line(windowWidth - i, 0, windowWidth - i, windowHeight);
//	}
	fill(c);
	rect(0, 0, windowWidth/3, windowHeight);
	rect(windowWidth/3, 0, windowWidth - windowWidth/3, windowHeight);
}

function keyTyped() {
	switch (key) {
		case '0':
				bg = color(0);
				break;
		case '1':
				bg = color(255);
				break;
		case '2':				// complimentary color
			//	var r = red(c);
			//	var g = green(c);
			//	var b = blue(c);
			//	var minRGB = min(r, min(g,b));
			//	var maxRGB = max(r, max(g, b));
			//	var minPlusMax = minRGB + maxRGB;
			//	bg = color(minPlusMax - r, minPlusMax - g, minPlusMax - b);
				colorMode(HSB, 255);
				bg = color(hue(c), saturation(c), brightness(c));
				colorMode(RGB, 255);
				break;
		case '3':				// analagous color
				colorMode(HSB, 255);
				bg = color(hue(c) * 0.5, saturation(c), brightness(c) * 0.5);
				colorMode(RGB, 255);
				break;
		case 'j':
				diam += 10;
				break;
		case 'k':
				diam -= 10;
				break;
		case 's':				// invert center paneli
				invertCenter = !invertCenter;
				break;
		default:
			console.log(key);
	}
}

function windowResized() {
	if(sm) {
		resizeCanvas(windowWidth, windowHeight);
	}
}
