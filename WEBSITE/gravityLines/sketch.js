var paths = [];
var planets = [];
var pos1;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);

	planets.push(new Planet(width/2, height/2, 200));
	planets.push(new Planet(width - 200, height - 200, 100));	
	planets.push(new Planet(200, 200, 150));	
	
}

function draw() {
	background(0);

	for (var i = 0; i < paths.length; i++) {
		paths[i].draw();
	}

	for (var i = 0; i < planets.length; i++) {
		planets[i].draw();
	}
}

function mousePressed() {
	pos1 = createVector(mouseX, mouseY);
}

function mouseReleased() {
	var mouse = createVector(mouseX, mouseY);
	var vel = mouse.sub(pos1);
	vel.mult(0.1);
	paths.push(new Path(pos1.x, pos1.y, vel.x, vel.y));
}