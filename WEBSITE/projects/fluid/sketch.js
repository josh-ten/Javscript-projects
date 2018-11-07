const drawHairs = false;
const P_COUNT = 3000;
const FORCE = 2;
const SWISH_FORCE = 0.5;

let particles = [];
let field = [];
let cols = 50, rows = 50;
let spaceX, spaceY;
let xoff = 0, yoff = 1000, zoff;
let prevMouse;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  spaceX = width/cols;
  spaceY = height/cols;
  zoff = random(1000);
  
  for (let i = 0; i < cols; i++) {
      field[i] = [];
      for (let j = 0; j < rows; j++) {
        field[i][j] = createVector(0, 0);
      }
    }
  for (let i = 0; i < P_COUNT; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  evolveField(); 
  if (drawHairs) drawForces();
  
  for (let p of particles) {
    partPushedByField(p);
    fieldPushedByPart(p);
    p.update();
    p.draw();
  }
  
  prevMouse = createVector(mouseX, mouseY);
}

function partPushedByField(p) {
  let i = floor(p.pos.x / spaceX);
  let j = floor(p.pos.y / spaceY);
  if (field[i] && field[i][j]) {
    let x = cos(field[i][j].heading());
    let y = sin(field[i][j].heading());
    let force = createVector(x, y);
    force.mult(field[i][j].mag() * FORCE);
    p.applyForce(force);
  }
}

function fieldPushedByPart(p) {
  let i = floor(p.pos.x / spaceX);
  let j = floor(p.pos.y / spaceY);
  if (field[i] && field[i][j]) {
    field[i][j].lerp(p.vel, 0.001);
    field[i][j].limit(1);
  }
}

function swish(i, j, dir) {
  let size = 4;
  for (let a = -size; a < size; a++) {
    for (let b = -size; b < size; b++) {
      if (i + a >= 0 && i + a < cols &&
          j + b >= 0 && j + b < rows) {
        field[i+a][j+b].lerp(dir, map(abs(a), 0, size, 1, 0));
        field[i+a][j+b].mult(SWISH_FORCE);
      }
    }
  }
}

function mouseDragged() {
  let threshold = 1;
  let i = floor(mouseX / spaceX);
  let j = floor(mouseY / spaceY);
  var mouse = createVector(mouseX, mouseY);
  mouseDir = mouse.sub(prevMouse);
  if (field[i] && field[i][j] && mouseDir.mag() > threshold) {
    swish(i, j, mouseDir.mult(0.1));
  }
  for (let p of particles) {
    if (dist(mouseX, mouseX, p.pos.x, p.pos.y) < 30) {
      p.applyForce(mouseDir.mult(3));
    }
  }
}

function evolveField() {
  yoff = 0;
  for (let i = 0; i < cols; i++) {
    xoff = 1000;
    for (let j = 0; j < rows; j++) {
      field[i][j].rotate((noise(xoff, yoff, zoff) - 0.5)*0.15);
      field[i][j].mult(0.97);
      xoff += 0.03;
    }
    yoff += 0.03;
  }
  zoff += 0.04;
}

function drawForces() {
  strokeWeight(1);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(255, map(field[i][j].mag(), 0, 1, 50, 255));
      let len = 10;
      let angle = field[i][j].heading();
      let x1 = i * spaceX;
      let y1 = j * spaceY;
      let x2 = x1 + cos(angle) * len;
      let y2 = y1 + sin(angle) * len;
      line(x1, y1, x2, y2);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 8;
    this.repelDist = 5;
  }
  
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.mult(0.9);
    this.vel.limit(this.maxspeed);
    
    //this.repel();
    this.wrap();
  }
  
  draw() {
    strokeWeight(3);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
  
  applyForce(force, scale = 1) {
    this.acc.add(force.mult(scale));
  }
  
  attract(position) {
    let diff = position.copy().sub(this.pos).normalize();
    this.applyForce(diff);
  }
  
  repel() {
    for (let p of particles) {
      if (this != p) {
        let difference = this.pos.copy().sub(p.pos);
        if (difference.mag() < this.repelDist) {
          difference.normalize();
          this.applyForce(difference.mult(0.5));
          p.applyForce(difference.mult(-1));
        }
      }
    }
  }
  
  wrap() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }
}