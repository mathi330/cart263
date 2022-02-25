/**
The state for the decoding game
*/
class Decoding extends State {
  constructor() {
    super();

    // instructions
    this.text = [
      `START: go to starting page`,
      `HELP: show/hide hint`,
      `NEXT: new word`,
    ];
    this.title = `Decoding Book`;
    this.textSizes = [15, 15, 15, 25]; // size of the instructions

    // the letters from the Letter class
    this.alphabet = [
      `a`,
      `b`,
      `c`,
      `d`,
      `e`,
      `f`,
      `g`,
      `h`,
      `i`,
      `j`,
      `k`,
      `l`,
      `m`,
      `n`,
      `o`,
      `p`,
      `q`,
      `r`,
      `s`,
      `t`,
      `u`,
      `v`,
      `w`,
      `x`,
      `y`,
      `z`,
    ];
    this.letters = [];

    // mystery word
    this.myWord = [];
    this.mysteryWord = {
      word: undefined, // word
      hiddenWord: undefined, // a string of underscores
      visibleWord: ``, // what you see displayed as the word
      underscore: `_ `, // used to create the hidden word
    };

    // help lines
    this.helpLineColor = {
      r: 255,
      g: 0,
      b: 0,
      a: 0,
    };
  }

  /**
  setup for the state. Called every time a new letter is chosen and when the decoder arrives in the state
  */
  setup(word) {
    this.letters = []; // empty the letters' array

    this.myWord = []; // empty the myWord's array
    this.mysteryWord = {
      word: undefined,
      hiddenWord: undefined,
      visibleWord: ``,
      underscore: `_ `,
    }; // reset the mystery word

    this.helpLineColor.a = 0; // reset the alpha value of the lines to 0

    this.mysteryWord.word = random(word.commonWords); // choose a random word
    // re-choose a word if the chosen word is too long or too short
    while (
      this.mysteryWord.word.length < 5 ||
      this.mysteryWord.word.length > 12
    ) {
      this.mysteryWord.word = random(word.commonWords);
    }
    // console.log(this.mysteryWord.word);

    // create all the letters of the alphabet in the alien language
    for (let i = 0; i < this.alphabet.length; i++) {
      let letter = new Letter(this.alphabet[i]);
      this.letters.push(letter);
    }

    this.wordLength(); // count the length of the mystery word
  }

  /**
  function to count the length of the mystery word and transform it into a string of the appropriate number of underscores
  */
  wordLength() {
    // empty the visible and hidden word variables
    this.mysteryWord.visibleWord = ``;
    this.mysteryWord.hiddenWord = ``;
    // for loop to transform the word into a same number of underscores
    for (let i = 0; i < this.mysteryWord.word.length; i++) {
      this.mysteryWord.hiddenWord += this.mysteryWord.underscore; // add an underscore for each letter
    }
    // make the word hidden
    this.mysteryWord.visibleWord = `${this.mysteryWord.hiddenWord}`;
  }

  /**
  update the visual of the decoding state
  */
  update() {
    background(240, 240, 255); // light blue

    this.allText(); // display the instructions

    this.decodingBook(); // the symbols and their corresponding letter

    this.wordLetters();
    this.codedWord(); // display the encoded word and the decoder's guess under
  }

  /**
  display the instructions of this state
  */
  allText() {
    // write the instructions
    for (let i = 0; i < this.text.length; i++) {
      super.introTextDisplay(
        this.text[i],
        this.textSizes[i],
        width / 25, //left of the canvas
        (height / 15) * (i * 0.5 + 0.8), // top of the canvas
        0, // text in black
        LEFT // aligned on the left
      );
    }

    // write the name of the book for the translation
    super.introTextDisplay(
      this.title,
      this.textSizes[this.textSizes.length - 1],
      (width / 8) * 5.5, // middle of the right half of the canvas
      (height / 15) * 0.8, // top of the canvas
      0, // text in black
      CENTER // centered
    );
  }

  /**
  The "Decoding Book" on the right of the canvas for the decoder to know what letter corresponds to what design
  */
  decodingBook() {
    let a = 4; // number of column
    let b = 2.5; // number of row

    // for each letter of the alphabet
    for (let i = 0; i < this.letters.length; i++) {
      // if the letter is not yet at the end of the canvas
      if (a < 7) {
        // place the letter at the coordiantes
        this.letters[i].updateBook(
          (width / 8) * a,
          ((height + 150) / 10) * b,
          0
        );
        // go to the next column for the next letter
        a++;
      }
      // if the letter's x position is at the end of the canvas
      else if (a === 7) {
        // place the letter at that position
        this.letters[i].updateBook(
          (width / 8) * a,
          ((height + 150) / 10) * b,
          0
        );
        // go back to the first column
        a = 4;
        // go down one row
        b++;
      }
    }
  }

  /**
  determining the order in which the letters appear in the encoded word
  */
  wordLetters() {
    // look at the mystery word's letters
    for (let i = 0; i < this.mysteryWord.word.length; i++) {
      // look at the letters from the alphabet
      for (let j = 0; j < this.letters.length; j++) {
        // look at the letter that is at position j in the mystery word
        let letterAtPos = this.mysteryWord.word.charAt(i);

        // See if the letter from the word is the same as the one from the alphabet
        if (this.letters[j].letter === letterAtPos) {
          // if yes push the information of the Letter class associated with that letter
          this.myWord.push(this.letters[j]);
        }
      }
    }
  }

  /**
  The circle corresponding to the word and the decoder's guess under
  */
  codedWord() {
    // for loop to get through all the letters of the mystery word
    for (let i = 0; i < this.mysteryWord.word.length; i++) {
      // let start = i * this.wordStart;
      let angle = this.myWord[i].twelfth * i; // the angle by which the arc needs to be rotated

      // display the help lines (placed before the letter)
      this.helpLineUpdate(angle, this.myWord[i]);

      // for the last line (after the last letter)
      if (i === this.mysteryWord.word.length - 1) {
        // display a new line and rotate it one twelfth more that the one for the last letter
        this.helpLineUpdate(this.myWord[i].twelfth * (i + 1), this.myWord[i]);
      }
      this.myWord[i].update(width / 4, height / 2, angle); // display each letter of the encoded word

      // the guess of the decoder written under the coded version of the word
      push();
      textFont(myFont); // Montserrat font
      textSize(20);
      textAlign(CENTER, CENTER); // centered
      translate(width / 4, (height / 5) * 4); // placing it under the code
      this.displayAnswer(); // displays the decoder's guess in red if it is wrong and black if it is correct
      pop();
    }
  }

  /**
  display the help lines that separate the code into individual letters
  */
  helpLineUpdate(angle, word) {
    push();
    stroke(
      this.helpLineColor.r,
      this.helpLineColor.g,
      this.helpLineColor.b,
      this.helpLineColor.a
    );
    translate(width / 4, height / 2); // place the line
    rotate(angle); // rotate the line according to the letter
    line(0, 0, 0, -word.size / 2); // draw the line
    pop();
  }

  /**
  Display the decoder's answer in red if incorrect and black if correct
  */
  displayAnswer() {
    // if the guess is correct
    if (this.mysteryWord.visibleWord === this.mysteryWord.word) {
      fill(0); // make it appear in black
    }
    // if the guess is incorrect
    else if (
      this.mysteryWord.visibleWord !== this.mysteryWord.word &&
      this.mysteryWord.visibleWord !== this.mysteryWord.hiddenWord // the hidden version of the word
    ) {
      fill(255, 0, 0); // make it appear in red
    }
    // display the guess
    text(`${this.mysteryWord.visibleWord}`, 0, 0);
  }

  /**
  help line appear/disappear (called in the main script)
  */
  helpLine() {
    // if the help lines are invisible
    if (this.helpLineColor.a === 0) {
      // make them visible
      this.helpLineColor.a = 50;
    } else {
      // if they are visible, make them invisible
      this.helpLineColor.a = 0;
    }
  }

  /**
  change the state to the intro state
  */
  changeState() {
    state = new Intro();
  }
}
