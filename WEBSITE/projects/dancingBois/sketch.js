let person;
let joints;
let limbs, aLimbs;
let keyMappings;
let people = [];
let movementSpeed = 3;

function setup() {
  createCanvas(window.innerWidth-8, 
               window.innerHeight-8);
  
  joints = {
    'neck': new Joint(0, 0),
    'lElbow': new Joint(-50, 50),
    'rElbow': new Joint(50, 50),
    'lHand': new Joint(-50, 100),
    'rHand': new Joint(50, 100),
    'waist': new Joint(0, 150),
    'lFoot': new Joint(-50, 250),
    'rFoot': new Joint(50, 250)
  };
  
  let lFArm = new Limb(joints.lElbow, joints.lHand, 
                       PI/2, true);
  let rFArm = new Limb(joints.rElbow, joints.rHand, 
                       PI/2, false);
  let lArm = new Limb(joints.neck, joints.lElbow, 
                      3*PI/4, true,
                      [lFArm]);
  let rArm = new Limb(joints.neck, joints.rElbow, 
                      PI/4, false
                      [rFArm]);
  let lLeg = new Limb(joints.waist, joints.lFoot, 
                      3*PI/5, true);
  let rLeg = new Limb(joints.waist, joints.rFoot, 
                      2*PI/5, false);
  let torso = new Limb(joints.neck, joints.waist, 
                       PI/2, true
                       [lLeg, rLeg]);
  limbs = {
     'lArm': lArm, 
     'rArm': rArm, 
     'lFArm': lFArm,
     'rFArm': rFArm,
     'torso': torso, 
     'lLeg': lLeg, 
     'rLeg': rLeg};
  aLimbs = [lArm, rArm, lFArm, rFArm, torso, lLeg, rLeg];
  
  makePerson(aLimbs, width/2, height/5);
  
  keyMappings = {
    'R': lArm,
    'Y': rArm,
    'F': lFArm,
    'H': rFArm,
    'G': torso,
    'V': lLeg,
    'B': rLeg
  };
}

function draw() {
  colorMode(RGB);
  background(40);
  
  for (let p of people) {
    p.update();
    p.draw();
  }
  
  noStroke();
  fill(150);
  textSize(40);
  textAlign(CENTER);
  text("Try pressing: R, F, Y, H, G, V, B", 
       width/2, height - 30);
}

function makePerson(limbs, x, y) {
  person = new Person(limbs, x, y);
  
  people.push(person);
  people.sort((a, b) => {
    return a.y > b.y;
  });
}

function mousePressed() {
  makePerson(aLimbs, mouseX, mouseY);
}

function keyPressed() {
  let key = String.fromCharCode(keyCode)
  if (keyMappings.hasOwnProperty(key)) {
    keyMappings[key].activate();
  }
}

function keyReleased() {
  let key = String.fromCharCode(keyCode)
  if (keyMappings.hasOwnProperty(key)) {
    keyMappings[key].deactivate();
  }
}

class Person {
  constructor(limbs, x, y) {
    this.limbs = limbs;
    this.x = x;
    this.y = y;
    this.hue = random(255);
  }
  
  update() {
    for (let l of this.limbs) {
      l.update();
    }
  }
  
  draw() {
    colorMode(HSB);
    stroke(0);
    strokeWeight(5);
    for (let l of this.limbs) {
      l.draw(this.x, this.y, this.hue);
    }
    
    fill(this.hue, 255, 255);
    let bob = sin(frameCount/10);
    bob = map(pow(bob, 4), 0, 1, 0, 30);
    translate(0, bob);
    ellipse(this.x, this.y-40, 80, 80);
    let hairColour = (this.hue+127)%255;
    stroke(hairColour, 255, 255);
    arc(this.x, this.y-40, 90, 90, PI, TWO_PI);
    fill(hairColour, 255, 255);
    arc(this.x, this.y-70, 60, 20, PI, TWO_PI, CHORD);
    noStroke();
    fill(0);
    stroke(0);
    strokeWeight(3);
    line(this.x-45, this.y-42, this.x+45, this.y-40);
    arc(this.x-15, this.y-40, 20, 20, 0, PI);
    arc(this.x+15, this.y-40, 20, 20, 0, PI);
    translate(0, -bob);
  }
}

class Limb {
  constructor(start, end, angle, swayDir, children) {
    this.start = start;
    this.end = end;
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    this.length = sqrt((dx*dx) + (dy*dy));
    
    this.defAngle = angle;
    this.angle = this.defAngle;
    this.targetAngle = this.defAngle;
    
    this.swayDir = swayDir;
    
    if (children) this.children = children;
  }
  
  update() {
    let diff = this.targetAngle - this.angle;
    diff /= movementSpeed;
    let newAngle = this.angle + diff;
    this.setAngle(newAngle);
  }
  
  draw(xoff, yoff, hue) {
    stroke(hue, 255, 255);
    strokeWeight(10);
    line(this.start.x + xoff, this.start.y + yoff,
         this.end.x + xoff, this.end.y + yoff);
  }
  
  rotate(angle) {
    this.targetAngle += angle;
    if (this.children) {
      for (let c of this.children) {
        c.rotate(angle);
      }
    }
  }
  
  setAngle(angle) {
    this.angle = angle;
    this.end.x = this.start.x + cos(angle) * this.length;
    this.end.y = this.start.y + sin(angle) * this.length;
  }
  
  activate() {    
    let neg = this.swayDir ? 1 : -1;
    this.rotate(PI/6 * neg);
  }
  
  deactivate() {
    let neg = this.swayDir ? 1 : -1;
    this.rotate(-PI/6 * neg);
  }
}

class Joint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    stroke(0, 255, 0);
    point(this.x, this.y);
  }
}