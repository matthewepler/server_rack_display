function Box(startRotation) {
	this.pos = createVector(random(-width/2, width/2), random(-height/2, height/2));
	this.rotation = startRotation;
	this.size = 100;

	this.display = function() {
		push();
		translate(this.pos.x, this.pos.y, 0);
		rotateZ(frameCount/10 * this.rotation + startRotation);
		rotateX(frameCount/10 * this.rotation + startRotation);
		specularMaterial(250);
		box(this.size, this.size, this.size);
		pop();
	}
}
