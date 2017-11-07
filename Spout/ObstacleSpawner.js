function ObstacleSpawner() {
    this.obstacles = [];
    this.scroll = 0;
    this.pixelsToRemove = [];

    this.rndSpawn();
}

ObstacleSpawner.prototype.update = function() {
    if (random(1) < 0.04 && this.scroll > 0)
        this.rndSpawn();

    for (var i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].update();
        this.sprayCollision(this.obstacles[i]); 
        this.obstacles[i].pos.y += this.scroll;
    }
    this.scroll = 0;

    for (var i = 0; i < this.pixelsToRemove.length; i++) {
        var index = -1;
        for (j = 0; j < this.obstacles.length; j++) {
            if (this.obstacles[j] === this.pixelsToRemove[i]) {
                index = j;
                break;
            }
        }
        if (index > -1) {
            this.obstacles[index].pixel.cell.on = false;
            this.obstacles.splice(index, 1);
        }
    }
    this.pixelsToRemove.length = 0;
}

ObstacleSpawner.prototype.rndSpawn = function() {
    var owidth = random(5, 20);
    var oheight = random(5, 20);
    var x = floor(random(20, w-20));
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
                    console.log("overlap");
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
            s[i].turnOffPixel();
            s.splice(i, 1);
            //Delete obstacle pixel
            this.pixelsToRemove.push(obstacle);
        }
    }
}