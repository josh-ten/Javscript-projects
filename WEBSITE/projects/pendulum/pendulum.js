class Pendulum {
  constructor(x, y, len, mass, parent) {
    this.end = createVector(x, y);
    this.len = len;
    this.mass = mass;
    if (parent) {
      this.parent = parent; 
      this.end = parent.pos;
    }
    
    this.pos = this.calcPos(this.end, random(PI)+PI, this.len);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.maxspeed = 15;
  }
  
  update() {
    //Set default forces
    this.acc.y = gravity; // gravity/mass
    this.tension();
    //Motion
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    // this.vel.mult(0.999);
    this.pos.add(this.vel);
    //Reset forces
    this.acc.mult(0);
  }
  
  draw() {
    stroke(255);
    strokeWeight(3);
    line(this.end.x, this.end.y, this.pos.x, this.pos.y);
    ellipse(this.pos.x, this.pos.y, this.mass, this.mass);
  }
  
  tension() {
    let T = this.end.copy().sub(this.pos);
    let diff = T.mag() - this.len;
    T.normalize();
    T.mult(diff);
    this.pos.add(T);
    this.acc.add(T);
  }
  
  calcPos(posA, angle, len) {
    let diff = createVector(Math.cos(angle), Math.sin(angle));
    diff.mult(len);
    let posB = posA.copy().add(diff);
    return posB;
  }
}