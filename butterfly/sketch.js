var yoff = 0;
function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(51);
	
	translate(width/2, height/2);
	stroke(255, map(noise(yoff), 0, 1, 0, 255), map(noise(yoff), 0, 1, 255, 0), 255);
	fill(map(noise(yoff), 0, 1, 255, 0), 0, map(noise(yoff), 0, 1, 0, 255), 255);
	strokeWeight(1);
	beginShape();

	var da = PI/100;
	var xoff = 0;

	for (var a = -PI/2; a <= PI/2; a += da) {
		var n = noise(xoff, yoff);
		var r = map(n, 0, 1, 50, 125)
		var x = r * cos(a);
		var y = r * sin(a);
		xoff += 0.1;
		vertex(x,y);
	}
	
	for (var a = PI/2; a <= 3*PI/2; a += da) {
		var n = noise(xoff, yoff);
		var r = map(n, 0, 1, 50, 125)
		var x = r * cos(a);
		var y = r * sin(a);
		xoff -= 0.1;
		vertex(x,y);
	}
	endShape();
	yoff += 0.05;
}