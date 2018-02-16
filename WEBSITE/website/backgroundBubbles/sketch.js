var bubbles = [];
var spacing = 130;
var points = [];
var mouseReleased;
var bubbleSprite;
var canvas;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	canvas = document.getElementById("defaultCanvas0");
	var container = document.getElementById("canvasContainer");
	container.appendChild(canvas);

	// colorMode(HSB);
	mouseReleased = true;
	for (var i = 0; i < width / spacing; i++) {
		for (var j = 0; j < height / spacing; j++) {
			bubbles.push(new Bubble(spacing*i, spacing*j));
		}
	}
}

function draw() {
	if (renderBubbles) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < bubbles.length; i++) {
			bubbles[i].update();
		}

		if (mouseIsPressed) {
			if (mouseReleased) points.length = 0;
			mouseReleased = false;
			points.push(getMouse());
		} else mouseReleased = true;
	}
}

function getMouse() {
	return createVector(mouseX, mouseY);
}

function mod(val) {
	if (val < 0) return -val;
	return val;
}