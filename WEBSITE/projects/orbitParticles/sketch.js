var particles = [];
var averageSpeed;
var orbitPoints = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	averageSpeed = 0;
	for (var i = 0; i < 1000; i++) {
		particles.push(new Particle(random(width), random(height)));
	}
}

function draw() {
	colorMode(RGB);
	// background(map(averageSpeed, 0, 10, 0, 255), 100, 5);
	background(0);
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		// averageSpeed += particles[i].vel.mag();
	}
	// averageSpeed /= particles.length;
	
	if (frameRate() >= 50)
		particles.push(new Particle(random(width), random(height)));
	else if (particles.length > 0)
		particles.splice(0, 1);
}

function mouseClicked() {
	createOrbitPoint();
}

function createOrbitPoint() {
	orbitPoints.push(createVector(mouseX, mouseY));
}