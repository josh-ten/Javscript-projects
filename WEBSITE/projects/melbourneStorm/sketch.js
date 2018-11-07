var striking = false;
var raining = true;
var rain = [];
var off = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(12);
  for (var i = 0; i < 100; i++) {
    rain.push(new RainDrop(random(3*width)-width,
                          random(-height, 0),
                          random()));
  }
}

function draw() {
  background(0, 0, 20);
  var windDir = noise(off) * Math.PI;
  off += 0.01;
  for (var i = 0; i < rain.length; i++) {
    rain[i].update();
    rain[i].vel = createVector(Math.cos(windDir), Math.sin(windDir)).mult(rain[i].z * rain[i].speed);
  }
  if (striking && random() < 0.4) {
    resetMatrix();
    noStroke();
    fill(255, 255, 255, 70); 
    rect(0, 0, width, height); 
    recenter(); 
    createLightning(random(4, 7), 100);
    if (random() < 0.2) striking = false;
  } else if (random() < 0.1) striking = true;
}

function createLightning(weight, segs) {
  for (var i = 0; i < segs; i++) {
    createSegment(weight, segs);
  }
}

function createSegment(weight, currSegs) {
  strokeWeight(weight);
  var len = random(10, 50);
  var rotation = random(-Math.PI/2, Math.PI/2);
  rotate(rotation);
  stroke(255);
  line(0, 0, 0, len);
  stroke(255, 50);
  strokeWeight(weight + 2);
  line(0, 0, 0, len);
  strokeWeight(weight + 5);
  line(0, 0, 0, len);
  translate(0, len);
  rotate(-rotation);
  push();
  if (random() < 0.1) {
    createLightning(weight - 2, currSegs * 0.1);
  }
  pop();
}

function recenter() {
  resetMatrix();
  translate(random(width), 0);
}

class RainDrop {
  constructor(x, y, z) {
    this.pos = createVector(x, y);
    this.z = z;
    this.vel = createVector(0, 0);
    this.lastPos = this.pos.copy();
    this.speed = 100;
  }
  
  update() {
    this.pos.add(this.vel);
    if (this.pos.y > height) {
      this.pos.y = -30;
      this.pos.x = random(3*width) - width;
    } 
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    
    this.draw();
    this.lastPos = this.pos.copy();
  }
  
  draw() {
    stroke(this.z * 255, this.z * 255);
    strokeWeight(this.z * 3);
    if (this.lastPos.copy().sub(this.pos).mag() < width/2)
      line(this.pos.x, this.pos.y, 
          this.lastPos.x, this.lastPos.y);
  }
}