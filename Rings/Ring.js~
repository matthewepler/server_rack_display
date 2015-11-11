function Ring(startDiameter) {
	this.pos = createVector(width/2, height/2);
	this.diameter = startDiameter;
	this.startDiameter = startDiameter;
	this.color = 'rgba(255, 255, 255, ';
	this.dead = 0;
	this.alpha = 1;

	this.update = function() {
		this.diameter += 5;
		// map between where it started and width*1.5
		this.alpha = map(this.diameter, this.startDiameter, width * 1.5, 1, 0);
		if (this.diameter > width * 1.50) {
			this.dead = 1;
		}
	}

	this.display = function() {
		strokeWeight(10);
		stroke(this.color + this.alpha + ')');
		noFill();
		ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
	}
}
