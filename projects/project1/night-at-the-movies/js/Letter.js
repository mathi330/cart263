class Letter {
  constructor(letter) {
    this.letter = letter;
    this.x = undefined;
    this.y = undefined;
    this.twelfth = HALF_PI / 3;
    this.size = 150;

    // design of the letter
    this.numDesign = 1;
    this.radius = random(this.size / 2 - 10, this.size / 2 + 10);
    this.rotation = PI + HALF_PI;
    this.designs = [];
    this.designSize = random(5, 10);
  }

  designElements(angle) {
    push();
    fill(255, 0, 0);
    noStroke();
    translate(this.x, this.y);
    rotate(this.twelfth * angle);
    translate(this.radius, 0);
    ellipse(0, 0, this.designSize);
    pop();
  }

  display(x, y, angle) {
    push();
    // black line
    translate(x, y);
    noFill();
    stroke(0);
    rotate(angle);
    arc(0, 0, this.size, this.size, this.rotation, -this.twelfth * 2);

    // points
    fill(0);
    rotate(this.rotation);
    translate(this.radius, 0);
    ellipse(0, 0, this.designSize);
    pop();
  }
}
