/**

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
    // this.visibility = false;
  }

  update() {
    this.display();
  }

  overlap() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    push();
    image(this.image, this.x, this.y, this.size, this.size);
    stroke(0, this.line.alpha);
    strokeWeight(this.line.strokeWeight);
    line(this.line.x1, this.line.y1, this.line.x2, this.line.y2);
    pop();
  }
}
