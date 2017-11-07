var grid = [];
var changed = [];
var width, height;
var w, h;
var scale;
var player;
var gameOver;
var os;

const W = 87, A = 65, S = 83, D = 68;

function setup() {
	gameOver = false;
	scale = 4;
	width = 400;
	height = 400;
	w = floor(width/scale);
	h = floor(height/scale);
	createCanvas(width, height);

	//Initialise grid
	for (var i = 0; i < w; i++) {
		grid[i] = [];
		for (var j = 0; j < h; j++) {
			var x = i * scale;
			var y = j * scale;
			var center = createVector(w/2, h/2);
			var distFromCenter = Math.sqrt(Math.pow(i-center.x, 2)+Math.pow(j-center.y, 2))
			var grad = map(distFromCenter, 0, w/2, 0, 100);
			grid[i][j] = new Cell(x, y, grad);
			changed.push(grid[i][j]);			
		}
	}

	os = new ObstacleSpawner();
	player = new Player(30, 50, 2);
}

function draw() {
	// background(255);
	if (!gameOver) {
		os.update();
		player.update();
	}

	//Outer border
	for (var i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			if (i == 0 || j == 0 || i == h-1 || j == w-1) {
				grid[i][j].on = true;
			}
		}
	}

	for (var i = 0; i < changed.length; i++) {
		changed[i].draw();
	}
	changed.length = 0;
	
	
	// for (var i = 0; i < h; i++) {
	// 	for (var j = 0; j < w; j++) {
	// 		grid[i][j].draw();
	// 	}
	// }

	// console.log(floor(frameRate()));
}
