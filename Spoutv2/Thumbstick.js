function Thumbstick(x, y) {
    this.direction = createVector(0, 0);
    this.pos = createVector(x, y);
}

function touchEnded() {
    // this.direction.mult(0);
}

Thumbstick.prototype.update = function() {
    if (touches.length > 0) {
        var touchPos = createVector(touches[0].x, touches[0].y);
        this.direction = this.pos.copy().sub(touchPos);
        this.direction.normalize();
        player.touchMove(this.direction);
    }

    this.draw();
}

Thumbstick.prototype.draw = function() {
    fill(0, 150);
    ellipse(this.pos.x - (this.direction.x * 200), 
            this.pos.y - (this.direction.y * 200), 50);
}