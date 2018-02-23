function Firework(x, y) {
	this.hue = random(255);
	this.firework = new Particle(x, y, this.hue, p5.Vector.random2D, true);
	this.exploded = false;
	this.particles = [];

	this.done = function() {
		return (this.exploded && this.particles.length == 0)
	}

	this.update = function() {
		if (!this.exploded) {
			this.firework.applyForce(gravity);
			this.firework.update();
		
			if (this.firework.vel.y >= 0) {
				this.exploded = true;
				this.explode();
			}
		}
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].applyForce(gravity);
			this.particles[i].update();
		}

		this.deleteParticles();
	}

	this.show = function() {
		if (!this.exploded) {
			this.firework.show();
		}
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].show();
		}
	}

	this.explode = function() {
		for (var i = 0; i < 30; i++) {
			var vel = p5.Vector.random2D();
			var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hue, vel, false);
			// var p = new Vehicle(this.firework.pos.x, this.firework.pos.y, this.hue, false);
			this.particles.push(p);
		}
	}

	this.deleteParticles = function() {
		for (var i = this.particles.length-1; i >= 0; i--) {
			if (this.particles[i].lifespan < 0)
				this.particles.splice(i, 1);
		}
	}
}