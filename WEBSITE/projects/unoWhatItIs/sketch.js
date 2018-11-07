let cards = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  translate(width/4, height/4);
  scale(0.5, 0.5);
  
  for (let i = 0; i < 20; i++) {
    cards.push(new Card(random(width*2), random(-height*4), random(0.4, 0.8), random(TWO_PI)));
  }
}

function draw() {
  colorMode(RGB);
  background(0, 10);
  colorMode(HSB);
  
  for (let c of cards) {
    // colorMode(RGB);
    // background(0, 4);
    c.update();
    c.draw();
  }
}

class Card {
  constructor(x, y, s, rot) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.rot = rot;
    this.num = Math.round(random(9));
    this.col = random(255);
  }
  
  update() {
    this.rot += 0.01;
    this.y += 30;
    if (this.y > height*4) this.y = random(-height*4);
  }
  
  draw() {
    colorMode(HSB);
    scale(this.s, this.s);
    translate(this.x, this.y);
    rotate(this.rot);

    fill(255);
    noStroke();
    rect(0, 0, 300, 500);
    fill(this.col, 255, 255);
    rect(20, 20, 260, 460);
    fill(255);
    translate(150, 250);
    rotate(PI/9);
    ellipse(0, 0, 240, 450);
    rotate(-PI/9);
    translate(-250, -250);
    textSize(230);
    stroke(0);
    strokeWeight(6);
    fill(this.col, 255, 255);
    text(this.num, 200, 330);
    textSize(40);
    strokeWeight(3);
    fill(255);
    text(this.num, 130, 60);
    translate(370, 440);
    rotate(PI);
    text(this.num, 0, 0);
    rotate(-PI);
    translate(-370, -440);

    rotate(-this.rot);
    translate(-this.x, -this.y);
    scale(1/this.s, 1/this.s);
  }
}