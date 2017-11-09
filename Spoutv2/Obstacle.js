function Obstacle(pos_, index_) {
    this.pos = pos_;
    this.pixel = new Pixel(this.pos.x, this.pos.y, 255);
    this.index = index_;
}

Obstacle.prototype.update = function() {    
    this.pixel.pos = this.pos;
    this.pixel.update();

    if (this.pos.y > h+scale) {
        os.pixelsToRemove.push(this);
    }
}
