let playArea = $(".playArea");

function play(event) {
  let square = event.target;
  console.log(square);
  $(square).addClass("x");
}
playArea.on("click", play);
