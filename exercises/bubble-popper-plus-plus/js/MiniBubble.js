class MiniBubble {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 20);
    this.vx = random(-15, 15);
    this.vy = -15;

    this.alpha = 100;
    this.fillOptions = [
      color(255, 99, 214, this.alpha),
      color(0, 12, 255, this.alpha),
      color(255, 247, 0, this.alpha),
      color(88, 255, 99, this.alpha),
      color(255, 72, 30, this.alpha),
    ];
    this.fillColor = random(this.fillOptions);
  }

  move() {
    // move bubble
    this.x += this.vx;
    this.y += this.vy;
  }

  display() {
    push();
    fill(this.fillColor);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
