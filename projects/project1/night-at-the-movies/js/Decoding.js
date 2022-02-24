/**
The state for the decoding game
*/
class Decoding extends State {
  constructor() {
    super();

    // let letter;
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

    this.myWord = [];
    this.mysteryWord = {
      word: undefined, // word
      hiddenWord: undefined, // a string of asterisks
      visibleWord: ``, // what you see next to the "PASSWORD:" (the actual password or the hidden version)
      underscore: `_ `, // used to create the spyProfile.invisiblePassword
    };

    this.helpLineColor = {
      r: 255,
      g: 0,
      b: 0,
      a: 0,
    };
  }

  setup(word) {
    this.letters = [];

    this.myWord = [];
    this.mysteryWord = {
      word: undefined, // word
      hiddenWord: undefined, // a string of asterisks
      visibleWord: ``, // what you see next to the "PASSWORD:" (the actual password or the hidden version)
      underscore: `_ `, // used to create the spyProfile.invisiblePassword
    };

    this.helpLineColor = {
      r: 255,
      g: 0,
      b: 0,
      a: 0,
    };

    this.mysteryWord.word = random(word.commonWords);
    while (
      this.mysteryWord.word.length < 5 ||
      this.mysteryWord.word.length > 12
    ) {
      this.mysteryWord.word = random(word.commonWords);
    }
    // console.log(this.mysteryWord.word);

    for (let i = 0; i < this.alphabet.length; i++) {
      let letter = new Letter(this.alphabet[i]);
      this.letters.push(letter);
    }

    this.wordLength();
  }

  /**
  update the visual of the decoding state
  */
  update() {
    background(240);
    super.update();
    this.decodingBook();

    this.wordLetters();
    this.codedWord();
  }

  /**
  The "Decoding Book" on the right of the canvas for the decoder to know what letter corresponds to what design
  */
  decodingBook() {
    let a = 4; // number of column
    let b = 2; // number of row

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
  The circle corresponding to the word and the decoder's guess under
  */
  codedWord() {
    // for loop to get through all the letters of the mystery word
    for (let i = 0; i < this.mysteryWord.word.length; i++) {
      let angle = this.myWord[i].twelfth * i; // the angle by which the arc needs to be rotated

      this.helpLineUpdate(angle, this.myWord[i], i);

      if (i === this.mysteryWord.word.length - 1) {
        this.helpLineUpdate(
          this.myWord[i].twelfth * (i + 1),
          this.myWord[i],
          i
        );
      }
      this.myWord[i].update(width / 4, height / 2, angle); // create each letter of the word

      // the guess of the decoder written under the coded version of the word
      push();
      textFont(myFont);
      textSize(20);
      textAlign(CENTER, CENTER);
      translate(width / 4, (height / 3) * 2); // placing it under the code
      this.displayAnswer(); // displays the decoder's guess in red if it is wrong and black if it is correct
      pop();
    }
  }

  helpLineUpdate(angle, word, i) {
    push();
    stroke(
      this.helpLineColor.r,
      this.helpLineColor.g,
      this.helpLineColor.b,
      this.helpLineColor.a
    );
    translate(width / 4, height / 2);
    rotate(angle);
    line(0, 0, 0, -word.size / 2);
    pop();
  }

  /**
  determining the order in which the letters appear in the encoded word
  */
  wordLetters() {
    // look at the mystery word's letters
    for (let j = 0; j < this.mysteryWord.word.length; j++) {
      // look at the letters from the alphabet
      for (let i = 0; i < this.letters.length; i++) {
        // look at the letter that is at position j in the mystery word
        let letterAtPos = this.mysteryWord.word.charAt(j);

        // See if the letter from the word is the same as the one from the alphabet
        if (this.letters[i].letter === letterAtPos) {
          // if yes push the information of the Letter class associated with that letter
          this.myWord.push(this.letters[i]);
        }
      }
    }
  }

  /**
  function to count the length of the password and transform it into a hidden password
  */
  wordLength() {
    // empty the visible and hidden password variables
    this.mysteryWord.visibleWord = ``;
    this.mysteryWord.hiddenWord = ``;
    // for loop to transform the visible password into a same number of asterisks
    for (let i = 0; i < this.mysteryWord.word.length; i++) {
      this.mysteryWord.hiddenWord += this.mysteryWord.underscore; // add an asterisk for each letter
    }
    // make the thing you see as your password the hidden one
    this.mysteryWord.visibleWord = `${this.mysteryWord.hiddenWord}`;
  }

  /**
  Display the current answer in red if incorrect and black if correct
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
  - space bar: help line appear/disappear
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

  changeState() {
    state = new Intro();
  }
}
