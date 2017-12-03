class Particle {
    constructor(x, y, velX, velY, path) {
        this.pos = createVector(x, y);
        this.vel = createVector(velX, velY);
        this.acc = createVector(0, 0);
        this.path = path;

        this.resolution = 1;
        this.interval = this.resolution;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);

        for (var i = 0; i < planets.length; i++) {
            this.attract(planets[i]);
        }

        if (this.interval >= this.resolution) {
            this.savePos();
            this.interval = 0;
        } else this.interval++;
    }

    savePos() {
        this.path.segments.push({pos: this.pos.copy(), vel: this.vel.copy().mag()});
    }    

    attract(obj) {
        var O = obj.pos;
        var direction = O.copy().sub(this.pos);
        var distance = direction.mag();
        var force = (obj.size/1.5) / Math.pow(distance, 2);
        this.acc.add(direction.mult(force));
    }
}