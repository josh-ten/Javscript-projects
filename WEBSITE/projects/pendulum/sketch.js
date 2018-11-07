const gravity = 0.2;
const PEND_COUNT = 3;
const chain = true;
let pendulums = [];
let points = [];
let maxPts = 50;
let ptFreq = 1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pendulums.push(new Pendulum(width/2, 0, 200, 40, null));
  for (let i = 0; i < PEND_COUNT; i++) {
    pendulums.push(new Pendulum(0, 0, 130, 10, chain ?  
                                pendulums[pendulums.length-1] :
                                random(pendulums)));
  }
}

function draw() {
  background(51, 200);
  if (points.length > maxPts) points.splice(0, pendulums.length);
  stroke(200, 100);
  strokeWeight(3);
  for (let i = 0; i < points.length; i++) {
    if (points[i+1]) {
      line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    }
  }
  
  for (let p of pendulums) {
    p.update();
    p.draw();
    if (frameCount % ptFreq == 0) points.push(p.pos.copy());
  }
}

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