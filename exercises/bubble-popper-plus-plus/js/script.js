/**
Bubble Popper
Mathilde Davan


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
let bubbles = [];
let numBubbles = 1;

let miniBubbles = [];
let numMiniBubbles = 100;

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

  for (let i = 0; i < numBubbles; i++) {
    let bubble = new Bubble();
    bubbles.push(bubble);
  }
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

  // display the loading text
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

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].backDown();
    bubbles[i].displayBubble();
  }
}

function ifHandDetected() {
  // if the AI detects a hand
  if (prediction.length > 0) {
    let hand = prediction[0].annotations;

    handCreation(hand);
  }
}

/**
display the tip of all fingers
*/
function displayFinger(x, y) {
  push();
  noStroke();
  fill(255);
  ellipse(x, y, 10);
  pop();
}

/**
display the lines showing the hand
*/
function displayHand(x1, y1, x2, y2) {
  push();
  strokeWeight(2);
  stroke(255);
  line(x1, y1, x2, y2);
  pop();
}

function handCreation(hand) {
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
      for (let h = 0; h < bubbles.length; h++) {
        if (
          bubbles[h].distFingerBubble(
            pointsOfHand[i][j][0],
            pointsOfHand[i][j][1]
          )
        ) {
          for (let i = 0; i < numMiniBubbles; i++) {
            let mini = new MiniBubble();
            miniBubbles.push(mini);
          }

          for (let i = 0; i < miniBubbles.length; i++) {
            miniBubbles[i].display();
            miniBubbles[i].move();
          }
          bubbles.splice(h, 1);
          miniBubbles = [];
        }
      }
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

  // claculate the distance between one of the fingers and the palm of the hand
  let d = dist(
    pointsOfHand[3][0][0],
    pointsOfHand[3][0][1],
    pointsOfHand[5][1][0],
    pointsOfHand[5][1][1]
  );

  if (d < 50) {
    let bubble = new Bubble();
    bubbles.push(bubble);
  }
}
