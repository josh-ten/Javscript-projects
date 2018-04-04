class GUI {
    constructor() {
        this.elements = [];
        this.items = [];
        this.items.push(new BasicTowerItem(100, 100));
        this.items.push(new FastTowerItem(200, 100));
    }

    draw() {
        fill(200, 0, 0);
        rect(width - 300, 0, width, height);
        stroke(20, 0, 0);
        strokeWeight(5);
        noFill();
        rect(width - 300, 0, width, height);
        fill(0);
        textSize(30);
        strokeWeight(0);
        text("Score: " + score, 20, 50);
	    // var testVar = mouseX + ", " + mouseY;        
        // text(testVar, 100, 100);

        for (var i = 0; i < this.items.length; i++) {
            this.items[i].update();
        }
    }
}