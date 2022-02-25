/**
the class that contains and creates the letters in the alien language
*/
class Letter {
  constructor(letter) {
    this.letter = letter; // letter associated to the symbol

    this.twelfth = HALF_PI / 3; // a twelfth of a circle
    this.size = 200; // size of the alien language

    this.rotation = PI + HALF_PI;

    // design of the letter
    this.numDesign = Math.ceil(random(15)); // number of small circles

    this.designs = []; // array to store the individual circles of a letter
    this.distRadius = random(3, 20);
    let possiblePos = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]; // positions for the circles on the twelfth
    // create the design of the letter
    for (let i = 0; i < this.numDesign; i++) {
      this.designs.push({
        radius: random(
          this.size / 2 - this.distRadius,
          this.size / 2 + this.distRadius
        ), // place the little circle at a random distance from the outline of the circle
        pos: random(possiblePos), // position in the twelfth
        designSize: random(3, 13), // size of the small circle
      });
    }
  }

  /**
  update the decoding book's letters
  */
  updateBook(x, y, angle) {
    this.display(x, y, angle); // display the alien letters
    this.letterDecodingBook(x, y); // display the english letters associated with the alien letter
  }

  /**
  update and display the alien letters
  */
  update(x, y, angle) {
    this.display(x, y, angle);
  }

  /**
  display the alien letters
  */
  display(x, y, angle) {
    push();
    translate(x, y); // position the letter
    rotate(angle); // rotate the letter accordingly

    // line of the letter
    stroke(0);
    noFill();
    strokeWeight(0.5); // thin line
    arc(0, 0, this.size, this.size, this.rotation, -this.twelfth * 2);

    // points of the letter
    rotate(this.rotation);
    this.designElements();
    pop();
  }

  /**
  the english letters corresponding to the alien letters in the decoding book
  */
  letterDecodingBook(x, y) {
    push();
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER); // centered
    translate(x - 30, y - this.size / 2); // place them on the left of the alien letter
    text(`${this.letter} :`, 0, 0); // the text is the letter associated with this letter
    pop();
  }

  /**
  display the designs of the alien letters
  */
  designElements(angle) {
    // display all the circles of the letter
    for (let i = 0; i < this.designs.length; i++) {
      let design = this.designs[i];
      push();
      fill(0); // black
      noStroke();
      rotate(this.twelfth * angle); // place it according to the position of the letter
      rotate(this.twelfth * design.pos); // place it according to its position in the letter
      translate(design.radius, 0); // position it according to the radius of the circle and its distance from it
      ellipse(0, 0, design.designSize); // draw the ellipse
      pop();
    }
  }
}
