class DotPair {
    constructor(brain) {
        this.origin = createVector(width / 2, height/2);
        this.r = 80;
        this.a = 0;
        this.dotA;
        this.dotB;
        this.dotR = 25;
        this.speed = speed * 0.02;
        this.dead = false;
        this.fitness = 0;
        this.score = 0;

        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        } else {
            this.brain = new NeuralNetwork(10, 5, 3);
        }
        this.calcPos();
    }

    think(obstacles) {
        //Find the closest dot pair
        let closest1 = null;
        let closest2 = null;
        let record1 = Infinity;
        let record2 = Infinity;
        let visionTop = this.origin.y - this.r;
        let visionBot = this.origin.y + this.r;
        for (let o of obstacles) {
            if (o.y > visionTop && o.y < visionBot &&
                height - o.y < record1) {
                record1 = o.y;
                closest1 = o;
            }
            if (o.y > visionTop && o.y < visionBot &&
                o.y < record2) {
                record2 = o.y;
                closest2 = o;
            }
        }

        if (closest1 != null && closest2 != null) {
            //Tell the brain all about the world
            let inputs = []; 
            inputs.push(map(this.a % PI,    0, PI, 0, 1));
            
            inputs.push(map(closest1.x,     0, width,   0, 1));
            inputs.push(map(closest1.y,     0, height,  0, 1));
            inputs.push(map(closest1.w,     0, width,   0, 1));
            inputs.push(map(closest1.dir,   -1, 1,      0, 1));

            inputs.push(map(closest2.x,     0, width,   0, 1));
            inputs.push(map(closest2.y,     0, height,  0, 1));
            inputs.push(map(closest2.w,     0, width,   0, 1));
            inputs.push(map(closest2.dir,   -1, 1,      0, 1));
            inputs.push(1);

            // Get the outputs from the network
            let action = this.brain.predict(inputs);

            // Decide which way to rotate
            // 0 = nothing, 1 = left, 2 = right
            if (action[1] > max(action[0], action[2])) {
                this.rotate(-1);
            } else if (action[2] > max(action[0], action[1])) {
                this.rotate(1);
            }
            // if (action[1] > action[0]) {
            //     this.rotate(-1);
            // } else {
            //     this.rotate(1);
            // }
        }
    }

    update() {
        this.collision();
        this.score++;
    }

    draw() {
        noStroke();
        //Red one
        fill(255, 0, 0, 100);
        ellipse(this.dotA.x, this.dotA.y, this.dotR, this.dotR);
        //Blue one
        fill(50, 150, 255, 100);
        ellipse(this.dotB.x, this.dotB.y, this.dotR, this.dotR);
    }

    rotate(direction) {
        this.a += this.speed * direction;
        this.calcPos();
    }

    calcPos() {
        let xoff = Math.cos(this.a) * this.r;
        let yoff = Math.sin(this.a) * this.r;
        this.dotA = this.origin.copy();
        this.dotA.x += xoff;
        this.dotA.y += yoff;
        this.dotB = this.origin.copy();
        this.dotB.x -= xoff;
        this.dotB.y -= yoff;
    }

    collision() {
        for (let o of obstacles) {
            let dot = this.dotA;
            for (let i = 0; i < 2; i++) {
                if (dot.x > o.x &&
                    dot.x < o.x + o.w &&
                    dot.y > o.y &&
                    dot.y < o.y + o.h) {
                    this.dead = true;
                }
                dot = this.dotB;
            }
        }
    }

    copy() {
        return new DotPair(this.brain);
    }
}

function mutate(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian(0, 0.1) * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}