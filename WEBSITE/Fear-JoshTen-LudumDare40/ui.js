class UI {
    constructor() {
        this.pos = createVector(20, 100);
        this.fuelPos = createVector(width/2, 0);
        
    }

    draw() {
        fill(255);
        noStroke();
        textSize(70);
        text(score, this.pos.x, this.pos.y);
        textSize(50);
        text(lives + " LIVES", this.pos.x, this.pos.y + 70);

        //Player fuel
        rectMode(CENTER);
        fill(255, 0, 0);
        rect(this.fuelPos.x, this.fuelPos.y, width, 50);
        fill(0, 255, 100);
        rect(this.fuelPos.x, this.fuelPos.y, map(player.fuel, 0, 100, 0, width), 50);
    }
}