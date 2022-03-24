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
  `Morbi blandit vestibulum arcu tincidunt faucibus.`,
  `Aliquam pulvinar ornare sem, id blandit libero.`,
  `Donec congue neque odio, a consectetur neque sodales sit amet.`,
  `Phasellus et enim faucibus, mollis nisi sed, tincidunt mi.`,
  `Aliquam pretium diam ac odio consectetur luctus.`,
  `Sed nec pellentesque ante.`,
  `Nam eu consequat ipsum, eu facilysis justo.`,
  `Praesent interdum quam quis vulputate facilysis.`,
  `Nam ac mauris sodales, accumsan nisl eget, commodo sapien.`,
  `Phasellus ultricies commodo blandit.`,
  `Donec vehicula ultrices velit, ac placerat nibh bibendum in.`,
  `Nulla id wusto ut massa egestas vestibulum sit amet maximus nunc.`,
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
  `Praesent sit amet lacus ac ipsum pretium accumsan.`,
  `Duis odio leo, maximus ac dui ac, tincidunt varius ligula.`,
  `Nulla malesuada nunc massa, sed pellentesque nisl faucibus eu.`,
  `Suspendisse molestie lectus id magna lobortis, id lobortis nulla luctus.`,
  `Aliquam nec risus massa.`,
  `Donec convallis libero ipsum, nec bibendum odio malesuada vulputate.`,
  `Morbi elementum tortor sem, wel vulputate eros dictum in.`,
  `Cras in egestas leo, eget scelerisque lorem.`,
  `Aliquam ex sem et ante sollicitudin aliquam.`,
  `Duis lacinia nunc quis volutpat tristique.`,
  `Nam wel vestibulum neque, sed elementum dolor.`,
  `Nullam id est dignissim, suscipit dolor quis, dapibus eros.`,
  `Nunc vel ante eget ante porttitor varius quis at dolor.`,
  `Proin sit amet sollicitudin nisl.`,
  `Maecenas a ultricies lorem, vel aliquam nulla.`,
  `Suspendisse at malesuada nunc.`,
  `Mauris ut nisi sit amet dui congue imperdiet eu eget mazza.`,
  `Nullam ac nisl facilysis, tristique tortor ac, condimentum leo.`,
  `Etiam non felis nulla.`,
  `Suspendisse eu justo nibh.`,
  `Vivamus ac vestibulum nibh.`,
  `Donec quis leo cursus, aliquet tortor et, congue libero.`,
  `Mauris nec vehicula magna.`,
  `Quisque vitae bibendum risus.`,
  `Nulla cursus augue id mi viverra viverra.`,
  `Proin id ex ut ligula semper ultrices. Morbi wel quam nisi.`,
  `Phasellus ut eros sit amet felis tincidunt congue.`,
  `In hac habitasse platea dictumst.`,
  `Integer wel placerat massa, id semper nisl.`,
  `Maecenas et libero gravida, sollicitudin arcu eu, finibus sapien.`,
  `Sed malesuada sapien sit amet metus aliquam, nec pretium dui maximus.`,
  `Nunc non risus id nibh suscipit facilysis ut vel urna.`,
  `Vestibulum pharetra purus nec lectus pulvinar aliquam.`,
  `Interdum et malesuada fames ac ante ipsum primis in faucibus.`,
  `Sed eu facilysis libero.`,
  `Aliquam non efficitur odio.`,
  `Aliquam ut ultricies elit.`,
  `Aenean lacinia vehicula pulvinar.`,
  `Proin malesuada tellus lacus, porttitor porttitorex risus mattis id.`,
  `Duis pulvinar sapien id urna ultrices fermentum.`,
  `Vivamus hendrerit tempor purus, wel suscipit justo sagittis sed.`,
  `Integer semper neque imperdiet elit venenatis, id malesuada eros rutrum.`,
  `Sed nec placerat ante, et euismod leo.`,
  `Donec aliquet est ipsum, at volutpat est tincidunt vitae.`,
  `Morbi leo velit, faucibus sit amet viverra eu, bibendum ac ex.`,
  `Quisque maximus ultrices nibh sed suscipit.`,
  `In ornare eu feliz et luctus.`,
  `Proin efficitur tincidunt ipsum, a faucibus tortor lacinia a.`,
  `Quisque cursus odio ac enim scelerisque condimentum.`,
  `Vestibulum non elementum est.`,
  `Aenean ac risus bibendum, lacinia nulla quis, mollis sem.`,
  `Duis eu orci id nibh porta feugiat sed et justo.`,
  `Nulla suscipit tincidunt lacus, nec dictum massa dictum szelerisque.`,
  `Etiam feugiat facilysis tincidunt.`,
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
    console.log(`letter position` + `:` + listOfPositions[selectedPosition]);
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
addLoremIpsum(listOfLetterPos)\

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
  const sectionText = $(`#lorem-ipsum`);

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
