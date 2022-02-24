/**
The state for the intro page of the decoding
*/
class Intro extends State {
  constructor() {
    super();
    this.text = [
      `Arrival`,
      `by Mathilde Davan`,
      ``,
      `This project is a decoding game inspired by the movie Arrival directed by Denis Villeneuve.`,
      ``,
      `When a word coded in an alien language appears, you, a talented linguist is asked to decode it by
with the help of the decoding book left by your predecessor, Dr. Louise Banks.`,
      `You can say your guess and if you were right, the word will appear in black, else it will be red.`,
      `If you need help, just say HELP and a hint will appear.`,
      `To decode a new word, say NEXT.`,
      ``,
      `Say START to begin your journey!`,
    ];
    this.textSizes = [50, 15, 1, 20, 1, 20, 20, 20, 20, 1, 30];
  }

  update() {
    background(0);

    for (let i = 0; i < this.text.length; i++) {
      this.introTextDisplay(
        this.text[i],
        this.textSizes[i],
        (height / 15) * (i + 2)
      );
    }
  }

  introTextDisplay(txt, size, yPos) {
    push();
    fill(255);
    textFont(myFontBold);
    textSize(size);
    textAlign(CENTER, CENTER);
    text(txt, width / 2, yPos);
    pop();
  }

  changeState() {
    state = new Decoding();
  }
}
