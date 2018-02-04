class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.isOnLine = this.calculateFunc(this.start, this.end);
    }

    calculateFunc(start, end) {
        var gradient = (end.y - start.y) / (end.x - start.x);
        var offset = start.y - (gradient * start.x);
        return (x, y)=>{
            y == gradient * x + offset;
        }
    }

    draw() {
        stroke(255);        
        line(this.start.x, this.start.y, this.end.x, this.end.y);        
    }
}