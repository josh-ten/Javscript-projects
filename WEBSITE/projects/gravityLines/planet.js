class Planet {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.size = size;
        this.color = random(255);
        this.direction = 1;
    }
    
    draw() {
        if (this.pos.y > height || this.pos.y < 0) this.direction *= -1;
        this.pos.y += this.direction;

        colorMode(HSB);
        fill(this.color, 255, 255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}