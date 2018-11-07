let counter = 0;
let size = 40;
let gap = 40;
let speed = 0.1;
let circles = [];
let xCircles = [];
let yCircles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let spacing = 2*size + gap;
  let xCount = width/spacing;
  let yCount = height/spacing;
  for (let i = 1; i < xCount; i++) {
    let c = new Circle(i-1, i*spacing, size, i*0.1, true);
    circles.push(c);
    xCircles.push(c);
  }
  for (let i = 1; i < yCount; i++) {
    let c = new Circle(i-1, size, i*spacing, i*0.1, false);
    circles.push(c);
    yCircles.push(c);
  }
  background(40);
}

function draw() {
  background(40, 1);
  for (let c of circles) 
    c.update();
  
  counter += speed;
}

class Circle {
  constructor(index, x, y, freq, horiz) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.pt = createVector(this.x, this.y);
    this.freq = freq;
    this.horiz = horiz;
  }
  
  update() {
    this.pt.x = this.x + cos(counter * this.freq) * size;
    this.pt.y = this.y + sin(counter * this.freq) * size;
    stroke(255, 1);
    strokeWeight(1);
    if (this.horiz) 
      line(this.pt.x, 0, this.pt.x, height);
    else
      line(0, this.pt.y, width, this.pt.y);
    
    stroke(160, 225, 255);
    strokeWeight(1);
    point(this.pt.x, this.pt.y)
    
    this.index % 2 == 0 ? 
      stroke(255, 0, 0) : stroke(0, 150, 255);
    if (this.horiz) {
      for (let c of yCircles) {
        let intersection = createVector();
        intersection.x = this.pt.x;
        intersection.y = c.pt.y;
        point(intersection.x, intersection.y);
      }
    } else {
      for (let c of xCircles) {
        let intersection = createVector();
        intersection.x = c.pt.x;
        intersection.y = this.pt.y;
        point(intersection.x, intersection.y);
      }
    }
  }
}