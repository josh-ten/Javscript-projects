class Player {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.speed = 1;
        this.maxspeed = 25;
        this.gravity = 1;
        this.size = 50;
        this.touchingGround = false;
        this.jumping = false;
        this.jumpForce = 30;
        this.prevPos = createVector(x, y);
    }
    
    update() {
        this.prevPos = this.pos.copy();
        this.move();
        if (!this.touchingGround) this.acc.y += this.gravity;
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.constrainSpeed();
        this.constrainPos();
        this.collision();

        this.draw();
    }

    move() {
        if (keyIsDown(W) || keyIsDown(UP)) {
            if (!this.jumping && this.touchingGround) this.jump();
        }
        if (keyIsDown(A) || keyIsDown(LEFT)) {
            this.acc.x -= this.speed;
        } 
        if (keyIsDown(D) || keyIsDown(RIGHT)) {
            this.acc.x += this.speed;
        }
        this.vel.x *= 0.93;
    }

    
    jump() {
        this.acc.y = -this.jumpForce;
        this.jumping = true;
        this.touchingGround = false;
    }
    
    draw() {
        fill(255, 10, 200);
        stroke(255, 180, 200);
        rect(this.pos.x, this.pos.y, this.size, this.size);
    }
    
    constrainSpeed() {
        if (this.vel.x > this.maxspeed) this.vel.x = this.maxspeed;
        if (this.vel.x < -this.maxspeed) this.vel.x = -this.maxspeed;
        if (this.vel.y > this.maxspeed) this.vel.y = this.maxspeed;
        if (this.vel.y < -this.maxspeed) this.vel.y = -this.maxspeed;
    }
    
    constrainPos() {
        if (this.pos.y > height - this.size) {
            this.pos.y = height - this.size;
            this.hitGround();
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel.y = 0;
        }
        if (this.pos.x > width - this.size) {
            this.pos.x = width - this.size;
            this.vel.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.vel.x = 0;
        }
    }

    hitGround() {
        this.vel.y = 0;
        this.touchingGround = true;
    }

    collision() {
        var collision = false;
        for (var i = 0; i < walls.length; i++) {
            if (this.pos.x < walls[i].pos.x + walls[i].size &&
                this.pos.x + this.size > walls[i].pos.x &&
                this.pos.y < walls[i].pos.y + walls[i].size &&
                this.size + this.pos.y > walls[i].pos.y) {
                var playerCenter = this.pos.copy().add(createVector(this.size/2, this.size/2));
                var wallCenter = walls[i].pos.copy().add(createVector(walls[i].size/2, walls[i].size/2));
                var direction = playerCenter.sub(wallCenter).heading();
                if (direction >= -2 && direction <= -1) {
                    //Hit top
                    this.pos.y = walls[i].pos.y - walls[i].size;
                    this.hitGround();
                    collision = true;
                    console.log(direction);
                } else if (direction > 1 && direction < 2) {
                    //Hit bottom
                    this.pos.y = walls[i].pos.y + walls[i].size;
                    this.vel.y = 0;
                } else if (direction > 1 && direction < -1) {
                    //Hit left
                    this.pos.x = walls[i].pos.x - walls[i].size;
                    this.vel.x = 0;
                    console.log("left", direction);
                } else if (direction > -1 && direction < 1) {
                    //Hit right
                    // this.pos.x = walls[i].pos.x + walls[i].size;
                    // this.vel.x = 0;
                }
            } 
            if (!collision) this.touchingGround = false;
            
        }
    }
}

function keyReleased() {
    if (keyCode == W || keyCode == UP) {
        player.jumping = false;
    }
}

function keyPressed() {
    player.move();
}