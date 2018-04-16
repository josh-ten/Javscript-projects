var quad;
var points = [];
var pointThreshold = 10;

function setup() {
	createCanvas(400, 400);
	var rect = new Rectangle(width/2, height/2, width, height);
	quad = new Quadtree(rect);
}

function draw() {
	background(255);
	quad.update();
	for (let p of points) {
		p.draw();
	}
	rect(mouseX, mouseY, 100, 100);
	for (let p of points) {
		if (new Rectangle(mouseX, mouseY, 100, 100).contains(p)) {
			strokeWeight(3);
			stroke(255, 0, 0);
			point(p.x, p.y);
		}
	}
}

function mouseDragged() {
	var variance = 55;
	for (var i = 0; i < 2; i++) {
		points.push(new Point(
			mouseX + random(-variance, variance), 
			mouseY + random(-variance, variance)));
	}
}

function mousePressed() {
	var mouse = new Point(mouseX, mouseY);
	for (let p of points) {
		//Highlight quad if it contains the mouse
		if (quad.rect.contains(mouse)/* && quad.lowestLevel*/) {
			if (quad.rect.contains(p)) {
				strokeWeight(3);
				stroke(255, 0, 0);
				point(p.x, p.y);
			}
		}
	}
}