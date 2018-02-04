var gravity;
var fireworks = [];

var points = [];
var vehicles = [];
var yoff;
var reverse;

function setup() {
  	createCanvas(window.innerWidth-8, window.innerHeight-8);
  	colorMode(HSB);
  	gravity = createVector(0, 0.2);
  	stroke(255);
  	strokeWeight(4);
    yoff = 0;

  for (var i = 0; i < 20; i++) {
    points.push({x:(width/21)*(i+1), y:150 + 20*sin(i)});
  }

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y, random(255));
    vehicles.push(vehicle);
  }
}

function draw() {
	colorMode(RGB);
    background(0, 0, 0, 100);


  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }

  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].pos.y = (height - 50) + 20*sin(i+ yoff);
  }
  yoff += 0.1;

  	
  	for (var i = fireworks.length-1; i >= 0; i--) {
  		fireworks[i].update();
  		fireworks[i].show();
  		if (fireworks[i].done()) {
  			fireworks.splice(i, 1);
  		}
  	}
}

function mouseClicked() {
  for (var i = 0; i < vehicles.length; i++) {
      fireworks.push(new Firework(vehicles[i].pos.x, vehicles[i].pos.y));
  }
}