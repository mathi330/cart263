/**
cut a circle into 12 equal parts and have a red slice be chosen randomly every time the mouse is pressed
*/

"use strict";

let twelfth = undefined;
let numParts = 12;
let chooseRedPosition = undefined;

let size = 150;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);

  twelfth = HALF_PI / 3;

  chooseRedPosition = Math.floor(random(12));
}

function draw() {
  background(220);

  // the 12 parts
  for (let i = 0; i < 12; i++) {
    parts(twelfth * i);
  }

  fill(255, 0, 0);
  noStroke();
  rotateTwelfth(twelfth * chooseRedPosition);
}

function parts(angle) {
  stroke(220);
  fill(255);
  rotateTwelfth(angle);
}

function rotateTwelfth(angle) {
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  arc(0, 0, size, size, PI + HALF_PI, -twelfth * 2, PIE);
  pop();
}

function mousePressed() {
  chooseRedPosition = Math.floor(random(12));
}
