var left = [], right = [], up = [], down = [];
var points;
var columns = 200;
var xoff = 0; yoff = 1000;
var hue = 0;
var hueOff = 0;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	for (var i = 0; i < columns; i++) {
		left[i] = {x: 10, y: (height-10)/columns*i+10};
		right[i] = {x: width - 10, y: (height-10)/columns*i+10};
		up[i] = {x: (width-10)/columns*i+10, y: 10};
		down[i] = {x: (width-10)/columns*i+10, y: height - 10};
	}
	up.reverse();
	right.reverse();
	
	points = [left, right, up, down];
	colorMode(HSB);
	hueOff = 0;
}

function draw() {
	background(0);
	hue = 0;
	strokeWeight(1);

	connectSides(left, down);
	connectSides(right, down);
	connectSides(up, right);
	connectSides(up, left);	
	hueOff++;
	
	// wiggle([down, up, left, right]);
}

function connectSides(sideA, sideB) {
	for (var i = 0; i < sideA.length; i++) {
		if (sideB[i]) {
			var x1 = sideA[i].x; 
			if (sideA[i].xoff) x += sideA[i].xoff;
			var y1 = sideA[i].y;
			if (sideA[i].yoff) y += sideA[i].yoff;
			var x2 = sideB[i].x; 
			if (sideB[i].xoff) x += sideB[i].xoff;
			var y2 = sideB[i].y;
			if (sideB[i].yoff) y += sideB[i].yoff;
			stroke((hue+hueOff)%255, 255, 255);			
			line(x1, y1, x2, y2);
			// if (random() < 0.1) console.log(hue+hueOff, hue+hueOff%255);
			hue+=10;
		}
	}
}

function wiggle(sides) {
	for (var i = 0; i < sides.length; i++) {
		for (var j = 0; j < sides[i].length; j++) {
			sides[i][j].xoff = Math.sin(xoff) * 2;
			sides[i][j].yoff = Math.cos(xoff) * 2;
			xoff += 0.002;
		}
		xoff += 0.001;	
	}
	// xoff = random(-1, 1);
}