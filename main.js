let playerOne = {
  name: "",
  stack: [],
  wins: 0,
  turn: true
};

let playerTwo = {
  name: "",
  stack: [],
  wins: 0,
  turn: false
};

function checkWin(playerStack) {
  let winPattrens = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"]
  ];
  let match = 0;
  for (let win of winPattrens) {
    for (let i = 0; i < playerStack.length; i++) {
      if (win.includes(playerStack[i])) {
        match++;
        if (match === 3) {
          return true;
        }
      }
    }
    match = 0;
  }
}

function play(event) {
  let square = event.target;
  if (playerOne.turn) {
    // console.log(square);
    if ($(square).hasClass("x") || $(square).hasClass("o")) {
      console.log("play some thing else");
    } else {
      $(square).addClass("x");
      let value = $(square).text();
      playerOne.stack.push(value);
      if (checkWin(playerOne.stack)) {
        console.log("We have a winer");
        playerOne.wins++;
        $("#playerName").replaceWith(
          "<p id='playerName'>The winner is " + playerOne.name + "</p>"
        );
        $("#wins").replaceWith(
          "<p id='wins'>Number of wins: " + playerOne.wins + "</p>"
        );

        $(".result").slideDown();
      }
      console.log("Turn changed to player two");
      playerOne.turn = false;
    }
  } else {
    if ($(square).hasClass("x") || $(square).hasClass("o")) {
      console.log("play some thing else");
    } else {
      $(square).addClass("o");
      let value = $(square).text();
      playerTwo.stack.push(value);
      if (checkWin(playerTwo.stack)) {
        console.log("We have a winer");
        playerTwo.wins++;
        $("#playerName").replaceWith(
          "<p id='playerName'>The winner is " + playerTwo.name + "</p>"
        );
        $("#wins").replaceWith(
          "<p id='wins'>Number of wins: " + playerTwo.wins + "</p>"
        );
        $(".result").slideDown();
      }
      console.log("Turn changed to player one");
      playerOne.turn = true;
    }
  }
}

function startGame() {
  playerOne.name = $("#playerOneN").val();
  playerTwo.name = $("#playerTwoN").val();
  $(".ready").slideUp();
  console.log(playerOne.name);
  console.log(playerTwo.name);
}

function playAgain() {
  playerOne.stack = [];
  playerTwo.stack = [];
  $(".square").removeClass("x");
  $(".square").removeClass("o");
  $(".result").slideUp();
}

let playArea = $(".playing");
playArea.on("click", play);

let start = $("#start");
start.on("click", startGame);

let again = $("#playAgain");
again.on("click", playAgain);
