//Each player has an object
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
//functuon to check the winner every time somone play its run
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
//to check if the game is tie it's run after all the square is played
function tie() {
  if (
    (playerOne.stack.length === 5 && playerTwo.stack.length === 4) ||
    (playerOne.stack.length === 4 && playerTwo.stack.length === 5)
  )
    return true;
}

//this function take the players names and slide up the first layer its run on the beginning of the game only
function startGame() {
  playerOne.name = $("#playerOneN").val();
  playerTwo.name = $("#playerTwoN").val();
  let score = $(".score");
  score.append(
    `<p id='scoreOne' >${playerOne.name}: ${
      playerOne.wins
    }</p><p id='scoreTwo'>${playerTwo.name}: ${playerTwo.wins}</p>`
  );
  $(".ready").slideUp();
  score.slideDown();
  console.log(playerOne.name);
  console.log(playerTwo.name);
}
//this function reset play area and the players stacks and update the scores
function playAgain() {
  playerOne.stack = [];
  playerTwo.stack = [];
  $(".square").removeClass("x");
  $(".square").removeClass("o");
  $(".result").slideUp();
  $("#scoreOne").replaceWith(
    `<p id='scoreOne'>${playerOne.name}: ${playerOne.wins}</p>`
  );
  $("#scoreTwo").replaceWith(
    `<p id='scoreTwo'>${playerTwo.name}: ${playerTwo.wins}</p>`
  );
}
//this is the main function
function play(event) {
  let square = event.target;
  let win = $("#win");
  let tic = $("#tic");
  let woosh = $("#woosh");
  if (playerOne.turn) {
    // console.log(square);
    //to check if the plce have been played before
    if ($(square).hasClass("x") || $(square).hasClass("o")) {
      console.log("play some thing else");
    } else {
      tic.trigger("play");
      $(square).addClass("x");
      let value = square.id;
      //add the played square to the player stack
      playerOne.stack.push(value);
      if (checkWin(playerOne.stack)) {
        console.log("We have a winer");
        win.trigger("play");
        //inctrement the number of wins.
        playerOne.wins++;
        //to update the result bord with the winner name and number of wins.
        $("#playerName").replaceWith(
          "<p id='playerName'>The winner is " + playerOne.name + "</p>"
        );
        $("#wins").replaceWith(
          "<p id='wins'>Number of wins: " + playerOne.wins + "</p>"
        );
        //to slide down(show) the result
        $(".result").slideDown({
          start: function() {
            $(this).css({
              display: "flex"
            });
          }
        });
      } else if (tie()) {
        console.log("TIE");
        $("#playerName").text("");
        $("#wins").replaceWith("<p id='wins'>TIE</p>");

        $(".result").slideDown({
          start: function() {
            $(this).css({
              display: "flex"
            });
          }
        });
      }
      console.log("Turn changed to player two");
      playerOne.turn = false;
    }
  } else {
    if ($(square).hasClass("x") || $(square).hasClass("o")) {
      console.log("play some thing else");
    } else {
      woosh.trigger("play");
      $(square).addClass("o");
      let value = square.id;
      playerTwo.stack.push(value);
      if (checkWin(playerTwo.stack)) {
        console.log("We have a winer");

        win.trigger("play");
        playerTwo.wins++;
        $("#playerName").replaceWith(
          "<p id='playerName'>The winner is " + playerTwo.name + "</p>"
        );
        $("#wins").replaceWith(
          "<p id='wins'>Number of wins: " + playerTwo.wins + "</p>"
        );
        $(".result").slideDown({
          start: function() {
            $(this).css({
              display: "flex"
            });
          }
        });
      } else if (tie()) {
        console.log("TIE");
        $("#playerName").text("");
        $("#wins").replaceWith("<p id='wins'>TIE</p>");

        $(".result").slideDown({
          start: function() {
            $(this).css({
              display: "flex"
            });
          }
        });
      }
      console.log("Turn changed to player one");
      playerOne.turn = true;
    }
  }
}

let playArea = $(".playing");
playArea.on("click", play);

let start = $("#start");
start.on("click", startGame);

let again = $("#playAgain");
again.on("click", playAgain);
