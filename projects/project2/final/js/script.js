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

let typesOfClues = [0, 1, 2, 3, 4, 5];
let cipherClues = [];

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
p5 canvas for the clues
 *******************************/

let s1 = function (sketch) {
  let numFlowers = 7;
  let flowers = [];

  let homeBaseSize = 60;
  let homeBaseX = undefined;
  let homeBaseY = undefined;

  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(563, 400);
    canvas1.parent(`type-of-clue1`);

    homeBaseX = sketch.random(
      0 + homeBaseSize / 2,
      sketch.width - homeBaseSize / 2
    );
    homeBaseY = sketch.random(
      0 + homeBaseSize / 2,
      sketch.height - homeBaseSize / 2
    );

    for (let i = 0; i < numFlowers; i++) {
      let flower = sketch.createFlower();
      flowers.push(flower);
    }
  };

  sketch.createFlower = function () {
    let size = sketch.random(10, 25);
    let xPos = sketch.random(0 + size, sketch.width - size);
    let yPos = sketch.random(0 + size, sketch.height - size);
    let d = sketch.dist(homeBaseX, homeBaseY, xPos, yPos);
    while (d < homeBaseSize) {
      xPos = sketch.random(0, sketch.width);
      yPos = sketch.random(0, sketch.height);
    }
    let flower = {
      x: xPos,
      y: yPos,
      petalSize: size,
      numPetal: 8,
      color: {
        r: sketch.random(100, 255),
        g: sketch.random(0, 100),
        b: sketch.random(100, 255),
      },
    };
    return flower;
  };

  sketch.displayFlower = function (flower) {
    sketch.push();
    sketch.noFill();
    sketch.stroke(flower.color.r, flower.color.g, flower.color.b);

    sketch.ellipse(
      flower.x - (flower.petalSize / 4) * 3,
      flower.y,
      flower.petalSize
    );
    sketch.ellipse(
      flower.x - flower.petalSize / 2,
      flower.y - flower.petalSize / 2,
      flower.petalSize
    );
    sketch.ellipse(
      flower.x,
      flower.y - (flower.petalSize / 4) * 3,
      flower.petalSize
    );
    sketch.ellipse(
      flower.x + flower.petalSize / 2,
      flower.y - flower.petalSize / 2,
      flower.petalSize
    );
    sketch.ellipse(
      flower.x + (flower.petalSize / 4) * 3,
      flower.y,
      flower.petalSize
    );
    sketch.ellipse(
      flower.x + flower.petalSize / 2,
      flower.y + flower.petalSize / 2,
      flower.petalSize
    );
    sketch.ellipse(
      flower.x,
      flower.y + (flower.petalSize / 4) * 3,
      flower.petalSize
    );
    sketch.ellipse(
      flower.x - flower.petalSize / 2,
      flower.y + flower.petalSize / 2,
      flower.petalSize
    );
    sketch.pop();
  };

  sketch.draw = function () {
    if (state[0] === `game`) {
      sketch.background(0, 0, 0);
      sketch.noFill();
      sketch.stroke(255, 255, 153);
      sketch.ellipse(homeBaseX, homeBaseY, homeBaseSize);

      for (let i = 0; i < flowers.length; i++) {
        sketch.displayFlower(flowers[i]);
      }
    } else if (state[0] === `found`) {
      sketch.background(0, 0, 0);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textSize(30);
      sketch.fill(255);
      sketch.text(`${cipherClues[0]}`, sketch.width / 2, sketch.height / 2);
      console.log(`${cipherClues[0]}`);
    }
  };

  sketch.mouseDragged = function () {
    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      let d = sketch.dist(flower.x, flower.y, sketch.mouseX, sketch.mouseY);

      if (
        d < flower.petalSize + flower.petalSize / 2 &&
        sketch.mouseX >= 0 &&
        sketch.mouseX <= sketch.width &&
        sketch.mouseY >= 0 &&
        sketch.mouseY <= sketch.height
      ) {
        flower.x = sketch.mouseX;
        flower.y = sketch.mouseY;
        sketch.constrain(flowers[i].x, 0, sketch.width);
        sketch.constrain(flowers[i].y, 0, sketch.height);
      }
    }
  };

  sketch.mouseReleased = function () {
    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      let d = sketch.dist(flower.x, flower.y, homeBaseX, homeBaseY);

      if (d < homeBaseSize / 2 && i !== 0) {
        flowers.splice(i, 1);
      }
      if (d < homeBaseSize / 2 && i === 0) {
        state[0] = `found`;
        sketch.noLoop();
      }
    }
  };
};
new p5(s1);

/*
code taken from pippin's class on object detection with ml5.js
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

  /**
Starts the webcam and the ObjectDetector
*/
  p.setup = function () {
    let canvas2 = p.createCanvas(563, 400);
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

  /**
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

  /**
Handles the two states of the program: loading, running
*/
  p.draw = function () {
    if (state[1] === `game`) {
      if (clueState === `loading`) {
        p.loading();
      } else if (clueState === `running`) {
        p.running();
      }
    } else if (state[1] === `found`) {
      video.remove();
      p.background(0, 0, 0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.fill(255);
      p.text(`${cipherClues[1]}`, p.width / 2, p.height / 2);
      console.log(`${cipherClues[1]}`);
      p.noLoop();
    }
  };

  /**
Displays a simple loading screen with the loading model's name
*/
  p.loading = function () {
    p.background(255);

    p.push();
    p.textSize(32);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Loading...`, p.width / 2, p.height / 2);
    p.pop();
  };

  /**
Displays the webcam.
If there are currently objects detected it outlines them and labels them
with the name and confidence value.
*/
  p.running = function () {
    // Display the webcam
    p.image(video, 0, 0, p.width, p.height);

    // Check if there currently predictions to display
    if (predictions) {
      // If so run through the array of predictions
      for (let i = 0; i < predictions.length; i++) {
        // Get the object predicted
        let object = predictions[i];
        // Highlight it on the canvas
        p.highlightObject(object);

        if (object.label === `book`) {
          state[1] = `found`;
        }
      }
    }
  };

  /**
Provided with a detected object it draws a box around it and includes its
label and confidence value
*/
  p.highlightObject = function (object) {
    // Display a box around it
    p.push();
    p.noFill();
    p.stroke(0, 255, 255);
    p.rect(object.x, object.y, object.width, object.height);
    p.pop();
    // Display the label and confidence in the center of the box
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

let s3 = function (sketch) {
  let numfoods = 15;
  let foods = [];

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

  sketch.setup = function () {
    let canvas3 = sketch.createCanvas(563, 400);
    canvas3.parent(`type-of-clue3`);

    user.x = sketch.width / 2;
    user.y = sketch.height / 2;

    for (let i = 0; i < numfoods; i++) {
      let food = sketch.createfood();
      food.vx = sketch.random(-food.maxSpeed, food.maxSpeed);
      food.vy = sketch.random(-food.maxSpeed, food.maxSpeed);
      foods.push(food);
    }
  };

  sketch.createfood = function () {
    let foodSize = 10;
    let xPos = sketch.random(0 + 20, sketch.width - 20);
    let yPos = sketch.random(0 + 20, sketch.height - 20);
    let d = sketch.dist(user.x, user.y, xPos, yPos);
    while (d < user.size) {
      xPos = sketch.random(0 + 20, sketch.width - 20);
      yPos = sketch.random(0 + 20, sketch.height - 20);
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

  sketch.draw = function () {
    if (state[2] === `game`) {
      sketch.game();
    } else if (state[2] === `found`) {
      sketch.background(0, 0, 0);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textSize(30);
      sketch.fill(255);
      sketch.text(`${cipherClues[2]}`, sketch.width / 2, sketch.height / 2);
      console.log(`${cipherClues[2]}`);
      sketch.noLoop();
    }
  };

  sketch.game = function () {
    sketch.background(243, 230, 255);

    if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
      user.x += user.speed;
    } else if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
      user.x -= user.speed;
    }
    if (sketch.keyIsDown(sketch.UP_ARROW)) {
      user.y -= user.speed;
    } else if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
      user.y += user.speed;
    }

    let userX = sketch.constrain(user.x, 0, sketch.width);
    let userY = sketch.constrain(user.y, 0, sketch.height);

    sketch.fill(user.color.r, user.color.g, user.color.b);
    sketch.noStroke();
    sketch.ellipse(userX, userY, user.size);

    for (let i = 0; i < foods.length; i++) {
      let food = foods[i];

      let r = sketch.random();
      if (r < 0.06) {
        food.vx = sketch.random(-food.maxSpeed, food.maxSpeed);
        food.vy = sketch.random(-food.maxSpeed, food.maxSpeed);
      }

      food.x += food.vx;
      food.y += food.vy;

      if (food.x < 0 + food.size / 2 || food.x > sketch.width - food.size / 2) {
        food.vx = -food.vx;
      }
      if (
        food.y < 0 + food.size / 2 ||
        food.y > sketch.height - food.size / 2
      ) {
        food.vy = -food.vy;
      }

      sketch.fill(food.color.r, food.color.g, food.color.b);
      sketch.noStroke();
      sketch.rect(food.x, food.y, food.size);

      let d = sketch.dist(user.x, user.y, food.x, food.y);
      if (d < user.size / 2) {
        foods.splice(i, 1);
      }
    }

    if (foods.length <= 0) {
      state[2] = `found`;
    }
  };
};
new p5(s3);

/*
code partially taken from exercise slamina
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
  let currentAnswer = ``;

  let animalLetters = [];

  p.setup = function () {
    let canvas3 = p.createCanvas(563, 400);
    canvas3.parent(`type-of-clue4`);

    // Is annyang available?
    if (annyang) {
      // Create the guessing command
      let commands = {
        "*animal": p.guessAnimal,
        // Next: nextQuestion,
      };
      // Setup annyang and start
      annyang.addCommands(commands);
      annyang.start();
      annyang.debug();
    }

    currentAnswer = ``;
    currentAnimal = p.random(animals);
    while (currentAnimal.length < 6) {
      currentAnimal = p.random(animals);
    }
    console.log(currentAnimal);

    for (let i = 0; i < currentAnimal.length; i++) {
      let letter = currentAnimal[i];
      let myLetter = p.createLetter(letter);
      animalLetters.push(myLetter);
    }
  };

  p.createLetter = function (letter) {
    let theLetter = {
      x: p.random(10, p.width - 10),
      y: p.random(10, p.height - 10),
      size: 30,
      letter: letter,
    };
    return theLetter;
  };

  p.draw = function () {
    if (state[3] === `game`) {
      p.game();
    } else if (state[3] === `found`) {
      p.background(0, 0, 0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.fill(255);
      p.text(`${cipherClues[3]}`, p.width / 2, p.height / 2);
      console.log(`${cipherClues[3]}`);
      p.noLoop();
    }
  };

  p.game = function () {
    p.background(255, 204, 204);

    for (let i = 0; i < animalLetters.length; i++) {
      let theLetter = animalLetters[i];

      p.push();
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(theLetter.size);
      p.text(theLetter.letter, theLetter.x, theLetter.y);
      p.pop();
    }

    if (currentAnswer === currentAnimal) {
      p.push();
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.text(currentAnswer, p.width / 2, p.height / 2);
      p.pop();
    } else {
      p.push();
      p.fill(255, 0, 0);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.text(currentAnswer, p.width / 2, p.height / 2);
      p.pop();
    }

    if (currentAnswer === currentAnimal) {
      state[3] = `found`;
    }
  };

  p.guessAnimal = function (animal) {
    currentAnswer = animal.toLowerCase();
  };
};
new p5(s4);

let s5 = function (sketch) {
  sketch.setup = function () {
    let canvas5 = sketch.createCanvas(363, 300);
    canvas5.parent(`type-of-clue5`);
    sketch.background(255, 0, 255);
  };
  sketch.draw = function () {};
};
new p5(s5);

let s6 = function (sketch) {
  sketch.setup = function () {
    let canvas6 = sketch.createCanvas(363, 300);
    canvas6.parent(`type-of-clue6`);
    sketch.background(0, 255, 255);
  };
  sketch.draw = function () {};
};
new p5(s6);

/*******************************
 *******************************/

/*******************************

clues dialog box

make the clue box into a dialog box

*******************************/
$(function () {
  $("#clue-dialog").dialog({
    autoOpen: false,
    height: `auto`,
    width: 300,
    // position: [
    //   Math.random() * $(window).width(),
    //   Math.random() * $(window).height(),
    // ],
  });
});

/*******************************

text dialog box

make the hints visible and invisible

*******************************/
let hintHidden = true;
// set up the dialog box for the lorem ipsum text and the hint button
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
      { text: `Submit`, click: submitAnswer },
    ],
  });
});

$(`#letter-hint`).on(`click`, function (event) {
  let hintVisible = false;
  if (hintVisible) {
    $(`.word`).removeClass("hint", 1000);
    hintVisible = false;
  } else {
    $(`.word`).addClass("hint", 1000);
    hintVisible = true;
  }
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
        text: `Submit`,
        click: submitAnswer,
      },
    ],
  });
});

// look at the answer the user inputed into the answer box when the submit button is pressed
function submitAnswer() {
  // the user's answer
  let userAnswer = $(`#user-answer`).val();
  // if the answer is correct
  if (userAnswer === chosenWord) {
    // alert with the answer (for now to test)
    alert(userAnswer);
    $(`#user-answer`).val(``);
  }
  // if the answer is wrong
  else {
    // alert with "Wrong!" (for now)
    alert(`Wrong!`);
    $(`#user-answer`).val(``);
  }
}

/*******************************


*******************************/

/**
processResult(data)

choose a random word from the json file,
separates the word into letters and finds all the times each letter is appears in the lorem ipsum text,
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

  console.log(chosenWord); // show the word in the console

  let listOfSelectedPos = []; // empty array in which the chosen positions for the letters will be put

  // for each letter of the word
  for (let i = 0; i < chosenWord.length; i++) {
    let letter = chosenWord[i];

    let clue = typesOfClues[i];

    // list of the positions for all the times the letter appears in the lorem ipsum
    let listOfPositions = findCharacterPos(letter);
    // console.log(listOfPositions);

    // choose a random position from the listOfPositions array for this letter of the word
    let selectedPosition = Math.floor(Math.random() * listOfPositions.length);
    // add the letter and it's position in the lorem ipsum to the array for the final chosen position
    listOfSelectedPos.push([letter, listOfPositions[selectedPosition], clue]);

    // display the coded word on the page (the plus 1 is to start counting at 1 instead of 0 like in an array)
    let codeString = `${listOfPositions[selectedPosition][0] + 1}:${
      listOfPositions[selectedPosition][1] + 1
    }`;

    // show the position of the letter
    console.log(listOfSelectedPos[i][0] + ` => ` + codeString);

    cipherClues.push(codeString);
  }

  console.log(`the cipher array: ` + cipherClues);

  // add the lorem ipsum text
  addLoremIpsum(listOfSelectedPos);

  createClues();

  // for (let i = 0; i < chosenWord.length; i++) {
  //   if (state[i] === `found`) {
  //     $(`#button-clue${i + 1}`).text(`${cipherClues[i]}`);
  //     console.log(`HELLOOOOOO!O!O!OO!`);
  //   }
  // }
}

/*
https://www.intechgrity.com/howto-use-jquery-ui-dialog-as-reusable-modal-prompt/#
*/
function createClues() {
  let allCluesButtons = [];
  let allClues = [];
  // newClue.addClass(`visible`);

  for (let i = 0; i < chosenWord.length; i++) {
    let $buttonForClue = $(`<button></button>`);
    let $newClue = $(`<div></div>`);

    $buttonForClue.text(`Letter ${i + 1}`); // text in button
    $buttonForClue.addClass(`button-for-clues`);
    $buttonForClue.attr("id", `button-clue${i + 1}`);
    $newClue.addClass(`character-clue-dialogs`);
    $newClue.attr("id", `type-of-clue${i + 1}`);
    $newClue.attr("title", `Clue ${i + 1}`);

    allCluesButtons.push($buttonForClue);
    allClues.push($newClue);
    $(`#clue-dialog`).append($buttonForClue);
    $(`#clue-dialog`).append($newClue);
    $(`#clue-dialog`).append(`<br/>`);
  }

  $(`.button-for-clues`).each(function () {
    let $clueDialog;

    $clueDialog = $(this)
      .next("div.character-clue-dialogs")
      .dialog({ autoOpen: false, height: 500, width: 600 });
    openCloseDialog(this, $clueDialog);
    // if (
    //   $($clueDialog) === $(`#button-clue2`) &&
    //   textHidden &&
    //   state[1] !== `found`
    // ) {
    //   state[1] = `wait`;
    // } else if (
    //   $($clueDialog) === $(`#button-clue2`) &&
    //   textHidden === false &&
    //   state[1] !== `found`
    // ) {
    //   state[1] = `game`;
    // }
  });

  $(`#clues-dialog`).append(allCluesButtons);
  $(`#clues-dialog`).append(allClues);
  console.log(allClues);
}

/*******************************


*******************************/

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
 *******************************/

// function randomArrayPos(array) {
//   let i = Math.floor(Math.random(array.length));
//   return array[i];
// }
