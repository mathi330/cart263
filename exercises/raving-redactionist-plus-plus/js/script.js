/**
Raving Redactionist
Mathilde Davan

*/

"use strict";

// $(`.top-secret`).on(`click`, redact);
//
// setInterval(revelation, 500);
//
// function redact(event) {
//   $(this).removeClass(`revealed`);
//   $(this).addClass(`redacted`);
// }
//
// function revelation() {
//   $(`.redacted`).each(attemptReveal);
// }
//
// function attemptReveal() {
//   let r = Math.random();
//   if (r < 0.05) {
//     $(this).removeClass(`redacted`);
//     $(this).addClass(`revealed`);
//   }
// }

const loremIpsumTexts = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt sapien id suscipit dapibus. Nullam condimentum ante vitae neque laoreet maximus. Etiam viverra et ipsum at euismod. Aenean luctus nunc neque, eget malesuada felis dictum sed. Duis feugiat dui sit amet venenatis interdum. Maecenas sed erat vel orci elementum tempor eget vel ante. Quisque aliquet pretium leo, ac faucibus dui pharetra et. In sagittis felis vel velit posuere rutrum. Mauris venenatis ultrices tempus. Praesent congue finibus nisl sit amet dapibus. Nam hendrerit varius felis eget consequat. Nunc dapibus felis non tellus dapibus blandit. Suspendisse a augue ac dui blandit placerat vel vel dolor. Mauris et mi cursus velit aliquam mattis. Ut ac pulvinar turpis.`,
  `Suspendisse a nisl id diam posuere tempor vitae a justo. Quisque pharetra varius venenatis. Aenean et facilisis lectus. Vivamus lobortis nisl mi, a volutpat nisl dapibus sit amet. Ut ac vulputate leo, sit amet ultricies urna. Suspendisse porttitor cursus vulputate. Fusce bibendum sodales magna sit amet vehicula.`,
  `Aenean eu nisl id nunc dapibus faucibus. Donec ullamcorper nec tellus vitae facilisis. Etiam lacinia maximus eros vel auctor. Mauris eget dui vel sem convallis placerat. Donec egestas convallis libero id fringilla. Etiam sit amet iaculis libero. Ut faucibus, sem ac hendrerit cursus, lorem turpis semper nunc, ut lacinia diam neque vitae tortor. Curabitur vitae velit augue. Fusce sed molestie erat.`,
  `Cras imperdiet, eros in dictum sodales, elit nibh faucibus sapien, vitae vulputate risus leo a lacus. Praesent pellentesque varius urna nec facilisis. Praesent eu metus quis sapien tincidunt sollicitudin non id nibh. Aenean rutrum laoreet auctor. Aliquam consequat nisl nec libero sodales, eget condimentum sem dapibus. Sed in commodo ex, sit amet bibendum odio. Curabitur auctor, nibh eget feugiat vestibulum, magna ipsum gravida purus, ut suscipit erat nulla vel purus. Morbi vehicula porttitor faucibus. Fusce viverra lorem erat, nec congue est facilisis vitae.`,
  `Vivamus facilisis, felis at tempus pretium, leo turpis ullamcorper risus, sed maximus mi neque a sapien. Aliquam convallis orci quis quam sodales, ac luctus lectus elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam sit amet egestas arcu, nec elementum nulla. Mauris aliquet, tellus sit amet hendrerit pulvinar, sapien sapien bibendum purus, a ornare quam diam interdum leo. Suspendisse non accumsan enim. Duis ac lacus tincidunt, porta neque et, tempor lorem. Sed vehicula condimentum erat. Fusce eget dolor ac elit ullamcorper sodales. Maecenas congue odio a cursus viverra. Nullam euismod felis sapien, quis iaculis elit lobortis vel. Sed imperdiet, nunc id bibendum suscipit, justo magna interdum libero, ac lobortis urna magna sit amet mauris. In hac habitasse platea dictumst. In at justo lacinia, laoreet sapien id, malesuada eros. Mauris vel dapibus massa, ut pellentesque arcu.`,
  ``,
];

// array for the buttons
let $buttons = [];
let $numButtons = 20; // number of buttons on each side of the text
// finds 1/5 of the window
let fifthOfBodyWidth = $(document).width() / 5;

let changes = [
  `change the text's background color`,
  `change the background color of the redacted words`,
  ``,
];

// Add the lorem ipsum to the page (complete with event listeners)
addLoremIpsum();
// create buttons to the page
createButtons();

/**
Pippin's code for the word painter tranformed into Jquery (https://github.com/pippinbarr/cart263-2021/blob/main/examples/the-webpage/word-painter/js/script.js)

Goes through the lorem ipsum array and takes each word, wrapping it in a span
that responds to mouse over events in order to change color.
*/
function addLoremIpsum() {
  // Gets the section we will put the page content into
  const sectionText = $(`#secret-document`);
  // Loop through the array of strings
  for (let i = 0; i < loremIpsumTexts.length; i++) {
    // Create a <p> element
    const paragraph = $(`<p></p>`);
    // Get an array of individual words from the current string of lorem ipsum
    // by splitting it at every space character
    const words = loremIpsumTexts[i].split(` `);
    // Go through every word
    for (let j = 0; j < words.length; j++) {
      // Create a <span> element
      const span = $(`<span></span>`);
      // Add the "word" class to the span (not really doing much right now)
      span.addClass(`word`);
      // Set the text of the span to the current word so it will display
      span.text(`${words[j]} `);

      chooseRedactedWords(span);
      redactedBgColor();

      // Add the current span (word) the current paragraph
      paragraph.append(span);
    }
    // Add the current paragraph to the main section on the webpage
    sectionText.append(paragraph);
  }
}

/**
setup the buttons and their x positions
*/
function createButtons() {
  // create a new button on each side of the text until the number of button desired is reached
  for (let i = 0; i < $numButtons; i++) {
    // button on the left of the text
    createButton(getRndInteger(10, fifthOfBodyWidth * 0.8));
    // button on the right of the text
    createButton(
      getRndInteger(fifthOfBodyWidth * 3.9, fifthOfBodyWidth * 5 - 100)
    );
  }
}

/**
createButton
Function to create a button with css, text inside, in the #button-section section of html, and add it to the buttons' array
*/
function createButton(xPosition) {
  let $button = $(`<button></button>`); // create a button
  //add css properties to it
  $button.css({
    position: `absolute`,
    top: getRndInteger(20, $(`body`).height() - 20), // button's random y position (between 20px from the top and the bottom of the body)
    left: xPosition, // button's random x position determined in setup()
  });
  $button.text(`Click Me!`); // text in button

  $(`#button-section`).append($buttons); //place the button in the first section (#button-section)
  $buttons.push($button); // add the button at the end of the buttons array
}

/**
getRndInteger(min, max)
random function taken from w3school that takes a random integral between a min and max determined when it is used

https://www.w3schools.com/JS/js_random.asp
*/
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // return a random integral between the min and max
}

//------------------------------------
//------------------------------------

/**
create the different possible changes that can occur when a button is clicked
*/
for (let i = 0; i < $buttons.length; i++) {
  $buttons[i].on(`click`, createChange);
}

function createChange() {
  let whatChange = getRndInteger(0, changes.length);
  changes[whatChange];

  if (whatChange === 0) {
    backgroundColorChange();
  } else if (whatChange === 1) {
    redactedBgColor();
  } else if ((whatChange = 2)) {
    $(`p`).remove();
    addLoremIpsum();
  }
}

function backgroundColorChange() {
  let r = getRndInteger(0, 255);
  let g = getRndInteger(0, 255);
  let b = getRndInteger(0, 255);
  $(`#secret-document`).css({
    background: `radial-gradient(rgb(${r},${g},${b}), rgba(0, 0, 0, 0))`,
  });
}

function redactedBgColor() {
  let r = getRndInteger(0, 255);
  let g = getRndInteger(0, 255);
  let b = getRndInteger(0, 255);

  $(`.redacted`).css({
    color: `rgb(${r},${g},${b})`,
    "background-color": `rgb(${r},${g},${b})`,
  });
}

function chooseRedactedWords(span) {
  let rand = Math.random();
  if (rand < 0.2) {
    $(span).addClass(`redacted`);
  }
}
