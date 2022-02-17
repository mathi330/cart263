class Letter {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.twelfth = HALF_PI / 3;
    this.angle = angle;
    this.size = 150;

    // design of the letter
    this.numDesign = random(10);
    this.designs = [];
    this.designSize = random(this.size / 50, this.size / 10);
  }

  designElements() {
    for (let i = 0; i < this.numDesign; i++) {
      push();
      // ellipseMode(CORNER);
      translate(PI + HALF_PI, -this.twelfth * 2);
      noFill();
      stroke(255, 0, 0);
      rotate();
      arc(
        0,
        0,
        this.designSize,
        this.designSize,
        PI + HALF_PI,
        -this.twelfth * 2
      );
      pop();
    }
  }

  display(angle) {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(0);
    rotate(angle);
    arc(0, 0, this.size, this.size, PI + HALF_PI, -this.twelfth * 2);
    pop();
  }
}
