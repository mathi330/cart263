/**
Code Taker
Mathilde Davan


*/

"use strict";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let $letters = [];
const numLetters = 200;

createLetters();

function createLetters() {
  for (let i = 0; i < numLetters; i++) {
    createLetter(getRndInteger(10, $(`body`).height() / 2 - 10));
    createLetter(
      getRndInteger($(`body`).height() / 2 + 53, $(`body`).height() - 20)
    );
  }
}

function createLetter(yPosition) {
  let $letter = $(`<span></span>`);

  $letter.css({
    position: `absolute`,
    left: getRndInteger(20, $(`body`).width() - 20),
    top: yPosition,
  });

  let randomNum = Math.floor(Math.random() * alphabet.length);
  $letter.text(alphabet[randomNum]);

  $letter.addClass(`secret`);

  $letters.push($letter);
  $(`#poem`).append($letters);
}

$(`.secret`).on(`mouseover`, function (event) {
  $(this).addClass(`found`, 100);

  $(this).draggable({
    start: function (event, ui) {
      $(this).addClass(`found`);
    },

    stop: function (event, ui) {
      $(this).removeClass(`found`);
    },
  });
});

$(`.secret`).on(`mouseleave`, function (event) {
  $(this).removeClass(`found`, 500);
});

$(`#answer`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.remove();
    if ($(this).text() === `Theremin`) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});

$(`#solved-dialog`).dialog({
  // autoOpen: false,
  modal: true,
  buttons: {
    Okay: function () {
      $(this).dialog(`close`);
    },
  },
});

/**
getRndInteger(min, max)
random function taken from w3school that takes a random integral between a min and max determined when it is used

https://www.w3schools.com/JS/js_random.asp
*/
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // return a random integral between the min and max
}
