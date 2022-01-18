class SausageDog extends Animal {
  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.25;
  }

  update() {
    super.update();
    if (this.found) {
      // makes the sausage dog rotate according to its original tilt
      if (this.angle < 0) {
        this.angle -= this.rotationSpeed;
      } else {
        this.angle += this.rotationSpeed;
      }
    }
  }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}
