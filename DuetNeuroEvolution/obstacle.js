class Obstacle {
    constructor(x, y, w, h, speed, dir, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.dir = dir;
        this.highlighted = false;
        this.type = type; //0 left, 1 right, 2 mid
    }

    update() {
        this.y += this.speed * this.dir;
    }

    draw() {
        noStroke();
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}
