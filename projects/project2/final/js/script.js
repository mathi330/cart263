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
let maxWordLength = 10;

let typesOfClues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let reorganizedTypes = [];
// shuffleArray();

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
function setup() {
  let ellipseSize = 10;

  let canvas = createCanvas(300, 300);
  canvas.parent(`type-of-clue1`);

  background(0, 0, 0);
  fill(0, 255, 255);
  ellipse(0 + ellipseSize, 0 + ellipseSize, ellipseSize);
  ellipse(0 + ellipseSize, height - ellipseSize, ellipseSize);
  ellipse(width - ellipseSize, height - ellipseSize, ellipseSize);
  ellipse(width - ellipseSize, 0 + ellipseSize, ellipseSize);
}
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
  }
  // if the answer is wrong
  else {
    // alert with "Wrong!" (for now)
    alert(`Wrong!`);
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
    // show the position of the letter
    console.log(
      listOfSelectedPos[i][0] + `:` + listOfPositions[selectedPosition]
    );

    // display the coded word on the page (the plus 1 is to start counting at 1 instead of 0 like in an array)
    let codeString = `${listOfPositions[selectedPosition][0] + 1}:${
      listOfPositions[selectedPosition][1] + 1
    }`;
    // add the string to the paragraph
    // $(`#clue-dialog`).append(`${codeString} <br/>`);
    // $(`#clue-dialog`).append(`?? ?? <br/>`);
  }
  // add the lorem ipsum text
  addLoremIpsum(listOfSelectedPos);

  createClues();
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

    $buttonForClue.text(`?? ??`); // text in button
    $buttonForClue.addClass(`button-for-clues`);
    $newClue.addClass(`character-clue-dialogs`);
    $newClue.attr("id", `type-of-clue${i + 1}`);

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
      .dialog({ autoOpen: false, height: 400, width: 400 });
    openCloseDialog(this, $clueDialog);
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
create a new array with the types of clue to be organized differently
 *******************************/
// function shuffleArray() {
//   for (let i = 0; i < typesOfClues; i++) {
//     let newType = randomArrayPos(typesOfClues);
//
//     while (reorganizedTypes.includes(newType)) {
//       newType = randomArrayPos(typesOfClues);
//     }
//     reorganizedTypes.push(newType);
//   }
//   console.log(`New organization of the types of clues: ${reorganizedTypes}`);
// }

/*******************************
 *******************************/

function p5Canvas() {
  let $addScript = $(`<script></script>`);

  $(`.type-of-clues1`).append($addScript);
  $addScript.attr({
    src: `js/p5number1.js`,
  });
}

/*******************************
 *******************************/

function randomArrayPos(array) {
  let i = Math.floor(Math.random(array.length));
  return array[i];
}
