function Player(x_, y_, size_) {
    this.pos = createVector(x_, y_);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.size = size_;    
    this.pixels = [];
    this.sprays = [];
    this.sprayAmt = 10;
    
    this.speed = 0.5;
    this.maxspeed = 2;
    this.thrust = 0.07;
    this.dampen = 0.7;

    for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            var pix = new Pixel(this.pos.x+i, this.pos.y+j, 255);
            this.pixels.push(pix);
        }
    }
}

Player.prototype.update = function() { 
    if (frameRate() < 30 && this.sprayAmt > 1)
        this.sprayAmt--;
    else if (this.sprayAmt < 10) 
        this.sprayAmt++;

    if (!gameOver) {
        this.move();

        if (this.acc.mag() > 0.01)
            this.spray();

        this.acc.y += 0.025;
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.mult(0.9);
        this.acc.mult(0);

        this.updatePixelPos();

        this.constrain();
        this.vel.limit(this.maxspeed);
    }

    for (var i = 0; i < this.sprays.length; i++) {
        var s = this.sprays[i];
        if (s.pos.y > h+scale || s.life <= 0) {
            this.sprays.splice(i, 1);
        } else
            s.update();    
    }

    for (var i = 0; i < this.pixels.length; i++) {
        this.pixels[i].update();
    }
    
    this.checkScroll();
}

Player.prototype.move = function() {
    if (keyIsDown(W) || keyIsDown(UP)) {
        this.acc.y -= this.thrust;
    } 
    if (keyIsDown(S) || keyIsDown(DOWN)) {
		this.acc.y += this.thrust;
    }
    if (keyIsDown(A) || keyIsDown(LEFT)) {
		this.acc.x -= this.thrust;
    } 
    if (keyIsDown(D) || keyIsDown(RIGHT)) {
		this.acc.x += this.thrust;
    }
}

Player.prototype.touchMove = function(direction) {
    this.acc.add(direction.mult(this.thrust));
}

Player.prototype.constrain = function() {    
    //Stop it from going offscreen
    if (this.pos.x+this.size > w) {
        this.pos.x = w-this.size;
        this.vel.x = 0;
    } else if (this.pos.x < 0) {
        this.pos.x = 0;
        this.vel.x = 0;
    }
    if (this.pos.y+this.size > h) {
        this.pos.y = h-this.size;
        this.vel.y = 0;
    } else if (this.pos.y < 0) {
        this.pos.y = 0;
        this.vel.y = 0;
    }

    if (this.checkObstacleHit()) {
        gameEnd();
    }
}

Player.prototype.updatePixelPos = function() {
    for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            var index = i + j * this.size;
            this.pixels[index].pos.x = this.pos.x + i;
            this.pixels[index].pos.y = this.pos.y + j;
        }
    }
}

Player.prototype.spray = function() {
    for (var i = 0; i < random(5, this.sprayAmt); i++) {
        var pos = this.pos.copy();
        pos.x += 1/2;
        pos.y += 1/2;
        var s = new Spray(pos, this.vel.copy());
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
                return true;
            }                
        }
    }
    return false;
}

Player.prototype.explode = function() {
    for (var i = 0; i < 500; i++) {
        var pos = this.pos.copy();
        pos.x += 1/2;
        pos.y += 1/2;
        var s = new Spray(pos, this.vel.copy().mult(random(-3, 3)));
        this.sprays.push(s);
    }
    this.pixels.length = 0;
}

Player.prototype.checkScroll = function() {
    var scrollPoint = h/3;
    var amountOver = scrollPoint-this.pos.y;
    if (this.pos.y < scrollPoint && amountOver > 0.1) {
        os.scroll = amountOver * this.speed;
        this.pos.y += amountOver * 0.2;
        score += round(amountOver * 0.5);
        this.speed += amountOver * 0.001;
    }
}