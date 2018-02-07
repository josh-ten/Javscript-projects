var path;
var planets = [];
var pos1;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	background(0);

	for (var i = 0; i < 4; i++) {
		planets.push(new Planet(random(width), random(height), random(50, 100)));
	}
}

function draw() {
	colorMode(RGB);
	background(0, 150);
	
	for (var i = 0; i < planets.length; i++) {
		planets[i].draw();
	}
	if (path) path.draw();
	if(path)mouseDragged();
	
}

function mousePressed() {
	path = new Path(mouseX, mouseY);
	pos1 = createVector(mouseX, mouseY);
}

function mouseDragged() {
	var mouse = createVector(mouseX, mouseY);
	var vel = mouse.copy().sub(pos1);
	vel.mult(0.1);
	path.restart(vel);
}