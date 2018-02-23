class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.size = 30;
        this.thrust = 0.2;
        this.particles = [];
        this.maxspeed = 10;
        this.fuel = 100;
        this.flying = false;        
    }

    update() {
        if (this.fuel > 0) this.move();
        if (!keyIsDown(A) && !keyIsDown(D) && !keyIsDown(LEFT) && !keyIsDown(RIGHT))
            this.flying = false;
        if (this.fuel < 0) this.fuel = 0;
        if (!this.flying && this.fuel < 100) this.fuel += 0.4;

        this.acc.y += 0.1;
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.mult(0.99);
        this.vel.limit(this.maxspeed);
        this.acc.mult(0);
        this.borders();

        this.draw();
        
        for (var i = this.particles.length-1; i >= 0; i--) {
            if (this.particles[i].life < 0) this.particles.splice(i, 1);
        }
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }

    draw() {
        fill(255, 200);
        stroke(0);
        strokeWeight(1);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y+this.size*0.7, this.size, this.size*0.6);
    }

    move() {
        if (keyIsDown(A) || keyIsDown(LEFT)) {
            this.acc.x += this.thrust;
            this.acc.y -= this.thrust;
            this.particles.push(new Particle(this.pos.x-this.size/2, this.pos.y, this.thrust, -this.thrust));
            this.fuel-=0.6;
            this.flying = true;
        } 
        if (keyIsDown(D) || keyIsDown(RIGHT)) {
            this.acc.x -= this.thrust;
            this.acc.y -= this.thrust;
            this.particles.push(new Particle(this.pos.x+this.size/2, this.pos.y, -this.thrust, -this.thrust));            
            this.fuel-=0.6;
            this.flying = true;      
        }
    }

    borders() {
        if (this.pos.y > height) {
            this.pos.y = height;
            this.vel.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel.y = 0;
        }
        if (this.pos.x > width) {
            this.pos.x = width;
            this.vel.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = 0;
            this.vel.x = 0;
        }
    }

    repelEnemies() {
        for (var i = 0; i < enemies.length; i++) {
            var direction = this.pos.copy().sub(enemies[i].pos);
            direction.normalize().mult(-50);
            enemies[i].vel.add(direction);
        }
    }

    die() {
        flashAmt = 200;
        for (var i = zones.length-1; i >= 0; i--) {
            zones.splice(i, 1);
        }
        for (var i = enemies.length-1; i >= 0; i--) {
            enemies.splice(i, 1);
        }
        if (lives > 0) {
            lives--;
            spawnEnemy();
            spawnZone();
        }
        else gameOver = true;
    }
}
