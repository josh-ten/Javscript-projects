class TowerItem {
    constructor(x, y) {
        this.pos = createVector(width - 300 + x, y);
        this.originalPos = this.pos.copy();
        this.size = 50;
        this.attachedToMouse = false;
    }

    update() {
        if (this.attachedToMouse) {
            this.pos = mousePos;
        }
        stroke(255);
        strokeWeight(2);
        this.draw();
    }

    clicked() {
        this.attachedToMouse = true;
    }
    replaced() {
        this.attachedToMouse = false; 
        this.pos = this.originalPos;       
    }
}