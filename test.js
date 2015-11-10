var alpha;
var c

function setup() {
 	createCanvas(500, 500);
	noStroke();
	c = color('rgba(0, 0, 0, 1)');
	alpha = 1;
}

function draw() {
	background(255);
	var colString = 'rgba(0, 0, 0, ' + alpha + ')';
	fill(colString);
	rect(0, 0, width, height);
	if (alpha <= 0) {
		alpha = 1;
	} else {
		alpha -= 0.01;
	}
	console.log(alpha);
}
