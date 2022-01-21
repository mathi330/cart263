/**
Class for the sausage dog.
Inherits from the animal class.
*/
class SausageDog extends Animal {
  constructor(x, y, image) {
    super(x, y, image); // same as the animal's constructor

    this.found = false; // was the dog found or not
    this.rotationSpeed = 0.2; // rotation speed for when the dog is found
    this.growthSpeed = 0.01; // speed at which the dog grows when found
  }

  /**
  update()

  displays and keeps up to date the sausage dog's display
  */
  update() {
    super.update(); // same as the animal's update
    // if the sausage dog is found
    if (this.found) {
      // make the sausage dog rotate according to its original tilt
      // if the sausage dog is tilting to the left
      if (this.angle < 0) {
        this.angle -= this.rotationSpeed; // rotate counter clockwise
      }
      // if the sausage dog is tilting to the right
      else {
        this.angle += this.rotationSpeed; // rotate clockwise
      }

      // makes the sausage dog become bigger
      // if the scale of the width is negative:
      if (this.width < 0) {
        this.width -= this.growthSpeed; // substract the growthSpeed (to prevent distortion)
      } else {
        this.width += this.growthSpeed; // add the growthSpeed
      }
      // make it grow in height too so it keeps the same ratio
      this.height += this.growthSpeed;
    }
  }

  /**
  mousePressed()

  sees if the mouse and the sausage overlap when clicking
  */
  mousePressed() {
    // if the sausage dog was not already found
    if (!this.found && this.overlap(mouseX, mouseY)) {
      this.found = true; // set the found parameter to true
      return true; // returns true if yes
    } else {
      return false; // returns false if no
    }
  }
}
