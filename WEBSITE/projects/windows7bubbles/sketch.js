var bubbles = [];
var ship;
var xoff;
var averageHue = 0;
const LEFTKEY = 37, UPKEY = 38, RIGHTKEY = 39, DOWNKEY = 40;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	colorMode(HSB);
	for (var i = 0; i < 10; i++) {
		bubbles.push(new Bubble(random(width), random(height), random(-10, 10), random(-10, 10)));
	}
	ship = new Ship(width/2, height/2);

	xoff = 0;
}

function draw() {
	background(averageHue, 80, 10);
	var windForce = wind();
	var total = 0;
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].acc.add(windForce);
		bubbles[i].update();
		total += bubbles[i].hue;
	}
	//ship.update();
	averageHue = total / bubbles.length;
	xoff += 0.01;
}

function wind() {
	var direction = noise(xoff) * Math.PI;
	var vDir = createVector(Math.cos(direction), Math.sin(direction));
	vDir.normalize().mult(0.03);
	return vDir;
}

function mousePressed() {
	for (var i = 0; i < bubbles.length; i++) {
		var mouse = createVector(mouseX, mouseY);
		var difference = mouse.copy().sub(bubbles[i].pos);
		if (difference.mag() < bubbles[i].size/2) {
			bubbles[i].clicked(difference);
			break;
		}
	}
}

function keyPressed() {
	if (keyIsDown(32)) {
		bubbles.push(new Bubble(random(width), random(height), random(-10, 10), random(-10, 10)));		
	}
}