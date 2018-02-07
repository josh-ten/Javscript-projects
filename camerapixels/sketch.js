var columns = 40;
var rows = 100;
var video;

function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	video.size(320, 240);
	pixelDensity(1);
	video.hide();

	stemLen = height/rows;
	columnWidth = width/columns;
}
		
function draw() {
	background(0);
	video.loadPixels();
	loadPixels();
	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < columns; x++) {
			//Find average brightness within cell
			var cellWidth = video.width/columns;
			var cellHeight = video.height/rows;
			var avg = 0;
			for (var w = 0; w < cellWidth; w++) {
				for (var h = 0; h < cellHeight; h++) {
					var index = ((x+w) + (y+h) * video.width)*4;
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