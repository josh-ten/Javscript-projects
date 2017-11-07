function Spray(pos_, vel_) { 
    this.pos = pos_;
    this.vel = vel_.mult(-1.5);
    this.vel.add(p5.Vector.random2D().mult(0.5));
    this.acc = createVector(0, 0.1);
    this.lifespan = random(40, 1000);
    this.life = this.lifespan;
    this.pixel = new Pixel(this.pos.x, this.pos.y, 200);
}

Spray.prototype.update = function() {
    this.pos.add(this.vel);
    this.pixel.pos = this.pos;
    this.vel.add(this.acc);

    this.constrain();
    
    this.pixel.alpha = map(this.life--, 0, this.lifespan, 0, 255);
    
    this.pixel.update();
}

Spray.prototype.turnOffPixel = function() {
    this.pixel.cell.on = false;
    changed.push(this.pixel.cell);
}

Spray.prototype.constrain = function() {
    //Stop it from going too fast
    if (this.vel.y > this.maxspeed)
        this.vel.y = this.maxspeed;
    else if (this.vel.y < -this.maxspeed)
        this.vel.y = -this.maxspeed; 
    if (this.vel.x > this.maxspeed)
        this.vel.x = this.maxspeed;
    else if (this.vel.x < -this.maxspeed)
        this.vel.x = -this.maxspeed;
}