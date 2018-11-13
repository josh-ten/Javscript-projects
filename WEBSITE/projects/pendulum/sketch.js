const gravity = 0.2;
const PEND_COUNT = 3;
const chain = true;
let pendulums = [];
let points = [];
let maxPts = 50;
let ptFreq = 1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pendulums.push(new Pendulum(width/2, 0, 200, 40, null));
  for (let i = 0; i < PEND_COUNT; i++) {
    pendulums.push(new Pendulum(0, 0, 130, 10, chain ?  
                                pendulums[pendulums.length-1] :
                                random(pendulums)));
  }
}

function draw() {
  background(51, 200);
  if (points.length > maxPts) points.splice(0, pendulums.length);
  stroke(200, 100);
  strokeWeight(3);
  for (let i = 0; i < points.length; i++) {
    if (points[i+1]) {
      line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    }
  }
  
  for (let p of pendulums) {
    p.update();
    p.draw();
    if (frameCount % ptFreq == 0) points.push(p.pos.copy());
  }
}
