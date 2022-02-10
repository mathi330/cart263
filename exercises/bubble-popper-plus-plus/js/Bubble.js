class Bubble {
  constructor() {
    this.x = random(width);
    this.y = height;
    this.size = random(50, 200);
    this.vx = 0;
    this.vy = random(-5, -1);

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

  /**
  reset the bubbles coordinates when it hits the top of the canvas
  */
  backDown() {
    // if the bubble reaches the top of the canvas, reset the bubble
    if (this.y < -this.size / 2) {
      this.resetBubble();
    }
  }

  /**
  display a purple-ish circle for the bubble
  */
  displayBubble() {
    push();
    fill(this.fillColor, this.alpha);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }

  /**
  reset the bubble's x and y coordinates (x random and y at the bottom of the canvas)
  */
  resetBubble() {
    this.x = random(width);
    this.y = height + this.size / 2;
  }

  distFingerBubble(tipX, tipY) {
    // measure distance between the tip of a finger and the center of the bubble
    let d = dist(tipX, tipY, this.x, this.y);
    // if the tip of the pin is inside the bubble, reset the bubble
    if (d < this.size / 2) {
      this.alpha = 0;
      return true;
    }
  }
}
