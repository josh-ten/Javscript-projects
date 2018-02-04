var	angle = 0;
var colour;
var blink = 0;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight-30);
	slider = createSlider(0, TWO_PI, PI/4, 0.01);
	angle = 0;
	colour = 0;
	blink = 255;
}

function draw() {
	colorMode(RGB);
	background(0, 50);
	// angle = slider.value();
	angle+=0.04;
	colorMode(HSB);
	
	translate(width/2, height);
	branch(100);
	//(blink > 0) ? blink -= 100 : blink = 255;
}

function branch(len) {
	stroke(colour, 255, blink);
	(colour > 255) ? colour = 0 : colour++;
	line(0, 0, 0, -len);
	translate(0, -len);
	if (len > 4) {
		push();
		rotate(angle);
		branch(len*0.67);
		pop();
		push();
		rotate(-angle);
		branch(len*0.67);
		pop();
		// push();
		// // rotate(-angle);
		// branch(len*0.67);
		// pop();
	}
}