var	angle = 0;
var colour;
var blink = 0;
var blinking = false;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight-30);
	angle = 0;
	colour = 0;
	blink = 255;
}

function draw() {
	colorMode(RGB);
	if (angle > 0 && angle < 0.5) background(255);
	else background(0, 50);
	angle += 0.04;
	colorMode(HSB);
	
	translate(width/2, height);
	scale(2);
	branch(100);
	(blink > 0) ? blink -= 50 : blink = 255;
	if (angle > 2 * Math.PI) angle = 0;
}

function branch(len) {
	if (blinking) stroke(colour, 255, blink);
	else stroke(colour, 255, 255);
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
	}
}

function mousePressed() {
	blinking = !blinking;
}