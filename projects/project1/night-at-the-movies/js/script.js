/**
Night at the Movies
Mathilde Davan
*/

"use strict";

let words = undefined;

let state = undefined;

function preload() {
  words = loadJSON(`assets/json/words.json`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);

  state = new Decoding();

  state.setup(words);

  // Is annyang available
  if (annyang) {
    // Create the guessing command
    let commands = {
      // "*letter": guessLetter,
      "*word": guessWord,
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
    annyang.debug();

    // btw you can use annyang.trigger(`___`) in the console if you don't want to talk
  }
}

function draw() {
  state.update();
}

/**
stores the decoder's guess in the "mysteryWord.visibleWord" and converts it to lower case
*/
function guessWord(word) {
  state.mysteryWord.visibleWord = word.toLowerCase();
}

function keyPressed() {
  state.keyPressed();
}
