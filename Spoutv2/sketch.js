var grid = [];
var width, height;
var w, h;
var scale;
var player;
var gui;
var gameOver;
var os;
var score;
var thumbStick;

const W = 87, A = 65, S = 83, D = 68;
const UP = 38, LEFT = 37, DOWN = 40, RIGHT = 39;

function setup() {
	gameOver = false;
	score = 0;
	scale = 16;
	width = window.innerWidth-5;
	height = window.innerHeight-5;
	w = width/scale;
	h = height/scale;
	createCanvas(width, height);

	// scaleSlider = createSlider(8, 16, 8);
	// scaleSlider.position(100, height+10);
	// scaleSlider.input(changeScale);

	thumbStick = new Thumbstick(width/2, height * 0.8);
	os = new ObstacleSpawner();
	player = new Player(w/2, h/2, 2);
	gui = new GUI();

	calcBackground();
}

function calcBackground() {
	grid.length = 0;
	for (var i = 0; i < w; i++) {
		grid[i] = [];
		for (var j = 0; j < h; j++) {
			var center = createVector(w/2, h/2);
			var distFromCenter = Math.sqrt(Math.pow(i-center.x, 2)+Math.pow(j-center.y, 2))
			var grad = map(distFromCenter, 0, w/2, 0, 100);
			grid[i][j] = grad;
		}
	}
}

function draw() {
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			var x = i * scale;
			var y = j * scale;
			fill(255-grid[i][j]);
			noStroke();
			rect(x, y, scale, scale);
		}
	}

	os.update();
	player.update();	

	gui.draw();
	thumbStick.update();
	
	// console.log(floor(frameRate()));
}

// function changeScale() {
// 	scale = scaleSlider.value();
// 	w = floor(width/scale);
// 	h = floor(height/scale);
// 	calcBackground();
// }

function gameEnd() {
	player.explode();
	
	gameOver = true;
	saveScore();
}

function saveScore() {
	console.log("m");
	var data = new FormData();
	data.append("data" , "the_text_you_want_to_save");
	var xhr = new XMLHttpRequest();	
	xhr.open('session', '/saveScore.php', true);
	xhr.send(data);
}