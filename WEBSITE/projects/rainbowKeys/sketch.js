let keySize = 60;
let keys = [];
let dots = [];
let qwerty = [['1','2','3','4','5','6','7','8','9','0','='],
              ['Q','W','E','R','T','Y','U','I','O','P'],
              ['A','S','D','F','G','H','J','K','L'],
              ['Z','X','C','V','B','N','M']];
let white;
let red, blue, green, purple, yellow, orange;
let colours = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  white = new Colour(255, 255, 255);
  red = new Colour(255, 0, 0);
  blue = new Colour(0, 0, 255);
  green = new Colour(0, 255, 255);
  purple = new Colour(255, 0, 255);
  yellow = new Colour(150, 255, 0);
  orange = new Colour(255, 255, 0);
  colours = [red, blue, green, purple, yellow, orange];
  // colours = [new Colour(20, 20, 160),
  //           new Colour(219, 48, 105),
  //           new Colour(245, 213, 71),
  //           new Colour(72, 12, 166),
  //           new Colour(157, 217, 210)];
  
  let rowOffset = 0;
  let offset = createVector((width - qwerty[0].length * keySize) / 2, 
                            (height - 3 * keySize) / 2);
  for (let i = 0; i < qwerty.length; i++) {
    let row = qwerty[i];
    for (let j = 0; j < row.length; j++) {
      let letter = row[j];
      keys.push(new Key(letter, j * keySize + rowOffset + offset.x, i * keySize + offset.y));
    }
    rowOffset += 40;
  }
}

function draw() {
  background(0);
  
  for (let k of keys) {
    k.update();
    k.draw();
  }
  let remove = [];
  for (let d of dots) {
    d.update();
    // d.draw();
    if (d.outside()) remove.push(d);
  }
  dots = dots.filter((d) => !remove.includes(d));
}

function keyPressed() {
  for (let key of keys) {
    if (key.letter == String.fromCharCode(keyCode)) {
      press(key);
    }
  }
}

function mousePressed() {
  for (let k of keys) {
    if (mouseX > k.pos.x - keySize/2 &&
       mouseX < k.pos.x + keySize/2 &&
       mouseY > k.pos.y - keySize/2 &&
       mouseY < k.pos.y + keySize/2) {
      press(k);
      break;
    }
  }
}

function press(key) {
  key.col = random(colours);
  for (let dir = 0; dir < TWO_PI; dir += PI/30) {
    dots.push(new Dot(key.pos.x, key.pos.y, 
                      Math.sin(dir), Math.cos(dir), 
                      key.col));
  }
}

class Key {
  constructor(letter, x, y) {
    this.letter = letter;
    this.pos = createVector(x, y);
    this.col = white;
  }
  
  draw() {
    stroke(255);
    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, keySize*0.95, keySize*0.95);
    stroke(this.col.r, this.col.g, this.col.b);
    rect(this.pos.x, this.pos.y, keySize*0.95, keySize*0.95);
    noStroke();
    fill(this.col.r, this.col.g, this.col.b);
    textSize(keySize/2);
    textAlign(CENTER);
    text(this.letter, this.pos.x, this.pos.y + keySize * 0.2);
  }
  
  update() {
    for (let dot of dots) {
      let diff = this.pos.copy().sub(dot.pos);
      if (diff.mag() < keySize) {
        this.col = dot.col.copy();
      }
    }
    
    let fade = 10;
    this.col.r += fade;
    this.col.g += fade;
    this.col.b += fade;
  }
}

class Dot {
  constructor(x, y, xVel, yVel, col) {
    this.pos = createVector(x, y);
    this.vel = createVector(xVel, yVel);
    this.col = col.copy();
    this.vel.mult(10);
  }
  
  update() {
    this.pos.add(this.vel);
  }
  
  draw() {
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
  
  outside() {
    return this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height;
  }
}

class Colour {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  
  copy() {
    return new Colour(this.r, this.g, this.b);
  }
}