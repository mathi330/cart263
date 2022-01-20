class Button {
  constructor(x, y, fillcolor, text) {
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 40;
    this.fill = fillcolor;
    this.fillHover = 150;
    this.text = text;
    this.radius = 20;
  }

  update() {
    this.display();
  }

  overlap() {
    if (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2
    ) {
      return true;
      // this.hover = true;
    } else {
      return false;
      // this.hover = false;
    }
  }

  hoverChangeButtonColor() {
    if (this.overlap()) {
      fill(this.fill);
    } else {
      fill(0);
    }
  }

  hoverChangeTextColor() {
    if (this.overlap()) {
      fill(0);
    } else {
      fill(this.fill);
    }
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();
    this.hoverChangeButtonColor();
    rect(this.x, this.y, this.width, this.height, this.radius);

    //text inside the button
    this.hoverChangeTextColor();
    textFont(`Indie Flower`);
    textAlign(CENTER, CENTER);
    textSize(25);
    text(this.text, this.x, this.y);
    pop();
  }

  mousePressed() {
    if (this.overlap()) {
      return true;
    } else {
      return false;
    }
  }
}
