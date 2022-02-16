class Letter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.twelfth = HALF_PI / 3;
    this.size = 150;
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
