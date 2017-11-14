class Spaceship {
    constructor(x, y) {
        this.gravity = 1;
        this.pos = createVector(x, y);
        this.rotation = 0;
        this.scale = 0.5;
    }

    update() {
        this.rotation += 0.1;
        this.pos.x = Math.sin(this.rotation*0.01) * (height * 0.9);
        this.pos.y = Math.cos(this.rotation*0.01) * (height * 0.9);

        this.draw();
    }

    draw() {
        angleMode(DEGREES);

        translate(this.pos.x, this.pos.y);
        scale(this.scale);
        rotate(this.rotation);

        rectMode(CENTER);

        noStroke();
        fill(200);        
        rect(-50, 0, 100, 5); //Attachers
        rect(50, 0, 100, 5);       

        fill(150);
        stroke(100);
        strokeWeight(2);
        rect(100, 0, 100, 30); //Solar panels
        rect(-100, 0, 100, 30);

        fill(220);
        stroke(0);
        strokeWeight(2);
        beginShape(); //Body
        vertex(-30, 40);
        vertex(30, 40);
        vertex(20, 30);
        vertex(20, -30);
        vertex(10, -40);
        vertex(-10, -40);
        vertex(-20, -30);
        vertex(-20, 30);
        vertex(-30, 40);
        endShape();

        ellipse(0, -50, 40, 40); //Head;
        fill(255);
        noStroke();
        ellipse(5, -55, 20, 20); //Head;

        stroke(0);
        strokeWeight(1);
        beginShape(); //Nose
        vertex(5, -69);
        vertex(-5, -69);
        vertex(0, -75);
        endShape();

        scale(1/this.scale);
        rotate(-this.rotation);
        translate(-this.pos.x, -this.pos.y);
    }
}