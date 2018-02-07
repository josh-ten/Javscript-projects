var bubbles = [];
var spacing = 130;
var points = [];
var mouseReleased;
var bubbleSprite

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	colorMode(HSB);
	mouseReleased = true;
	bubbleSprite = loadImage("bubble.png");	
	for (var i = 0; i < width / spacing; i++) {
		for (var j = 0; j < height / spacing; j++) {
			bubbles.push(new Bubble(spacing*i, spacing*j));
		}
	}
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

function mod(val) {
	if (val < 0) return -val;
	return val;
}