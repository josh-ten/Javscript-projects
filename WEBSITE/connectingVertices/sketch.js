var particles = [];
var spacing = 50;

function setup() {
	createCanvas(window.innerWidth-4, window.innerHeight-4);
	var w = width/spacing;
	var h = height/spacing;
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var p = new Particle(i * spacing, j * spacing, i, j);
			particles.push(p);
		}
	}
}

function draw() {
	colorMode(RGB);
	background(0);
	
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
	}
}

