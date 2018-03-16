class TestTower extends Tower {
    constructor(x, y) {
        super(x, y);

        setInterval(() => {
            if (enemies.length > 0) {
                var closestEnemy = enemies[this.findClosestEnemy()];
                if (closestEnemy != null) this.fire(closestEnemy.pos);
            }
        }, 300);

        var dir = this.direction.heading() + (Math.PI/2);
        this.bulletOffset = createVector(Math.cos(dir), Math.sin(dir)).mult(this.size/2);    
    }

}