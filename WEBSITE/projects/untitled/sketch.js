let scanY = 0, scanSpeed = 5;
let mouseSpread = 100;

function setup() {
  createCanvas(window.innerWidth-8, window.innerHeight-8);
  background(0);
}

function draw() {
  background(0, 10);
  //Text
  noStroke();
  fill(random(map(scanY*scanY, 0, height*height, 10, 50)));
  textAlign(CENTER);
  if (random() < 0.03)
    textStyle(ITALIC);
  else
    textStyle(NORMAL);
  textSize(60);
  if (random() < 0.1)
    text("it's not too late", width/2, height-10);
  else 
    text("it's       too late", width/2, height-10);
  //Dots
  stroke(255, random(100, 200));
  for (let i = 0; i < 80; i++) {
    strokeWeight(random(2));
    point(random(width), random(height));
  }
  //Mouse dots
  for (let i = 0; i < 40; i++) {
    strokeWeight(random(2));
    point(mouseX + random(-mouseSpread, mouseSpread), 
          mouseY + random(-mouseSpread, mouseSpread));
  }
  //Scan line
  stroke(255, random(150));
  line(0, scanY, width, scanY);
  if (scanY < mouseY || 
      scanY > height * 0.8 ||
      random() < 0.7) scanY += scanSpeed;
  else scanY -= scanSpeed;
  if (scanY > height) scanY = 0;
}

function mousePressed() {
  scanY = random(height);
}