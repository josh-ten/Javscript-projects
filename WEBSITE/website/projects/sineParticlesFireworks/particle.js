function Particle(x, y, hue, vel_, firework) {
	this.pos = createVector(x, y);
	this.firework = firework;
	this.lifespan = 255;
	this.hue = hue;

	if (this.firework)
		this.vel = createVector(random(-2, 2), random(-12, -6));
	else
		this.vel = createVector(random(-6, 6), random(-6, 6));

	this.acc = createVector(0, 0);

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {

		if (!this.firework) {
			this.vel.mult(0.9);
			this.lifespan -= 4;
		}
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.show = function() {
		colorMode(HSB);
		strokeWeight(2);

		if (!this.firework) {
			stroke(hue, 255, 255, this.lifespan);
		} else  {
			stroke(hue, 255, 255);
		}
		point(this.pos.x, this.pos.y);
	}
}