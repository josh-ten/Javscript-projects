var bubbles = [];
var spacing = 150;
var points = [];
var mouseReleased;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	colorMode(HSB);
	mouseReleased = true;
	for (var i = 0; i < width / spacing; i++) {
		for (var j = 0; j < height / spacing; j++) {
			bubbles.push(new Bubble(spacing*i, spacing*j));
		}
	}
	// bubbles.push(new Bubble(width/2, height/2));
}

function draw() {
	background(0, 0, 0);
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].update();
	}

	if (mouseIsPressed) {
		if (mouseReleased) points.length = 0;
		mouseReleased = false;
		points.push(getMouse());
	} else mouseReleased = true;
}

function getMouse() {
	return createVector(mouseX, mouseY);
}