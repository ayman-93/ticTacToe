//Each player has an object
let playerOne = {
  name: "Player One",
  stack: [],
  wins: 0,
  turn: true
};

let playerTwo = {
  name: "Player Two",
  stack: [],
  wins: 0,
  turn: false
};
let computer = {
  name: "Computer",
  stack: [],
  wins: 0,
  turn: false
};

let played = [];
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
function tie(first, second) {
  if (
    (first.stack.length === 5 && second.stack.length === 4) ||
    (first.stack.length === 4 && second.stack.length === 5)
  ) {
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
}

//this function take the players names and slide up the first layer its run on the beginning of the game only
function startGame(event, first, second) {
  if ($("#playerOneN").val()) first.name = $("#playerOneN").val();
  if ($("#playerTwoN").val()) second.name = $("#playerTwoN").val();
  let score = $(".score");
  score.append(
    `<p id='scoreOne' >${first.name}: ${first.wins}</p><p id='scoreTwo'>${
      second.name
    }: ${second.wins}</p>`
  );
  $(".ready").slideUp();
  score.slideDown();
}
//this function reset play area and the players stacks and update the scores
function playAgain(event, first, second) {
  first.stack = [];
  second.stack = [];
  played = [];
  $(".square").removeClass("x");
  $(".square").removeClass("o");
  $(".result").slideUp();
  $("#scoreOne").replaceWith(
    `<p id='scoreOne'>${first.name}: ${first.wins}</p>`
  );
  $("#scoreTwo").replaceWith(
    `<p id='scoreTwo'>${second.name}: ${second.wins}</p>`
  );
}
function winar(player) {
  let win = $("#win");
  win.trigger("play");
  //inctrement the number of wins.
  player.wins++;
  //to update the result bord with the winner name and number of wins.
  $("#playerName").replaceWith(
    "<p id='playerName'>The winner is " + player.name + "</p>"
  );
  $("#wins").replaceWith(
    "<p id='wins'>Number of wins: " + player.wins + "</p>"
  );
  //to slide down(show) the result
  $(".result").slideDown({
    start: function() {
      $(this).css({
        display: "flex"
      });
    }
  });
}
///////Not working
function computerPlay(event, played) {
  play();
}
/////////
//this is the main function
function play(event, first, second, played) {
  let square = event.target;

  let tic = $("#tic");
  let woosh = $("#woosh");
  if (first.turn) {
    // console.log(square);
    //to check if the plce have been played before
    if ($(square).hasClass("x") || $(square).hasClass("o")) {
      console.log("play some thing else");
    } else {
      tic.trigger("play");
      $(square).addClass("x");
      let value = square.id;
      //add the played square to the player stack
      first.stack.push(value);
      played.push(value);
      if (checkWin(first.stack)) {
        console.log("We have a winer");
        winar(first);
      } else if (tie(first, second)) {
        console.log("TIE");
      }
      console.log("Turn changed to player two");
      first.turn = false;
      second.turn = true;
      if (second.turn) {
        // computerPlay(played);
      }
    }
    //Player two
  } else {
    if ($(square).hasClass("x") || $(square).hasClass("o")) {
      console.log("play some thing else");
    } else {
      woosh.trigger("play");
      $(square).addClass("o");
      let value = square.id;
      second.stack.push(value);
      if (checkWin(second.stack)) {
        console.log("We have a winer");
        winar(second, played);
      } else if (tie(first, second)) {
        console.log("TIE");
      }
    }
    console.log("Turn changed to player one");
    first.turn = true;
    second.turn = false;
  }
}

let firstPlayer = playerOne;
let secondPlayer = playerTwo;
//play with computer or with two players
$("#myForm input").on("change", function() {
  let playingType = $("input[name=playType]:checked", "#myForm").val();
  if (playingType === "computer") {
    $("#playerTwoN").slideUp();
    $("#playerTwoLable").slideUp();
    secondPlayer = computer;
    console.log(secondPlayer.name);
  } else {
    $("#playerTwoN").slideDown();
    $("#playerTwoLable").slideDown();
    secondPlayer = playerTwo;
    console.log(secondPlayer.name);
  }
});
let playArea = $(".playing");
playArea.on("click", function() {
  play(event, firstPlayer, secondPlayer, played);
});

let start = $("#start");
start.on("click", function() {
  startGame(event, firstPlayer, secondPlayer);
});

let again = $("#playAgain");
again.on("click", function() {
  playAgain(event, firstPlayer, secondPlayer, played);
});
