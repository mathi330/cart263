/**
Prototype
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const loremIpsumText = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Vestibulum feugiat viverra leo, et fermentum risus gravida a.`,
  `Donec sollicitudin vitae enim nec pulvinar.`,
  `Duis sodales feugiat augue nec malesuada.`,
  `Morbi blandit vestibulum arcu tincidunt faukibus.`,
  `Aliquam pulvinar ornare sem, id blandit libero.`,
  `Donec congue neque odio, a consectetur neque sodales sit amet.`,
  `Phasellus et enim faukibus, mollis nisi sed, tincidunt mi.`,
  `Aliquam pretium diam ac odio consectetur luctus.`,
  `Sed nec pellentesque ante.`,
  `Nam eu consequat ipsum, eu facilysis justo.`,
  `Praesent interdum quam quis vulputate facilysis.`,
  `Nam ac mauris sodales, accumsan nisl eget, commodo sapien.`,
  `Phasellus ultricies commodo blandit.`,
  `Donec vehicula ultrices velit, ac placerat nibh bibendum in.`,
  `Nulla id wusto ut mazza egestas vestibulum sit amet maximus nunc.`,
  `Sed et quam ante.`,
  `Ut et mi a quam ullamcorper tristique.`,
  `Nam interdum dui vitae risus volutpat maximus.`,
  `Etiam viverra odio felis, eu lobortis ex rutrum ac.`,
  `Proin eget tortor vitae leo rutrum dignissim.`,
  `Pellentesque dolor leo, luctus id metus at, sodales porttitor eros.`,
  `Aenean euismod dapibus justo in luctus.`,
  `Integer mollis nec arcu ut fringilla.`,
  `Morbi nibh nisl, dictum nec erat in, suscipit finibus tortor.`,
  `Nam varius auctor metus, sit amet congue purus tristique id.`,
  `Proin sit amet felis malesuada nibh aliquam venenatis ut eu nisl.`,
  `Cras velit ex, sagittis quis facilysis at, condimentum vitae elit.`,
  `Donec id diam pretium, pharetra mi sit amet, pharetra sem.`,
];

let jsonFile = undefined;
let chosenWord = `a`;
let minWordLength = 6; // the minimum length the chosen word should be
let maxWordLength = 6;

// the array containing the clues
let cipherClues = [];

// the state array that keeps track of all the games' states
let state = [`game`, `game`, `game`, `game`, `game`, `game`];

// add a json file with words from which the mystery word will be taken
$.getJSON(
  `https://raw.githubusercontent.com/mathi330/cart263/main/projects/project2/final/assets/data/common.json`
).done(function data(data) {
  // function to call when the file is loaded successfully
  jsonFile = data;
  processResult(jsonFile);
});

// make the 2 dialog box open and close when the designated button is clicked
openCloseDialog(`#starting-button`, `#the-text`);
openCloseDialog(`#starting-button`, `#clue-dialog`);

/*******************************
p5 sketches for the clues

sketch where the user needs to drag and drop one of the flowers inside the home base
 *******************************/
let s1 = function (p) {
  // total number of flowers
  let numFlowers = 7;
  // array to store the flowers
  let flowers = [];

  // the homebase in which the user needs to drag the flower
  let homeBaseSize = 60;
  let homeBaseX = undefined;
  let homeBaseY = undefined;

  /*
setup()
create the canvas, set the homebase's coordinates, create the flowers
*/
  p.setup = function () {
    let canvas1 = p.createCanvas(600, 400);
    canvas1.parent(`type-of-clue1`);

    // homebase's x and y coordinates
    homeBaseX = p.random(0 + homeBaseSize / 2, p.width - homeBaseSize / 2);
    homeBaseY = p.random(0 + homeBaseSize / 2, p.height - homeBaseSize / 2);

    // for loop to create all the flowers
    for (let i = 0; i < numFlowers; i++) {
      let flower = p.createFlower(); // create a flower
      flowers.push(flower); // store the flower at the end of the flowers array
    }
  };

  /*
createFlower()
create a flower's object
*/
  p.createFlower = function () {
    let size = p.random(10, 25);
    // choose random coordinates
    let xPos = p.random(0 + size, p.width - size);
    let yPos = p.random(0 + size, p.height - size);
    // look at the distance between the homebase's center and the flower's center
    let d = p.dist(homeBaseX, homeBaseY, xPos, yPos);
    // if they are ovelapping, change the coordinates
    while (d < homeBaseSize / 2 + size) {
      xPos = p.random(0, p.width);
      yPos = p.random(0, p.height);
    }
    let flower = {
      x: xPos,
      y: yPos,
      petalSize: size,
      numPetal: 8,
      color: {
        r: p.random(100, 255),
        g: p.random(0, 100),
        b: p.random(100, 255),
      },
    };
    return flower;
  };

  /*
displayFlower()
display the flower and its petals
*/
  p.displayFlower = function (flower) {
    p.push();
    p.noFill();
    p.stroke(flower.color.r, flower.color.g, flower.color.b);

    // all the petals
    p.ellipse(
      flower.x - (flower.petalSize / 4) * 3,
      flower.y,
      flower.petalSize
    );
    p.ellipse(
      flower.x - flower.petalSize / 2,
      flower.y - flower.petalSize / 2,
      flower.petalSize
    );
    p.ellipse(
      flower.x,
      flower.y - (flower.petalSize / 4) * 3,
      flower.petalSize
    );
    p.ellipse(
      flower.x + flower.petalSize / 2,
      flower.y - flower.petalSize / 2,
      flower.petalSize
    );
    p.ellipse(
      flower.x + (flower.petalSize / 4) * 3,
      flower.y,
      flower.petalSize
    );
    p.ellipse(
      flower.x + flower.petalSize / 2,
      flower.y + flower.petalSize / 2,
      flower.petalSize
    );
    p.ellipse(
      flower.x,
      flower.y + (flower.petalSize / 4) * 3,
      flower.petalSize
    );
    p.ellipse(
      flower.x - flower.petalSize / 2,
      flower.y + flower.petalSize / 2,
      flower.petalSize
    );
    p.pop();
  };

  /*
draw()
chooses what to do depending on whether the game is finished or not
*/
  p.draw = function () {
    p.background(0, 0, 0);
    // if the state of this clue is `game`
    if (state[0] === `game`) {
      // display the homebase
      p.noFill();
      p.stroke(255, 255, 153);
      p.ellipse(homeBaseX, homeBaseY, homeBaseSize);

      // display the flowers
      for (let i = 0; i < flowers.length; i++) {
        p.displayFlower(flowers[i]);
      }
    }
    // if the game is finished
    else if (state[0] === `found`) {
      // display the clue in white, in the middle of the canvas
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.fill(255);
      p.text(`${cipherClues[0]}`, p.width / 2, p.height / 2);
      p.noLoop();
    }
  };

  /*
mouseDragged()
drags a flower
*/
  p.mouseDragged = function () {
    // for each flower
    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      // measure the distance between the center of the flower and the mouse
      let d = p.dist(flower.x, flower.y, p.mouseX, p.mouseY);

      // if the mouse is on the flower
      if (d < flower.petalSize + flower.petalSize / 2) {
        // change the flower to the mouse's coordinates
        flower.x = p.mouseX;
        flower.y = p.mouseY;
        // keep the flower inside the canvas
        flower.x = p.constrain(flower.x, 0, p.width);
        flower.y = p.constrain(flower.y, 0, p.height);
      }
    }
  };

  /*
mousePressed()
when the mouse is released with flowers on top of the homebase, look at the distance between the flower and the homebase
*/
  p.mouseReleased = function () {
    // for each flower
    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      // look at the distance between the homebase and the center of the flower
      let d = p.dist(flower.x, flower.y, homeBaseX, homeBaseY);

      // if the center of the flower is on the homebase and that flower is not the first of the flowers' array
      if (d < homeBaseSize / 2 && i !== 0) {
        // remove that flower from the array
        flowers.splice(i, 1);
      }
      // if the center of the flower is on the homebase and that flower is the first of the flowers' array
      if (d < homeBaseSize / 2 && i === 0) {
        state[0] = `found`; // change the state to found
      }
    }
  };
};
new p5(s1);

/*
code taken from pippin's class on object detection with ml5.js
the user needs to show the camera the object that from the riddle displayed on the canvas
(the program uses ml5 object detection)
*/
let s2 = function (p) {
  // Current state of program
  let clueState = `loading`; // loading, running
  // User's webcam
  let video;
  // The name of our model
  let modelName = `CocoSsd`;
  // ObjectDetector object (using the name of the model for clarify)
  let cocossd;
  // The current set of predictions made by CocoSsd once it's running
  let predictions = [];

  /*
setup()
create the canvas, start the webcam and ObjectDetector
*/
  p.setup = function () {
    let canvas2 = p.createCanvas(600, 400);
    canvas2.parent(`type-of-clue2`);

    if (state[1] === `game`) {
      // Start webcam and hide the resulting HTML element
      video = p.createCapture(p.VIDEO);
      video.hide();

      // Start the CocoSsd model and when it's ready start detection
      // and switch to the running state
      cocossd = ml5.objectDetector("cocossd", {}, function () {
        // Ask CocoSsd to start detecting objects, calls gotResults
        // if it finds something
        cocossd.detect(video, p.gotResults);
        // Switch to the running state
        clueState = `running`;
      });
    }
  };

  /*
gotResults()
Called when CocoSsd has detected at least one object in the video feed
*/
  p.gotResults = function (err, results) {
    // If there's an error, report it
    if (err) {
      console.error(err);
    }
    // Otherwise, save the results into our predictions array
    else {
      predictions = results;
    }
    // Ask CocoSsd to detect objects again so it's continuous
    cocossd.detect(video, p.gotResults);
  };

  /*
draw()
Handles the two states of the program: loading, running,
and looks at the overall state (game and found), and decides what to do
*/
  p.draw = function () {
    // if the state of this clue is `game`
    if (state[1] === `game`) {
      // if the clue state is loading
      if (clueState === `loading`) {
        p.loading(); // execute the loading function
      }
      // if the state is running
      else if (clueState === `running`) {
        p.running(); // execute the running function
      }
    }
    // if the game is finished
    else if (state[1] === `found`) {
      video.remove(); // remove the videa
      p.background(0, 0, 0); // set background to black
      // display the clue in white, in the middle of the canvas
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.fill(255);
      p.text(`${cipherClues[1]}`, p.width / 2, p.height / 2);
      p.noLoop();
    }
  };

  /*
loading()
Displays a simple loading screen with the loading model's name
*/
  p.loading = function () {
    p.background(255); // black background

    // display the text "Loading...", in white and centered
    p.push();
    p.textSize(32);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Loading...`, p.width / 2, p.height / 2);
    p.pop();
  };

  /*
running()
Displays the webcam.
If there are currently objects detected it outlines them and labels them
with the name and confidence value.
*/
  p.running = function () {
    // Display the webcam
    p.image(video, 0, 0, p.width, p.height);
    p.background(255, 100); // whaite and slightly transparent background

    // Check if there currently predictions to display
    if (predictions) {
      // If so run through the array of predictions
      for (let i = 0; i < predictions.length; i++) {
        // Get the object predicted
        let object = predictions[i];
        // Highlight it on the canvas
        p.highlightObject(object);

        // if the person shows a book
        if (object.label === `book`) {
          state[1] = `found`; // change the overall state to found
        }
      }

      // on top of the video feed, show this riddle, in black and centered
      p.push();
      p.textSize(18);
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(
        `  I have no voice and yet I speak to you,
  I tell of all things in the world that people do.
  I have leaves, but I am not a tree,
  I have pages, but I am not a bride or royalty.
  I have a spine and hinges, but I am not a man or a door,
  I have told you all, I cannot tell you more.

  What am I?`,
        p.width / 2,
        p.height / 2
      );

      // riddle from: https://www.riddlesandanswers.com/v/233435/i-have-no-voice-and-yet-i-speak-to-you-i-tell-of-all-things-in-the-world-that-people-do-i-have-l/
      p.pop();
    }
  };

  /*
highlightObject()
Provided with a detected object it draws a box around it and includes its label
*/
  p.highlightObject = function (object) {
    // Display a box around it
    p.push();
    p.noFill();
    p.stroke(0, 255, 255);
    p.rect(object.x, object.y, object.width, object.height);
    p.pop();
    // Display the label in the center of the box
    p.push();
    p.textSize(20);
    p.textStyle(p.BOLD);
    p.fill(0, 255, 255);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(
      `${object.label}`,
      object.x + object.width / 2,
      object.y + object.height / 2
    );
    p.pop();
  };
};
new p5(s2);

/*
a game where the user has to catch all the little red squares using there arrow keys
*/
let s3 = function (p) {
  // the number of food to eat
  let numFoods = 15;
  // array to store the food
  let foods = [];

  // the circle the user can control
  let user = {
    size: 30,
    x: undefined,
    y: undefined,
    color: {
      r: 255,
      g: 255,
      b: 0,
    },
    speed: 5,
  };

  /*
setup()
create the canvas, the user's starting coordinates, the food
*/
  p.setup = function () {
    let canvas3 = p.createCanvas(600, 400);
    canvas3.parent(`type-of-clue3`);
    p.rectMode(p.CENTER);

    // the user's starting coordinates
    user.x = p.width / 2;
    user.y = p.height / 2;

    // create many pieces of food
    for (let i = 0; i < numFoods; i++) {
      let food = p.createFood(); // create a food particle
      // set its velocity to a random number
      food.vx = p.random(-food.maxSpeed, food.maxSpeed);
      food.vy = p.random(-food.maxSpeed, food.maxSpeed);
      // push the food into the foods' array
      foods.push(food);
    }
  };

  /*
createFood()
create the food object
*/
  p.createFood = function () {
    let foodSize = 10; // size of a piece
    // coordinates
    let xPos = p.random(0 + foodSize * 2, p.width - foodSize * 2);
    let yPos = p.random(0 + foodSize * 2, p.height - foodSize * 2);
    // make sure the food doesn't appear on the user
    let d = p.dist(user.x, user.y, xPos, yPos);
    while (d < user.size) {
      xPos = p.random(0 + foodSize * 2, p.width - foodSize * 2);
      yPos = p.random(0 + foodSize * 2, p.height - foodSize * 2);
    }
    let food = {
      x: xPos,
      y: yPos,
      size: foodSize,
      color: {
        r: 255,
        g: 0,
        b: 0,
      },
      maxSpeed: 2,
      vx: 0,
      vy: 0,
    };
    return food;
  };

  /*
draw()
chooses what to do depending on whether the game is finished or not
*/
  p.draw = function () {
    // if the state of this clue is `game`
    if (state[2] === `game`) {
      p.game(); // play the game function
    }
    // if the game is finished
    else if (state[2] === `found`) {
      p.background(0, 0, 0); // set background to black
      // display the clue in white, in the middle of the canvas
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.fill(255);
      p.text(`${cipherClues[2]}`, p.width / 2, p.height / 2);
      p.noLoop();
    }
  };

  /*
game()
display the food, the user, make the user move with the arrow keys, check when to change the state
*/
  p.game = function () {
    p.background(243, 230, 255);

    // arrow keys interactions with the user
    // when the right key is pressed, go right
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      user.x += user.speed;
    }
    // when the left key is pressed, go left
    else if (p.keyIsDown(p.LEFT_ARROW)) {
      user.x -= user.speed;
    }
    // when the up key is pressed, go up
    if (p.keyIsDown(p.UP_ARROW)) {
      user.y -= user.speed;
    }
    // when the down key is pressed, go down
    else if (p.keyIsDown(p.DOWN_ARROW)) {
      user.y += user.speed;
    }

    // keep the user inside the canvas
    let userX = p.constrain(user.x, 0, p.width);
    let userY = p.constrain(user.y, 0, p.height);

    // display the user with an ellipse
    p.fill(user.color.r, user.color.g, user.color.b);
    p.noStroke();
    p.ellipse(userX, userY, user.size);

    // create the pieces of food
    for (let i = 0; i < foods.length; i++) {
      let food = foods[i];

      // make the piece turn at a random frequency
      let r = p.random();
      if (r < 0.06) {
        // change the direction of the food
        food.vx = p.random(-food.maxSpeed, food.maxSpeed);
        food.vy = p.random(-food.maxSpeed, food.maxSpeed);
      }

      // add he velocity to the x and y coordinates
      food.x += food.vx;
      food.y += food.vy;

      // keep the food in the canvas
      if (food.x < 0 + food.size / 2 || food.x > p.width - food.size / 2) {
        food.vx = -food.vx;
      }
      if (food.y < 0 + food.size / 2 || food.y > p.height - food.size / 2) {
        food.vy = -food.vy;
      }

      // display the piece of food with a rectangle
      p.fill(food.color.r, food.color.g, food.color.b);
      p.noStroke();
      p.rect(food.x, food.y, food.size);

      // look at the distance between the food and the user
      let d = p.dist(user.x, user.y, food.x, food.y);
      // if they overlap
      if (d < user.size / 2 + food.size / 2) {
        // remove the food from the foods' array
        foods.splice(i, 1);
      }
    }

    // if the array is empty,
    if (foods.length <= 0) {
      state[2] = `found`; // change the state to found
    }
  };
};
new p5(s3);

/*
code partially taken from exercise slamina
the user uses annyang to guess the name of an animal
*/
let s4 = function (p) {
  // An array of animal names from
  // https://github.com/dariusk/corpora/blob/master/data/animals/common.json
  const animals = [
    "aardvark",
    "alligator",
    "alpaca",
    "antelope",
    "ape",
    "armadillo",
    "baboon",
    "badger",
    "bat",
    "bear",
    "beaver",
    "bison",
    "boar",
    "buffalo",
    "bull",
    "camel",
    "canary",
    "capybara",
    "cat",
    "chameleon",
    "cheetah",
    "chimpanzee",
    "chinchilla",
    "chipmunk",
    "cougar",
    "cow",
    "coyote",
    "crocodile",
    "crow",
    "deer",
    "dingo",
    "dog",
    "donkey",
    "dromedary",
    "elephant",
    "elk",
    "ewe",
    "ferret",
    "finch",
    "fish",
    "fox",
    "frog",
    "gazelle",
    "gila monster",
    "giraffe",
    "gnu",
    "goat",
    "gopher",
    "gorilla",
    "grizzly bear",
    "ground hog",
    "guinea pig",
    "hamster",
    "hedgehog",
    "hippopotamus",
    "hog",
    "horse",
    "hyena",
    "ibex",
    "iguana",
    "impala",
    "jackal",
    "jaguar",
    "kangaroo",
    "koala",
    "lamb",
    "lemur",
    "leopard",
    "lion",
    "lizard",
    "llama",
    "lynx",
    "mandrill",
    "marmoset",
    "mink",
    "mole",
    "mongoose",
    "monkey",
    "moose",
    "mountain goat",
    "mouse",
    "mule",
    "muskrat",
    "mustang",
    "mynah bird",
    "newt",
    "ocelot",
    "opossum",
    "orangutan",
    "oryx",
    "otter",
    "ox",
    "panda",
    "panther",
    "parakeet",
    "parrot",
    "pig",
    "platypus",
    "polar bear",
    "porcupine",
    "porpoise",
    "prairie dog",
    "puma",
    "rabbit",
    "raccoon",
    "ram",
    "rat",
    "reindeer",
    "reptile",
    "rhinoceros",
    "salamander",
    "seal",
    "sheep",
    "shrew",
    "silver fox",
    "skunk",
    "sloth",
    "snake",
    "squirrel",
    "tapir",
    "tiger",
    "toad",
    "turtle",
    "walrus",
    "warthog",
    "weasel",
    "whale",
    "wildcat",
    "wolf",
    "wolverine",
    "wombat",
    "woodchuck",
    "yak",
    "zebra",
  ];

  // The current animal name the user is trying to guess
  let currentAnimal = ``;
  // the user's answer
  let currentAnswer = ``;

  // array to store the letters of the animal' name
  let animalLetters = [];

  /*
setup()
start annyang, choose the animal, create the letters of the animal's name
*/
  p.setup = function () {
    let canvas4 = p.createCanvas(600, 400);
    canvas4.parent(`type-of-clue4`);

    // Is annyang available?
    if (annyang) {
      // Create the guessing command
      let commands = {
        "*animal": p.guessAnimal,
      };
      // Setup annyang and start
      annyang.addCommands(commands);
      annyang.start();
      annyang.debug();
    }

    // choose a random animal from the animals array
    currentAnimal = p.random(animals);

    // choose an animal's name that has at least 6 letters
    while (currentAnimal.length < 6) {
      currentAnimal = p.random(animals);
    }

    // for every letter of the word
    for (let i = 0; i < currentAnimal.length; i++) {
      let letter = currentAnimal[i];
      let myLetter = p.createLetter(letter); // create a letter
      animalLetters.push(myLetter); //push it in the letter's array
    }
  };

  /*
createLetter()
create the letter's object
*/
  p.createLetter = function (letter) {
    let theLetter = {
      x: p.random(10, p.width - 10),
      y: p.random(10, p.height - 10),
      size: 30,
      letter: letter,
    };
    return theLetter;
  };

  /*
draw()
chooses what to do depending on whether the game is finished or not
*/
  p.draw = function () {
    // if the state of this clue is `game`
    if (state[3] === `game`) {
      p.game(); // play the game function
    }
    // if the game is finished
    else if (state[3] === `found`) {
      p.background(0, 0, 0); // set background to black
      // display the clue in white, in the middle of the canvas
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.fill(255);
      p.text(`${cipherClues[3]}`, p.width / 2, p.height / 2);
      console.log(`${cipherClues[3]}`);
      p.noLoop();
    }
  };

  /*
game()
randomly places the letters of the word on the canvas, displays the user's answer in red if it is wrong
*/
  p.game = function () {
    p.background(255, 204, 204);

    // for every letter of the word
    for (let i = 0; i < animalLetters.length; i++) {
      let theLetter = animalLetters[i];

      // display the letter at a random position on the canvas
      p.push();
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(theLetter.size);
      p.text(theLetter.letter, theLetter.x, theLetter.y);
      p.pop();
    }

    // if the answer is correct
    if (currentAnswer === currentAnimal) {
      state[3] = `found`; // go to the found state
    }
    // if the answer is incorrect
    else {
      // display the user's answer in red in the middle of the canvas
      p.push();
      p.fill(255, 0, 0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.text(currentAnswer, p.width / 2, p.height / 2);
      p.pop();
    }
  };

  /*
guessAnimal()
set the answer to lower case
*/
  p.guessAnimal = function (animal) {
    currentAnswer = animal.toLowerCase();
  };
};
new p5(s4);

/*
find the kissing emoji among the winking emojis
*/
let s5 = function (p) {
  let numWinks = 120; // number of emojis winking
  let emojis = []; // array to store the emojis
  // images
  let wink = undefined;
  let kiss = undefined;
  // the kissing emoji to find
  let emojiToFind = undefined;

  // circle that follows the mouse
  let user = {
    size: 20,
    x: undefined,
    y: undefined,
    color: {
      r: 255,
      g: 0,
      b: 255,
      a: 200,
    },
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    maxSpeed: 3,
    acceleration: 0.1,
  };

  /*
preload()
preloads the images of emojis
*/
  p.preload = function () {
    wink = p.loadImage(`assets/images/wink.png`);
    kiss = p.loadImage(`assets/images/kiss-emoji.png`);
  };

  /*
setup()
create the canvas, the user's original position, the emojis
*/
  p.setup = function () {
    let canvas5 = p.createCanvas(600, 400);
    canvas5.parent(`type-of-clue5`);

    p.imageMode(p.CENTER);

    // the user's position at the start of the program
    user.x = p.mouseY;
    user.y = p.mouseX;

    // create the winking emojis
    for (let i = 0; i < numWinks; i++) {
      let emoji = p.createEmoji(wink);
      emojis.push(emoji); // add it to the emojis' array
    }

    // create the kissing emoji
    emojiToFind = p.createEmoji(kiss);
  };

  /*
createEmoji()
create the emoji's object
*/
  p.createEmoji = function (myEmoji) {
    let mySize = 30;
    // coordinates anywhere inside the canas
    let xPos = p.random(0 + mySize, p.width - mySize);
    let yPos = p.random(0 + mySize, p.height - mySize);
    let emoji = {
      x: xPos,
      y: yPos,
      size: mySize,
      img: myEmoji,
    };
    return emoji;
  };

  /*
draw()
chooses what to do depending on whether the game is finished or not
*/
  p.draw = function () {
    // if the state of this clue is `game`
    if (state[4] === `game`) {
      p.game(); // play the game function
    }
    // if the game is finished
    else if (state[4] === `found`) {
      p.background(0, 0, 0); // set background to black
      // display the clue in white, in the middle of the canvas
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.fill(255);
      p.text(`${cipherClues[4]}`, p.width / 2, p.height / 2);
      p.noLoop();
    }
  };

  /*
game()
display the emojis and user and check when to change to the found state
*/
  p.game = function () {
    p.background(0); // black background

    // for loop to go through all the winking emojis of the array
    for (let i = 0; i < emojis.length; i++) {
      let emoji = emojis[i];
      // display the emoji
      p.push();
      p.fill(255);
      p.image(wink, emoji.x, emoji.y, emoji.size, emoji.size); // display the image
      p.pop();
    }

    // display the kissing emoji
    p.push();
    p.fill(255);
    p.image(
      kiss,
      emojiToFind.x,
      emojiToFind.y,
      emojiToFind.size,
      emojiToFind.size
    ); // display the image
    p.pop();

    // display the user
    p.push();
    // acceleration depending on the position of the mouse compared to the user
    // acceleration on the x axis
    if (p.mouseX > user.x) {
      user.ax = user.acceleration;
    } else if (p.mouseX < user.x) {
      user.ax = -user.acceleration;
    }
    // acceleration on the y axis
    if (p.mouseY > user.y) {
      user.ay = user.acceleration;
    } else if (p.mouseY < user.y) {
      user.ay = -user.acceleration;
    }

    // add the acceleration to the x velocity
    user.vx += user.ax;
    user.vx = p.constrain(user.vx, -user.maxSpeed, user.maxSpeed); // constrain so the user cannot go faster than a certain speed
    // same for the y velocity
    user.vy += user.ay;
    user.vy = p.constrain(user.vy, -user.maxSpeed, user.maxSpeed); // constrain so the user cannot go faster than a certain speed

    // add the velocity to the coordinates of the user
    user.x += user.vx;
    user.x = p.constrain(user.x, 0, p.width); // constrain the x to the inside of the canvas
    user.y += user.vy;
    user.y = p.constrain(user.y, 0, p.height); // constrain the y to the inside of the canvas

    // display the user
    p.fill(user.color.r, user.color.g, user.color.b, user.color.a);
    p.noStroke();
    p.ellipse(user.x, user.y, user.size);
    p.pop();

    // find the distance between the ceter of the kiss emoji and the center of the user
    let d = p.dist(user.x, user.y, emojiToFind.x, emojiToFind.y);
    // if they are touching
    if (d < user.size / 2 + emojiToFind.size / 2) {
      state[4] = `found`; // change the state to found
    }
  };
};
new p5(s5);

/*
green and black sketch, the player has to get the canvas only one colour by clicking on it
 */
let s6 = function (p) {
  // the user's mouse
  let user = {
    x: undefined,
    y: undefined,
    size: 10,
    // magenta
    color: {
      r: 255,
      g: 0,
      b: 255,
    },
  };

  // the number of columns and rows constituting the canvas
  let numColumns = 6;
  let numRows = 4;
  // array storing the squares
  let squares = [];

  // the canvas' size
  let canvasWidth = 600;
  let canvasHeight = 400;

  // the squares' size
  let squareSize = canvasWidth / numColumns;

  let myColor = p.color(230, 255, 230); // light green
  let chooseColor = [0, myColor]; // the colors the square can be (black or light green)

  // an array storing the number of black squares
  let blackSquares = [];

  /*
setup()
create the canvas, remove the cursor, create the squares
*/
  p.setup = function () {
    let canvas6 = p.createCanvas(canvasWidth, canvasHeight);
    canvas6.parent(`type-of-clue6`);

    p.noCursor(); // remove the usual cursor

    // for loop to create squares aligned in vertical lines
    for (let i = 0; i < numColumns; i++) {
      // for loop for the number of rows
      for (let j = 0; j < numRows; j++) {
        let x = i * squareSize; // x coordinates of the square using i
        let y = j * squareSize; // y coordinates of the square using j
        let square = p.createSquare(x, y); // create a square at those coordinates
        squares.push(square); // add the square to the array
        // if the square is black
        if (square.color === chooseColor[0]) {
          blackSquares.push(square); // add it to the black square array
        }
      }
    }
  };

  /*
createSquare()
create a square object
*/
  p.createSquare = function (xPos, yPos) {
    let square = {
      x: xPos,
      y: yPos,
      width: squareSize,
      height: squareSize,
      color: p.random(chooseColor),
    };
    return square;
  };

  /*
draw()
chooses what to do depending on whether the game is finished or not, display the costumized cursor
*/
  p.draw = function () {
    user.x = p.mouseX;
    user.y = p.mouseY;

    // if the state of this clue is `game`
    if (state[5] === `game`) {
      p.game(); // play the game function
    }
    // if the game is finished
    else if (state[5] === `found`) {
      p.background(0, 0, 0); // set background to black
      // display the clue in white, in the middle of the canvas
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.fill(255);
      p.text(`${cipherClues[5]}`, p.width / 2, p.height / 2);
      p.noLoop();
    }
    // cursor
    p.noStroke();
    p.fill(user.color.r, user.color.g, user.color.b);
    p.ellipse(p.mouseX, p.mouseY, user.size);
  };

  /*
game()
display the squares and check when to change to the found state
*/
  p.game = function () {
    p.background(230); // grey background (not visible)

    // for loop to go through every square of the squares array
    for (let i = 0; i < squares.length; i++) {
      let square = squares[i];
      // create a rectangle with the square's information
      p.noStroke();
      p.fill(square.color);
      p.rect(square.x, square.y, square.width, square.height);
    }

    // if the blackSquares array is equal to 0 or the total number of square (all the squares are the same color)
    if (blackSquares.length === squares.length || blackSquares.length < 1) {
      state[5] = `found`; // set the state to found
    }
  };

  /*
mousePressed()
when clicking on a square, change its color
*/
  p.mousePressed = function () {
    // go through every square
    for (let i = 0; i < squares.length; i++) {
      let square = squares[i];
      // if the mouse is pressed on a black square
      if (
        user.x + user.size / 2 > square.x &&
        user.x - user.size / 2 < square.x + square.width &&
        user.y + user.size / 2 > square.y &&
        user.y - user.size / 2 < square.y + square.height &&
        square.color === chooseColor[0]
      ) {
        square.color = chooseColor[1]; // change its color to green
        blackSquares.splice(0, 1); // remove a square from the black sqaures' array
      }
      // if the mouse is pressed on a green square
      else if (
        user.x + user.size / 2 > square.x &&
        user.x - user.size / 2 < square.x + square.width &&
        user.y + user.size / 2 > square.y &&
        user.y - user.size / 2 < square.y + square.height &&
        square.color === chooseColor[1]
      ) {
        square.color = chooseColor[0]; // change its color to black
        blackSquares.push(square); // add it to the black squares' array
      }
    }
  };
};
new p5(s6);

/*******************************
End of p5 sketches
 *******************************/

/*******************************
clues dialog box
make the clue box into a dialog box
*******************************/
$(function () {
  $("#clue-dialog").dialog({
    autoOpen: false, // doesn't open at the start
    height: `auto`,
    width: 200,
  });
});

/*******************************
text dialog box
make the hints visible and invisible
*******************************/
// the hints start hidden
let hintHidden = true;
// set up the dialog box for the lorem ipsum text, the answer box and the hint and submit buttons
$(function () {
  $(`#the-text`).dialog({
    autoOpen: false, // doesn't open at the start
    height: 400,
    width: 500,
    // buttons
    buttons: [
      {
        text: "Hint",
        // what happens when it is clicked
        click: function () {
          // if the hints are hidden,
          if (hintHidden) {
            $(`.word`).addClass(`hint`, 1000); // make the hints visible with a smooth transition
            hintHidden = false; // set the variable to false (the hints are not hidden)
          }
          // if the hints are not hidden
          else {
            $(`.hint`).removeClass(`hint`, 1000); // make the hints invisble with a smooth transition
            hintHidden = true; // set the variable to true (the hints are hidden)
          }
        },
      },
      { text: `Submit`, click: submitAnswer }, // play the submit function when submit is clicked (verifies the answer)
    ],
  });
});

/*******************************
answer dialog box
make the answer box into a dialog box
*******************************/
$(function () {
  $("#entry-box").dialog({
    autoOpen: false, // doesn't open at the start
    height: 300,
    width: 300,

    buttons: [
      {
        text: `Submit`, // submit buttom
        click: submitAnswer, // what happens when the button is clicked
      },
    ],
  });
});

/*******************************
submitAnswer()
verifies the answer the user inputed into the answer box when the submit button is pressed
*******************************/
function submitAnswer() {
  // the user's answer
  let userAnswer = $(`#user-answer`).val();
  // if the answer is correct
  if (userAnswer === chosenWord) {
    $(`#user-answer`).val(``); // empty the answer box
    // set the border and the text color to black
    $(`#user-answer`).css({
      color: `#000000`,
      "border-color": `#000000`,
    });
    // play the ending function
    ending();
  }
  // if the answer is wrong
  else {
    $(`#user-answer`).val(`Wrong! Try again!`); // set the value of the answer box to Wrong
    // set the border and text color to red
    $(`#user-answer`).css({
      color: `#ff0000`,
      "border-color": `#ff0000`,
    });
  }
}

/**
processResult(data)
chooses a random word from the json file,
separates the word into letters and finds all the times each letter appears in the lorem ipsum text,
choose one of the positions in the text,
add the lorem ipsum text
*/
function processResult(data) {
  // choose a word that is longer than the minimum word length
  while (
    chosenWord.length < minWordLength ||
    chosenWord.length > maxWordLength
  ) {
    chosenWord =
      data.commonWords[Math.floor(Math.random() * data.commonWords.length)];
  }

  let listOfSelectedPos = []; // empty array in which the chosen positions for the letters will be put

  // for each letter of the word
  for (let i = 0; i < chosenWord.length; i++) {
    let letter = chosenWord[i];

    // list of the positions for all the times the letter appears in the lorem ipsum
    let listOfPositions = findCharacterPos(letter);
    // console.log(listOfPositions);

    // choose a random position from the listOfPositions array for this letter of the word
    let selectedPosition = Math.floor(Math.random() * listOfPositions.length);
    // add the letter and it's position in the lorem ipsum to the array for the final chosen position
    listOfSelectedPos.push([letter, listOfPositions[selectedPosition]]);

    // display the coded word on the page (the plus 1 is to start counting at 1 instead of 0 like in an array)
    let codeString = `${listOfPositions[selectedPosition][0] + 1}:${
      listOfPositions[selectedPosition][1] + 1
    }`;

    // add the code to the cipher array
    cipherClues.push(codeString);
  }

  // add the lorem ipsum text
  addLoremIpsum(listOfSelectedPos);

  // create the clues according to the chosen coordinates
  createClues();
}

/*******************************
createClues()
create the button and dialog of each clue
*******************************/
function createClues() {
  // the buttons to get to the clues
  let allCluesButtons = [];
  // the dialogs in which the clues are
  let allClues = [];

  // create a clue for every letter of the word
  for (let i = 0; i < chosenWord.length; i++) {
    // create a button
    let $buttonForClue = $(`<button></button>`);
    // create a div for the dialog
    let $newClue = $(`<div></div>`);

    // button
    $buttonForClue.text(`Letter ${i + 1}`); // text in button
    $buttonForClue.addClass(`button-for-clues`); // add a class common to all the clue buttons
    $buttonForClue.attr("id", `button-clue${i + 1}`); // add an id unique to every clue

    // div
    $newClue.addClass(`character-clue-dialogs`); // add a class common to all the clue divs
    $newClue.attr("id", `type-of-clue${i + 1}`); // add an id unique to every clue
    $newClue.attr("title", `Clue ${i + 1}`); // give a title to the div/dialog

    // add the button and div to the appropriate array
    allCluesButtons.push($buttonForClue); // add button to button array
    allClues.push($newClue); // add div to dialog array

    // add the button and div to the dialog containing the clues' buttons
    $(`#clue-dialog`).append($buttonForClue);
    $(`#clue-dialog`).append($newClue);
    $(`#clue-dialog`).append(`<br/>`); // skip a line to have the buttons one under another instead of next to each other

    // add css to the button
    $(`#button-clue${i + 1}`).css({
      "font-family": "monospace",
      "font-weight": "bold",
      "font-size": "1rem",
    });
  }

  // go through every button that has the class "button-for-clues"
  $(`.button-for-clues`).each(function () {
    // take the div that follows after the button that has that class and put it in a variable
    let $clueDialog;
    $clueDialog = $(this)
      .next("div.character-clue-dialogs")
      .dialog({ autoOpen: false, height: 500, width: 637 }); // create a dialog for that div
    openCloseDialog(this, $clueDialog); // make the dialog open and close when its button is clicked
  });
}

/**
findCharacterPos(char)
find all the appearances of the letter of the word in the lorem ipsum text
*/
function findCharacterPos(char) {
  // array of all the positions of the letter in the text
  let posList = [];
  let nextPos = 0;

  // for each coordinates of the lorem ipsum array (for each paragraph)
  for (let i = 0; i < loremIpsumText.length; i++) {
    // variable for the paragraph beeing looked at
    let myP = loremIpsumText[i];
    nextPos = 0;
    // nextPos will return -1 if it doesn't find the letter, so as long as it is positive continue searching for the letter
    while (nextPos >= 0) {
      // find the letter we're looking at in the paragraph we're looking at
      nextPos = myP.indexOf(char, nextPos);
      // if the letter is found
      if (nextPos >= 0) {
        // push the coordinates of the letter at the end of the array of positions
        posList.push([i, nextPos]);
        // add one to nextPos
        nextPos++;
      }
    }
  }

  // return the list of positions so we can access it
  return posList;
}

/**
addLoremIpsum(listOfLetterPos)
display the lorem ipsum text and add a span around the letter that we'll use in the book cipher
*/
function addLoremIpsum(listOfLetterPos) {
  // sort the letters in order of appearance in the paragraph
  let letterOrder = listOfLetterPos.sort(function (a, b) {
    // if the first letter is positioned in the paragraph before the second one,
    if (a[1][0] < b[1][0]) {
      // don't change order
      return -1;
    }
    // if the first letter is positioned in the paragraph after the second one,
    else if (a[1][0] > b[1][0]) {
      // change order
      return 1;
    }
    // if they are both in the same paragraph, look at their positions in the paragraph
    // if the first letter is before the second one in the paragraph
    else if (a[1][0] === b[1][0] && a[1][1] < b[1][1]) {
      // don't change the order
      return -1;
    }
    // if the first letter is after the second one in the paragraph
    else if (a[1][0] === b[1][0] && a[1][1] > b[1][1]) {
      // change the order
      return 1;
    }
    // if both letters are the same at the same coordinates
    else {
      return 0;
    }
  });

  // section in the html to which we want to add the text
  const sectionText = $(`#text`);

  // for each paragraph of lorem ipsum
  for (let i = 0; i < loremIpsumText.length; i++) {
    // letter order in the paragraph
    let letterPosForP = [];
    // the paragraph string
    let paragraphString = `${i + 1}. `;

    // for each letter of the word (in order of appearance in the text)
    for (let j = 0; j < letterOrder.length; j++) {
      // if the letter position is in the paragraph we are looking at
      if (letterOrder[j][1][0] === i) {
        // add that letter to the array of the paragraph
        letterPosForP.push(letterOrder[j]);
      }
    }

    // variable for the position of the character in the string
    let previousStart = 0;

    // for each letter of the word in that paragraph
    for (let j = 0; j < letterPosForP.length; j++) {
      // set the paragraph string to
      // all the lorem ipsum text that comes between the beginning of the <p> (or the previous letter that is inside this <p>) and our letter
      // add our letter inside a span tag with a class of word
      paragraphString +=
        loremIpsumText[i].slice(previousStart, letterPosForP[j][1][1]) +
        `<span class="word">${letterPosForP[j][0]}</span>`;

      // set previous start to the character after our letter
      previousStart = letterPosForP[j][1][1] + 1;
    }
    // finish the paragraph with everything that comes after our last letter form that <p> and the end of the <p>
    paragraphString += loremIpsumText[i].slice(previousStart);

    // create an html paragraph
    const paragraph = $(`<p></p>`);

    // add our paragraphString to the html <p>
    paragraph.append(`${paragraphString}`);
    // add that <p> to the html section
    sectionText.append(paragraph);
  }
}

/*******************************
openCloseDialog(button, dialogBox)
function to open and close a dialog box when its designated button is clicked
*******************************/
function openCloseDialog(button, dialogBox) {
  let textHidden = true; // see if the dialog is displayed

  // when the button is clicked
  $(button).on(`click`, function (event) {
    // if the dialog box is closed
    if (textHidden) {
      $(dialogBox).dialog("open", "moveToTop"); // open it

      textHidden = false;
    }
    // if the dialog box is open
    else {
      $(dialogBox).dialog("close"); // close it
      textHidden = true;
    }
  });
}

/*******************************
ending()
what happens once the user finds the right word.
 - closes all dialogs
 - shows a message
 *******************************/
function ending() {
  // goes through all the clue dialogs
  $(`.character-clue-dialogs`).each(function () {
    $(this).dialog("close"); // close the dialog
  });

  // close the 2 starting dialogs
  $(`#the-text`).dialog("close"); // the one that has the lorem ipsum text
  $(`#clue-dialog`).dialog("close"); // the one that has the buttons for the clues

  // remove the start button
  $(`#starting-button`).remove();

  // 3 html lines of text that appear at the end of the program
  let $endText = $(`<h2></h2>`);
  let $bookTitle = $(`<h2></h2>`);
  let $findIt = $(`<h2></h2>`);

  // give them an id for their css
  $endText.attr("id", `end-text`);
  $bookTitle.attr("id", `book-title`);
  $findIt.attr("id", `find-it`);

  // create the text that is in each line
  let endText = `The next message will be hidden in the book`;
  let bookTitle = `"The Mysterious Book of Life and ${chosenWord}"`;
  let findItText = `You may or may not find this book at a library...`;

  // add the text to each html element
  $endText.text(endText);
  $bookTitle.text(bookTitle);
  $findIt.text(findItText);

  // append the alement to the background-page section of the body (not in a dialog box)
  $(`#background-page`).append($endText);
  $(`#background-page`).append($bookTitle);
  $(`#background-page`).append($findIt);
}
