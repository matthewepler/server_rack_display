// stolen from Daniel Shiffman
// http://natureofcode.com

function Ball() {
	this.size = 48;
	this.position = createVector(width/2, height/2);
	this.acceleration = createVector(3, 10);
	this.topspeed = 10;

	this.update = function() {
		this.position.add(this.acceleration);
	}
	
	this.display = function() {
		noStroke();
		fill(127);
		ellipse(this.position.x, this.position.y, this.size, this.size);
	}

	this.checkEdges = function() {
		if (this.position.x > width) {
			this.acceleration.x *= -1;
		}	
		else if (this.position.x < 0) {
			this.acceleration.x *= -1;
		}

		if (this.position.y > height) {
			this.acceleration.y *= -1;
		}
		else if (this.position.y < 0) {
			this.acceleration.y *= -1;
		}
	}
}
