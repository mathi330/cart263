/**
Spy Profile Generator
Mathilde Davan
*/

"use strict";

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  countryOfOperation: `**REDACTED**`,
  password: `**REDACTED**`,
  invisiblePassword: `**REDACTED**`,
  visiblePassword: ``,
  asterisk: `*`,

  connected: false,
};

// image of the eye that shows wether the password is visible or not
let imgEye = undefined;
let eye = undefined;

// The variable that contains the information of the profile
let data = undefined;

let monsterData = undefined;
let objectData = undefined;
let countryData = undefined;
let paintColorData = undefined;
let tarotData = undefined;

/**
preload the image of the eye (visibility of the password)
preload the JSON files used in the program
*/
function preload() {
  imgEye = loadImage(`assets/images/eye.png`);

  monsterData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/monsters.json`
  );
  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
  countryData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries.json`
  );
  paintColorData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/paints.json`
  );
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
}

/**
setup the spy profile
if a profile already exists, it asks the password and if not it asks for your name
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  eye = new EyeButton(imgEye);

  // destringify the object
  data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  // if there is info in data
  if (data) {
    // asks for your password
    let password = prompt(`Agent! Enter your password!`);
    // sees if the password is correct
    if (password === data.password) {
      // if yes, the data is displayed
      setSpyData();
      passwordLength();
      spyProfile.visiblePassword = `${spyProfile.invisiblePassword}`;
    } // otherwise the data is not viewable
  }
  // if there is no info in the data
  else {
    // asks for your name to create a profile
    generateSpyProfile();
  }
}

/**
function to count the length of the password and transform it into a hidden password
*/
function passwordLength() {
  // empty the visible and hidden password variables
  spyProfile.visiblePassword = ``;
  spyProfile.invisiblePassword = ``;
  // for loop to transform the visible password into a same number of asterisks
  for (let i = 0; i < spyProfile.password.length; i++) {
    spyProfile.invisiblePassword += spyProfile.asterisk; // add an asterisk for each letter
  }
  // make the thing you see as your password the hidden one
  spyProfile.visiblePassword = `${spyProfile.invisiblePassword}`;
}

/**
saves the data of the profile
*/
function setSpyData() {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.countryOfOperation = data.countryOfOperation;
  spyProfile.password = data.password;
}

/**
generates the spy profile the first time the user visits the site
*/
function generateSpyProfile() {
  // asks for your name and stores it in the spyProfile object
  spyProfile.name = prompt(`What is your name, new recruit?`);

  // chooses a name of color from the paint color names JSON file
  let paintColor = random(paintColorData.colors);
  // chooses a monster from the monsters JSON file
  let monster = random(monsterData.names);
  spyProfile.alias = `The ${paintColor.color} ${monster}`;

  // chooses a random "weapon" using the objects JSON file
  spyProfile.secretWeapon = random(objectData.objects);

  // chooses a random country from the country JSON file
  spyProfile.countryOfOperation = random(countryData.countries);

  // chooses a random card of the tarot JSON file
  let card = random(tarotData.tarot_interpretations);
  // takes a random keyword from the chosen card
  spyProfile.password = random(card.keywords);

  // stringify the object
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

/**
Description of draw()
*/
function draw() {
  background(255); // white

  // text displayed
  let profile = `** SPY PROFILE **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Country of Operation: ${spyProfile.countryOfOperation}`;
  let thePassword = `Password: ${spyProfile.visiblePassword}`;

  // text settings
  push();
  fill(0);
  textStyle(BOLD);
  textFont(`Roboto Mono`); // font link in index
  textSize(20);
  textAlign(LEFT, TOP);
  text(profile, 100, 100); // profile
  text(thePassword, 100, height - 100); // password at the bottom of the page
  pop();

  eye.update();
}

/**
deleting the profile when pressing BACKSPACE on keyboard
*/
function keyPressed() {
  if (keyCode === BACKSPACE) {
    localStorage.removeItem(`spy-profile-data`);
    setup();
    passwordLength();
  }
}

/**
actions taken when the mouse is pressed
*/
function mousePressed() {
  // if the eye image is clicked and the eye is not crossed
  if (eye.overlap() && eye.line.alpha === 0) {
    // make the line crossing the eye appear
    eye.line.alpha = 255;
    // make the password visible
    spyProfile.visiblePassword = `${spyProfile.password}`;
  }
  // if the eye image is pressed and the eye is crossed
  else if (eye.overlap() && eye.line.alpha !== 0) {
    // make the line crossing the eye disappear
    eye.line.alpha = 0;
    // make the password invisible
    spyProfile.visiblePassword = `${spyProfile.invisiblePassword}`;
  }
}
