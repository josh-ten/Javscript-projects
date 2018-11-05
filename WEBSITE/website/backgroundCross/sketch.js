let ratio;
let backgroundImg;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
	canvas = document.getElementById("defaultCanvas0");
	var container = document.getElementById("canvasContainer");
  container.appendChild(canvas);  
  
  ratio = width / height;

  backgroundImg = loadImage('./projects/connectingVertices/demo.gif');
}

function draw() {
  background(30);
  // image(backgroundImg, 0, 0, width, height);
  
  fill(255);
  // noStroke();
  strokeWeight(1);
  beginShape();

  if (mouseX > mouseY * ratio) {
    if (mouseX > (height - mouseY) * ratio) {
      //Right
      topLeft();
      topRight();
    } else {
      //Top
      topLeft();
      bottomLeft();
    }
  } else {
    if (mouseX > (height - mouseY) * ratio) {
      //Bottom
      topRight();
      bottomRight();
    } else {
      //Left
      bottomRight();
      bottomLeft();
    }
  }
  
  endShape();
}

function topLeft() {
  vertex(0, 0);
  vertex(mouseX * width, mouseY * width);
  vertex(width, height);
}

function topRight() {
  vertex(0, height);
  vertex((mouseX - width) * width, mouseY * width);
  vertex(width, 0);
}

function bottomLeft() {
  vertex(0, height);
  vertex(mouseX * width, (mouseY - height) * width);
  vertex(width, 0);
}

function bottomRight() {
  vertex(0, 0);
  vertex((mouseX - width) * width, (mouseY - height) * width);
  vertex(width, height);
}