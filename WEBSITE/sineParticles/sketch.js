var points = [];
var vehicles = [];
var yoff;
var reverse;
var speed;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	colorMode(HSB);
	background(51);
	yoff = 0;
	reverse = false;
	depthSlider = createSlider(0, 140, 100);
	depthSlider.position(width*0.25, height*0.9);
	depthSlider.value(30);

	speedSlider = createSlider(0, 255, 100);
	speedSlider.position(width*0.75, height*0.9);
	speedSlider.value(50);

	particleCount = createSlider(1, 200, 100);
	particleCount.position(width/2, height*0.9);
	particleCount.value(20);
	particleCount.input(generateParticles);
	
	generateParticles();
	console.log(particleCount.value());
}

function draw() {
	background(0);
	fill(255);
	for (var i = 0; i < vehicles.length; i++) {
		var v = vehicles[i];
		v.behaviors();
		v.update();
		v.show();
	}

	for (var i = 0; i < vehicles.length; i++) {
		vehicles[i].target.y = (height/2) + depthSlider.value()*sin(i+ yoff);
	}
	if (reverse)
		yoff += speedSlider.value()/1000;
	else
		yoff -= speedSlider.value()/1000;
}

function mouseClicked() {
	reverse = !reverse;
}

function generateParticles() {
	if (particleCount.value() > points.length) {
		var numParticles = particleCount.value() - points.length;
		
		for (var i = 0; i < numParticles; i++) {
			points.push({x:50+i*(width/numParticles), y: (height/2) + 20*sin(i)});
		}

		for (var i = 0; i < points.length; i++) {
			var pt = points[i];
			var vehicle = new Vehicle(pt.x, pt.y, random(255));
			vehicles.push(vehicle);
		}
	}
}