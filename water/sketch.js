let w, h;
let curr = [], prev = [];
let dampening = 0.99;
let colours = [];

function setup() {
  w = 500;
  h = 500;
  createCanvas(w, h);
  for (let i = 0; i < w; i++) {
    curr[i] = [];
    prev[i] = [];
    for (let j = 0; j < h; j++) {
      curr[i][j] = 0;
      prev[i][j] = 0;
    }
  }

  colours = [
    // {r: 255, g: 201, b: 20},
    {r: 23, g: 190, b: 187},
    {r: 228, g: 87, b: 46}];
}

function draw() {
  background(0);
  loadPixels();
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let index = (i + j * w * pixelDensity())*4;
      let val = map(curr[i][j], 0, 1, 0, 4000);
      // for (let k = 0; k < colours.length; k++) {
      //   let thresh = (k+1) / colours.length;
      //   let lastThresh = k / colours.length;
      //   if (val > thresh) {
      //     pixels[index] = map(val, lastThresh, thresh, colours[k-1] ? colours[k-1].r : 0, colours[k].r);
      //     pixels[index+1] = map(val, lastThresh, thresh, colours[k-1] ? colours[k-1].g : 0, colours[k].g);
      //     pixels[index+2] = map(val, lastThresh, thresh, colours[k-1] ? colours[k-1].rb : 0, colours[k].b);
      //   }
      // }
      pixels[index] = val * 20;
      pixels[index+1] = val * 100;
      pixels[index+2] = val * 255;

    }
  }
  updatePixels();
  
  for (let i = 1; i < w-1; i++) {
    for (let j = 1; j < h-1; j++) {  
      curr[i][j] = 
        (prev[i-1][j] +
        prev[i+1][j] +
        prev[i][j+1] +
        prev[i][j-1]) / 2 - curr[i][j];

      // curr[i][j] *= random(0.5, 1.6);
      curr[i][j] *= dampening;
    }
  }

  let temp = prev;
  prev = curr;
  curr = temp;
}

function mousePressed() {
  if (mouseX >= 1 && mouseX <= w-1 &&
      mouseY >= 1 && mouseY <= h-1)
    curr[mouseX][mouseY] = 1;
}

function mouseDragged() {
  mousePressed();
}