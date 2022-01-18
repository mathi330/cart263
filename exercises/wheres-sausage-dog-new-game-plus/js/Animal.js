class Animal {
  constructor(x, y, image) {
    // coordinates
    this.x = x;
    this.y = y;
    // image
    this.image = image;

    // sligthly tilts each image
    this.angle = random(-0.3, 0.3);
    // chooses a random width for the image as well as which way the animal is facing (height doesn't change)
    this.width = random(-1, 1);
    // while loop to make sure that the width of the image is not too small
    while (this.width < 0.05 && this.width > -0.05) {
      this.width = random(-1, 1);
    }
  }

  update() {
    this.display();
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    scale(this.width, 1);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

  overlap(x, y) {
    if (
      mouseX > this.x - this.image.width / 2 &&
      mouseX < this.x + this.image.width / 2 &&
      mouseY > this.y - this.image.height / 2 &&
      mouseY < this.y + this.image.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
