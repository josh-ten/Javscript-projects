class Enemy {
    constructor(x, y, velX, velY) {
        this.pos = createVector(x, y);
        this.vel = createVector(velX, velY);
        this.size = 50;
        this.speed = 5;
        this.nextTrackPoint;
        if (track.trackPoints[1]) 
            this.nextTrackPoint = track.trackPoints[1];
        this.trackPointCnt = 0;
        this.remove = false;
    }

    update() {
        //Move onto next track point
        if (this.pos.copy().sub(this.nextTrackPoint).mag() < 10) {
            if (track.trackPoints.length > this.trackPointCnt) {
                var tp = this.nextTrackPoint;
                var newTp = track.trackPoints[this.trackPointCnt+1];
                this.nextTrackPoint = newTp;
                this.vel = newTp.copy().sub(tp).normalize().mult(this.speed);
                this.trackPointCnt++;
            }
        }
        this.pos.add(this.vel);
        if (this.pos.x > width) this.remove = true;
    }

    draw() {
        fill(200, 50, 90);
        strokeWeight(3);
        stroke(10);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}