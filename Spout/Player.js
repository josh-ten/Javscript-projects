function Player(x_, y_, size_) {
    this.pos = createVector(x_, y_);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.size = size_;    
    this.pixels = [];
    this.sprays = [];
    
    this.maxspeed = 1;
    this.thrust = 0.07;
    this.dampen = 0.7;
    this.moving = false;

    for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            var pix = new Pixel(this.x+i, this.y+j, 0);
            this.pixels.push(pix);
        }
    }

    this.updatePixels();
}

Player.prototype.update = function() { 
    this.move();

    if (this.moving)
        this.spray();

    this.pos.add(this.vel);
    this.vel.add(this.acc);
    if (this.vel.mag() < 0.05)
        this.vel = createVector(0, 0);
    else
        this.vel.mult(0.9);
    this.acc.mult(0);

    this.constrain();
    for (var i = 0; i < this.sprays.length; i++) {
        if (this.sprays[i].pos.x <= 1 ||
            this.sprays[i].pos.x >= w-1||
            this.sprays[i].pos.y <= 1 ||
            this.sprays[i].pos.y >= h-1 ||
            this.sprays[i].life <= 0) 
        {
            this.sprays[i].turnOffPixel();
            this.sprays.splice(i, 1);
        } else
            this.sprays[i].update();    
    }
    
    if (this.vel.mag() > 0) {
        this.updatePixels();
    }
    
    this.checkScroll();
}

Player.prototype.updatePixels = function() {
    var counter = 0;
    for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            if (this.pixels[counter].active) {
                this.pixels[counter].pos.x = this.pos.x+i; 
                this.pixels[counter].pos.y = this.pos.y+j;
                this.pixels[counter].cell.alpha = 255;
                changed.push(this.pixels[counter].cell);   
            } else {
                this.pixels[counter].update();
                counter++;
            }
        }
    }
}

Player.prototype.move = function() {
    this.moving = false;
    if (keyIsDown(W)) {
        this.acc.y -= this.thrust;
        this.moving = true;
    } 
    if (keyIsDown(S)) {
		this.acc.y += this.thrust;
        this.moving = true;
    }
    if (keyIsDown(A)) {
		this.acc.x -= this.thrust;
        this.moving = true;
    } 
    if (keyIsDown(D)) {
		this.acc.x += this.thrust;
        this.moving = true;
    }
}

Player.prototype.constrain = function() {
    //Stop it from going too fast
    if (this.vel.y > this.maxspeed)
        this.vel.y = this.maxspeed;
    else if (this.vel.y < -this.maxspeed)
        this.vel.y = -this.maxspeed; 
    if (this.vel.x > this.maxspeed)
        this.vel.x = this.maxspeed;
    else if (this.vel.x < -this.maxspeed)
        this.vel.x = -this.maxspeed;
    
    //Stop it from going offscreen
    if (this.pos.x-this.size >= w-2) {
        this.pos.x = w-this.size;
        this.vel.x *= -this.dampen;
    } else if (this.pos.x <= 1) {
        this.pos.x = 1;
        this.vel.x *= -this.dampen;
    }
    if (this.pos.y >= h-this.size) {
        this.pos.y = h-this.size;
        this.vel.y *= -this.dampen;
    } else if (this.pos.y <= 1) {
        this.pos.y = 1;
        this.vel.y *= -this.dampen;
    }

    if (this.checkObstacleHit()) {
        this.explode();
        gameOver = true;
    }
}

Player.prototype.spray = function() {
    for (var i = 0; i < random(5, 20); i++) {
        var s = new Spray(this.pos.copy(), this.vel.copy());
        this.sprays.push(s);
    }
}

Player.prototype.checkObstacleHit = function() {
    for (var obs = 0; obs < os.obstacles.length; obs++) {
        for (var j = 0; j < this.pixels.length; j++) {
            var x1 = floor(os.obstacles[obs].pixel.pos.x);
            var y1 = floor(os.obstacles[obs].pixel.pos.y);
            var x2 = floor(this.pixels[j].pos.x);
            var y2 = floor(this.pixels[j].pos.y);
            if (x1 == x2 && y1 == y2) {
                console.log("HIT");
                return true;
            }                
        }
    }
    return false;
}

Player.prototype.explode = function() {
    for (var i = 0; i < this.pixels.length; i++) {
        this.pixels[i].cell.on = false;
    }
    for (var i = 0; i < 100; i++) {
        this.spray();
    }
}

Player.prototype.checkScroll = function() {
    var scrollPoint = h/3;
    if (this.pos.y < scrollPoint) {
        os.scroll = scrollPoint-this.pos.y;
        this.pos.y += scrollPoint-this.pos.y;
    }
}