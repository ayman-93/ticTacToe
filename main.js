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
  level: "hard"
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
let woosh = $("#woosh");
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

//to check if the game is tie, it's run after all the square is played
function tie(first, second) {
  if (
    (first.stack.length === 5 && second.stack.length === 4) ||
    (first.stack.length === 4 && second.stack.length === 5)
  ) {
    gameOver = true;
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
function startGame(first, second) {
  if ($("#playerOneN").val()) first.name = $("#playerOneN").val();
  if ($("#playerTwoN").val()) second.name = $("#playerTwoN").val();
  let score = $(".score");
  let options = $(".options");

  score.append(
    `<p id='scoreOne' >${first.name}: ${first.wins}</p><p id='scoreTwo'>${
      second.name
    }: ${second.wins}</p>`
  );
  $(".ready").slideUp();
  score.slideDown();
  options.slideDown();
}
//this function reset play area and the players stacks and update the scores
function playAgain(first, second) {
  first.stack = [];
  second.stack = [];
  played = [];
  gameOver = false;

  $(".square").removeClass("x");
  $(".square").removeClass("o");
  $(".result").slideUp();
  $("#scoreOne").replaceWith(
    `<p id='scoreOne'>${first.name}: ${first.wins}</p>`
  );
  $("#scoreTwo").replaceWith(
    `<p id='scoreTwo'>${second.name}: ${second.wins}</p>`
  );
  if (second.name === "Computer" && second.turn === true) {
    computerPlay(first, second);
  }
}
//this function run if someone win, display his name, his score and play wining sound
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

//this one return the missing winning pattrin i use it to close the way of player one or to win.
function tryToWin(playerSstack) {
  console.log("try to win ");
  match = 0;
  for (let win of winPattrens) {
    for (let i = 0; i < playerSstack.stack.length; i++) {
      if (win.includes(playerSstack.stack[i])) {
        match++;
        if (match === 2) {
          console.log("Win in bad ", win);
          console.log("O stack is ", playerSstack.stack);

          console.log("win !U O is ", win.diff(playerSstack.stack)[0]);
          if (played.includes(win.diff(playerSstack.stack)[0])) {
            console.log("O stack", playerSstack.stack);
            console.log("PLayed ", played);
            console.log("continue at ", win);
            continue;
          } else {
            console.log("O stack", playerSstack.stack);
            console.log(
              "played not includes ",
              win.diff(playerSstack.stack)[0]
            );
            return win.diff(playerSstack.stack)[0];
          }
        }
      }
    }
    match = 0;
  }
}
// function imBad(first) {
//   console.log("Bad ");
//   match = 0;
//   for (let win of winPattrens) {
//     for (let i = 0; i < first.stack.length; i++) {
//       if (win.includes(first.stack[i])) {
//         match++;
//         if (match === 2) {
//           console.log("Win in bad ", win);
//           console.log("X stack is ", first.stack);

//           console.log("win !U X is ", win.diff(first.stack)[0]);
//           if (played.includes(win.diff(first.stack)[0])) {
//             console.log("X stack", first.stack);
//             console.log("PLayed ", played);
//             console.log("continue at ", win);
//             continue;
//           } else {
//             console.log("X stack", first.stack);
//             console.log("played not includes ", win.diff(first.stack)[0]);
//             return win.diff(first.stack)[0];
//           }
//         }
//       }
//     }
//     match = 0;
//   }
// }
/* */

//this one try to win first if not possible try to close the way of the other player
function smart(first, second) {
  playCo = tryToWin(second);
  if (playCo === undefined) {
    playCo = tryToWin(first);
  }
  return playCo;
}

//I use this to find the empty squares
let possibles = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
//to play in any possible place
function dumy() {
  console.log("dummy..........");
  canPlay = possibles.diff(played);
  canPlay = canPlay[Math.floor(Math.random() * canPlay.length)];
  return canPlay;
}
//this function will make the computer play
function computerPlay(first, second) {
  if (computer.level === "easy") {
    canPlay = dumy();
  } else if (computer.level === "hard") {
    canPlay = smart(first, second);
    if (canPlay === undefined) {
      if (!played.includes("5")) {
        canPlay = "5";
        console.log("this one 5");
      } else if (
        (first.stack.includes("3") && first.stack.includes("7")) ||
        (first.stack.includes("1") && first.stack.includes("9"))
      ) {
        console.log("woooooow222");
        canPlay = "2";
      } else if (!played.includes("1")) {
        console.log("woooooow11");
        canPlay = "1";
      } else {
        canPlay = dumy();
      }
    }
    console.log("Here is array ", canPlay);
  }

  if (!second.stack.includes(canPlay)) {
    $(`#${canPlay}`).addClass("o");
    woosh.trigger("play");
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
function secondPlay(event, first, second) {
  let square = event.target;

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
    first.turn = true;
  }
  console.log("Turn changed to player one");
}

function play(event, first, second) {
  if (first.turn) {
    firstPlay(event, first, second, played);
    console.log("Player One played");
  } else {
    secondPlay(event, first, second);
    console.log("Player Two played");
  }
  if (
    second.name === "Computer" &&
    second.turn === true &&
    gameOver === false
  ) {
    computerPlay(first, second, played);
    console.log("Computer played");
  }
}

let firstPlayer = playerOne;
let secondPlayer = playerTwo;
//add a new function to the array object to get the different between two array
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

//to change the level of the computer
$("#computerLevel input").on("change", function() {
  let level = $("input[name=level]:checked", "#computerLevel").val();
  computer.level = level;
});

let playArea = $(".playing");
playArea.on("click", function() {
  play(event, firstPlayer, secondPlayer, played);
});

let start = $("#start");
start.on("click", function() {
  startGame(firstPlayer, secondPlayer);
});

let again = $("#playAgain");
again.on("click", function() {
  playAgain(firstPlayer, secondPlayer);
});
