class Pixel {
    constructor(x_, y_, alpha_) {
        this.pos = createVector(x_, y_);
        this.alpha = alpha_;
        this.update();
    }
    update() {
        this.draw();
    }
    draw() {
        fill(0, this.alpha);
        noStroke();
        rect(this.pos.x * scale, this.pos.y * scale, scale + 1, scale + 1);
    }
}