function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.maxspeed = 20;
    this.timeout = 300;
    this.time = this.timeout;

    Particle.prototype.update = function() {
        var nearestPoint = this.findNearest();
        this.attract(nearestPoint);
        this.vel.limit(this.maxspeed);

        this.redistribute();
        this.constrain();

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);

        this.draw();
    }

    Particle.prototype.draw = function() {
        colorMode(HSB);
        fill(map(this.vel.mag(), 0, this.maxspeed, 0, 255), 255, 255);        
        ellipse(this.pos.x, this.pos.y, 3);
    }

    Particle.prototype.findNearest = function() {
        var shortestLen = 1000;
        var index = -1;
        for (var i = 0; i < orbitPoints.length; i++) {
            var direction = orbitPoints[i].copy().sub(this.pos);
            var distance = direction.mag();
            if (distance < shortestLen) {
                shortestLen = distance;
                index = i;
            }
        }

        if (index == -1)
            return createVector(mouseX, mouseY);
        
        return orbitPoints[index];
    }

    Particle.prototype.attract = function(point) {
        var direction = point.copy().sub(this.pos);
        var distance = direction.mag();
        if (this.time == this.timeout)
            this.acc.add(direction.normalize().mult(distance/100));
    }

    Particle.prototype.redistribute = function() {
        var mouse = createVector(mouseX, mouseY);
        var distance = mouse.sub(this.pos).mag();
        if (distance < 5) {
            this.time--;
        }
        if (this.time < this.timeout) {
            this.time--;
            if (this.time < 0)
                this.time = this.timeout;
        }
    }

    Particle.prototype.constrain = function() {
        if (this.pos.x < 0 ||
            this.pos.x > width ||
            this.pos.y < 0 ||
            this.pos.y > height) 
        {
            this.pos.x = random(width);
            this.pos.y = random(height);
            this.vel = createVector(0, 0);
            this.time = this.timeout;
        }
    }
}