class Astronaut {
	constructor(person) {
		this.person = person;
		var padding = 30;
		var x = random(padding, width-padding);
        var y = random(padding, height-padding);
        this.maxspin = 0.03;
		this.maxspeed = 0.5;		
		this.pos = createVector(x, y);
		this.vel = p5.Vector.random2D().mult(this.maxspeed);
        this.acc = createVector(0, 0);
        this.rotation = 0;
        this.angMom = 1;
        this.torque = 0;
        this.attractor;
		
		this.name = person.name;
        this.size = 30;
        this.hue = random(255);
        
        this.xoff = random(10000);
	}

	update() {
        this.xoff += 0.1;

		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
		this.constrain();
        this.bounce();
        this.attract();
        this.vel.limit(this.maxspeed);
        
        this.torque = (noise(this.xoff)-0.5) * this.maxspin;
        this.angMom += this.torque;        
        this.rotation += this.angMom;
        this.torque = 0;
        limit(this.angMom, -this.maxspin, this.maxspin);
        
        this.draw();
	}

	draw() {
        translate(this.pos.x, this.pos.y);
        
		textSize(10);
        fill(150);
        noStroke();
		text(this.name, -(textWidth(this.name)/2), -this.size);
        
        angleMode(DEGREES);
        rotate(this.rotation);
        //Draw character
        colorMode(RGB);        
        fill(255);
        rect(0, this.size/2, this.size*0.9, this.size*1.2); //backpack
        fill(200);
        ellipse(-this.size/2.5, this.size/2, this.size/2, this.size/4); //left arm
        ellipse(this.size/2.5, this.size/2, this.size/2, this.size/4); //right arm
        ellipse(-this.size/5, this.size, this.size/4, this.size); //left leg
        ellipse(this.size/5, this.size, this.size/4, this.size); //right leg
        rectMode(CENTER);
        fill(160);
        rect(0, this.size/2, this.size*0.6, this.size); //body
        fill(255);
        ellipse(0, 0, this.size, this.size); //head
        colorMode(HSB);        
        fill(this.hue, 200, 80);
        ellipse(0, this.size*0.1, this.size*0.7, this.size*0.7); //window  
        colorMode(RGB);
        fill(255, 100);
        ellipse(this.size*0.15, -this.size*0.1, this.size*0.2, this.size*0.2);
        rotate(-this.rotation);
        translate(-this.pos.x, -this.pos.y);      
	}

	constrain() {
		if (this.pos.x < 0) {
			this.acc.x += 0.1;
		} else if (this.pos.x > width) {
			this.acc.x -= 0.1;
		}
		if (this.pos.y < 0) {
			this.acc.y += 0.1;
		} else if (this.pos.y > height) {
			this.acc.y -= 0.1;
		}
	}

	bounce() {
		for (var i = 0; i < astronauts.length; i++) {
			var direction = this.pos.copy().sub(astronauts[i].pos);
			if (direction.mag() != 0 && direction.mag() < this.size) {
                this.acc.add(direction.mult(2));
                score++;
                if (this.attractor == i) {
                    //Remove from the list
                    for (var j = 0; j < astronautLinks.length; j++) {
                        if ((astronautLinks[j].start == this.attractor ||
                            astronautLinks[j].end == this.attractor) && 
                            (astronautLinks[j].start == i ||
                            astronautLinks[j].end == i)) {
                            astronautLinks.splice(j, 1);
                        }
                    }
                    this.attractor = null;     
                }
            }
        }
        for (var i = 0; i < planets.length; i++) {
            var direction = this.pos.copy().sub(planets[i].pos);
			if (direction.mag() < (planets[i].size/2)+this.size) {
                this.acc.add(direction);
			}
		}
    }
    
    attract() {
        if (this.attractor) {
            var direction = this.pos.copy().sub(astronauts[this.attractor].pos);
            var distance = direction.mag();
            this.acc.sub(direction.mult(1));
        }
    }

    setAttractor(attractor) {
        this.attractor = attractor;
    }
}