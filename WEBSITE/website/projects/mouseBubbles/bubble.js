class Bubble {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.minSize = 100;
        this.maxSize = 200;
        this.maxAcc = 0.7;
        this.size = this.minSize;
        this.goalSize = this.size;
        this.sizeVel = 0;
        this.sizeAcc = 0;
        this.hue = 0;
    }

    update() {
        this.bulge();
        this.posPhys();
        var waveBulge = this.wave();

        if (this.collisions(waveBulge)) {
            this.sizePhys(0.5);
            this.mouseAttract();
        } else this.sizePhys(1);
        this.hitTheWall();

        this.draw();
    }

    draw() {
        noFill();
        stroke(this.hue, 255, 255);
        strokeWeight(2);
        image(bubbleSprite, this.pos.x-this.size/2, this.pos.y-this.size/2, this.size, this.size);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    sizePhys(retarding) {
        var bulgeSpeed = 2 * retarding;
        this.goalSize *= 0.9;
        if (this.goalSize < this.minSize) this.goalSize = this.minSize;
        if (this.goalSize > this.maxSize) this.goalSize = this.maxSize;
        if (this.size < this.goalSize) this.sizeAcc += bulgeSpeed;
        if (this.size > this.goalSize) this.sizeAcc -= bulgeSpeed;
        this.sizeVel += this.sizeAcc;
        this.size += this.sizeVel;
        this.sizeAcc = 0;
        this.sizeVel *= 0.95;   
    }

    posPhys() {
        this.acc.limit(this.maxAcc); 
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.mult(0.97);
    }

    bulge() {
        var distance = getMouse().sub(this.pos).mag();
        this.goalSize = -distance * 0.4 + 200;
        this.hue = map(this.size-this.goalSize, -this.goalSize, this.goalSize, 0, 200);
    }

    wave() {
        var bulgeDiff = mod(this.goalSize - this.size);
        return bulgeDiff;
    }

    mouseAttract() {
        var attractionToMouse = 0.3;
        var difference = getMouse().copy().sub(this.pos).normalize();
        this.acc.add(difference.mult(attractionToMouse));
    }

    collisions(waveBulge) {
        var hit = false;
        for (var i = 0; i < bubbles.length; i++) {
            var difference = this.pos.copy().sub(bubbles[i].pos);
            var distance = difference.mag();
            var minDist = (this.size/2) + (bubbles[i].size/2);
            var overlap = minDist - distance;
            if (overlap > 0) {
                bubbles[i].pos.add(difference.normalize().mult(-overlap * 0.5));
                var mass = map(this.size, this.minSize, this.maxSize, 0.3, 0.7);
                bubbles[i].acc.add(difference.normalize());
                bubbles[i].goalSize += waveBulge;
                hit = true;
            }
        }
        return hit;
    }
    
    hitTheWall() {
        var wallForce = 0.2;
        if (this.pos.x < 0) {
            this.acc.x += wallForce;
        }
        if (this.pos.x > width) {
            this.acc.x -= wallForce;
        }
        if (this.pos.y < 0) {
            this.acc.y += wallForce;
        }
        if (this.pos.y > height) {
            this.acc.y -= wallForce;
        }
    }
}