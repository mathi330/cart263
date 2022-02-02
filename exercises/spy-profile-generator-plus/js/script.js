/**
Spy Profile Generator
Mathilde Davan
*/

"use strict";

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
};

let data = undefined;

/**
Description of preload
*/
function preload() {
  const MONSTER_DATA = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/monsters.json`
  );

  const OBJECT_DATA = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
  const TAROT_DATA = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  if (data) {
    let password = prompt(`Agent! Enter your password!`);
    if (password === data.password) {
      setSpyData();
    }
  } else {
    generateSpyProfile();
  }
}

/**
saves the data of the profile
*/
function setSpyData() {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password; //toughness
}

/**
generates the spy profile the first time the user visits the site
*/
function generateSpyProfile() {
  spyProfile.name = prompt(`What is your name, new recruit?`);
  let monster = random(MONSTER_DATA.names);
  spyProfile.alias = `The ${monster}`;
  spyProfile.secretWeapon = random(OBJECT_DATA.objects);
  let card = random(TAROT_DATA.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

/**
Description of draw()
*/
function draw() {
  background(0);

  let profile = `** SPY PROFILE **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

  push();
  fill(255);
  textStyle(BOLD);
  textFont(`Roboto Mono`);
  textSize(20);
  textAlign(LEFT, TOP);
  text(profile, 100, 100);
  pop();
}
