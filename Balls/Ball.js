// stolen from Daniel Shiffman
// http://natureofcode.com

function Ball(color) {
	this.size = 200;
	this.position = createVector(random(0, width), random(0, height) );
	this.acceleration = createVector(3, 10);
	this.color = color;
	
	this.update = function() {
		this.position.add(this.acceleration);
	}
	
	this.display = function() {
		noStroke();
		fill(this.color);
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
