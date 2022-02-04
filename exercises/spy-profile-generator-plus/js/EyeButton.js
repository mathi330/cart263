/**
Class for the little eye icon next to the password used as a button to change the visibility of the password.
*/
class EyeButton {
  constructor(img) {
    this.image = img;
    this.x = 460;
    this.y = height - 90;
    this.size = 20;
    this.line = {
      x1: 470,
      y1: this.y - 5,
      x2: 450,
      y2: this.y + 5,
      strokeWeight: 2,
      alpha: 0,
    };
  }

  /**
  displays the eye
  */
  update() {
    this.display();
  }

  /**
  sees if the mouse is on top of the image of the eye
  */
  overlap() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size) {
      return true;
    } else {
      return false;
    }
  }

  /**
  display the eye and the line crossing the eye
  */
  display() {
    push();
    image(this.image, this.x, this.y, this.size, this.size); // image
    stroke(0, this.line.alpha); // the color and transparancy of the line
    strokeWeight(this.line.strokeWeight);
    line(this.line.x1, this.line.y1, this.line.x2, this.line.y2);
    pop();
  }
}
