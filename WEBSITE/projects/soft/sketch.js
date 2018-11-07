let field = [];
let cols = rows = 80;
let spaceX, spaceY;
let xoff = 0, yoff = 1000, zoff;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  spaceX = width/cols;
  spaceY = height/rows;
  zoff = random(1000);
}

function draw() {
  background(0, 100);
  evolveField();
  drawField();
}

function evolveField() {
  yoff = 0;
  for (let i = 0; i < cols; i++) {
    field[i] = [];
    xoff = 1000;
    for (let j = 0; j < rows; j++) {
      field[i][j] = noise(xoff, yoff, zoff) * TWO_PI * 2;
      xoff += 0.03;
    }
    yoff += 0.03;
  }
  zoff += 0.04;
}

function drawField() {
  stroke(255, 30);
  strokeWeight(1);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let len = 50;
      let angle = field[i][j];
      let x1 = i * spaceX;
      let y1 = j * spaceY;
      let x2 = x1 + cos(angle) * len;
      let y2 = y1 + sin(angle) * len;
      line(x1, y1, x2, y2);
    }
  }
}