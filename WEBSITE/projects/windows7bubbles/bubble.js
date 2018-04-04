//http://img03.deviantart.net/06be/i/2011/355/6/7/sonic_3_hd_bubble_shield_animation_test_by_timewarp33-d4jt671.png
class Bubble {
    constructor(x, y, xvel, yvel) {
        this.pos = createVector(x, y);
        this.vel = createVector(xvel, yvel);
        this.acc = createVector(0, 0);
        this.size = random(60,180);
        this.hue = random(255);
        this.hueNoise = random(1000);
        this.img = loadImage("bubble.png");
    }

    update() {
        this.vel.mult(0.999);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        
        this.constrain();
        this.bump();
        this.hue += ((noise(this.hueNoise) * 2) - 1) * 20;
        if (this.hue > 255) this.hue = 255;
        if (this.hue < 0) this.hue = 0;
        this.hueNoise += 0.01;

        this.draw();
    }

    draw() {
        image(this.img, this.pos.x-this.size/2, this.pos.y-this.size/2, this.size, this.size);
        stroke(this.hue, 200, 255);
        strokeWeight(2);
        noFill();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        // tint(this.hue, 255, 255);
    }

    constrain() {
        if (this.pos.x <= this.size/2) {
            this.vel.x *= -0.99;
            this.pos.x = this.size/2;
        }
        if (this.pos.x >= width-this.size/2) {
            this.vel.x *= -0.99;
            this.pos.x = width-this.size/2;
        }
        if (this.pos.y <= this.size/2) {
            this.vel.y *= -0.99;
            this.pos.y = this.size/2;            
        }
        if (this.pos.y >= height-this.size/2) {
            this.vel.y *= -0.99;
            this.pos.y = height-this.size/2;            
        }
    }

    bump() {
        for (var i = 0; i < bubbles.length; i++) {
            var difference = this.pos.copy().sub(bubbles[i].pos);
            var distance = difference.mag();
            difference.normalize();
            //bump
            if (distance <= (this.size/2) + (bubbles[i].size/2)) {
                bubbles[i].pos.add(difference.mult(-1));
                this.pos.add(difference.mult(-1));
                bubbles[i].vel.add(difference.mult(-1));
                this.vel.add(difference.mult(-1));

                var hueDiff = this.hue - bubbles[i].hue;
                this.hue -= hueDiff * 0.3;
                bubbles[i].hue += hueDiff * 0.3;
            }
        }
    }

    clicked(vel) {
        this.acc.add(vel.mult(-0.4));
    }
}