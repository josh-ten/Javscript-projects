class Enemy {
    constructor(x, y, velX, velY) {
        this.pos = createVector(x, y);
        this.vel = createVector(velX, velY);
        this.size = 50;
    }

    update() {
        this.pos.add(this.vel);
        this.draw();
    }

    draw() {
        fill(200, 50, 90);
        stroke(140);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}