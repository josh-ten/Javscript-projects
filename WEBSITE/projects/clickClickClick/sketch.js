var bubbles = [];
var minsize = 20;
var score = 0;
var hue;
var picture;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  hue = random(255);
  colorMode(HSB);
  picture = loadImage('avatar.jpg');

  bubbles.push(new Bubble(width/2, height/2, 0, 0, height*0.8));
}

function draw() {
  background(255);
  fill(0);
  textSize(150);
  textAlign(CENTER);
  text(score, width/2, height/2);
  for (let bubble of bubbles) {
    bubble.update();
  }

  mousePressed();
}

function mousePressed() {
  var mouse = createVector(mouseX, mouseY);
  for (var i = 0; i < bubbles.length; i++) {
    var b = bubbles[i];
    if (mouse.copy().sub(b.pos).mag() < b.size/2) {
      if (b.size > minsize) {
        b.subdivide();
      } else {
        score++;
        hue = random(255);
        if (bubbles.length == 1) {
          alert("Congratulations, you wasted your time on nothing! :D")
        }
      }
      bubbles.splice(i, 1);
      break;
    }
  }
}

class Bubble {
  constructor(x, y, xvel, yvel, size) {
    this.pos = createVector(x, y);
    this.vel = createVector(xvel, yvel);
    this.size = size;
    this.babycount = 4;
  }
  
  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
    
    if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
    if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;
    
    this.draw();
  }
  
  draw() {
    fill(hue, 255, 255);
    noStroke(); 
    // ellipse(this.pos.x, this.pos.y, this.size, this.size);

    image(picture, this.pos.x-this.size/2, this.pos.y-this.size/2, this.size, this.size);
  }
  
  subdivide() {
    var initSpeed = 10;
    for (var i = 0; i < this.babycount; i++) {
      bubbles.push(
        new Bubble(this.pos.x, this.pos.y, 
                   random(-initSpeed, initSpeed), 
                   random(-initSpeed, initSpeed), 
                   this.size * 0.4));
    }
  }
  
}