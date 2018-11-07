var wheels = [];
var scribblePts = [];
var scrWheels = [];
var w1size, w1speed, w2size, w2speed;
var maxPts = 600;
var flowerComplete = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  w1size = Math.round(random(20, 80));
  w2size = Math.round(random(20, 80));
  w1speed = Math.round(random(-30, -20));
  w2speed = Math.round(random(10, 20));
  var wheel1 = new Wheel(null, 100, 0, width/2, height/2);
  var wheel2 = new Wheel(wheel1, w1size, w1speed);
  var wheel3 = new Wheel(wheel2, w2size, w2speed);
  wheels.push(wheel1);
  wheels.push(wheel2);
  wheels.push(wheel3);
  scrWheels.push(wheel3);
}

function draw() {
  background(0, 100, 255);
  //Ground
  fill(0, 255, 100);
  stroke(50, 255, 50);
  rect(0, height-100, width, height);
  //Stem
  stroke(10, 200, 10);
  strokeWeight(8);
  line(width/2, height-20, width/2, height/2);
  //Sun
  stroke(255);
  fill(250, 255, 100);
  ellipse(width, 0, 200, 200);
  
  //Petals
  for (let sw of scrWheels) {
    if (scribblePts.length > maxPts)
      scribblePts.splice(0, 1);
    sw.scribble();
  }
  //Wheels
  for (let wheel of wheels)
    wheel.update();
  
  strokeWeight(1);
  stroke(255, 255, 0);
  beginShape();
  for (var i = 0; i < scribblePts.length-1; i++) {
    let sp1 = scribblePts[i];
    vertex(sp1.x, sp1.y);
  }
  endShape();
}

class Wheel {
  constructor(parent, r, rot, x, y) {
    this.parent = parent;
    this.r = r;
    if (x && y) this.pos = createVector(x, y);
    if (parent) this.pos = this.calcPos(parent);
    this.angle = 0;
    this.rot = rot;
  }
  
  update() {
    if (this.parent) {
      this.pos = this.roll(this.parent);
      this.angle += 0.01 * this.rot;
    }
    this.draw();
  }
  
  draw() {
    stroke(255, 200, 0, 100);
    strokeWeight(2);
    fill(255, 200, 0, 70);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
  
  calcPos(parent) {
    var pos = parent.pos.copy();
    pos.x += parent.r/2;
    pos.x += this.r/2;
    return pos;
  }
  
  roll(parent) {
    var newPos = parent.pos.copy();
    var x = Math.cos(this.angle);
    var y = Math.sin(this.angle);
    var len = (parent.r/2) + (this.r/2);
    newPos.x += x * len;
    newPos.y += y * len;
    return newPos;
  }
  
  scribble() {
    var scrPos = this.pos.copy();
    var x = Math.cos(this.angle);
    var y = Math.sin(this.angle);
    var len = this.r/2;
    scrPos.x += x * len;
    scrPos.y += y * len;
    scribblePts.push(scrPos);
  }
}