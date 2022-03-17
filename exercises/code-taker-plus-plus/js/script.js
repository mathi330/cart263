/**
Code Taker
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

$(`.secret`).one(`mouseover`, function (event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`,
  });
});

$(`#answer`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`, 500);
    if ($(this).text() === `Theremin`) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function () {
      $(this).dialog(`close`);
    },
  },
});
