var grid = [];
var spacing = 30;
var boxCnt;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	colorMode(HSB);
	boxCnt = createVector(int(width/spacing)+1, int(height/spacing)+1);
	for (var i = 0; i < boxCnt.x; i++) {
		grid[i] = [];
		for (var j = 0; j < boxCnt.y; j++) {
			grid[i][j] = new Box(i*spacing, j*spacing, i, j);
		}
	}
	for (var i = 0; i < boxCnt.x; i++) {
		for (var j = 0; j < boxCnt.y; j++) {
			var neighbors = [];
			for (var n = -1; n <= 1; n += 2) {
				for (var m = -1; m <= 1; m += 2) {
					if (i+n >= 0 && i+n < boxCnt.x && j+m >= 0 && j+m < boxCnt.y) {
						neighbors.push(grid[i+n][j+m]);
					}
				}
			}
			grid[i][j].neighbors = neighbors;
		}
	}
}

function draw() {
	background(0);
	translate(spacing/2, spacing/2);
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			grid[i][j].update();
			if (Math.random() < 0.00001) grid[i][j].clicked({up: true, right: true, down: true, left: true}, Math.random(10, 30), Math.random(20, 40));
		}
	}
	// if (mouseIsPressed) mousePressed();
	
}

function mousePressed() {
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			var boxS = spacing > grid[i][j].size.s ? spacing : grid[i][j].size.s;
			var boxX = grid[i][j].pos.x;
			var boxY = grid[i][j].pos.y;
			if (mouseX < boxX + boxS && mouseX > boxX &&
				mouseY < boxY + boxS && mouseY > boxY) {
					grid[i][j].clicked({up: true, right: true, down: true, left: true}, Math.random(10, 30), Math.random(20, 40));
			}
		}
	}
}