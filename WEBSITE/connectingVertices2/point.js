class Point {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.connections = [];
	}

	update() {
		this.draw();
	}

	draw() {
		stroke(100);
		strokeWeight(2);
		//point(this.pos.x*spacing, this.pos.y*spacing);
		
		for (var i = 0; i < this.connections.length; i++) {
			if (this.connections[i].amount > 1) this.connections[i].amount = 1;
			var len = spacing*this.connections[i].amount;
			line(this.pos.x*spacing, this.pos.y*spacing,
				(this.pos.x*spacing)+this.connections[i].direction.x*len,
				(this.pos.y*spacing)+this.connections[i].direction.y*len)
		}
		
	}
}