function Thumbstick(x, y) {
    this.direction = createVector(0, 0);
    this.pos = createVector(x, y);
}

Thumbstick.prototype.update = function() {
    if (touches.length > 0) {
        var touchPos = createVector(touches[0].x, touches[0].y);
        this.direction = this.pos.copy().sub(touchPos);
    } else if (mouseIsPressed) {
        var mousePos = createVector(mouseX, mouseY);
        this.direction = this.pos.copy().sub(mousePos);
    } else {
        this.direction = createVector(0, 0);
    }
    var distance = this.direction.mag();
    this.direction.normalize();
    player.touchMove(this.direction);

    this.draw(distance);
}

Thumbstick.prototype.draw = function(dist) {
    ellipseMode(CENTER);
    fill(0, 100);
    dist *= 3;
    ellipse(this.pos.x - (this.direction.x * dist), 
            this.pos.y - (this.direction.y * dist), 50);
    noFill();
    strokeWeight(3);
    stroke(0, 150);
    ellipse(this.pos.x - (this.direction.x * dist), 
            this.pos.y - (this.direction.y * dist), 50);
}