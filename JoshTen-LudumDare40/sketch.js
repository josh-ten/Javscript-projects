var player;
var walls = [];

const W = 87, A = 65, S = 83, D = 68;
const UP = 38, LEFT = 37, DOWN = 40, RIGHT = 39;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	player = new Player(width/2, height/3);
	
	for (var i = 0; i < width/50; i++) {
		walls.push(new Wall(i*50, height-50));
	}
	for (var i = 0; i < width/25; i++) {
		walls.push(new Wall(i*50+width/2, height-100));
	}
}

function draw() {
	background(0);

	for (var i = 0; i < walls.length; i++) {
		walls[i].update();
	}
	player.update();
}