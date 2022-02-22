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

  updateBook(x, y, angle) {
    this.display(x, y, angle);
    this.letterDecodingBook(x, y);
  }

  update(x, y, angle) {
    this.display(x, y, angle);
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

  letterDecodingBook(x, y) {
    push();
    fill(0);
    stroke(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    translate(x - 30, y - this.size / 2);
    text(`${this.letter} :`, 0, 0);
    pop();
  }
}
