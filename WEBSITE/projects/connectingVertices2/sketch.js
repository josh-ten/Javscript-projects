var grid = [];
var available = [];
var spacing = 20;
var travellers = [];
var w, h;
var finished;

function setup() {
	createCanvas(window.innerWidth-4, window.innerHeight-4);
	w = width/spacing;
	h = height/spacing;
	for (var i = 0; i < w; i++) {
		grid[i] = [];
		for (var j = 0; j < h; j++) {
			grid[i][j] = new Point(i, j);
			available.push(createVector(i, j));
		}
	}
	generateTraveller();
	generateTraveller();
	generateTraveller();
	
	background(200);	
}

function draw() {
	if (!finished) {
		colorMode(RGB);
		background(200, 235, 255);
		
		var toRemove = [];
		for (var i = 0; i < available.length; i++) {
			if (grid[available[i].x][available[i].y].connections.length > 3) {
				toRemove.push(i);
			}
		}
		for (var i = toRemove.length-1; i >= 0; i--) {
			available.splice(toRemove[i], 1);
		}
		console.log(available.length);

		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid[i].length; j++) {
				grid[i][j].update();
			}
		}

		for (var i = 0; i < travellers.length; i++) {
			travellers[i].update();
		}
		for (var i = travellers.length-1; i >= 0; i--) {
			if (travellers[i].terminated) travellers.splice(i, 1);
		}
	}
}

function mousePressed() {
	travellers.push(new Traveller(floor(mouseX/spacing), floor(mouseY/spacing)));
}

function generateTraveller() {
	if (available.length > 0) {
		var r = floor(random(available.length-1));
		travellers.push(new Traveller(available[r].x, available[r].y));
	} else finish = true;
}

