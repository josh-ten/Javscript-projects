//http://4.bp.blogspot.com/-PoISg3gOYBg/U5oZXFLI05I/AAAAAAAABtI/izmJn7D0YoQ/s1600/fighterspr1.png
class Ship {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.size = 120;
        this.rotation = 0;
        this.vRotation = createVector(0, 0);
        this.thrust = 10;
        this.img = loadImage("ship.png");
    }

    update() {
        // this.vel.mult(0.98);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.draw();
    }

    draw() {
        rotate(this.rotation);
        translate(this.pos.x, this.pos.y);
        image(this.img, 0, 0, this.size, this.size);
        translate(-this.pos.x, -this.pos.y);
        rotate(-this.rotation);
    }

    rotateLeft() {
        this.rotation--;
        this.vRotation.x = Math.cos(this.rotation);
        this.vRotation.y = Math.sin(this.rotation);
    }

    rotateRight() {
        this.rotation++;
        this.vRotation.x = Math.cos(this.rotation);
        this.vRotation.y = Math.sin(this.rotation);
    }

    forward() {
        this.acc.add(this.vRotation.mult(this.thrust));
    }

    backward() {
        this.acc.add(this.vRotation.mult(-this.thrust));        
    }
}

// function keyPressed() {
//     if (keyIsDown(LEFTKEY)) ship.rotateLeft();
//     if (keyIsDown(RIGHTKEY)) ship.rotateRight();
//     if (keyIsDown(UPKEY)) ship.forward();
//     if (keyIsDown(DOWNKEY)) ship.backward();
// }