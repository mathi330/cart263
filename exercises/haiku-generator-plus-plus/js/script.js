/**
Haiku Generator
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let titleWords = [
  `Life`,
  `Nature`,
  `Ocean`,
  `Waves`,
  `True`,
  `Gandalf`,
  `Light`,
  `Shadow`,
  `Love`,
  `Hate`,
  `T-Shirt`,
  `Platipus`,
  `Coffee`,
  `Games`,
  `Lame`,
  // `Gandalf's Shadow T-shirt`,
  // `The Coffiest Coffee is Lame`,
  // `True Life Games`,
  // `Gandlaf's Waves`,
  // `Hate Platipus`,
  // `The Waves of Life`
];
let titleLength = 2;

let fiveSyllableLines = [
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`,
];
// I love coffee more
// I love banana
// My sis is the best
// When we went that way
// Games are lame and sane
// Tea is much better

// "Les haikus laissent place a l'interpretation"
//                                   - The best sister mentioned above
let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`,
];
// Coffee is for the coffee is for the weak one
// Life is meant to have sweetness

let title = `The`;

for (let i = 0; i < titleLength; i++) {
  let word = random(titleWords);
  title += ` ` + word;
}
console.log(title);
let titleH1 = document.getElementById(`title`);
titleH1.innerText = title;

let line1;
let line2;
let line3;

let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

setup(line1, fiveSyllableLines, line1P);
setup(line2, sevenSyllableLines, line2P);
setup(line3, fiveSyllableLines, line3P);

function setup(line, numSyllableLines, lineP) {
  line = random(numSyllableLines);
  lineP.innerText = line;
  lineP.addEventListener(`click`, lineClicked);
}

function lineClicked(event) {
  fadeOut(event.target, 1);
}

function fadeOut(element, opacity) {
  opacity -= 0.01;
  element.style[`opacity`] = opacity;

  if (opacity > 0) {
    requestAnimationFrame(function () {
      fadeOut(element, opacity);
    });
  } else {
    setNewLine(element);
    fadeIn(element, opacity);
  }
}

function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style[`opacity`] = opacity;

  if (opacity < 1) {
    requestAnimationFrame(function () {
      fadeIn(element, opacity);
    });
  }
}

function setNewLine(element) {
  if (element === line1P || element === line3P) {
    element.innerText = random(fiveSyllableLines);
  } else if (element === line2P) {
    element.innerText = random(sevenSyllableLines);
  }
}

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
