class Wall {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = 50;
    }

    update() {
        this.draw();
    }

    draw() {
        fill(0, 100, 255);
        stroke(255);
        strokeWeight(2);
        rect(this.pos.x, this.pos.y, this.size, this.size);
    }
}