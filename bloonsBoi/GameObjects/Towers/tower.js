class Tower {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.bulletOffset;
        this.rotation = 0;
        this.direction = createVector(1, 0);
        this.size = 50;
        this.bullets = [];
        this.selected = true;
    }

    update() {
        var closest = this.findClosestEnemy();
        if (closest != -1) this.direction = enemies[closest].pos.copy().sub(this.pos);
        this.rotation = this.direction.heading() + (Math.PI/2);
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
        }
        //Grey halo when selected
        if (this.selected) {
            strokeWeight(1);
            stroke(0);
            fill(0, 50);
            ellipse(this.pos.x, this.pos.y, this.range, this.range);
        }
        this.draw();
        this.removeBullets();
    }

    fire(target) {
        if (!target) target = createVector(mouseX, mouseY);
        var velocity = target.copy().sub(this.pos).normalize();
        var b = new Bullet(this.pos.x, this.pos.y, velocity.x, velocity.y);
        this.bullets.push(b);
    }
    
    removeBullets() {
        for (var i = this.bullets.length-1; i >= 0; i--) {
            var b = this.bullets[i];
            if (b.pos.x > width ||
                b.pos.x < 0 ||
                b.pos.y > height ||
                b.pos.y < 0) {
                this.bullets.splice(i, 1);
            } 
        }
    }

    findClosestEnemy() {
        if (enemies.length > 0) var closest = enemies[0].pos.copy().sub(this.pos).mag();
        var closestIndex = -1;
        for (var i = 1; i < enemies.length; i++) {
            var distance = enemies[i].pos.copy().sub(this.pos).mag();
            if (distance < closest && distance < this.range) {
                closest = distance;
                closestIndex = i;
            }
        }
        return closestIndex;
    }
}