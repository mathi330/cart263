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

  for (let i = 0; i < alphabet.length; i++) {
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
      let wordLetter = mysteryWord.charAt(j);

      if (letters[i].letter === wordLetter) {
        myWord.push(letters[i]);
      }

      // letter.designElements(angle);
    }
  }

  for (let i = 0; i < mysteryWord.length; i++) {
    let angle = myWord[i].twelfth * i;
    myWord[i].update(width / 4, height / 2, angle);
  }

  decodingBook();
}

/**
Information on what letters correspond to
*/
function decodingBook() {
  let a = 4;
  let b = 2;
  for (let i = 0; i < letters.length; i++) {
    if (a < 7) {
      letters[i].updateBook((width / 8) * a, ((height + 150) / 10) * b, 0);
      a++;
    } else if (a === 7) {
      letters[i].updateBook((width / 8) * a, ((height + 150) / 10) * b, 0);
      a = 4;
      b++;
    }
  }
}

// function wordLetters() {
//   for (let i = 0; i < letters.length; i++) {
//     for (let j = 0; j < mysteryWord.length; j++) {
//       let wordLetter = mysteryWord.charAt(j);
//       let letter = letters[i];
//     }
//   }
// }
