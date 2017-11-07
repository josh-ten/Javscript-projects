function Cell(x_, y_, backGrad_) {
    this.on = false;
    this.x = x_;
    this.y = y_;
    this.alpha = 255;
    this.backGrad = backGrad_;
}

Cell.prototype.draw = function() {
    noStroke();
    if (this.on) {
        fill(0, this.alpha);
        rect(this.x, this.y, scale, scale);
    } else {
        fill(255-this.backGrad);
        rect(this.x, this.y, scale, scale);
    }
}