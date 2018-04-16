var img;
var zoff = Math.random(1000);
var downscale = 4;
var colorScale = [];

function setup() {
	createCanvas(400, 400-10);
	img = createImage(int(width/downscale), int(10/downscale));
	colours = createImage(int(width/downscale), 10);
	colorScale[0] = [255, 0, 0];
	colorScale[1] = [0, 255, 0];
	colorScale[2] = [0, 0, 255];
}

function draw() {
	background(0);
	img.loadPixels();
	var yoff = 0;
	for (var i = 0; i < img.width; i++) {
		var xoff = 0;
	  	for (var j = 0; j < img.height; j++) {
			var random = noise(xoff, yoff, zoff); 
			// var random = 0;
			var k = int(random * colorScale.length-1);
			var c = transition3(
				random, 
				k*255/(colorScale.length-1), 
				(k+1)*255/(colorScale.length-1), 
				colorScale[k], 
				colorScale[k+1]);
			
			img.set(i, j, color(c[0], c[1], c[2]));
			xoff += 0.1;
		}
		yoff += 0.1;
	}
	zoff += 0.02;
	img.updatePixels();
	image(img, 0, 0, width, height);
	
	colours.loadPixels();
	for (var i = 0; i < colours.width; i++) {
		for (var j = 0; j < colours.height; j++) {
			var k = int((i/colours.width) * colorScale.length-1);			
			var c = transition3(
				i/colours.width, 
				colorScale.length-1, 
				255/(colorScale.length-1), 
				colorScale[k], 
				colorScale[k+1]);
			colours.set(i, j, c[0], c[1], c[2]);
		}
	}
	colours.updatePixels();
	image(colours, 0, height-10, width, 10);
}

function transition(value, minimum, maximum, start_point, end_point) {
	return map(value * (end_point - start_point) + start_point, 0, 255, minimum, maximum);
}
// [0     12    20,   23,      30]

function transition3(value, minimum, maximum, s1, s2, s3, e1, e2, e3) {
	r1 = transition(value, minimum, maximum, s1, e1);
	r2 = transition(value, minimum, maximum, s2, e2);
	r3 = transition(value, minimum, maximum, s3, e3);
	return [r1, r2, r3];
}