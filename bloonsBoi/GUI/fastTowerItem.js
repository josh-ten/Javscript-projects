class FastTowerItem extends TowerItem {
    constructor(x, y) {
        super(x, y);
        this.id = "fast";
    }
    
    draw() {
        fill(255, 100, 100);
        if (this.attachedToMouse) ellipse(this.pos.x, this.pos.y, this.size, this.size);
        else ellipse(this.originalPos.x, this.originalPos.y, this.size, this.size);
    }
}