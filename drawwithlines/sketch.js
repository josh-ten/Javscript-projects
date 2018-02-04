var points = [];
var balls = [];
var lines = [];

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	points.push(createVector(0, 0));
	balls.push(new Ball(width/2, 0, 50));
}

function draw() {
	background(0);
	stroke(255);
	for (var i = 0; i < balls.length; i++) {
		balls[i].update();
	}
	for (var i = 0; i < lines.length; i++) {
		lines[i].draw();
	}
	line(points[points.length-1].x, points[points.length-1].y, mouseX, mouseY);
}

function mousePressed() {
	points.push(createVector(mouseX, mouseY));
	lines.push(new Line(points[points.length-1], points[points.length-2]));
	console.log(lines);
}