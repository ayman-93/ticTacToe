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
  turn: false,
  level: "medium"
};
let gameOver = false;
let played = [];
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
//functuon to check the winner every time somone play its run
function checkWin(playerStack) {
  let match = 0;
  for (let win of winPattrens) {
    for (let i = 0; i < playerStack.length; i++) {
      if (win.includes(playerStack[i])) {
        match++;
        if (match === 3) {
          gameOver = true;
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
  if (second.name === "Computer" && first.turn === false) {
    computerPlay(first, second);
  }
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
let possibles = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
function tryToWin(second) {
  console.log("try to win ");
  match = 0;
  for (let win of winPattrens) {
    for (let i = 0; i < second.stack.length; i++) {
      if (win.includes(second.stack[i])) {
        match++;
        if (match === 2) {
          console.log("Win in bad ", win);
          console.log("X stack is ", second.stack);

          console.log("win !U X is ", win.diff(second.stack)[0]);
          if (played.includes(win.diff(second.stack)[0])) {
            console.log("X stack", second.stack);
            console.log("PLayed ", played);
            console.log("continue at ", win);
            continue;
          } else {
            console.log("X stack", second.stack);
            console.log("played not includes ", win.diff(second.stack)[0]);
            return win.diff(second.stack)[0];
          }
        }
      }
    }
    match = 0;
  }
}
function imBad(first) {
  console.log("Bad ");
  match = 0;
  for (let win of winPattrens) {
    for (let i = 0; i < first.stack.length; i++) {
      if (win.includes(first.stack[i])) {
        match++;
        if (match === 2) {
          console.log("Win in bad ", win);
          console.log("X stack is ", first.stack);

          console.log("win !U X is ", win.diff(first.stack)[0]);
          if (played.includes(win.diff(first.stack)[0])) {
            console.log("X stack", first.stack);
            console.log("PLayed ", played);
            console.log("continue at ", win);
            continue;
          } else {
            console.log("X stack", first.stack);
            console.log("played not includes ", win.diff(first.stack)[0]);
            return win.diff(first.stack)[0];
          }
        }
      }
    }
    match = 0;
  }
}
function smart(first, second) {
  playCo = tryToWin(second);
  if (playCo === undefined) {
    playCo = imBad(first);
    if (playCo === undefined) {
      if (!played.includes("4")) playCo = "4";
      else if (!played.includes("2")) playCo = "2";
      else if (!played.includes("6")) playCo = "6";
      else if (!played.includes("8")) playCo = "8";
      else playCo = dumy();
    }
  }
  return playCo;
}

function dumy() {
  console.log("dummy..........");
  canPlay = possibles.diff(played);
  canPlay = canPlay[Math.floor(Math.random() * canPlay.length)];
  return canPlay;
}
function computerPlay(first, second) {
  if (computer.level === "easy") {
    canPlay = dumy();
  } else if (computer.level === "medium") {
    if (!played.includes("5")) {
      canPlay = "5";
      console.log("this one 5");
    } else canPlay = smart(first, second);

    console.log("Here is array ", canPlay);
  }

  if (!second.stack.includes(canPlay)) {
    $(`#${canPlay}`).addClass("o");
    second.stack.push(canPlay);
    played.push(canPlay);
  } else {
    console.log("computer cant play ", canPlay);
    return "Wrong";
  }
  console.log("Computer Stack", second.stack);

  if (checkWin(second.stack)) {
    console.log("Computer win");
    winar(second);
  } else if (tie(first, second)) {
    console.log("TIE");
  }
  console.log("played", canPlay);

  first.turn = true;
  second.turn = false;
}

function firstPlay(event, first, second, played) {
  let square = event.target;

  let tic = $("#tic");
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
      console.log("Player One is a winer");
      winar(first);
    } else if (tie(first, second)) {
      console.log("TIE");
    }
    first.turn = false;
    second.turn = true;
  }
}
function secondPlay(event, first, second, played) {
  let square = event.target;
  let woosh = $("#woosh");
  if ($(square).hasClass("x") || $(square).hasClass("o")) {
    console.log("play some thing else");
  } else {
    woosh.trigger("play");
    $(square).addClass("o");
    let value = square.id;
    second.stack.push(value);
    if (checkWin(second.stack)) {
      winar(second);
    } else if (tie(first, second)) {
      console.log("TIE");
    }
  }
  console.log("Turn changed to player one");
  first.turn = true;
}
function play(event, first, second) {
  gameOver = false;
  if (firstPlayer.turn) {
    firstPlay(event, first, second, played);
    console.log("Player One played");
  } else {
    secondPlay(event, first, second);
    console.log("Player Two played");
  }
  if (second.name === "Computer" && gameOver === false) {
    computerPlay(first, second, played);
    console.log("Computer played");
  }
}

let firstPlayer = playerOne;
let secondPlayer = playerTwo;

Array.prototype.diff = function(a) {
  return this.filter(function(i) {
    return a.indexOf(i) < 0;
  });
};

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
