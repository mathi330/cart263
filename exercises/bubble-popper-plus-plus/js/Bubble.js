/**
Bubbles that can be popped moving up and going back to the bottom of the canvas when they reach the top
*/
class Bubble {
  constructor() {
    this.x = random(width);
    this.y = height;
    this.size = random(50, 200);
    this.speed = 1;
    this.vx = 0;
    this.vy = random(-5, -1);

    this.alpha = 100;
    // possible colors for the bubbles
    this.fillOptions = [
      color(255, 99, 214, this.alpha),
      color(0, 12, 255, this.alpha),
      color(255, 247, 0, this.alpha),
      color(88, 255, 99, this.alpha),
      color(255, 72, 30, this.alpha),
    ];
    this.fillColor = random(this.fillOptions);
  }

  /**
  Move bubble up
  */
  move() {
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
  display a circle for the bubble
  */
  displayBubble() {
    push();
    fill(this.fillColor, this.alpha); // chosen color from the fillOptions
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

  /**
  measures the distance between the points of the hand and the bubble
  */
  distFingerBubble(tipX, tipY) {
    // measure distance between a point of the hand and the center of the bubble
    let d = dist(tipX, tipY, this.x, this.y);
    // if the tip of the pin is inside the bubble, reset the bubble
    if (d < this.size / 2) {
      this.alpha = 0;
      return true;
    }
    // if the distance between a point of the hand and the contour of the bubble (but not too far from the bubble either)
    else if (d < this.size && d > this.size / 2) {
      // see if the bubble is on the left of the hand
      if (
        (this.x < tipX && this.speed < 0) ||
        (this.x > tipX && this.speed > 0)
      ) {
        // move left
        this.vx = this.speed;
      }
      // see if the bubble is on the right of the hand
      else if (
        (this.x < tipX && this.speed > 0) ||
        (this.x > tipX && this.speed < 0)
      ) {
        // move right
        this.vx = -this.speed;
      }
    } else {
      this.vx = 0;
    }
  }
}
