class Ball {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.size = size;
        this.gravity = 0.2;
    }

    update() {
        this.acc.y += this.gravity;
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.draw();
    }

    draw() {
        fill(100, 100, 255);
        stroke(255);
        strokeWeight(2);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}