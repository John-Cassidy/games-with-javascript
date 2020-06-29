isGameStarted = false;
isGameBeginPlay = false;

//track mouse position on mousemove
var mousePosition;
//track state of mousedown and up
var isMouseDown;

//reference to the canvas element
var c = document.getElementById('myCanvas');
//reference to 2d context
var ctx = c.getContext('2d');

function resetGame() {
  isGameStarted = false;
  isGameBeginPlay = false;

  let start = document.getElementById('start-button');
  start.style.visibility = 'visible';
  let reset = document.getElementById('reset-button');
  reset.style.visibility = 'hidden';
}

function startGame() {
  isGameStarted = true;
  let start = document.getElementById('start-button');
  start.style.visibility = 'hidden';
  let begin = document.getElementById('begin-button');
  begin.style.visibility = 'visible';
}

function beginPlay() {
  isGameBeginPlay = true;
  let begin = document.getElementById('begin-button');
  begin.style.visibility = 'hidden';
  let reset = document.getElementById('reset-button');
  reset.style.visibility = 'visible';
}
