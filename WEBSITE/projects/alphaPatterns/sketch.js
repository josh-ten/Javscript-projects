var grid = [];
var spacing = 20;
var cols, rows;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var distThresh = 8;
var fadeSpeed = 15;

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	cols = Math.ceil(width / spacing);
	rows = Math.ceil(height / spacing);

	for (var i = 0; i < cols; i++) {
		grid[i] = [];
		for (var j = 0; j < rows; j++) {
			grid[i][j] = {
				"letter": alphabet[Math.round((alphabet.length-1)*Math.random())],
				"alpha": 0
			};
		}
	}
}

function draw() {
	background(255, 0, 0);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (Math.random() < 0.05)
				grid[i][j].letter = alphabet[Math.round((alphabet.length-1)*Math.random())];
			var dist = distanceFromMouse(i, j);
			if (dist > grid[i][j].alpha) grid[i][j].alpha = dist;
			else grid[i][j].alpha -= fadeSpeed;
			fill(0, 0, 0, grid[i][j].alpha);
			text(grid[i][j].letter, i * spacing, j * spacing);
		}
	}
}

function distanceFromMouse(i, j) {
	var mouseCoord = createVector(mouseX / spacing, mouseY / spacing);
	var letterCoord = createVector(i, j);
	var dist = mouseCoord.sub(letterCoord).mag();
	if (dist < distThresh) return 255;
	if (dist < distThresh * 1.2) return map(dist, distThresh * 1.2, distThresh, 0, 255);
	return 0;
}

