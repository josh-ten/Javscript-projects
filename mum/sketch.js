var vehicles = [];
var pts = [];
var button;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	button = new Button(width/2, height - 90, 200, 70, "Click");
}

function draw() {
	background(0, 100);
	for (let v of vehicles) {
		v.update();
		v.draw();
	}
	button.draw();
}

function mousePressed() {
	if (mouseX > button.x - button.w/2 &&
		mouseX < button.x + button.w/2 &&
		mouseY > button.y - button.h/2 &&
		mouseY < button.y + button.h/2) {
		button.pressed();
	}
}

function mouseDragged() {
	// if (frameCount % 2 == 0)
		pts.push(createVector(mouseX, mouseY));
}

class Vehicle {
	constructor(x, y) {
		this.pos = createVector(width/2, height/2);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.destination = createVector(x, y);
	}

	update() {
		this.attract();
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.vel.mult(0.95);
	}

	draw() {
		strokeWeight(6);
		stroke(255);
		point(this.pos.x, this.pos.y);
	}

	attract() {
		var diff = this.destination.copy().sub(this.pos);
		diff.mult(0.01);
		this.acc.add(diff);
	}
}

class Button {
	constructor(x, y, w, h, text) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.text = text;
	}

	draw() {
		noStroke();
		rectMode(CENTER);
		fill(20, 150, 255);
		rect(this.x, this.y, this.w, this.h);
		fill(0);
		textSize(50);
		textAlign(CENTER);
		text(this.text, this.x, this.y+20);
	}

	pressed() {
		var output = "[";
		for (let p of pts) {
			output += "createVector("
			output += p.x + ", " + p.y;
			output += "), ";
		}
		console.log(output);
		for (var i = 0; i < pts.length; i++) {
			vehicles.push(new Vehicle(pts[i].x, pts[i].y));
		}
	}
}