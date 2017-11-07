var grid;
var cols;
var rows;
var w = 40;
var totalBees = 10;

function setup() {
	createCanvas(401, 401);
	cols = floor(width/w);
	rows = floor(height/w);
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}

	//Pick totalBees spots
	for (var n = 0; n < totalBees; n++) {
		var i = floor(random(cols));
		var j = floor(random(rows));
		if (grid[i][j].bee)
			n--;
		else
			grid[i][j].bee = true;
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].countBees();
		}
	}
}

function draw() {
	background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
}

function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				if (mouseButton == LEFT) {
					grid[i][j].reveal();

					if (grid[i][j].bee)
						gameOver();
				}
				else if (mouseButton == RIGHT) {
					grid[i][j].placeFlag();
				}
			}
		}
	}
}

window.oncontextmenu = function() {
    for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].placeFlag();
			}
		}
	}
}

function gameOver() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].reveal();
		}
	}
}

function make2DArray(cols, rows) {
	var array = new Array(cols);
	for (var i = 0; i < array.length; i++) {
		array[i] = new Array(rows);
	}
	return array;
}