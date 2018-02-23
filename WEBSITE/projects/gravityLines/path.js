class Path {
    constructor(x, y, velX, velY) {
        this.startPos = createVector(x, y);
        this.startVel = createVector(velX, velY);

        this.segments = [];
        this.particle = new Particle(
            this.startPos.x, this.startPos.y,
            this.startVel.x, this.startVel.y, this);
    }

    draw() {
        if (this.segments.length > 30) this.segments.splice(0, 1);

        stroke(255);

        this.particle.update();
        
        for (var i = 0; i < this.segments.length-1; i++) {
            strokeWeight(map(this.segments[i].vel, 0, 20, 3, 10));            
            line(this.segments[i].pos.x, this.segments[i].pos.y, 
                this.segments[i+1].pos.x, this.segments[i+1].pos.y);
        }
    }
}