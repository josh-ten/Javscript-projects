function Pixel(x_, y_, alpha_) { 
    this.pos = createVector(x_, y_);    
    this.alpha = alpha_;
    this.active;

    this.update();
    
}

Pixel.prototype.update = function() {
    if (this.pos.y < 1 || this.pos.y > h ||
        this.pos.x < 1 || this.pos.x > w) {
        this.active = false;
    } else if (!this.active) {
        this.active = true;

        var x = floor(this.pos.x);
        var y = floor(this.pos.y);
        x = this.limit(x, 1, w-2);
        y = this.limit(y, 1, h-2);
        
        this.cell = grid[x][y];
    } else {
        this.cell.on = false;
        changed.push(this.cell);
        
        var x = floor(this.pos.x);
        var y = floor(this.pos.y);
        x = this.limit(x, 1, w-2);
        y = this.limit(y, 1, h-2);
        
        this.cell = grid[x][y];
        this.cell.on = true;
        this.cell.alpha = this.alpha;
        changed.push(this.cell);
    }
}

Pixel.prototype.limit = function(x, low, high) {
    if (x <= low)
        x = low;
    if (x >= high)
        x = high;
    return x;
}