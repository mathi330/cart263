/**
Class for all the animals that appear in the game.
*/
class Animal {
  constructor(x, y, image) {
    // coordinates
    this.x = x;
    this.y = y;
    // image
    this.image = image;

    // tilts each image
    this.angle = random(-0.3, 0.3);
    // chooses a random width for the image as well as which way the animal is facing (height doesn't change)
    this.width = random(-1, 1);
    // while loop to make sure that the width of the image is not too small
    while (this.width < 0.06 && this.width > -0.07) {
      this.width = random(-1, 1);
    }
  }

  /**
  update()

  displays and keeps up to date the animal's appearance
  */
  update() {
    this.display();
  }

  /**
  display()

  displays the animals using the parameters from the constructor
  */
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y); // coordinates
    scale(this.width, 1); // side and width of the image
    rotate(this.angle); // inclination
    image(this.image, 0, 0); // image of the animal
    pop();
  }

  /**
  overlap()

  sees if the mouse and the animal overlap
  */
  overlap(x, y) {
    if (
      mouseX > this.x - this.image.width / 2 &&
      mouseX < this.x + this.image.width / 2 &&
      mouseY > this.y - this.image.height / 2 &&
      mouseY < this.y + this.image.height / 2
    ) {
      return true; // returns true if yes
    } else {
      return false; // returns false if no
    }
  }

  /**
  mousePressed()

  sees if the mouse and the animal overlap when clicking
  */
  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      return true; // returns true if yes
    } else {
      return false; // returns false if no
    }
  }
}
