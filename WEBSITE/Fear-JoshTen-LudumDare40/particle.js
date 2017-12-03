class Particle {
    constructor(x, y, thrustX, thrustY) {
        this.pos = createVector(x, y);
        this.vel = createVector(-thrustX, -thrustY);
        this.vel.x *= random(2);
        this.vel.y *= random(2);
        this.vel.mult(5);
        this.acc = createVector(0, 0);
        this.size = random(5, 10);

        this.lifespan = random(20, 200);
        this.life = this.lifespan;
    }

    update() {
        if (this.life > 0) this.life--;

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);

        this.draw();
    }

    draw() {
        fill(100, 200, 255, map(this.life, 0, this.lifespan, 0, 255));
        stroke(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}