/**
Bubble Popper
Mathilde Davan

A program to pop bubbles with our finger.
*/

"use strict";

// current state of the program
let state = `loading`; // loading and running

// the user's webcam
let video = undefined;
// handpose models
let handpose = undefined;
// the current predictions
let prediction = [];

// the bubble
let bubble = undefined;

/**
Description of setup
*/
function setup() {
  createCanvas(640, 480);

  // Access user's webcam
  video = createCapture(VIDEO);
  video.hide();

  // load the handpose model
  handpose = ml5.handpose(
    video,
    {
      flipHorizontal: true,
    },
    function () {
      state = `running`;
      // console.log(`Model loaded.`);
    }
  );

  // listen for predictions
  handpose.on(`predict`, function (results) {
    console.log(results);
    prediction = results;
  });

  // The bubble
  bubble = {
    x: random(width),
    y: height,
    size: random(80, 100),
    vx: 0,
    vy: -2,
  };
}

/**
Description of draw()
*/
function draw() {
  if (state === `loading`) {
    loading();
  } else if (state === `running`) {
    running();
  }
}

/**
Display a text saying that the program is loading
*/
function loading() {
  background(255);

  push();
  textSize(25);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading...`, width / 2, height / 2);
  pop();
}

/**
Display what happens when the program is running 
*/
function running() {
  background(0);

  if (prediction.length > 0) {
    let hand = prediction[0];
    let index = hand.annotations.indexFinger;
    let tipX = index[3][0];
    let tipY = index[3][1];
    let baseX = index[0][0];
    let baseY = index[0][1];

    displayPin(baseX, baseY, tipX, tipY);

    // check bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    // if the tip of the pin is inside the bubble, reset the bubble
    if (d < bubble.size / 2) {
      resetBubble();
    }
  }

  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  // if the bubble reaches the top of the canvas, reset the bubble
  if (bubble.y < -bubble.size / 2) {
    resetBubble();
  }

  displayBubble();
}

/**
reset the bubble's x and y coordinates (x random and y at the bottom of the canvas)
*/
function resetBubble() {
  bubble.x = random(width);
  bubble.y = height + bubble.size / 2;
}

/**
display the pin as a white line and a red circle for the head
*/
function displayPin(baseX, baseY, tipX, tipY) {
  // the pin
  push();
  strokeWeight(2);
  stroke(255);
  line(baseX, baseY, tipX, tipY);
  pop();

  // the pin head
  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(baseX, baseY, 15);
  pop();
}

/**
display a purple-ish circle for the bubble
*/
function displayBubble() {
  push();
  fill(100, 0, 200, 150);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}
