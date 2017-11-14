class Star {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.distance = random(1);
        this.speed = map(this.distance, 0, 1, 0, 0.2)
    }

    update() {
        this.pos.x += this.speed/2;
        this.pos.y -= this.speed;

        if (this.pos.x > width)
            this.pos.x = -10;
        if (this.pos.y < -10)
            this.pos.y = height + 10;
        this.draw();
    }

    draw() {
        var presence = map(this.distance + random(6), 0, 7, 100, 200);
        fill(presence);
        var size = map(presence, 0, 255, 0, 3);
		ellipse(this.pos.x, this.pos.y, size, size);
    }
}