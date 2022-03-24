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
let minWordLength = 6;

// add a json file with words from which the mystery word will be taken
$.getJSON(`/assets/data/common.json`).done(function data(data) {
  // function to call when the file is loaded successfully
  jsonFile = data;
  processResult(jsonFile);
});

// make the text into a dialog box
$(function () {
  $("#text").dialog({
    autoOpen: false, // doesn't open at the start
    height: 400,
    width: 500,
  });
});

// make the answer box into a dialog box
$(function () {
  $("#entry-box").dialog({
    autoOpen: false, // doesn't open at the start
    height: 300,
    width: 300,
  });
});

// make the 2 dialog box open and close when the designated button is clicked
openCloseDialog(`#open-text-dialog`, `#text`);
openCloseDialog(`#open-answer-dialog`, `#entry-box`);

/**
openCloseDialog(button, dialogBox)

function to open and close a dialog box when its designated button is clicked
*/
function openCloseDialog(button, dialogBox) {
  let textHidden = true; // see if the dialog is displayed

  // when the button is clicked
  $(button).on(`click`, function (event) {
    // if the dialog box is closed
    if (textHidden) {
      $(dialogBox).dialog("open"); // open it
      textHidden = false;
    }
    // if the dialog box is open
    else {
      $(dialogBox).dialog("close"); // close it
      textHidden = true;
    }
  });
}

// look at the answer the user inputed into the answer box when the submit button is pressed
$(`#submit-answer`).on(`click`, function (event) {
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
});

/**
processResult(data)

choose a random word from the json file,
separates the word into letters and finds all the times each letter is appears in the lorem ipsum text,
choose one of the positions in the text,
add the lorem ipsum text
*/
function processResult(data) {
  // choose a word that is longer than the minimum word length
  while (chosenWord.length < minWordLength) {
    chosenWord =
      data.commonWords[Math.floor(Math.random() * data.commonWords.length)];
  }

  console.log(chosenWord); // show the word in the console

  let listOfSelectedPos = []; // empty array in which the chosen positions for the letters will be put

  // for each letter of the word
  for (let i = 0; i < chosenWord.length; i++) {
    // list of the positions for all the times the letter appears in the lorem ipsum
    let listOfPositions = findCharacterPos(chosenWord[i]);
    // console.log(listOfPositions);

    // choose a random position from the listOfPositions array for this letter of the word
    let selectedPosition = Math.floor(Math.random() * listOfPositions.length);
    // add the letter and it's position in the lorem ipsum to the array for the final chosen position
    listOfSelectedPos.push([chosenWord[i], listOfPositions[selectedPosition]]);
    // show the position of the letter
    console.log(
      listOfSelectedPos[i][0] + `:` + listOfPositions[selectedPosition]
    );

    // display the code on the page
    let codeString = listOfPositions[selectedPosition];
    $(`#secret-code`).append(`${codeString}`);
  }
  // add the lorem ipsum text
  addLoremIpsum(listOfSelectedPos);
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
    let paragraphString = ``;

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
        loremIpsumText[i].slice(previousStart, letterOrder[j][1][1]) +
        `<span class="word">${letterOrder[j][0]}</span>`;

      // set previous start to the character after our letter
      previousStart = letterOrder[j][1][1] + 1;
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
