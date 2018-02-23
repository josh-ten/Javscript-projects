class Path {
    constructor(x, y) {
        this.startPos = createVector(x, y);

        this.segments = [];
        this.particle = new Particle(this.startPos.x, this.startPos.y, 0, 0, this);
    }

    draw() {
        while (this.segments.length < 100) {
            this.particle.update();
        }

        strokeWeight(4);
        for (var i = 0; i < this.segments.length-1; i++) {
            stroke(map(this.segments[i].vel, 0, 20, 0, 255), 255, 255);            
            line(this.segments[i].pos.x, this.segments[i].pos.y, 
                this.segments[i+1].pos.x, this.segments[i+1].pos.y);
        }
    }

    restart(startVel) {
        this.segments.length = 0;
        this.particle = new Particle(
            this.startPos.x, this.startPos.y,
            startVel.x, startVel.y, this);
    }
}