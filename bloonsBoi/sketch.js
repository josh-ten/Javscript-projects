var towers = [];
var enemies = [];
var map;
var gui;
var score = 0;
var track;
var mousePos;
var maxEnemies = 100;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	track = new Track("sampleMap");
	gui = new GUI();
	map = loadImage("sampleMap.png");
	
	setInterval(() => {
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
		enemies[i].draw();
		if (enemies[i].remove) {
			enemies.splice(i, 1);
		}
	}
	for (var t = 0; t < towers.length; t++) {
		towers[t].update();
		towers[t].draw();
	}
	gui.draw();
}

function collisions() {
	towers.forEach(tower => {
		for (var j = tower.bullets.length-1; j >= 0; j--) {	
			for (var i = enemies.length-1; i >= 0; i--) {
				var bulletPos = tower.bullets[j].pos.copy();
				var enemyPos = enemies[i].pos;
				if (withinRange(bulletPos, enemyPos, enemies[i].size)) {
					enemies.splice(i, 1);
					tower.bullets.splice(j, 1);
					score++;
					break;
				}
			}
		}
	});
}

function withinRange(pos1, pos2, range) {
	return pos1.copy().sub(pos2).mag() < range;
}