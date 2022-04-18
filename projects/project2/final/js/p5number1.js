function setup() {
  let ellipseSize = 10;

  let canvas = createCanvas(200, 200);
  canvas.parent(`type-of-clue1`);

  background(0, 0, 0);
  fill(0, 255, 255);
  ellipse(0 + ellipseSize, 0 + ellipseSize, ellipseSize);
  ellipse(0 + ellipseSize, height - ellipseSize, ellipseSize);
  ellipse(width - ellipseSize, height - ellipseSize, ellipseSize);
  ellipse(width - ellipseSize, 0 + ellipseSize, ellipseSize);
}
