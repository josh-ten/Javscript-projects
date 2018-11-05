class Traveller {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.direction;
        this.terminated = false;
        this.speed = random(0.01, 5);
        this.currentPoint = grid[this.pos.x][this.pos.y];
        this.currentConnection;
        this.completedMove = true;
        this.UP = createVector(0, -1), 
        this.RIGHT = createVector(1, 0), 
        this.DOWN = createVector(0, 1), 
        this.LEFT = createVector(-1, 0);
    }

    update() {
        var cons = this.currentPoint.connections;
        if (cons.length == 4) this.terminate();
        if (this.completedMove) {
            this.direction = this.chooseDirection();
            var taken = false;
            for (var i = 0; i < cons.length; i++) {
                if (this.direction == cons[i].direction) taken = true;
                //Check inverse connection
                var nextPos = this.currentPoint.pos.copy().add(this.direction);
                var nX = nextPos.x, nY = nextPos.y;
                if (nX > 0 && nX < width/spacing && nY > 0 && nY < height/spacing) {
                    var reverse = this.direction.copy().mult(-1);
                    var nextCons = grid[nX][nY].connections;
                    for (var j = 0; j < nextCons.length; j++) {
                        if (nextCons[j].direction == reverse) {
                            taken = true;
                        }
                    }
                }
            }
            if (!taken) {
                cons.push({direction: this.direction, amount: 0});
                this.currentConnection = cons[cons.length-1];
                this.completedMove = false;
            }
        }
        this.move();
        // strokeWeight(10);
        // stroke(0);
        // point(this.pos.x*spacing+this.direction*this.currentConnection.amount, 
        //     this.pos.y*spacing+this.direction*this.currentConnection.amount);
    }
    
    move() {
        if (this.currentConnection.amount < 1)
            this.currentConnection.amount += this.speed;
        else {
            this.completedMove = true;
            this.pos.add(this.direction);
            if (this.pos.y > (height/spacing) - 5 || this.pos.y < 0 || 
                this.pos.x > (width/spacing) - 5 || this.pos.x < 0) {
                this.terminate();
            } else {
                this.currentPoint = grid[this.pos.x][this.pos.y];
            }
        }
    }

    chooseDirection() {
        var dir;
        switch(round(random(3))) {
            case 0: dir = this.UP; break;
            case 1: dir = this.RIGHT; break;
            case 2: dir = this.DOWN; break;
            case 3: dir = this.LEFT; break;
        }
        if (this.direction) var reverse = this.direction.copy().mult(-1); 
        if (dir != reverse) return dir;
        else this.chooseDirection();
    }

    terminate() {
        this.terminated = true;
        generateTraveller();
    }
}