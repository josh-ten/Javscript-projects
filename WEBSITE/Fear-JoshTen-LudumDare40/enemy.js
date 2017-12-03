class Enemy {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.size = 30;
        this.thrust = 0.2;
        this.particles = [];
        this.speed = 5;
        this.maxspeed = 1;
        this.type = round(random(1));
        if (enemies.length == 0) this.type = 0;

        if (this.type == 1) this.zone = zones[this.findZone()];
    }

    update() {
        if (this.type == 0) this.seekPlayer();
        else if (this.type == 1) this.seekZone(this.zone);
        this.acc.y += 0.1;
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.mult(0.99);
        this.vel.limit(this.maxspeed);
        this.acc.mult(0);
        this.borders();

        this.draw();
    }

    draw() {
        fill(255, 200);
        stroke(255, 0, 0);
        strokeWeight(1);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y+this.size*0.7, this.size, this.size*0.6);
    }

    seekPlayer() {
        var direction = player.pos.copy().sub(this.pos);
        if (direction.mag() < this.size) {
            player.die();
        }
        direction.normalize().mult(this.speed);
        this.acc.add(direction);
    }

    seekZone(zone) {
        var direction = zone.pos.copy().sub(this.pos);
        direction.normalize().mult(this.speed);
        this.acc.add(direction);
    }

    findZone() {
        var min = 9999;
        var closest = -1;
        for (var i = 0; i < zones.length; i++) {
            var distance = zones[i].pos.copy().sub(this.pos).mag();
            if (distance < min) {
                min = distance;
                closest = i;
            }
        }
        return closest;
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
}