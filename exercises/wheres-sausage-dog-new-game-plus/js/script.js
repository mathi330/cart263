"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS_EASY = 50;
const NUM_ANIMALS_NORMAL = 100;
const NUM_ANIMALS_HARD = 200;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

let state = `start`; // start, easy, normal, hard, win

// buttons to choose level
let easy = undefined;
let normal = undefined;
let hard = undefined;
// colors for the buttons
let colorEasy = undefined;
let colorNormal = undefined;
let colorHard = undefined;
// button to restart
let restart = undefined;

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorEasy = color(255, 255, 0); //yellow
  colorNormal = color(0, 255, 255); //cyan
  colorHard = color(255, 0, 255); //magenta

  createButtons();
}

function createButtons() {
  easy = new Button((width / 4) * 3, height / 4, colorEasy, `Easy`);
  normal = new Button((width / 4) * 3, (height / 4) * 2, colorNormal, `Normal`);
  hard = new Button((width / 4) * 3, (height / 4) * 3, colorHard, `Hard`);

  let colorChoices = [colorEasy, colorNormal, colorHard];
  let colorRestart = random(colorChoices);
  restart = new Button(width / 3, height / 2, colorRestart, `Restart!`);
}

// create the animals that appear in the game
function createAnimals(numAnimals) {
  for (let i = 0; i < numAnimals; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
}
function createSausageDog() {
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function reset() {
  animals = [];
}

function draw() {
  if (state === `start`) {
    start();
  } else if (state === `easy`) {
    levelEasy();
  } else if (state === `normal`) {
    levelNormal();
  } else if (state === `hard`) {
    levelHard();
  } else if (state === `win`) {
    win();
  }
}

function start() {
  background(0);
  push();
  fill(255);
  // Using textFont() to set the font to our embedded font
  textFont(`Indie Flower`);
  textAlign(CENTER, CENTER);
  textSize(40);
  translate(width / 3, height / 2);
  rotate(-0.15);
  text(`Find the sausage dog!`, 0, 0);
  pop();

  push();
  imageMode(CENTER);
  translate(width / 2, height / 3);
  scale(-1, 1);
  rotate(-0.2);
  image(sausageDogImage, 0, 0);
  pop();

  easy.update();
  normal.update();
  hard.update();
}

function levelEasy() {
  background(colorEasy);
  displayAnimals();
}

function levelNormal() {
  background(colorNormal);
  displayAnimals();
}

function levelHard() {
  background(colorHard);
  displayAnimals();
}

// displays the animals and the sausage dog for the game
function displayAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
  sausageDog.update();
}

function win() {
  background(0);
  push();
  fill(255);
  // Using textFont() to set the font to our embedded font
  textFont(`Indie Flower`);
  textAlign(CENTER, CENTER);
  textSize(40);
  translate((width / 3) * 2, height / 2);
  rotate(0.15);
  text(
    `You are now the happy owner
     of a sausage dog!`,
    0,
    0
  );
  pop();

  restart.update();
}

function mousePressed() {
  if (state === `start` && easy.overlap()) {
    // create a certain number of animals depending on the level of difficulty
    createAnimals(NUM_ANIMALS_EASY);
    createSausageDog();
    // set the state to easy
    state = `easy`;
  } else if (state === `start` && normal.overlap()) {
    // create a certain number of animals depending on the level of difficulty
    createAnimals(NUM_ANIMALS_NORMAL);
    createSausageDog();
    // set the state to normal
    state = `normal`;
  } else if (state === `start` && hard.overlap()) {
    // create a certain number of animals depending on the level of difficulty
    createAnimals(NUM_ANIMALS_HARD);
    createSausageDog();
    // set the state to hard
    state = `hard`;
  }

  if (state === `easy` || state === `normal` || state === `hard`) {
    let found = sausageDog.mousePressed();
    if (found) {
      setTimeout(() => {
        state = `win`;
      }, 2000);
    }
  }

  if (state === `win` && restart.overlap()) {
    state = `start`;
    reset();
  }
}
