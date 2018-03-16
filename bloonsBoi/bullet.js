class Bullet {
    constructor(x, y, velX, velY) {
        this.pos = createVector(x, y);
        this.vel = createVector(velX, velY);
        this.size = 7;
        this.speed = 40;
        this.vel.mult(this.speed);
    }

    update() {
        this.pos.add(this.vel);
        this.draw();
    }
    
    draw() {
        fill(255);
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

}

function removeBullet(index) {
    bullets.remove(index);
}