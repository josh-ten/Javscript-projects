class FastTower extends Tower {
    constructor(x, y) {
        super(x, y);

        this.range = 200;
        this.shootingInterval = 100;

        setInterval(() => {
            if (enemies.length > 0) {
                var closestEnemyIndex = this.findClosestEnemy();
                if (closestEnemyIndex != -1)
                    this.fire(enemies[closestEnemyIndex].pos);
            }
        }, this.shootingInterval);

        var dir = this.direction.heading() + (Math.PI/2);
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        strokeWeight(5);
        stroke(200);
        line(0, -this.size/2, 0, -this.size);
        fill(255, 100, 100);
        rectMode(CENTER);
        strokeWeight(3);
        rect(0, 0, this.size, this.size);
        pop();
    }
}