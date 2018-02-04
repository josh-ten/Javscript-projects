var snowflakes = [];
var windOff;
var lake;

function preload() {
	lake = loadImage("snowylake.jpg");
}

function setup() {
	createCanvas(window.innerWidth-8, window.innerHeight-8);
	windOff = 0;
}

function draw() {
	image(lake, 0, 0, width, height);
	wind();

	for (var i = 0; i < snowflakes.length; i++) {
		snowflakes[i].update();
	}
	for (var i = snowflakes.length - 1; i >= 0; i--) {
		if (snowflakes[i].y > height + 10) snowflakes.splice(i, 1);
	}

	if (random() < 0.6) spawnSnowflake();
}

function spawnSnowflake() {
	snowflakes.push(new Snowflake(random((width*2)-(width/2), -10)));	
}

function wind() {
	for (var i = 0; i < snowflakes.length; i++) {
		snowflakes[i].acc.x += ((noise(windOff) * 2) - 1) * 0.3; 
	}
	windOff += 0.01;
}