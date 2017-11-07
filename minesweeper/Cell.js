function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;    
    this.x = i * w; 
    this.y = j * w;

    this.neighborCount = 0;
    this.bee = false;
    this.revealed = false;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.bee) {
            ellipse(this.x + this.w * 0.5, 
                    this.y + this.w * 0.5, 
                    this.w * 0.5);
        } else {
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            textAlign(CENTER);
            fill(0);
            if (this.neighborCount > 0)
                text(this.neighborCount, this.x+this.w*0.5, this.y+this.w*0.5);
        }
    }
}

Cell.prototype.placeFlag = function() {
    stroke(0);
    fill(200, 0, 0, 255);
    rect(this.x, this.y, this.w, this.w);
}

Cell.prototype.countBees = function() {
    if (this.bee) {
        this.neighborCount -1;
        return;
    }

    var total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols &&
                j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (neighbor.bee)
                    total++;
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w &&
            y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
    this.revealed = true;

    if (this.neighborCount == 0)
        this.floodFill();
}

Cell.prototype.floodFill = function() {
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols &&
                j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (!neighbor.bee && 
                    !neighbor.revealed)
                    neighbor.reveal();
            }
        }
    }
}
