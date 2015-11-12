function Ring(startDiameter, speed, color) {
	this.pos = createVector(width/2, height/2);
	this.diameter = startDiameter;
	this.startDiameter = startDiameter;
	this.speed = speed;
	this.color = color;
	this.dead = 0;
	this.alpha = 1;

	this.update = function() {
		this.diameter += speed;
		//this.alpha = map(this.diameter, this.startDiameter, width * 1.5, 1, 0);
		if (this.diameter > width * 1.1) {
			this.dead = 1;
		}
	}

	this.display = function() {
		strokeWeight(50);
		stroke(this.color + this.alpha + ')');
		noFill();
		ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
	}
}
