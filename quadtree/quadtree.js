class Quadtree {
    constructor(rectangle) {
        this.rect = rectangle;
        this.bounds = [];
        this.quads = [];
        this.lowestLevel = true;
    }
    
    update() {
        if (this.countPoints() > pointThreshold)
            this.subdivide();
        
        this.draw();
        for (let quad of this.quads) {
            quad.update();
        }
    }

    draw() {
        rectMode(CENTER);
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        // point(this.rect.x, this.rect.y);
    }

    countPoints() {
        var pointCnt = 0;
        if (this.lowestLevel) {
            for (let point of points) {
                if (this.rect.contains(point)) {
                    pointCnt++;
                }
            }
        }
        return pointCnt;
    }

    subdivide() {
        var x = this.rect.x;
        var y = this.rect.y;
        var w = this.rect.w;
        var h = this.rect.h;       
        var nwr = new Rectangle(x - (w/4), y - (h/4), w/2, h/2);
        var ner = new Rectangle(x + (w/4), y - (h/4), w/2, h/2);
        var swr = new Rectangle(x - (w/4), y + (h/4), w/2, h/2);
        var ser = new Rectangle(x + (w/4), y + (h/4), w/2, h/2);
        this.quads.push(new Quadtree(nwr));
        this.quads.push(new Quadtree(ner));
        this.quads.push(new Quadtree(swr));
        this.quads.push(new Quadtree(ser));
        this.lowestLevel = false;
    }
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
    }

    contains(point) {
        return !(
            point.x < this.x - this.w/2 ||
            point.x > this.x + this.w/2 ||
            point.y < this.y - this.h/2 ||
            point.y > this.y + this.h/2);
    }
}