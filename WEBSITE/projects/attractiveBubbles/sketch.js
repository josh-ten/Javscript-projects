var bubbles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB);
  for (var i = 0; i < 8; i++) {
    bubbles.push(new Bubble(random(width), 
                            random(height), 
                            random(-1, 1), 
                            random(-1, 1)));
  }
}

function draw() {
  background(0, 0, 0);
  for (let bubble of bubbles) {
    bubble.update();
    bubble.attract(createVector(mouseX, mouseY));
  }
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY, 
                            random(-1, 1), 
                            random(-1, 1)));
}

class Bubble {
  constructor(x, y, xVel, yVel) {
    this.pos = createVector(x, y);
    this.vel = createVector(xVel, yVel);
    this.acc = createVector(0, 0);
    this.size = random(50, 150);
    this.friction = 0.995; //Always gotta be < 1
    this.hue = random(255);
    this.xoff = random(1000);
  }
  
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.mult(this.friction);
    this.hue += ((noise(this.xoff)*2)-1);
    this.xoff += 0.1;
    
    this.constrain();
    this.collisions();
    
    this.draw();
  }
  
  draw() {
    noFill();
    stroke(this.hue, 255, 255);
    strokeWeight(5);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    stroke(0, 0, 255);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.size-5, this.size-5);
  }
  
  constrain() {
    var kickBack = 0.3;
    if (this.pos.x < this.size/2) this.acc.x += kickBack;
    if (this.pos.x > width - this.size/2) this.acc.x -= kickBack;
    if (this.pos.y < this.size/2) this.acc.y += kickBack;
    if (this.pos.y > height - this.size/2) this.acc.y -= kickBack;
  }
  
  collisions() {
    var kickBack = 0.5;
    for (let bubble of bubbles) {
      var difference = this.pos.copy().sub(bubble.pos);
      var distance = difference.mag();
      if (distance < (this.size/2) + (bubble.size/2)) { //Collision
        this.pos.add(difference*2);
        bubble.pos.add(difference*2);
        difference.normalize().mult(kickBack);
        this.acc.add(-difference);
        bubble.acc.add(difference);
        var hueDiff = this.hue - bubble.hue;
        this.hue -= hueDiff * 0.001;
        bubble.hue += hueDiff * 0.001;
      }
    }
  }
  
  attract(pos) {
    let diff = pos.sub(this.pos).normalize();
    diff.mult(0.5);
    this.acc.add(diff);
  }
}