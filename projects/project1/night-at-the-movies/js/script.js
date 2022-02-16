/**
Night at the Movies
Mathilde Davan

*/

"use strict";

// let twelfth = undefined;
let numParts = 12;
let chooseRedPosition = undefined;

let letter;

let words = undefined;
let niceWords = undefined;
let mysteryWord = undefined;

function preload() {
  words = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/words/common.json`
  );
  // not sure if I'll use it yet but here just in case
  niceWords = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/words/encouraging_words.json`
  );
}

// let size = 150;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);

  mysteryWord = random(words.commonWords);
  console.log(mysteryWord);

  // twelfth = HALF_PI / 3;

  letter = new Letter(width / 2, height / 2);

  chooseRedPosition = Math.floor(random(12));
}

function draw() {
  background(220);

  // the 12 parts
  for (let i = 0; i < mysteryWord.length; i++) {
    fill(255, 0, 0);
    noStroke();
    letter.display(letter.twelfth * i);
  }
}

function parts(angle) {
  stroke(220);
  fill(255);
  rotateTwelfth(angle);
}

function mousePressed() {
  chooseRedPosition = Math.floor(random(12));
}
