/**
Class that contains the information for the different buttons used to naviguate
the program.
Three buttons to choose from the three levels of difficulty and one button to go
back to the starting screen once the end is reached.
*/
class Button {
  constructor(x, y, fillcolor, text) {
    // coordinates
    this.x = x;
    this.y = y;
    // width and height of the rectangular button
    this.width = 160;
    this.height = 40;
    // color (yellow, cyan, or magenta)
    this.fill = fillcolor;
    // the text in the button
    this.text = text;
    // rounding up the corners of the rectangle
    this.radius = 20;
  }

  /**
  update()

  displays and keeps up to date the button's appearance
  */
  update() {
    this.display();
  }

  /**
  overlap()

  sees if the mouse and the rectangle overlap
  */
  overlap() {
    if (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2
    ) {
      return true; // returns true if yes
    } else {
      return false; // returns false if no
    }
  }

  /**
  hoverChangeButtonColor()

  uses the overlap method to determine what color the fill and stroke of the rectangle
  should be (colored or black)
  */
  hoverChangeButtonColor() {
    // if the mouse is on the button:
    if (this.overlap()) {
      fill(this.fill); // the button is colored
      stroke(0); // the stroke is black
    }
    // if not:
    else {
      fill(0); // the button is black
      stroke(this.fill); // the stroke is colored
    }
  }

  /**
  hoverChangeTextColor()

  uses the overlap method to determine what color the fill of the text should be
  (colored or black)
  */
  hoverChangeTextColor() {
    // if the mouse is on the button:
    if (this.overlap()) {
      fill(0); // the text is black
    }
    // if not:
    else {
      fill(this.fill); // the text is colored
    }
  }

  /**
  display()

  displays the rectangle and the text composing the button
  */
  display() {
    // rectangle/button
    push();
    rectMode(CENTER);
    this.hoverChangeButtonColor(); // choose the fill and stroke taking the overlap into account
    rect(this.x, this.y, this.width, this.height, this.radius);
    pop();

    //text inside the button
    push();
    noStroke();
    this.hoverChangeTextColor(); // choose the fill taking the overlap into account
    textFont(`Indie Flower`); // font
    textAlign(CENTER, CENTER);
    textSize(25); // size
    text(this.text, this.x, this.y);
    pop();
  }

  /**
  mousePressed()

  sees if the mouse and the button overlap when clicking
  */
  mousePressed() {
    if (this.overlap()) {
      return true; // returns true if yes
    } else {
      return false; // returns false if no
    }
  }
}
