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

  ifHandDetected();

  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  // if the bubble reaches the top of the canvas, reset the bubble
  if (bubble.y < -bubble.size / 2) {
    resetBubble();
  }

  displayBubble();
}

function ifHandDetected() {
  // if the AI detects a hand
  if (prediction.length > 0) {
    let hand = prediction[0].annotations;
    // array with all the points of the hand
    let pointsOfHand = [
      [
        [hand.thumb[3][0], hand.thumb[3][1]],
        [hand.thumb[0][0], hand.thumb[0][1]],
      ],

      [
        [hand.indexFinger[3][0], hand.indexFinger[3][1]],
        [hand.indexFinger[0][0], hand.indexFinger[0][1]],
      ],

      [
        [hand.middleFinger[3][0], hand.middleFinger[3][1]],
        [hand.middleFinger[0][0], hand.middleFinger[0][1]],
      ],

      [
        [hand.ringFinger[3][0], hand.ringFinger[3][1]],
        [hand.ringFinger[0][0], hand.ringFinger[0][1]],
      ],

      [
        [hand.pinky[3][0], hand.pinky[3][1]],
        [hand.pinky[0][0], hand.pinky[0][1]],
      ],

      [[], [hand.palmBase[0][0], hand.palmBase[0][1]]],
    ];

    // display the points of the hand and make them pop bubbles when they touch them
    for (let i = 0; i < pointsOfHand.length; i++) {
      for (let j = 0; j < pointsOfHand[i].length; j++) {
        displayFinger(pointsOfHand[i][j][0], pointsOfHand[i][j][1]);
        distFingerBubble(pointsOfHand[i][j][0], pointsOfHand[i][j][1]);
      }
    }

    // display the lines of the hand
    for (let i = 0; i < pointsOfHand.length; i++) {
      // lines for fingers
      displayHand(
        pointsOfHand[i][0][0],
        pointsOfHand[i][0][1],
        pointsOfHand[i][1][0],
        pointsOfHand[i][1][1]
      );

      // lines for the palm of the hand
      let pointAfterI = i;
      pointAfterI++;
      if (pointAfterI === pointsOfHand.length) {
        pointAfterI = 0;
      }
      displayHand(
        pointsOfHand[i][1][0],
        pointsOfHand[i][1][1],
        pointsOfHand[pointAfterI][1][0],
        pointsOfHand[pointAfterI][1][1]
      );
    }
  }
}

/**
reset the bubble's x and y coordinates (x random and y at the bottom of the canvas)
*/
function resetBubble() {
  bubble.x = random(width);
  bubble.y = height + bubble.size / 2;
}

function distFingerBubble(tipX, tipY) {
  // measure distance between the tip of a finger and the center of the bubble
  let d = dist(tipX, tipY, bubble.x, bubble.y);
  // if the tip of the pin is inside the bubble, reset the bubble
  if (d < bubble.size / 2) {
    resetBubble();
  }
}

/**
display the tip of all fingers
*/
function displayFinger(x, y) {
  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(x, y, 10);
  pop();
}

/**
display the lines showing the hand
*/
function displayHand(x1, y1, x2, y2) {
  push();
  strokeWeight(2);
  stroke(255, 0, 0);
  line(x1, y1, x2, y2);
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
