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
}

function draw() {
  background(240);
  decodingBook();

  wordLetters();
  codedWord();
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

function codedWord() {
  let a = 0;
  for (let i = 0; i < mysteryWord.length; i++) {
    let angle = myWord[i].twelfth * i;
    helpLine(angle, myWord[i]);
    myWord[i].update(width / 4, height / 2, angle);

    push();
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    translate(width / 4, (height / 3) * 2);
    text(`${myWord[i].letter}`, 0 + a, 0);
    pop();

    a += 20;
  }
}

function helpLine(angle, word) {
  push();
  stroke(255, 0, 0, 50);
  translate(width / 4, height / 2);
  rotate(angle);
  line(0, 0, 0, -word.size / 2);
  pop();

  push();
  stroke(255, 0, 0, 50);
  translate(width / 4, height / 2);
  rotate(angle + word.twelfth);
  line(0, 0, 0, -word.size / 2);
  pop();
}

function wordLetters() {
  // the 12 parts
  for (let j = 0; j < mysteryWord.length; j++) {
    for (let i = 0; i < letters.length; i++) {
      let wordLetter = mysteryWord.charAt(j);

      if (letters[i].letter === wordLetter) {
        myWord.push(letters[i]);
      }
    }
  }
}
