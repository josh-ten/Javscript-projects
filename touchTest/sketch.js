var video;
var button;
var pixels = [];
var squares = [];
var squareSize;

function setup() {
	createCanvas(320, 240);
	pixelDensity(1);
	frameRate(10);
	video = createCapture(VIDEO);
	video.size(320, 240);
	// video.hide();

	squareSize = 10;

	// for (var i = 0; i < width/squareSize; i++) {
	// 	for (var j = 0; j < height/squareSize; j++) {
	// 		squares.push(new Square(i*squareSize, j*squareSize, squareSize));
	// 	}
	// }
}

function draw() {
	background(0);
	
	//image(video, 0, 0);
	video.loadPixels();
	loadPixels();
	for (var i = 0; i < video.height; i++) {
		for (var j = 0; j < video.width; j++) {
			var index = (i + j * video.width)*4;
			var r = video.pixels[index];
			var g = video.pixels[index+1];
			var b = video.pixels[index+2];
			var a = video.pixels[index+3];
			// var color_ = color(r, g, b, a);
			var brightness = (r+g+b)/3;
			console.log(brightness);
			var w = map(brightness, 0, 255, 0, squareSize);

			noStroke();
			//rectMode(CENTER);
			fill(255);
			//console.log(j+squareSize);
			rect(j+squareSize, i+squareSize, w, w);
		}
	}
	updatePixels();

}

function Square(x_, y_, size_) {
	this.x = x_;
	this.y = y_;
	this.size = size_;
	this.color;

	Square.prototype.draw = function() {
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);
	}
}