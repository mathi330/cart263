class Bubble {
  constructor(colors) {
    this.x = random(width);
    this.y = height;
    this.size = random(80, 100);
    this.vx = 0;
    this.vy = -2;

    this.fillOptions = colors;
    this.alpha = 150;
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
    fill(this.fillOptions, this.alpha);
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
