function Spray(pos_, vel_) { 
    this.pos = pos_;
    this.vel = vel_.mult(-2.4);
    this.vel.add(p5.Vector.random2D().mult(0.5));
    this.acc = createVector(0, 0.1);
    this.lifespan = random(10, 100);
    this.life = this.lifespan;
    this.pixel = new Pixel(this.pos.x, this.pos.y, 200);
    this.maxspeed = 3;
}

Spray.prototype.update = function() {
    this.pos.add(this.vel);
    this.pixel.pos = this.pos;
    this.vel.add(this.acc);

    this.constrain();
    this.vel.limit(this.maxspeed);
    
    this.pixel.alpha = map(this.life--, 0, this.lifespan, 50, 200);
    
    this.pixel.update();
}

Spray.prototype.constrain = function() {
    if (this.pos.x > w) {
        this.pos.x = w;
        this.vel.x *= -0.4;
    } else if (this.pos.x < 0) {
        this.pos.x = 0;
        this.vel.x *= -0.4;
    }
}