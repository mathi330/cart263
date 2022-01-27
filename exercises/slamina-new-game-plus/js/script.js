"use strict";

/*****************
Slamina
Mathilde Davan
******************/

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

// state for starting, ending screens, and the game
let state = `start`; // start, game, end

const QUESTION_DELAY = 500; // (0.5 sec) in milliseconds

// The current answer to display (we use it initially to display the click instruction)
let currentAnswer = `Click to begin.`;
// The current animal name the user is trying to guess
let currentAnimal = ``;

const NUM_QUESTIONS = 10;
let numQuestionsAnswered = 0;
let numRightAnswers = 0;

/**
Create a canvas
Set up annyang with the guessing command
Set text defaults
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      "I think it is *animal": guessAnimal,
      Next: nextQuestion,
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
    annyang.debug();
  }

  // Text defaults
  textSize(102);
  textStyle(BOLD);
  textAlign(CENTER);
}

/**
Display the current answer.
 */
function draw() {
  background(0);

  if (state === `start`) {
    start();
  } else if (state === `game`) {
    game();
  } else if (state === `end`) {
    end();
  }
}

/**

*/
function start() {
  fill(255);
  textSize(42);
  textStyle(BOLD);
  textAlign(CENTER);
  text(
    `The name of an animal will be said backwards.
Guess what animal it is and say
"I think it is ..." with your answer!`,
    width / 2,
    height / 3
  );
  fill(255, 255, 0);
  text(`Click to begin`, width / 2, (height / 3) * 2);
}

function game() {
  displayAnswer();
}

/**

*/
function end() {
  fill(255);
  textSize(42);
  textStyle(BOLD);
  textAlign(CENTER);
  text(
    `You got ${numRightAnswers} out of 10 animals right!`,
    width / 2,
    height / 3
  );
  fill(255, 0, 255);
  text(`Click to try again!`, width / 2, (height / 3) * 2);
}

/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/
function displayAnswer() {
  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
    numRightAnswers++;
  } else {
    fill(255, 0, 0);
  }
  // numQuestionsAnswered++;
  text(currentAnswer, width / 2, height / 2);
}

/**
Reverse the animal name and say it with ResponsiveVoice
*/
function sayAnimalBackwards(animal) {
  let reverseAnimal = reverseString(animal);
  responsiveVoice.speak(reverseAnimal);
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split("");
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join("");
  // Return the result
  return result;
}

/**
Called by annyang when the user make a guess.
animal parameter contains the guess as a string.
Sets the answer text to the guess.
*/
function guessAnimal(animal) {
  // Convert the guess to lowercase to match the answer format
  currentAnswer = animal.toLowerCase();
}

/**
Reset the answer text, get a new random animal, say its name
*/
function nextQuestion() {
  if (state === `start`) {
    state = `game`;
  } else if (state === `game` && numQuestionsAnswered === NUM_QUESTIONS) {
    state = `end`;
  } else if (state === `end`) {
    state = `start`;
    numRightAnswers = 0;
    numQuestionsAnswered = 0;
  }

  currentAnswer = ``;
  currentAnimal = random(animals);
  sayAnimalBackwards(currentAnimal);
  numQuestionsAnswered++;
}

/**
When the user clicks, go to the next question
*/
function mousePressed() {
  // if (state === `start`) {
  //   state = `game`;
  //   // nextQuestion();
  //   // } else if (state === `game` && numQuestionsAnswered < NUM_QUESTIONS) {
  //   // nextQuestion();
  // } else if (state === `game` && numQuestionsAnswered === NUM_QUESTIONS) {
  //   state = `end`;
  // } else if (state === `end`) {
  //   state = `start`;
  //   numRightAnswers = 0;
  //   numQuestionsAnswered = 0;
  // }
}
