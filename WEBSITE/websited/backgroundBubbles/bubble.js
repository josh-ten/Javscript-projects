class Bubble {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxAcc = 0.7;
        this.size = random(100, 200);
        this.shaded = random();
        this.attractionToMouse = random(1,2);
    }

    update() {
        this.posPhys();

        this.collisions()
        this.mouseAttract();

        this.draw();
    }

    draw() {
        if (this.shaded < 0.5) noFill();
        else fill(0, 150);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    posPhys() {
        this.acc.limit(this.maxAcc); 
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.mult(0.97);
    }

    mouseAttract() {
        var difference = getMouse().copy().sub(this.pos).normalize();
        this.acc.add(difference.mult(this.attractionToMouse));
    }

    collisions() {
        for (var i = 0; i < bubbles.length; i++) {
            var difference = this.pos.copy().sub(bubbles[i].pos);
            var distance = difference.mag();
            var minDist = (this.size/2) + (bubbles[i].size/2);
            var overlap = minDist - distance;
            if (overlap > 0) {
                bubbles[i].pos.add(difference.normalize().mult(-overlap));
                // bubbles[i].acc.add(difference.normalize());
            }
        }
    }
}