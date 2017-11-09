function ObstacleSpawner() {
    this.obstacles = [];
    this.scroll = 0;
    this.pixelsToRemove = [];
    this.spawnFrequency = 2;
    this.collapsingPix = [];
}

ObstacleSpawner.prototype.update = function() {
    if (random(1) < this.spawnFrequency*0.04 && 
        this.scroll > 0.1 &&
        this.obstacles.length < 500)
        this.rndSpawn();

    for (var i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].update();
        this.sprayCollision(this.obstacles[i]); 
        this.obstacles[i].pos.y += this.scroll * 0.1;
    }
    this.scroll = 0;

    if (gameOver)
        this.collapse();
    for (var i = 0; i < this.collapsingPix.length; i++) {
        this.collapsingPix[i].update();
    }

    for (var i = 0; i < this.pixelsToRemove.length; i++) {
        var index = -1;
        for (j = 0; j < this.obstacles.length; j++) {
            if (this.obstacles[j] === this.pixelsToRemove[i]) {
                index = j;
                break;
            }
        }
        if (index > -1) {
            this.obstacles.splice(index, 1);
        }
    }
    this.pixelsToRemove.length = 0;
}

ObstacleSpawner.prototype.rndSpawn = function() {
    var owidth = floor(random(w/2));
    var oheight = floor(random(h/2));
    var x = random(0, w-owidth);
    var y = -oheight;
    this.createObstacle(x, y, owidth, oheight);
}

ObstacleSpawner.prototype.createObstacle = function(x, y, width, height) {
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var taken = false;
            for (var obs = 0; obs < this.obstacles.length; obs++) {
                if (floor(this.obstacles[obs].pos.x) == x+i && 
                    floor(this.obstacles[obs].pos.y) == y+j) {
                    taken = true;
                }
            }
            if (!taken) {
                var pos = createVector(x+i, y+j);
                var o = new Obstacle(pos);
                this.obstacles.push(o);
            }
        }
    }
}

ObstacleSpawner.prototype.sprayCollision = function(obstacle) {
    var s = player.sprays;
    var x1 = floor(obstacle.pixel.pos.x);
    var y1 = floor(obstacle.pixel.pos.y);
    for (var i = 0; i < s.length; i++) {
        var x2 = floor(s[i].pixel.pos.x);
        var y2 = floor(s[i].pixel.pos.y);
        if (x1 == x2 && y1 == y2) {
            //Delete spray pixel
            s.splice(i, 1);
            //Delete obstacle pixel
            this.pixelsToRemove.push(obstacle);
        }
    }
}

ObstacleSpawner.prototype.collapse = function() {
    for (var i = 0; i < this.obstacles.length; i++) {
        if (random(1) < 0.01) {
            var fallingVel = createVector(random(-0.5, 0.5), random(-0.1, 0.6));
            var fallingPix = new Spray(this.obstacles[i].pos.copy(), fallingVel);
            fallingPix.maxspeed = 1;
            fallingPix.lifespan = 1000;
            fallingPix.life = fallingPix.lifespan;
            this.collapsingPix.push(fallingPix);
            this.pixelsToRemove.push(this.obstacles[i]);
        }
    }
}