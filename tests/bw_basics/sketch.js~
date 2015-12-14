var eyeSize;
var curve;
var thickness;

function setup() {
	createCanvas(3840, 716);
	eyeSize = 100;
	curve =false;
	thickness = 10;
}

function draw() {
	background(0);
	fill(255);
	stroke(255);
	strokeWeight(thickness);

	if(curve) {
		noFill();
		beginShape();
			for (var i=0; i<10; i++) {
				var y = height - 200;
				if(i % 2 == 0) {
					y = height - 300;
				}
				curveVertex((i * ((width-500)/10)), y);
			}
		endShape();
	} else {
		line( 250, height - 250, width - 250, height - 250 );
	}

	if(mouseIsPressed) {
		ellipse(mouseX, mouseY, eyeSize, eyeSize);
	}
}

function keyPressed() {
	if(keyCode == UP_ARROW) {
		eyeSize += 50;
	} else if(keyCode == DOWN_ARROW) {
		eyeSize -= 50;
	}
}

function keyTyped() {
	if (key == 'e') {
		thickness += 25;
	} else if (key == 'd') {
		thickness -= 25;
	}

	if (key == 'c') {
		curve = !curve;
	}
}

// mouseX changes thickness of line across the screen (mouth)
//
// if mousePressed, a circle is drawn at the mouse position
// pressing up arrow increases its size, down decreases
//
// pressing c switches the line to a curve
