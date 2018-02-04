class Bubble {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.minSize = 100;
        this.maxSize = 200;
        this.size = this.minSize;
        this.goalSize = this.size;
        this.vel = 0;
        this.acc = 0;
        this.hue = 0;
    }

    update() {
        //this.bulge();
        if (this.goalSize < this.minSize) this.goalSize = this.minSize;
        if (this.goalSize > this.maxSize) this.goalSize = this.maxSize;
        if (this.size < this.goalSize) this.acc++;
        if (this.size > this.goalSize) this.acc--;
        this.vel += this.acc;
        this.size += this.vel;
        this.acc = 0;
        this.vel *= 0.95;
        if (this.vel < 0.9 && this.vel > -0.9) this.vel = 0;

        this.mouseAttract();
        this.collisions();

        this.draw();
    }

    draw() {
        noFill();
        stroke(this.hue, 255, 255);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    bulge() {
        var distance = getMouse().sub(this.pos).mag();
        for (var i = 0; i < points.length; i++) {
            var d = points[i].copy().sub(this.pos).mag();
            if (d < distance) distance = d;
        }
        var change = 10/distance;
        this.goalSize = map(change, 0, 1, -10, 2000);
        this.hue = map(change, 0, 1, 0, 255);
    }

    mouseAttract() {
        var difference = getMouse().copy().sub(this.pos).normalize();
        this.pos.add(difference);
    }

    collisions() {
        for (var i = 0; i < bubbles.length; i++) {
            var difference = this.pos.copy().sub(bubbles[i].pos);
            var distance = difference.mag();
            var distA = getMouse().sub(this.pos).mag();
            var distB = getMouse().sub(bubbles[i].pos).mag();
            if (distance < (this.size/2) + (bubbles[i].size/2) &&
                this.size >= bubbles[i].size &&
                distA < distB) {
                bubbles[i].pos.add(difference.normalize().mult(-1));
            }
        }
        // if (this.pos.x < 0) this.pos.x = 0;
        // if (this.pos.x > width) this.pos.x = width;
        // if (this.pos.y < 0) this.pos.y = 0;
        // if (this.pos.y > height) this.pos.y = height;
    }
}