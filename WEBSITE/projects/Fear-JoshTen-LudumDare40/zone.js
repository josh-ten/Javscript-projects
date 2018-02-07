class Zone {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = createVector(200, 170);
        this.playerInZone = false;
        this.enemyInZone = false;
        this.captureSize = random(50, 100);
        this.captureSquare = this.captureSize;
        this.enemiesInZone = [];
        this.colour = random(255);
    }

    update() {
        this.detectPlayer();
        this.enemiesInZone = this.detectEnemies();
        if (!this.playerInZone && !this.enemyInZone) this.captureSquare = this.captureSize;
        
        this.draw();
    }

    draw() {
        noFill();
        colorMode(HSB);
        strokeWeight(2);
        stroke(this.colour, 100, 255);        
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        colorMode(RGB);
        strokeWeight(1);
        if (this.playerInZone) {
            rect(this.pos.x, this.pos.y, this.size.x + this.captureSquare, this.size.y + this.captureSquare);
        } 
        if (this.enemyInZone) {
            stroke(this.colour, 100, 100);            
            rect(this.pos.x, this.pos.y, this.size.x + this.captureSquare, this.size.y + this.captureSquare);
        } 
    }

    capture() {
        if (this.enemiesInZone.length == 0) score += 10;
        else {
            for (var i = 0; i < this.enemiesInZone.length; i++) {
                if (enemies[this.enemiesInZone] &&
                    enemies[this.enemiesInZone].type == 0) score += 10;
            }
        }
        this.pos.x = random(width);
        this.pos.y = random(height);
        this.captureSize = random(50, 100);
        this.captureSquare = this.captureSize;
        flashAmt = 200;
        for (var i = this.enemiesInZone.length-1; i >= 0; i--) {
            enemies.splice(this.enemiesInZone[i], 1);
            spawnEnemy();
        }
        if (zones.length < maxZones) spawnZone();
        if (enemies.length < maxEnemies) spawnEnemy();
        player.repelEnemies();
        colour = this.colour;
    }

    detectPlayer() {
        var distance = this.pos.copy().sub(player.pos).mag();
        if (distance < this.size.x/2+player.size) {
            this.playerInZone = true;
            this.captureSquare -= 0.3;
        }
        else {
            this.playerInZone = false;
        }
        if (this.captureSquare <= 0) {
            this.capture();
        }
    }

    detectEnemies() {
        var eiz = [];
        for (var i = 0; i < enemies.length; i++) {
            var distance = this.pos.copy().sub(enemies[i].pos).mag();
            if (distance < this.size.x) {
                eiz.push(i);
            }
            if (this.captureSquare <= 0) {
                this.capture();
            }
        }
        if (eiz.length > 0) {
            this.enemyInZone = true;
            this.captureSquare -= 0.3;
        }
        else this.enemyInZone = false;

        return eiz;
    }
}