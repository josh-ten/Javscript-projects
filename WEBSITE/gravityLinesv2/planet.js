class Planet {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.size = size;
        this.color = random(255);
    }
    
    draw() {
        this.pos.add(this.vel);

        if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
        if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;        

        colorMode(HSB);
        fill(this.color, 255, 255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}