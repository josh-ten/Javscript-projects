class Car {
    constructor(x, y, size) {
        this.size = size;
        this.thrust = 2;
        this.friction = 1.1;
        this.turnAmt = 3;
        
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        angleMode(DEGREES);
        this.direction = createVector(0, 0);
        this.rotation = 0;
    }

    update() {
        this.move();

        this.vel.div(this.friction);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);

        this.direction.x = Math.cos(this.rotation);
        this.direction.y = Math.sin(this.rotation);

        this.draw();
    }

    //0   -> x = 0,  y = -1; sin(0)   = 0, cos(0)    = 1;
    //90  -> x = 1,  y = 0;  sin(90)  = 1, cos(90)   = 0;
    //180 -> x = 0,  y = 1;  sin(180) = 0, cos(180) = -1;
    //270 -> x = -1, y = 0;  sin(270) = -1. cos(270) = 0;

    move() {
        if (keyIsDown(W)) {
            this.acc.sub(this.direction.copy());
        } 
        if (keyIsDown(S)) {
            this.acc.add(this.direction.copy());
        }
        if (keyIsDown(A)) {
            this.rotation -= this.turnAmt;
            console.log(this.rotation);
        } 
        if (keyIsDown(D)) {
            this.rotation += this.turnAmt;
            console.log(this.rotation);
        }
    }

    draw() {
        translate(this.pos.x, this.pos.y);
        text("dir x: " + this.direction.x, 0, -50);
        text("dir y: " + this.direction.y, 0, -30);        
        rotate(this.rotation);        
        fill(30);
        rectMode(CENTER);
        rect(0, 0, this.size*2, this.size);
        rotate(-this.rotation);
        translate(-this.pos.x, -this.pos.y);
        
    }
}