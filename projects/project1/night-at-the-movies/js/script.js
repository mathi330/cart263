/**
Night at the Movies
Mathilde Davan

A game/simulation where the "player" decodes an alien language by saying their guess.
This program uses annyang and JSON data.
The decoder can go through the program without ever touching their keyboard simply by talking to the program.
*/

"use strict";

// my fonts
let myFont = undefined;
let myFontBold = undefined;

// random word
let words = undefined;
// state (Intro, Decoding)
let state = undefined;

/**
preload fonts and JSON data
*/
function preload() {
  myFont = loadFont(`assets/fonts/Montserrat-ExtraLight.ttf`);
  myFontBold = loadFont(`assets/fonts/Montserrat-Medium.ttf`);
  words = loadJSON(`assets/json/words.json`);
}

/**
setup for the program:
 - canvas size of window
 - angle calculated in radians
 - set state to the introduction
 - setup mystery word
 - setup annyang
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);

  // start with the intro state
  state = new Intro();

  mySetup();

  // Is annyang available
  if (annyang) {
    // Create the guessing command
    let commands = {
      "*word": guessWord,
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
    annyang.debug();
  }
}

/**
setup the word everytime a new word needs to be chosen
*/
function mySetup() {
  state.setup(words);
}

/**
display the state's visual
*/
function draw() {
  state.update();
}

/**
tells annyang what to do depending on the word said
*/
function guessWord(word) {
  // the decoder's guess
  if (
    word.length < 13 &&
    word !== `help` &&
    word !== `start` &&
    word !== `next`
  ) {
    // set the word to its lower case version
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
