/**
Night at the Movies
Mathilde Davan

  - use a web storage API to save the "language"
  - find a way to learn how o get the letters of the alphabet and "letters" array and the letters
  of the mystery word work together
*/

"use strict";

// let letter;
let alphabet = [
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
let letters = [];

let myWord = [];
let words = undefined;
let mysteryWord = {
  word: undefined, // word
  hiddenWord: undefined, // a string of asterisks
  visibleWord: ``, // what you see next to the "PASSWORD:" (the actual password or the hidden version)
  underscore: `_ `, // used to create the spyProfile.invisiblePassword
};

let helpLineColor = {
  r: 255,
  g: 0,
  b: 0,
  a: 0,
};

function preload() {
  words = loadJSON(`assets/json/words.json`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);

  mysteryWord.word = random(words.commonWords);
  while (mysteryWord.word.length < 5 || mysteryWord.word.length > 12) {
    mysteryWord.word = random(words.commonWords);
  }
  console.log(mysteryWord.word);

  for (let i = 0; i < alphabet.length; i++) {
    let letter = new Letter(alphabet[i]);
    letters.push(letter);
  }

  wordLength();
}

function draw() {
  background(240);
  decodingBook();

  wordLetters();
  codedWord();
}

/**
The "Decoding Book" on the right of the canvas for the decoder to know what letter corresponds to what design
*/
function decodingBook() {
  let a = 4; // number of column
  let b = 2; // number of row

  // for each letter of the alphabet
  for (let i = 0; i < letters.length; i++) {
    // if the letter is not yet at the end of the canvas
    if (a < 7) {
      // place the letter at the coordiantes
      letters[i].updateBook((width / 8) * a, ((height + 150) / 10) * b, 0);
      // go to the next column for the next letter
      a++;
    }
    // if the letter's x position is at the end of the canvas
    else if (a === 7) {
      // place the letter at that position
      letters[i].updateBook((width / 8) * a, ((height + 150) / 10) * b, 0);
      // go back to the first column
      a = 4;
      // go down one row
      b++;
    }
  }
}

/**

*/
function codedWord() {
  for (let i = 0; i < mysteryWord.word.length; i++) {
    let angle = myWord[i].twelfth * i;
    helpLine(angle, myWord[i]);
    myWord[i].update(width / 4, height / 2, angle);

    push();
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    translate(width / 4, (height / 3) * 2);

    text(`${mysteryWord.visibleWord}`, 0, 0);
    pop();
  }
}

/**
help lines that help the decoder separate each letter on the encoded word
*/
function helpLine(angle, word) {
  // line at the beginning of the letter
  push();
  stroke(helpLineColor.r, helpLineColor.g, helpLineColor.b, helpLineColor.a);
  translate(width / 4, height / 2);
  rotate(angle);
  line(0, 0, 0, -word.size / 2);
  pop();

  // line at the end of the letter
  push();
  stroke(helpLineColor.r, helpLineColor.g, helpLineColor.b, helpLineColor.a);
  translate(width / 4, height / 2);
  rotate(angle + word.twelfth);
  line(0, 0, 0, -word.size / 2);
  pop();
}

/**
determining the order in which the letters appear in the encoded word
*/
function wordLetters() {
  // look at the mystery word's letters
  for (let j = 0; j < mysteryWord.word.length; j++) {
    // look at the letters from the alphabet
    for (let i = 0; i < letters.length; i++) {
      // look at the letter that is at position j in the mystery word
      let letterAtPos = mysteryWord.word.charAt(j);

      // See if the letter from the word is the same as the one from the alphabet
      if (letters[i].letter === letterAtPos) {
        // if yes push the information of the Letter class associated with that letter
        myWord.push(letters[i]);
      }
    }
  }
}

/**
- space bar: help line appear/disappear
*/
function keyPressed() {
  // If the space bar is pressed
  if (keyCode === 32) {
    // if the help lines are invisible
    if (helpLineColor.a === 0) {
      // make them visible
      helpLineColor.a = 50;
    } else {
      // if they are visible, make them invisible
      helpLineColor.a = 0;
    }
  }
}

/**
function to count the length of the password and transform it into a hidden password
*/
function wordLength() {
  // empty the visible and hidden password variables
  mysteryWord.visibleWord = ``;
  mysteryWord.hiddenWord = ``;
  // for loop to transform the visible password into a same number of asterisks
  for (let i = 0; i < mysteryWord.word.length; i++) {
    mysteryWord.hiddenWord += mysteryWord.underscore; // add an asterisk for each letter
  }
  // make the thing you see as your password the hidden one
  mysteryWord.visibleWord = `${mysteryWord.hiddenWord}`;
}
