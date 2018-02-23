class Particle {
	constructor(x, y, i, j) {
		this.pos = createVector(x, y);
        this.vel = createVector(random(-1, 1), random(-1, 1));
        // this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.gridSpace = createVector(i, j);

        this.thrust = 2;
        this.maxspeed = 3;

        this.closest = this.findClosest();
	}

	update() {
		this.pos.add(this.vel);
        this.vel.add(this.acc);
        if (this.vel.mag() > this.maxspeed) this.vel.mult(0.2);
        this.acc.mult(0);
        
        this.closest = this.findClosest();
        this.constrain();
        var mousePos = createVector(mouseX, mouseY)
        mouseIsPressed ? this.attract(mousePos) : this.repel(mousePos);

		this.draw();
	}

	draw() {
		stroke(0);
		strokeWeight(5);
        point(this.pos.x, this.pos.y);
        strokeWeight(1);
        colorMode(HSB);
        var colour = map(this.closest.length, 0, 10, 0, 255);
        stroke(colour, 255, 255);
        for (var i = 0; i < this.closest.length; i++) {
            line(this.pos.x, this.pos.y, this.closest[i].pos.x, this.closest[i].pos.y);
        }
    }
    
    findClosest() {
        var closest = [];
        for (var i = 0; i < particles.length; i++) {
            if (this.pos.copy().sub(particles[i].pos).mag() < spacing*1.5) {
                closest.push(particles[i]);
            }
        }
        return closest;
    }

    constrain() {
        if (this.pos.x < 0) this.acc.x += this.thrust;
        if (this.pos.x > width) this.acc.x -= this.thrust;
        if (this.pos.y < 0) this.acc.y += this.thrust;
        if (this.pos.y > height) this.acc.y -= this.thrust;
    }

    repel(pos) {
        var direction = this.pos.copy().sub(pos);
        if (direction.mag() < spacing) {
            this.acc.add(direction);
        }
    }

    attract(pos) {
        var direction = this.pos.copy().sub(pos);
        if (direction.mag() < spacing) {
            this.acc.add(direction.mult(-1));
        }
    }
}