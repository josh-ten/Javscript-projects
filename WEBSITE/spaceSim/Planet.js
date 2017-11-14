class Planet {
    constructor(x, y, crater) {
        this.gravity = 1;
        this.pos = createVector(x, y);
        this.size = 200;
        this.crater = crater;
        this.craters = [];

        this.generateCraters();
    }

    draw() {
        fill(200);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        if (this.crater) {
            fill(100);
            for (var i = 0; i < this.craters.length; i++) {
                ellipse(this.pos.x+this.craters[i].x, this.pos.y+this.craters[i].y, 
                        this.craters[i].size, this.craters[i].size);
            }
        }
    }

    generateCraters() {
        var c = {size: this.size/10, x: this.size/4, y:this.size/3}
        this.craters.push(c);
        var c = {size: this.size/6, x: this.size/3, y:this.size/5}
        this.craters.push(c);
        var c = {size: this.size/15, x: this.size/12, y:this.size/4}
        this.craters.push(c);
        var c = {size: this.size/10, x: this.size/5, y:0}
        this.craters.push(c);
    }
}