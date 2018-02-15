var columns = 100;
var rows = 100;
var video;
var cellWidth, cellHeight;
var stemLen, columnWidth;

function setup() {
	createCanvas(1280, 960);
	video = createCapture(VIDEO);
	video.size(320, 240);
	pixelDensity(1);
	video.hide();

	columnWidth = width/columns;
	stemLen = height/rows;
	cellWidth = video.width/columns;
	cellHeight = video.height/rows;
}
		
function draw() {
	background(0);
	video.loadPixels();
	loadPixels();
	scale(1.3, 1.8);			
	for (var y = 0; y < columns; y++) {
		for (var x = 0; x < rows; x++) {
			//Find average brightness within cell
			var avg = 0;
			for (var w = 0; w < cellWidth; w++) {
				for (var h = 0; h < cellHeight; h++) {
					var index = ((x+h) + (y+w) * video.width)*16;
					var r = video.pixels[index+0];
					var g = video.pixels[index+1];
					var b = video.pixels[index+2];
					avg += (r+g+b)/3;
				}
			}
			avg /= cellWidth * cellHeight;

			var weight = map(avg, 0, 255, columnWidth/10, columnWidth);
			strokeWeight(weight);
			stroke(255);
			line(x*columnWidth, y*stemLen, x*columnWidth, y*stemLen+stemLen);
		}
	}
}