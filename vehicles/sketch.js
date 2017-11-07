var points = [];
var vehicles = [];
var yoff;
var reverse;
var speed;

function setup() {
	createCanvas(800, 300);
	colorMode(HSB);
	background(51);
	yoff = 0;
	reverse = false;
	depthSlider = createSlider(0, 255, 100);
	depthSlider.position(100, 300);
	depthSlider.value(30);

	speedSlider = createSlider(0, 255, 100);
	speedSlider.position(200, 300);
	speedSlider.value(0.1);

	
	for (var i = 0; i < 20; i++) {
		points.push({x:50+i*30, y:150 + 20*sin(i)});
	}

	for (var i = 0; i < points.length; i++) {
		var pt = points[i];
		var vehicle = new Vehicle(pt.x, pt.y, random(255));
		vehicles.push(vehicle);
	}
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
		vehicles[i].target.y = 150 + depthSlider.value()*sin(i+ yoff);
	}
	if (reverse)
		yoff += speedSlider.value()/1000;
	else
		yoff -= speedSlider.value()/1000;
}

function mouseClicked() {
	reverse = !reverse;
}