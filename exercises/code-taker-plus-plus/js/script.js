/**
Code Taker
Mathilde Davan

This exercise is a page filled with letters that the user can arrange into whatever word they want in the answer box in the middle of the page.
The letters change when the user hovers over them and the user can get to the end by creating a word of the appropriate number of letters.
And you can try to create the words "amazing," "beautiful," "support" :)
*/

"use strict";

// alphabet
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
// letters that will appear
let $letters = [];
// the number of letters on the lower and upper half of the answer box
const numLetters = 200;

// the user's answer
let userAnswer = ``;
// the number of letters the word needs to be
let maxLengthAnswer;

// start with the "game"
game();

/**
setup()
Empty the letters array, the text in the poem section, and the user's previous answer
*/
function setup() {
  $letters = [];
  $(`#poem`).text(``);
  $(`#answer`).text(``);
}

/**
game()
The "game" part of the page where the user gets the instructions, creates the word and gets the ending dialog box
*/
function game() {
  setup(); //resets the informations
  maxLengthAnswer = getRndInteger(7, 12); // choses what length the word should be

  // sets the span in the instruction to the random number chosen above
  $(`#number-letter-word`).text(maxLengthAnswer);
  // change the css to make the number pop more (bold and light red)
  $(`#number-letter-word`).css({
    "font-weight": `bold`,
    color: `#ff7777`,
  });

  // create the letters and display them on the page
  createLetters();

  // instructions dialog box that appears at the beginning
  $(`#instructions`).dialog({
    // starting dimensions
    width: 500,
    height: 250,
    // modal so the user cannot interact with the page before closing the dialog box
    modal: true,
    // create an "Okay" button to continue
    buttons: {
      Okay: function () {
        $(this).dialog(`close`); //closes the box
      },
    },
  });

  // make the letters droppable in the answer box to create the word
  $(`#answer`).droppable({
    drop: function (event, ui) {
      let letter = ui.draggable.text(); // put the letter you dragged in a variable
      $(this).append(letter); // add the letter to the answer box
      ui.draggable.remove(); // delete the letter that was dragged
      // See if the number of letters in the answer box is as long as the required length of the word
      if ($(this).text().length === maxLengthAnswer) {
        // if yes, set the span called "user-answer" to the word the user wrote
        $(`#user-answer`).text($(this).text());
        // open the ending dialog box
        $(`#solved-dialog`).dialog(`open`);
      }
      // Special endings
      // See if the word created is "amazing"
      if ($(this).text() === `amazing`) {
        amazing(); // go to the amazing ending
      }
      // See if the word created is "amazing"
      if ($(this).text() === `beautiful`) {
        beautiful(); // go to the amazing ending
      }
      // See if the word created is "amazing"
      if ($(this).text() === `support`) {
        support(); // go to the amazing ending
      }
    },
  });

  // if the mouse is oon top of a letter
  $(`.secret`).on(`mouseover`, function (event) {
    // add the class found in 100 milliseconds
    $(this).addClass(`found`, 100);

    // make the letter draggable
    $(this).draggable({
      start: function (event, ui) {
        $(this).addClass(`found`); // when being dragged keep the found class
      },

      stop: function (event, ui) {
        $(this).removeClass(`found`); // when stopped being dragged remove the found class
      },
    });
  });

  // makes the letter go back to it's original style when the mouse is no longer on it
  $(`.secret`).on(`mouseleave`, function (event) {
    $(this).removeClass(`found`, 500); // takes away the "found" class in 500 milliseconds
  });

  // the ending dialog box
  $(`#solved-dialog`).dialog({
    autoOpen: false, // don't open it at the start of the program
    // starting dimensions
    width: 500,
    height: 250,
    // buttons offered
    buttons: {
      // button to start again
      "Find a new word!": function () {
        game(); // reset everything
        $(this).dialog(`close`); // close the box
      },
      // button to stop "playing"
      "No thanks...": function () {
        byebye(); // go to the "byebye" page
        $(this).dialog(`close`); // close the box
      },
    },
  });
}

/**
byebye()
black page without the letters and with some text in the middle
*/
function byebye() {
  setup(); // reset everything
  $(`body`).css({
    "background-color": `#000000`, // black background for the page
  });

  $(`#answer`).text(`See you again!`); // text that appears on the page
  // formatting of the text and answer box
  $(`#answer`).css({
    width: `35rem`,
    "text-align": `center`, // text centered
    border: `0px`, // box's borders invisible
    color: `#ffffff`, // text color white
    "font-weight": `bold`, // text in bold
  });
}

/**
amazing()
the page that appears if the user enters the word "amazing"
*/
function amazing() {
  setup(); //reset everything
  $(`body`).css({
    "background-color": `#cccccc`, // light gray background
  });

  $(`#answer`).text(`I agree, this program is amazing :P`); // text that appears on the page
  // formatting of the text and answer box
  $(`#answer`).css({
    width: `35rem`,
    "text-align": `center`, // text centered
    border: `0px`, // box's borders invisible
    color: `#000000`, // text color black
    "font-weight": `bold`, // text in bold
  });
}

/**
beautiful()
the page that appears if the user enters the word "beautiful"
*/
function beautiful() {
  setup(); //reset everything
  $(`body`).css({
    "background-color": `#cccccc`, // light gray background
  });

  $(`#answer`).text(`You are beautiful!`); // text that appears on the page
  // formatting of the text and answer box
  $(`#answer`).css({
    width: `35rem`,
    "text-align": `center`, // text centered
    border: `0px`, // box's borders invisible
    color: `#000000`, // text color black
    "font-weight": `bold`, // text in bold
  });
}

/**
support()
the page that appears if the user enters the word "support"
*/
function support() {
  setup(); //reset everything
  $(`body`).css({
    "background-color": `#cccccc`, // light gray background
  });

  $(`#answer`).text(`Cheer up! You can do it!`); // text that appears on the page
  // formatting of the text and answer box
  $(`#answer`).css({
    width: `35rem`,
    "text-align": `center`, // text centered
    border: `0px`, // box's borders invisible
    color: `#000000`, // text color black
    "font-weight": `bold`, // text in bold
  });
}

/**
createLetters()
creation of letters (letters on the upper and lower half of the page are created separatly in order to not have letters superimposed with the answer box)
*/
function createLetters() {
  // create the number of letters determined by the numLetters variable
  for (let i = 0; i < numLetters; i++) {
    // create one letter on the upper half of the page
    createLetter(getRndInteger(10, $(`body`).height() / 2 - 10));
    // and one letter on the lower half of the page
    createLetter(
      getRndInteger($(`body`).height() / 2 + 53, $(`body`).height() - 20)
    );
  }
}

/**
createLetter()
create one letter
*/
function createLetter(yPosition) {
  // create the span that will contain the letter
  let $letter = $(`<span></span>`);

  // setup the coordinates of the letter
  $letter.css({
    position: `absolute`,
    left: getRndInteger(20, $(`body`).width() - 20), // x position
    top: yPosition, // y position (determined in the createLetters function)
  });

  // choose a random letter of the alphabet array
  let randomNum = Math.floor(Math.random() * alphabet.length);
  // set the text of the letter variable to the letter of the alphabet at that position
  $letter.text(alphabet[randomNum]);

  // add the class "secret" to the letter
  $letter.addClass(`secret`);

  // push the letter into the letters array containing all the letters of the #poem section
  $letters.push($letter);
  // add the letter to the section
  $(`#poem`).append($letter);
}

/**
getRndInteger(min, max)
random function taken from w3school that takes a random integral between a min and max determined when it is used
https://www.w3schools.com/JS/js_random.asp
*/
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // return a random integral between the min and max
}
