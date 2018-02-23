var player;
var zones = [];
var enemies = [];
var score = 0;
var ui;
var flashAmt;
var canvas;
var canvCounter = 0;
var colour = 0;
var lives = 3;
var gameOver = false;
var maxZones = 6;
var maxEnemies = 15;

const W = 87, A = 65, S = 83, D = 68;
const UP = 38, LEFT = 37, DOWN = 40, RIGHT = 39;

function setup() {
	canvas = createCanvas(window.innerWidth-8, window.innerHeight-8);

	player = new Player(width/2, height-40);
	spawnZone();
	spawnEnemy();
	ui = new UI();
	flashAmt = 0;
}

function draw() {
	colorMode(HSB);
	background(colour, 255, flashAmt);
	if (flashAmt > 0) flashAmt -= 20;

	if (!gameOver) {
		player.update();
		for (var i = 0; i < zones.length; i++) {
			zones[i].update();
		}
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].update();
		}
	}
	ui.draw();
}

function spawnZone() {
	var z = new Zone(random(width), random(height));
	zones.push(z);
}

function spawnEnemy() {
	var e = new Enemy(random(width), random(height));
	enemies.push(e);
}