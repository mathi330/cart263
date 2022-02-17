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
let numLetters = 26;
let letters = [];

let myWord = [];

let words = undefined;
let niceWords = undefined;
let mysteryWord = undefined;

function preload() {
  words = loadJSON(`assets/json/words.json`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);

  mysteryWord = random(words.commonWords);
  while (mysteryWord.length < 5 || mysteryWord.length > 12) {
    mysteryWord = random(words.commonWords);
  }
  console.log(mysteryWord);

  for (let i = 0; i < numLetters; i++) {
    let letter = new Letter(alphabet[i]);
    letters.push(letter);
  }
  // wordLetters();
}

function draw() {
  background(240);

  // the 12 parts
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < mysteryWord.length; j++) {
      // for (let k = 0; k < mysteryWord.length; k++) {
      let wordLetter = mysteryWord.charAt(j);
      // console.log(wordLetter);

      if (letters[i].letter === wordLetter) {
        myWord.push(letters[i]);
      }

      // letter.designElements(angle);
      // }
    }
  }

  for (let i = 0; i < mysteryWord.length; i++) {
    let angle = myWord[i].twelfth * i;
    myWord[i].display(width / 4, height / 2, angle);
  }
  // for (let k = 0; k < myWord.length; k++) {
  //   let angle = myWord[k].twelfth * k;
  //   fill(255, 0, 0);
  //   noStroke();
  //   myWord[k].display(width / 2, height / 2, angle);
  // }

  decodingBook();
}

/**
Information on what letters correspond to
(Not working yet)
*/
function decodingBook() {
  let a = 1;
  let a2 = 4;
  let b = 0;
  for (let i = 0; i < letters.length / 2; i++) {
    a++;
    let letter = letters[i];

    letter.display((width / 8) * a2 + i, (height / 8) * (1 + b));
    if (a < 8) {
      a2 = 4;
      b++;
    }
  }
}

function wordLetters() {
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < mysteryWord.length; j++) {
      let wordLetter = mysteryWord.charAt(j);
      let letter = letters[i];
    }
  }
}
