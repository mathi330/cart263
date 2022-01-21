/**
Where's Sausage Dog?
Mathilde Davan

This is a game where you need to find the sausage dog hidden among other animals.
It has three levels of difficulty. The number of random animals increases for
each level. once you found the sausage dog, it spins for a bit before the ending
page appears. It is possible to go back to the intro page once reaching the end
and trying a another level.
*/
"use strict";

// number of images used for the random animals
const NUM_ANIMAL_IMAGES = 10;
// number of random animals depending on the difficulty
const NUM_ANIMALS_EASY = 100;
const NUM_ANIMALS_NORMAL = 200;
const NUM_ANIMALS_HARD = 400;

// arrays storing the images and animals
let animalImages = [];
let animals = [];

// the one and only sausage dog!!
let sausageDogImage = undefined;
let sausageDog = undefined;

let state = `start`; // start, easy, normal, hard, win ('cause losing is no fun)

// buttons to choose level
let easy = undefined;
let normal = undefined;
let hard = undefined;
// colors for the buttons
let colorEasy = undefined;
let colorNormal = undefined;
let colorHard = undefined;
// button to restart once the end is reached
let restart = undefined;

/**
preload()

loads the images that will be used for the animals and the sausage dog
*/
function preload() {
  // for loop to load all the random animals
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    // keep the images of all the animals into one place
    animalImages.push(animalImage);
  }

  // load the sausage dog image
  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

/**
setup()

setup the canvas' size,
the colors for the buttons and backgrounds of each level,
the buttons
*/
function setup() {
  createCanvas(windowWidth, windowHeight); // canvas fits whole page

  colorEasy = color(255, 255, 0); // yellow
  colorNormal = color(0, 255, 255); // cyan
  colorHard = color(255, 0, 255); // magenta

  createButtons(); // create the buttons
}

/**
createButtons()

creates the 4 buttons used in the program using the class Button
*/
function createButtons() {
  // the three buttons to choose the level of difficulty
  easy = new Button((width / 4) * 3, height / 4, colorEasy, `Easy`); // x, y, color, text
  normal = new Button((width / 4) * 3, (height / 4) * 2, colorNormal, `Normal`);
  hard = new Button((width / 4) * 3, (height / 4) * 3, colorHard, `Hard`);

  // for the restart button, choose a random levels' colors
  let colorChoices = [colorEasy, colorNormal, colorHard];
  let colorRestart = random(colorChoices);
  // restart button
  restart = new Button(width / 3, height / 2, colorRestart, `Restart!`);
}

/**
createAnimals(the number of animals depending on the level)

creates the animals using the Animal class
*/
function createAnimals(numAnimals) {
  // for loop to get the number of animal wanted
  for (let i = 0; i < numAnimals; i++) {
    // random coordinates on the canvas
    let x = random(0, width);
    let y = random(0, height);
    // random image of animal (except sausage dog)
    let animalImage = random(animalImages);
    // create the animal with the above inforamtion
    let animal = new Animal(x, y, animalImage);
    // push the new animal into the animals' array
    animals.push(animal);
  }
}
/**
createSausageDog()

similar to createAnimals() but for only one sausage dog
*/
function createSausageDog() {
  // random coordinates
  let x = random(0, width);
  let y = random(0, height);
  // create the sausage dog with the above coordinates
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

/**
reset()

quick function to empty the animals array once we start the game over (so the new animals
don't appear on top of the previous game)
*/
function reset() {
  animals = []; // empty array
}

/**
draw()

display the states when called
*/
function draw() {
  // starting screen
  if (state === `start`) {
    start();
  }
  // levels
  else if (state === `easy`) {
    levelEasy();
  } else if (state === `normal`) {
    levelNormal();
  } else if (state === `hard`) {
    levelHard();
  }
  // ending screen
  else if (state === `win`) {
    win();
  }
}

/**
start()

display the starting screen:
  - text
  - image of sausage dog
  - three level buttons
*/
function start() {
  background(0); // black background

  // text
  push();
  fill(255); // white
  textFont(`Indie Flower`); // font
  textAlign(CENTER, CENTER); // alignment
  textSize(40); // size
  translate(width / 3, height / 2); // coordinates
  rotate(-0.15); // tilted left
  text(`Find the sausage dog!`, 0, 0);
  pop();

  // sausage dog
  push();
  imageMode(CENTER);
  translate(width / 2, height / 3); //coordinates
  scale(-1, 1); // facing left
  rotate(-0.2); // tilted right
  image(sausageDogImage, 0, 0);
  pop();

  // level buttons
  easy.update();
  normal.update();
  hard.update();
}

/**
levelEasy(), levelNormal(), levelHard()

the three following functions are for the three levels (same except for the number af animals)
*/
function levelEasy() {
  background(colorEasy); //yellow

  displayAnimals();
}

function levelNormal() {
  background(colorNormal); // cyan

  displayAnimals();
}

function levelHard() {
  background(colorHard); // magenta

  displayAnimals();
}

/**
displayAnimals()

displays the animals and the sausage dog in the levels
*/
function displayAnimals() {
  // for loop to display every animal in the animals' array
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
  // display the sausage dog
  sausageDog.update();
}

/**
win()

display the end screen:
  - text
  - restart button
*/
function win() {
  background(0); // black

  // text
  push();
  fill(255); // white
  textFont(`Indie Flower`); // font
  textAlign(CENTER, CENTER); // alignment
  textSize(40); // size
  translate((width / 3) * 2, height / 2); // coordinates
  rotate(0.15); // tilted right
  text(
    `You are now the happy owner
     of a sausage dog!`,
    0,
    0
  );
  pop();

  // button
  restart.update();
}

/**
mousePressed()

what happens when the buttons are clicked,
when the sausage dog is clicked
*/
function mousePressed() {
  // level buttons
  // if the mouse clicks on the easy button:
  if (state === `start` && easy.overlap()) {
    createAnimals(NUM_ANIMALS_EASY); // create 100 animals in the level
    createSausageDog(); // create sausage dog

    state = `easy`; // set the state to easy
  }
  // if the mouse clicks on the normal button:
  else if (state === `start` && normal.overlap()) {
    createAnimals(NUM_ANIMALS_NORMAL); // create 200 animals in the level
    createSausageDog(); // create sausage dog

    state = `normal`; // set the state to normal
  }
  // if the mouse clicks on the hard button:
  else if (state === `start` && hard.overlap()) {
    createAnimals(NUM_ANIMALS_HARD); // create 400 animals in the level
    createSausageDog(); // create sausage dog

    state = `hard`; // set the state to hard
  }

  // when the sausage dog is clicked on
  if (state === `easy` || state === `normal` || state === `hard`) {
    let found = sausageDog.mousePressed();
    // if the sausage dog is found...
    if (found) {
      // set a 2sec long timeout so the animation of the sausage dog spinning can be visible
      setTimeout(() => {
        state = `win`; // set the state to win (ending screen)
      }, 2000);
    }
  }

  // when the restart button is clicked
  if (state === `win` && restart.overlap()) {
    state = `start`; // go back to the starting screen
    reset(); // reset (empty the animals' array)
  }
}
