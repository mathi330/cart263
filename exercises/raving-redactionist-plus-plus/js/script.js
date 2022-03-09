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

let $buttons = [];
let $numButtons = 20;

let fifthOfBodyWidth = $(`body`).width() / 5;

buttonsPositioning();

function buttonsPositioning() {
  for (let i = 0; i < $numButtons; i++) {
    createButton(getRndInteger(10, fifthOfBodyWidth * 0.9));
    createButton(
      getRndInteger(fifthOfBodyWidth * 3.9, fifthOfBodyWidth * 5 - 60)
    );
  }
}

function createButton(xPosition) {
  let $button = $(`<button></button>`);
  $button.css({
    position: "absolute",
    top: getRndInteger(20, $(`body`).height()),
    left: xPosition,
  });
  $button.text(`Click Me!`);

  $(`#button-section`).append($buttons);
  $buttons.push($button);
}

// https://www.w3schools.com/JS/js_random.asp
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
