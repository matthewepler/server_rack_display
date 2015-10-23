var socket;

function setup() {
	socket = io.connect('http://localhost:3000');
	createCanvas(2600, 480);

	socket.on('mouse',
    	// When we receive data
		function(data) {
			console.log("Got: " + data.x + " " + data.y);
			// Draw a blue circle
			fill(0,0,255);
			noStroke();
			ellipse(data.x,data.y,80,80);
		}
	);
}

function draw() {
	ellipse(50, 50, 80, 80);
}
