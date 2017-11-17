var car;
const W = 87, A = 65, S = 83, D = 68;
const UP = 38, LEFT = 37, DOWN = 40, RIGHT = 39;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	car = new Car(width/2, height*0.75, 20);
}

function draw() {
	background(255, 255, 200);
	car.update();
}