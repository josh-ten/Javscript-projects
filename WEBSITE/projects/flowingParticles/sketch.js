var inc = 0.1;
var scl = 100;
var cols, rows;

var zoff = 0;

var particles = [];

var flowfield;

function setup() {
	createCanvas(window.innerWidth-20, window.innerHeight-20);
	pixelDensity(1);
	cols = floor(width / scl);
	rows = floor(height / scl);

	flowfield = new Array(cols * rows);

	for (var i = 0; i < 1000; i++) {
		particles[i] = new Particle();
	}

}

function draw() {
	background(0, 150);

	var yoff = 0;
	for (var y = 0; y < cols; y++) {
		var xoff = 0;
		for (var x = 0; x < rows; x++) {
			var index = x + y * cols;
			var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(1);
			flowfield[index] = v;
			xoff += inc;
			stroke(1, 0);
			strokeWeight(1);
			push();
			translate(x*scl, y*scl);
			rotate(v.heading());
			//line(0, 0, scl, 0);
			pop();
		}
		yoff += inc;
		zoff += 0.0003;
	}

	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].follow(flowfield);
		particles[i].edges();
		particles[i].show();
	}
}