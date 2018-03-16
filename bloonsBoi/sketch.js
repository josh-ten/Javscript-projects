var testTower1;
var testTower2;
var enemies = [];

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	testTower1 = new TestTower(500, 200);
	testTower2 = new TestTower(700, 200);
	
	setInterval(() => {
		enemies.push(new Enemy(random(-10000), height/2, 5, 0));
	}, 100);
}

function draw() {
	background(0);
	collisions();
	testTower1.update();
	testTower2.update();
	for (var i = enemies.length-1; i >= 0; i--) {
		enemies[i].update();
		if (enemies[i].pos.x > width) {
			enemies.splice(i, 1);
			console.log("Enemy escaped!");
		}
	}
}

function collisions() {
	for (var j = testTower1.bullets.length-1; j >= 0; j--) {	
		for (var i = enemies.length-1; i >= 0; i--) {
			var bulletPos = testTower1.bullets[j].pos.copy();
			var enemyPos = enemies[i].pos;
			if (bulletPos.sub(enemyPos).mag() < enemies[i].size) {
				enemies.splice(i, 1);
				testTower1.bullets.splice(j, 1);
				enemies.push(new Enemy(random(-10), height/2, 5, 0));
				break;
			}
		}
	}
}

function mousePressed() {
	// testTower1.fire();
	// testTower2.fire();
}
