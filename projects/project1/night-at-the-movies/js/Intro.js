/**
The state for the intro page
*/
class Intro extends State {
  constructor() {
    super();
    // an array that contains all the text for the introduction
    this.text = [
      `Arrival`,
      `by Mathilde Davan`,
      ``,
      `This project is a decoding game inspired by the movie Arrival directed by Denis Villeneuve.`,
      ``,
      `When a word coded in an alien language appears, you, a talented linguist is asked to translate it
with the help of the decoding book left by your predecessor, Dr. Louise Banks.`,
      `You can say your guess and if you were right, the word will appear in black, else it will be red.`,
      `If you need help, just say HELP and a hint will appear.`,
      `To decode a new word, say NEXT.`,
      ``,
      `Say START to begin your journey!`,
    ];
    // an array that contains all the different sizes for the different texts
    this.textSizes = [50, 15, 1, 20, 1, 20, 20, 20, 20, 1, 30];
  }

  /**
  display and update the state's visual
  */
  update() {
    background(0); // black background

    // loop to display all the texts
    for (let i = 0; i < this.text.length; i++) {
      super.introTextDisplay(
        this.text[i], // the text at the array's position
        this.textSizes[i], // the appropriate size for that text
        width / 2, // placed in the middle of the canvas
        (height / 15) * (i + 2), // start at the top and goes down for every new text
        color(240, 240, 255), // text in light blue
        CENTER // centered
      );
    }
  }

  /**
  change state to Decoding
  */
  changeState() {
    state = new Decoding();
  }
}
