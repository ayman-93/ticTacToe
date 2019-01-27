let playerOne = {
  name: "",
  wins: 0,
  turn: true
};

let playerTwo = {
  name: "",
  wins: 0,
  turn: false
};
let playArea = $(".playArea");

function play(event) {
  let square = event.target;
  if (playerOne.turn) {
    // console.log(square);
    if ($(square).hasClass("x") || $(square).hasClass("o")) {
      console.log("play some thing else");
    } else {
      $(square).addClass("x");
      console.log("Turn changed to player two");
      playerOne.turn = false;
    }
  } else {
    if ($(square).hasClass("x") || $(square).hasClass("o")) {
      console.log("play some thing else");
    } else {
      $(square).addClass("o");
      console.log("Turn changed to player one");
      playerOne.turn = true;
    }
  }
}

playArea.on("click", play);
