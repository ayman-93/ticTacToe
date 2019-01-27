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
    console.log(square);
    $(square).addClass("x");
    playerOne.turn = false;
  } else {
    $(square).addClass("o");
    playerOne.turn = true;
  }
}

playArea.on("click", play);
