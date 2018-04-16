class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.highlighted = false;
    }

    draw() {
        if (this.highlighted) stroke(100, 0, 0);
        else stroke(0);
        strokeWeight(2);
        point(this.x, this.y);
    }

    highlight(activate) {
        console.log(activate);
        if (activate) this.highlighted = true;
        else this.highlighted = false;
    }
}