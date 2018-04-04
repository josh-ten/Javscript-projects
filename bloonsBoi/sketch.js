var towers = [];
var enemies = [];
var map;
var gui;
var score = 0;
var track;
var mousePos;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	track = new Track("sampleMap");
	gui = new GUI();
	map = loadImage("sampleMap.png");
	
	setInterval(() => {
		var maxEnemies = 100;
		if (enemies.length < maxEnemies && track.trackPoints.length > 0)
			enemies.push(new Enemy(track.trackPoints[0].x, track.trackPoints[0].y, 5, 0));
	}, 500);
}

function draw() {
	mousePos = createVector(mouseX, mouseY);
	image(map, 0, 0, width, height);
	collisions();
	for (var i = enemies.length-1; i >= 0; i--) {
		enemies[i].update();
		if (enemies[i].pos.x > width) {
			enemies.splice(i, 1);
			// console.log("Enemy escaped!");
		}
	}
	for (var t = 0; t < towers.length; t++) {
		towers[t].update();
	}
	gui.draw();
}

function collisions() {
	for (var t = 0; t < towers.length; t++) {
		for (var j = towers[t].bullets.length-1; j >= 0; j--) {	
			for (var i = enemies.length-1; i >= 0; i--) {
				var bulletPos = towers[t].bullets[j].pos.copy();
				var enemyPos = enemies[i].pos;
				if (bulletPos.sub(enemyPos).mag() < enemies[i].size) {
					enemies.splice(i, 1);
					towers[t].bullets.splice(j, 1);
					score++;
					break;
				}
			}
		}
	}
}