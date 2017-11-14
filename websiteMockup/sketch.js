var strings = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	textSize(32);	

	var string = "This is a really inspiring quote that \nsublimates away when you think \nabout it too hard.";
	strings.push(new FadeText(width/2, (width/2)-200, height/2, string));
}

function draw() {
	background(220);
	for (var i = 0; i < strings.length; i++) {
		strings[i].checkfade(mouseX > width/2);
	}
}

function FadeText(destX, startX, textY, string) {
	this.trans = 0;
	this.textX = startX;	
	this.string = string;
	
	FadeText.prototype.checkfade = function(condition) {
		if (condition) {
			if (this.trans < 1) this.trans += 0.15;
		}
		else {
			if (this.trans > 0) this.trans -= 0.15;
		}
		this.textX = lerp(startX, destX, this.trans);	
		
		fill(100, map(this.trans, 0, 1, 0, 255));
		text(string, this.textX, textY);
	}
}

function frame() {
	strings[0].string += "HA";
}