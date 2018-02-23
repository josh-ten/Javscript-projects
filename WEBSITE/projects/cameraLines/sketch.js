var columns = 100;
var rows = 100;
var video;
var stemLen, columnWidth;
var styles = ["lines", "boxes", "circles"];
var style = 0;
var colour = Math.random(255);

function setup() {
	createCanvas(1280, 960);
	video = createCapture(VIDEO);
	video.size(320, 240);
	pixelDensity(1);
	video.hide();

	columnWidth = width/columns;
	stemLen = height/rows;
	colorMode(HSB);
	rectMode(CENTER);
	ellipseMode(CENTER);
	stroke(colour, 200, 200);	
}
		
function draw() {
	background(0);
	video.loadPixels();
	loadPixels();
	scale(1.3, 1.8);
	for (var y = 0; y < columns; y++) {
		for (var x = 0; x < rows; x++) {
			var index = (x + y * video.width) * 16;
			var r = video.pixels[index + 0];
			var g = video.pixels[index + 1];
			var b = video.pixels[index + 2];
			var avg = (r+g+b)/3;
			var weight = map(avg, 0, 255, columnWidth/10, columnWidth);
			switch (style) {
				case 0: {
					strokeWeight(weight);
					line(x*columnWidth, y*stemLen, x*columnWidth, y*stemLen+stemLen);
					break;
				}
				case 1: {
					strokeWeight(2);
					rect(x*columnWidth, y*stemLen, weight, weight);
					break;
				}
				case 2: {
					strokeWeight(2);					
					ellipse(x*columnWidth, y*stemLen, weight, weight);
					break;
				}
			}
		}
	}
}

function mousePressed() {
	if (style < styles.length-1) style++;
	else style = 0;
	colour = random(255);
	stroke(colour, 200, 200);	
}