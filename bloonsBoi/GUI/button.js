class Button {
  constructor(x, y, width, height, text, fn) {
    this.pos = createVector(x, y);
    this.width = width;
    this.height = height;
    this.text = text;
    this.fn = fn;
  }

  draw() {
    fill(0, 100, 255);
    rect(this.pos.x, this.pos.y, this.width, this.height);
    text(this.text, this.pos.x, this.pos.y);
  }
}