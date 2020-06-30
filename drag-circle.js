isGameStarted = false;
isGameBeginPlay = false;

// #################################
// #################################
// #################################

//track player color choice
var playerOneColor = '',
  playerTwoColor = '';

//track player turn
var isPlayerOneActive = false;

function resetGame() {
  isGameStarted = false;
  isGameBeginPlay = false;
  isPlayerOneActive = true;

  let start = document.getElementById('start-button');
  start.style.visibility = 'visible';
  let reset = document.getElementById('reset-button');
  reset.style.visibility = 'hidden';

  let player = document.getElementById('begin-player');
  player.style.visibility = 'hidden';
  let player1 = document.getElementById('begin-player-1');
  player1.style.visibility = 'hidden';
  let player2 = document.getElementById('begin-player-2');
  player2.style.visibility = 'hidden';

  let activeplayer1 = document.getElementById('active-player-1');
  activeplayer1.style.visibility = 'hidden';
  let activeplayer2 = document.getElementById('active-player-2');
  activeplayer2.style.visibility = 'hidden';
  hideColors();
  c1 = null;
  c2 = null;
  clearCanvas();
}

function startGame() {
  isGameStarted = true;
  let start = document.getElementById('start-button');
  start.style.visibility = 'hidden';
  let player = document.getElementById('begin-player');
  player.style.visibility = 'visible';
  let player1 = document.getElementById('begin-player-1');
  player1.style.visibility = 'visible';
  isPlayerOneActive = true;

  let activeplayer1 = document.getElementById('active-player-1');
  activeplayer1.style.visibility = 'visible';
  showColors();
  createGrid();
}

function beginPlay() {
  isPlayerOneActive = isGameBeginPlay = true;
  let begin = document.getElementById('begin-button');
  begin.style.visibility = 'hidden';
  let reset = document.getElementById('reset-button');
  reset.style.visibility = 'visible';
  hideColors();
  showColorbyPlayer();
  draw();
}

function pickcolor(val) {
  if (!isGameBeginPlay) {
    if (isPlayerOneActive) {
      playerOneColor = val;
      let player1 = document.getElementById('begin-player-1');
      player1.style.visibility = 'hidden';
      let player2 = document.getElementById('begin-player-2');
      player2.style.visibility = 'visible';
      isPlayerOneActive = false;
      hideColor(val);
    } else {
      playerTwoColor = val;
      let player = document.getElementById('begin-player');
      player.style.visibility = 'hidden';
      let player2 = document.getElementById('begin-player-2');
      player2.style.visibility = 'hidden';
      let begin = document.getElementById('begin-button');
      begin.style.visibility = 'visible';
      hideColor(val);
    }
  }
}

function showColorbyPlayer() {
  let colorPicker = playerOneColor;
  if (!isPlayerOneActive) {
    colorPicker = playerTwoColor;
  }
  let color = document.getElementById('color-' + colorPicker);
  color.style.visibility = 'visible';

  if (isPlayerOneActive) {
    colorPicker = playerTwoColor;
  } else {
    colorPicker = playerOneColor;
  }
  color = document.getElementById('color-' + colorPicker);
  color.style.visibility = 'hidden';
}

function showColors() {
  let colors = ['red', 'green', 'yellow', 'blue', 'black'];
  colors.forEach((color) => {
    showColor(color);
  });
}

function hideColors() {
  let colors = ['red', 'green', 'yellow', 'blue', 'black'];
  colors.forEach((color) => {
    hideColor(color);
  });
}

function hideColor(val) {
  let color = document.getElementById('color-' + val);
  color.style.visibility = 'hidden';
}

function showColor(val) {
  let color = document.getElementById('color-' + val);
  color.style.visibility = 'visible';
}
// #################################
// #################################
// #################################

//track mouse position on mousemove
var mousePosition;
//track state of mousedown and up
var isMouseDown;

//reference to the canvas element
var c = document.getElementById('myCanvas');
//reference to 2d context
var ctx = c.getContext('2d');

//add listeners
document.addEventListener('mousemove', move, false);
document.addEventListener('mousedown', setDraggable, false);
document.addEventListener('mouseup', setDraggable, false);

//make some circles
var c1 = null; // = new Circle(50, 50, 50, playerOneColor, 'black');
var c2 = null; // = new Circle(200, 50, 50, playerTwoColor, 'black');
// var c3 = new Circle(350, 50, 50, 'blue', 'black');
//initialise our circles
var circles = [];

//clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, c.width, c.height);
}

//main draw method
function draw() {
  clearCanvas();
  if (isGameBeginPlay && c1 === null) {
    c1 = new Circle(50, 50, 20, playerOneColor, 'black');
    c2 = new Circle(200, 50, 20, playerTwoColor, 'black');
    //initialise our circles
    circles = [c1, c2];
  }
  drawCircles();
}

//draw circles
function drawCircles() {
  for (var i = circles.length - 1; i >= 0; i--) {
    circles[i].draw();
  }
}

//key track of circle focus and focused index
var focused = {
  key: 0,
  state: false,
};

//circle Object
function Circle(x, y, r, fill, stroke) {
  this.startingAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.x = x;
  this.y = y;
  this.r = r;

  this.fill = fill;
  this.stroke = stroke;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.startingAngle, this.endAngle);
    ctx.fillStyle = this.fill;
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.strokeStyle = this.stroke;
    ctx.stroke();
  };
}

function createGrid() {
  var canvasOffset = 200;
  var x = 20;
  var y = 20 + canvasOffset;
  var width = 50;
  var height = 50;

  var xOffset = 55;
  var yOffset = 55;
  var rowCount = 0;
  var columnCount = 0;

  var rowLength = 6;
  var columnLength = 7;
  // var rowArray = new Array(rowLength);
  // var columnArray = new Array(columnLength);
  // var gridArray = [rowArray, columnArray];
  var gridArray = [...Array(rowLength)].map((x) =>
    Array(columnLength).fill(null)
  );

  gridArray.forEach((row) => {
    if (columnCount === columnLength) {
      columnCount = 0;
      x = 20;
      rowCount++;
      y = y + yOffset;
    }
    row.forEach((column) => {
      let sq = new Square(x, y, width, height);
      sq.draw();
      gridArray[rowCount][columnCount] = sq;

      columnCount++;
      x = x + xOffset;
    });
  });
}

function Square(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.draw = function () {
    // ctx.fillRect(x, y, width, height);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x, y, width, height);
  };
}

function move(e) {
  if (!isMouseDown) {
    return;
  }
  getMousePosition(e);
  if (isGameBeginPlay) {
    //if any circle is focused
    if (focused.state) {
      circles[focused.key].x = mousePosition.x;
      circles[focused.key].y = mousePosition.y;
      draw();
      return;
    }
    //no circle currently focused check if circle is hovered
    for (var i = 0; i < circles.length; i++) {
      if (intersects(circles[i])) {
        circles.move(i, 0);
        focused.state = true;
        break;
      }
    }
    draw();
  }
}

//set mousedown state
function setDraggable(e) {
  var t = e.type;
  if (t === 'mousedown') {
    isMouseDown = true;
  } else if (t === 'mouseup') {
    isMouseDown = false;
    releaseFocus();
  }
}

function releaseFocus() {
  focused.state = false;
}

function getMousePosition(e) {
  var rect = c.getBoundingClientRect();
  mousePosition = {
    x: Math.round(e.x - rect.left),
    y: Math.round(e.y - rect.top),
  };
}

//detects whether the mouse cursor is between x and y relative to the radius specified
function intersects(circle) {
  // subtract the x, y coordinates from the mouse position to get coordinates
  // for the hotspot location and check against the area of the radius
  var areaX = mousePosition.x - circle.x;
  var areaY = mousePosition.y - circle.y;
  //return true if x^2 + y^2 <= radius squared.
  return areaX * areaX + areaY * areaY <= circle.r * circle.r;
}

Array.prototype.move = function (old_index, new_index) {
  if (new_index >= this.length) {
    var k = new_index - this.length;
    while (k-- + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};
// draw();

// #################################
// #################################
// #################################
