class Letter {
  constructor(letter) {
    this.letter = letter;
    this.x = undefined;
    this.y = undefined;
    this.twelfth = HALF_PI / 3;
    this.size = 150;

    // design of the letter
    this.rotation = PI + HALF_PI;
    this.numDesign = Math.ceil(random(5));

    this.designs = [];
    let possiblePos = [0.2, 0.5, 0.8];
    for (let i = 0; i < this.numDesign; i++) {
      this.designs.push({
        radius: random(this.size / 2 - 10, this.size / 2 + 10),
        pos: random(possiblePos),
        designSize: random(5, 10),
      });
    }
  }

  updateBook(x, y, angle) {
    this.display(x, y, angle);
    this.letterDecodingBook(x, y);
  }

  update(x, y, angle) {
    this.display(x, y, angle);
  }

  designElements(angle) {
    for (let i = 0; i < this.designs.length; i++) {
      let design = this.designs[i];
      push();
      fill(0);
      noStroke();
      translate(this.x, this.y);
      rotate(this.twelfth * angle);
      rotate(this.twelfth * design.pos);
      translate(design.radius, 0);
      ellipse(0, 0, design.designSize);
      pop();
    }
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
    rotate(this.rotation);
    this.designElements();
    pop();
  }

  letterDecodingBook(x, y) {
    push();
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    translate(x - 30, y - this.size / 2);
    text(`${this.letter} :`, 0, 0);
    pop();
  }
}
