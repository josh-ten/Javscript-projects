class Box {
    constructor(x, y, i_, j_) {
        this.pos = createVector(x, y);
        this.offset = {x: 0, y: 0};
        this.index = {i: i_, j: j_};
        this.defaultSize = spacing * 0.9;
        this.minSize = 1;
        this.size = {s: 0, v: 0, a: 0};
        this.neighbors = [];
        this.hue = 255;
    }

    update() {
        this.size.s += this.size.v;
        this.size.v += this.size.a;
        this.size.a = 0;
        this.size.v *= 0.97;
        if (this.size.s != this.defaultSize) 
            this.size.s -= (this.size.s - this.defaultSize) * 0.1;
        if (this.hue < 255) this.hue++;

        var offsetAmt = 3;
        this.offset.x = map(this.size.s-this.defaultSize, -3, 3, -offsetAmt, offsetAmt);
        this.offset.y = map(this.size.s-this.defaultSize, -3, 3, offsetAmt, -offsetAmt);

        this.draw();
    }

    draw() {
        stroke(this.hue, 255, 255);
        strokeWeight(2);
        noFill();
        rectMode(CENTER);
        var rendSize = this.size.s < this.minSize ? this.minSize : this.size.s;
        rect(this.pos.x+this.offset.x, this.pos.y+this.offset.y, rendSize, rendSize);
    }
    
    clicked(triggerDir, size, hue) {
        if (random() < 0.01) triggerDir = {up: true, right: true, down: true, left: true};
        var i = this.index.i;
        var j = this.index.j;
        var delay = 15;
        this.size.a += size;
        this.hue = random(255);
        hue -= 20;
        size += 3 * (random() < 0.5) ? 1 : -1;
        setTimeout(() => {
            if (triggerDir.up && j - 1 >= 0) 
                grid[i][j-1].clicked({up: true}, size, hue);
            if (triggerDir.right && i + 1 < boxCnt.x) 
                grid[i+1][j].clicked({right: true}, size, hue);
            if (triggerDir.down && j + 1 < boxCnt.y) 
                grid[i][j+1].clicked({down: true}, size, hue);
            if (triggerDir.left && i - 1 >= 0) 
                grid[i-1][j].clicked({left: true}, size, hue);
        }, delay);
    }
}