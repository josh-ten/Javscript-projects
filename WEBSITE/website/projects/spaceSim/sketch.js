var astronauts = [];
var planets = [];
var spaceships = [];
var stars = [];
var astronautLinks = [];
var score;

function setup() {
	createCanvas(window.innerWidth-5, window.innerHeight-5);
	generateStars(200);
	planets.push(new Planet(0, 0, true));
	spaceships.push(new Spaceship(300, 100));

	score = 0;

	loadJSON("http://api.open-notify.org/astros.json", gotData);
}

function gotData(data) {
	for (var i = 0; i < data.number; i++) {
		astronauts.push(new Astronaut(data.people[i]))
	}
}

function draw() {
	colorMode(RGB);
	background(0, 0, 20);

	noStroke();
	for (var i = 0; i < stars.length; i++) {
		stars[i].update();
	}
	for (var i = 0; i < spaceships.length; i++) {
		spaceships[i].update();
	}
	for (var i = 0; i < astronautLinks.length; i++) {
		strokeWeight(2);
		stroke(100);
		if (astronautLinks[i].hasOwnProperty('end')) {			
			line(astronauts[astronautLinks[i].start].pos.x, 
				astronauts[astronautLinks[i].start].pos.y, 
				astronauts[astronautLinks[i].end].pos.x, 
				astronauts[astronautLinks[i].end].pos.y);
		} else {
			line(astronauts[astronautLinks[i].start].pos.x, 
				astronauts[astronautLinks[i].start].pos.y, 
				mouseX, mouseY);
		}
	} 
	for (var i = 0; i < astronauts.length; i++) {
		astronauts[i].update();
	}
	for (var i = 0; i < planets.length; i++) {
		planets[i].draw();
	}

	fill(150);
	textSize(40);
	text(score, 10, height-10);
}

function generateStars(amt) {
	for (var i = 0; i < amt; i++) {
		stars.push(new Star(random(width), random(height)));
	}
}

function limit(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}

function mousePressed() {
	var mouse = createVector(mouseX, mouseY);
	var index = findClosestAstronaut(mouse);
	if (index == -1) return;

	astronautLinks.push({start: index});
}

function mouseReleased() {
	var mouse = createVector(mouseX, mouseY);
	var index = findClosestAstronaut(mouse);
	if (index == -1) return;
	
	var currentLink = astronautLinks[astronautLinks.length-1];	
	currentLink.end = index;

	astronauts[currentLink.start].setAttractor(currentLink.end);	
	astronauts[currentLink.end].setAttractor(currentLink.start);	
}

function findClosestAstronaut(pos) {
	var index = -1;	
	var minDist = width * 2;	
	for (var i = 0; i < astronauts.length; i++) {
		var distance = astronauts[i].pos.copy().sub(pos).mag();
		if (distance < minDist) {
			minDist = distance;
			index = i;
		}
	}
	return index;
}

function findClosestSpaceship(pos) {
	var index = -1;	
	var minDist = width * 2;	
	for (var i = 0; i < spaceships.length; i++) {
		var distance = spaceships[i].pos.copy().sub(pos).mag();
		if (distance < minDist) {
			minDist = distance;
			index = i;
		}
	}
	return index;
}