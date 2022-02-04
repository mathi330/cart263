/**
Spy Profile Generator
Mathilde Davan
*/

"use strict";

let state = `profile`; // profile, redacted

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  countryOfOperation: `**REDACTED**`,
  favFood: `**REDACTED**`,
  password: `**REDACTED**`,
  invisiblePassword: `**REDACTED**`,
  visiblePassword: ``,
  asterisk: `*`,
};

// image of the eye that shows wether the password is visible or not
let imgEye = undefined;
let eye = undefined;

let imgStampTopSecret = undefined;

// The variable that contains the information of the profile
let data = undefined;

let paintColorData = undefined;
let monsterData = undefined;
let objectData = undefined;
let countryData = undefined;
let toxicChemicals = undefined;
let tarotData = undefined;

//
let paintColor = undefined;
let monster = undefined;

/**
preload the image of the eye (visibility of the password)
preload the JSON files used in the program
*/
function preload() {
  imgEye = loadImage(`assets/images/eye.png`);
  imgStampTopSecret = loadImage(`assets/images/stamp-secret.png`);

  paintColorData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/paints.json`
  );
  monsterData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/monsters.json`
  );
  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
  countryData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries.json`
  );

  toxicChemicals = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/science/toxic_chemicals.json`
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
      profileSession();
    } else {
      // otherwise go to a different state
      state = `redacted`;
    }
  }
  // if there is no info in the data
  else {
    // asks for your name to create a profile
    generateSpyProfile();
    passwordLength();
  }
}

/**
 */
function profileSession() {
  setSpyData();
  passwordLength();
  spyProfile.visiblePassword = `${spyProfile.invisiblePassword}`;
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
  spyProfile.favFood = data.favFood;
  spyProfile.password = data.password;
}

/**
generates the spy profile the first time the user visits the site
*/
function generateSpyProfile() {
  // asks for your name and stores it in the spyProfile object
  spyProfile.name = prompt(`What is your name, new recruit?`);

  // chooses a name of color from the paint color names JSON file
  paintColor = random(paintColorData.colors);
  // chooses a monster from the monsters JSON file
  monster = random(monsterData.names);
  spyProfile.alias = `The ${paintColor.color} ${monster}`;

  // chooses a random "weapon" using the objects JSON file
  spyProfile.secretWeapon = random(objectData.objects);

  // chooses a random country from the country JSON file
  spyProfile.countryOfOperation = random(countryData.countries);

  // chooses a random chemical from the chemicals JSON file
  spyProfile.favFood = random(toxicChemicals.chemicals);

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
  if (state === `profile`) {
    rightPassword();
    instructionsRight();
  } else if (state === `redacted`) {
    wrongPassword();
    instructionsWrong();
  }
}

/**
the visible profile when the password is right
*/
function rightPassword() {
  background(200);

  profileInformation();
  eye.update();
}

/**
what appears if you enter the wrong password
 */
function wrongPassword() {
  background(200);

  push();
  translate(width / 4, height / 2);
  rotate(-0.3);
  image(imgStampTopSecret, 0, 0, width / 2, width / 2);
  pop();
}

/**
 */
function instructionsWrong() {
  // line separating the canvas in 2 equal parts
  push();
  stroke(50);
  line(width / 2, 50, width / 2, height - 50);
  pop();

  // text settings
  push();
  fill(50);
  textStyle(BOLD);
  textFont(`Roboto Mono`); // font link in index
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Press TAB to try another password.`, width / 2 + 50, 100);

  fill(255, 0, 0);
  text(`Press BACKSPACE to delete your account.`, width / 2 + 50, height - 100);
  pop();
}

function instructionsRight() {
  // line separating the canvas in 2 equal parts
  push();
  stroke(50);
  line(width / 2, 50, width / 2, height - 50);
  pop();

  // text settings
  push();
  fill(50);
  textStyle(BOLD);
  textFont(`Roboto Mono`); // font link in index
  textSize(20);
  textAlign(LEFT, TOP);
  text(
    `Press F to randomly change the first part of your Alias,
and S to randomly change the second part.
Press A to randomly change your Alias.
Press W to randomly change your Weapon.
Press C to randomly change your Country of Operation.
Press O to randomly change your Favourite Food.



Press 1 to type a new Alias.
Press 2 to type a new Weapon.
Press 3 to type a new Country of Operation.
Press 4 to type a new Favourite Food.
`,
    width / 2 + 20,
    100
  );
  fill(255, 0, 0);
  text(`Press BACKSPACE to delete your account.`, width / 2 + 20, height - 100);
  pop();
}

/**
profile information (left side of the canvas)
*/
function profileInformation() {
  // text displayed
  let profile = `** SPY PROFILE **


NAME: ${spyProfile.name}
ALIAS: ${spyProfile.alias}
SECRET WEAPON: ${spyProfile.secretWeapon}
COUNTRY OF OPERATION: ${spyProfile.countryOfOperation}
FAVOURITE FOOD: ${spyProfile.favFood}`;

  let thePassword = `PASSWORD: ${spyProfile.visiblePassword}`;

  // text settings
  push();
  fill(0);
  textStyle(BOLD);
  textFont(`Roboto Mono`); // font link in index
  textSize(20);
  textAlign(LEFT, TOP);
  text(profile, 20, 100); // profile
  text(thePassword, 20, height - 100); // password at the bottom of the page
  pop();
}

/**
deleting the profile when pressing BACKSPACE on keyboard
re-ask for password when pressing TAB
*/
function keyPressed() {
  // click BACKSPACE to delete profile
  if (keyCode === BACKSPACE) {
    // Add a confirm button to make sure the profile is not accidently deleted
    if (confirm(`Agent! Are you sure about your resignation?!`)) {
      state = `profile`; // set state to profile
      localStorage.removeItem(`spy-profile-data`); // empty all the data saved
      setup(); // Go back to setup (to ask for your name)
      passwordLength(); // empty the hidden password string and create a new one for the new password
    }
  }
  // click TAB to re-ask your password if you got it wrong
  else if (keyCode === TAB && state === `redacted`) {
    state = `profile`; // set state to profile
    setup(); // Go back to setup (to ask the password)
  }

  // RANDOMLY CHOOSE SOMETHING
  // click A to change your alias
  else if (key === `a` && state === `profile`) {
    // chooses a name of color from the paint color names JSON file
    paintColor = random(paintColorData.colors);
    // chooses a monster from the monsters JSON file
    monster = random(monsterData.names);
    spyProfile.alias = `The ${paintColor.color} ${monster}`;
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  // click F to change the first part of your alias
  else if (key === `f` && state === `profile`) {
    // chooses a name of color from the paint color names JSON file
    paintColor = random(paintColorData.colors);
    spyProfile.alias = `The ${paintColor.color} ${monster}`;
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  // click S to change the second part of your alias
  else if (key === `s` && state === `profile`) {
    // chooses a monster from the monsters JSON file
    monster = random(monsterData.names);
    spyProfile.alias = `The ${paintColor.color} ${monster}`;
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  // click W to change your weapon
  else if (key === `w` && state === `profile`) {
    // chooses a random "weapon" using the objects JSON file
    spyProfile.secretWeapon = `${random(objectData.objects)}`;
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  // click C to change the country of operation
  else if (key === `c` && state === `profile`) {
    // chooses a random country from the country JSON file
    spyProfile.countryOfOperation = `${random(countryData.countries)}`;
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  // click O to change your favourite food
  else if (key === `o` && state === `profile`) {
    // chooses a random chemical from the chemicals JSON file
    spyProfile.favFood = `${random(toxicChemicals.chemicals)}`;
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }

  // DECIDE A NEW SOMETHING
  // click 1 to change your alias
  if (keyCode === 49 && state === `profile`) {
    spyProfile.alias = prompt(`Type in a new Alias`);
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  // click 2 to change your weapon
  else if (keyCode === 50 && state === `profile`) {
    spyProfile.secretWeapon = prompt(`Type in a new Weapon`);
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  // click 3 to change your country
  else if (keyCode === 51 && state === `profile`) {
    spyProfile.countryOfOperation = prompt(
      `Type in a new Country of Operation`
    );
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
  }
  // click 4 to change your fav food
  else if (keyCode === 52 && state === `profile`) {
    spyProfile.favFood = prompt(`Type in a new Favourite Food`);
    // save the new change
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
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
