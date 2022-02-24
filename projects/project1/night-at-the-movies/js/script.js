/**
Night at the Movies
Mathilde Davan
*/

"use strict";

let myFont = undefined;
let myFontBold = undefined;

let words = undefined;

let state = undefined;

function preload() {
  myFont = loadFont(`assets/fonts/Montserrat-ExtraLight.ttf`);
  myFontBold = loadFont(`assets/fonts/Montserrat-Medium.ttf`);
  words = loadJSON(`assets/json/words.json`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);

  state = new Intro();

  mySetup();

  // Is annyang available
  if (annyang) {
    // Create the guessing command
    let commands = {
      // "*letter": guessLetter,
      "*word": guessWord,
      // change: changeState,
      // next: newWord,
      // debug: helpLines,
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
    annyang.debug();

    // btw you can use annyang.trigger(`___`) in the console if you don't want to talk
  }
}

function mySetup() {
  state.setup(words);
}

function draw() {
  state.update();
}

/**
tells annyang what to do depending on the word said
*/
function guessWord(word) {
  // the decoder's guess
  if (
    word.length < 12 &&
    word !== `help` &&
    word !== `start` &&
    word !== `next`
  ) {
    state.mysteryWord.visibleWord = word.toLowerCase();
  }
  // the lines to help the decoder
  if (word === `help`) {
    state.helpLine();
  }
  // to change state
  if (word === `start`) {
    state.changeState();
    // words = undefined;
    mySetup();
    state.setup(words);
  }

  if (word === `next`) {
    mySetup();
    state.setup(words);
  }
}
