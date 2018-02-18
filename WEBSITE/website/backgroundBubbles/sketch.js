var bubbles = [];
var canvas;
var ctx;
var maxBubbleCount = 5;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	canvas = document.getElementById("defaultCanvas0");
	var container = document.getElementById("canvasContainer");
	container.appendChild(canvas);
	
	defaultValues();
}

function defaultValues() {
	ctx = canvas.getContext("2d");
	strokeWeight(1);
	stroke(0, 150);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].update();
	}
}

function getMouse() {
	return createVector(mouseX, mouseY);
}

function mousePressed() {
	for (var i = bubbles.length-1; i >= 0; i--) {
		if (getMouse().sub(bubbles[i].pos).mag() < bubbles[i].size/2)
			bubbles.splice(i, 1);
	}
}

function spawnBubble() {
	if (bubbles.length < maxBubbleCount)
		bubbles.push(new Bubble(random(width), -10));
}