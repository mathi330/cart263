/**
Super class for the states
*/
class State {
  // both
  constructor() {}
  setup() {}
  update() {
    // for (let i = 0; i < txt.length; i++) {
    // this.introTextDisplay(txt, txtSize, xPos, yPos, color, smth);
    // }
  }
  changeState() {}

  // Decoding state
  decodingBook() {}
  codedWord() {}
  helpLineUpdate() {}
  wordLetters() {}
  wordLength() {}
  displayAnswer() {}

  introTextDisplay(txt, size, xPos, yPos, color, smth) {
    push();
    fill(color);
    textFont(myFontBold);
    textSize(size);
    textAlign(smth, CENTER);
    text(txt, xPos, yPos);
    pop();
  }
}
