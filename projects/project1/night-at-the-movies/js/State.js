/**
Super class for the states
*/
class State {
  // both
  constructor() {}
  setup() {}
  update() {}
  changeState() {}

  // Decoding state
  decodingBook() {}
  codedWord() {}
  helpLineUpdate() {}
  wordLetters() {}
  wordLength() {}
  displayAnswer() {}

  /**
  display the text of the state (used in both Intro and Decoding)
  */
  introTextDisplay(txt, size, xPos, yPos, color, smth) {
    push();
    fill(color); // color of the text
    textFont(myFontBold); //Montserrat Medium
    textSize(size); // the appropriate size
    textAlign(smth, CENTER); //centered or left aligned
    text(txt, xPos, yPos); // what text and where
    pop();
  }
}
