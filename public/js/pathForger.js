var size = 16; // Size of maze
var window_width = window.innerWidth;
var window_height = window.innerHeight;

// Draw the maze
var drawMaze = function(maze) {
  var mount = document.getElementById('mount');
  for (var i = 0; i < maze.length; i++){
    for (var j = 0; j < maze[0].length; j++){
      var block = document.createElement('div');
      block.style.display = 'inline-block';
      block.style.width = (window_width / maze.length) - 1 + 'px';
      // block.style.height = window_height / maze[0].length + 'px';
      block.style.height = block.style.width;
      maze[i][j] ? block.style.backgroundColor = '#212121': block.style.backgroundColor = 'white';
      mount.appendChild(block);
    }
  }
};


var counter = 0;

// Creates empty row for maze
var createRow = function () {
  var newRow = []
  for (var i = 0; i < size; i++) {
    newRow.push(false);
  }
  return newRow;
};

// Initialize Maze
var maze = [];
for (var i = 0; i < size; i++) {
  maze.push(createRow());
}

// Testing purposes
var printMaze = function () {
  for (var i = 0; i < maze.length; i++) {
    var rowString = '';
    for (var j = 0; j < maze.length; j++) {
      rowString += maze[j][i] + '\t';
    }
    console.log(rowString);
  }
  console.log();
};

// Function to make getting coordinate values easier
var getCoordinate = function (pos) {
  return maze[pos.x][pos.y];
}

// Function to make updating coordinates easier
var updateCoordinate = function (pos, value) {
  maze[pos.x][pos.y] = value;
}

// Initialize start and endpoints
var start = {x: 0, y: 0};
var end = {x: size - 1, y: size - 1};

updateCoordinate(start, true);
updateCoordinate(end, true);

// Forge "happy path"

// Wrapper to recursive function
var layDownHappyPath = function () {
  forgePath(start);
};

// Explore which path to take
var forgePath = function (pos) {
  // There is forging left to do
  var potentialSpots = findNeighbors(pos);

  while (potentialSpots.length > 0) {
    // Randomly pick from potentialSpots
    var index = Math.floor(Math.random()*potentialSpots.length);
    var spot = potentialSpots[index];

    // if (forgeSpot(potentialSpots[index])) {
    //   return true;
    // }
    forgeSpot(potentialSpots[index]);

    // Remove spot from the potential spots
    potentialSpots.splice(index, 1);
  }

  return false;
};

// Choose a path and forge it
var forgeSpot = function (pos) {
  console.log(counter++);
  // BASE CASE --> We hit the end of the maze
  if (pos.x == size - 1 && pos.y == size - 1) {
    return true;
  }
  // If we have not been here, and we can go here...
  if (canMove(pos) && !getCoordinate(pos)) {
    updateCoordinate(pos, true);
    var isHappy = forgePath(pos);
    if (isHappy) {
      return true;
    } // else {
    //   // If this path didn't lead us to the end of the maze
    //   updateCoordinate(pos, false);
    // }
  }
  return false;
};

// Determines whether you can move to the given position
var canMove = function (pos) {
  if (!isValidSpot(pos)) {
    return false;
  }
  if (makesWideHall(pos)) {
    return false;
  }
  return true;
};

// Is this spot in the maze?
var isValidSpot = function (pos) {
  if (pos.x < 0 || pos.x >= size) {
    return false;
  }
  if (pos.y < 0 || pos.y >= size) {
    return false;
  }
  return true;
};

// Does this spot make a wide hall?
// Check for adjacent cartesian "walkways", and then check for the position between them,
// and diagonal to the current position, making a 2x2 square
// 2x2 square is the 'base case' for a wide hall
var makesWideHall = function (pos) {
  var l = leftSpace(pos);
  var ul = upSpace(l);
  var u = rightSpace(ul);
  var ur = rightSpace(u);
  var r = downSpace(ur);
  var rd = downSpace(r);
  var d = leftSpace(rd);
  var dl = leftSpace(d);

  // Check each corner and its adjacent tiles

  if (isValidSpot(l) && isValidSpot(ul) && isValidSpot(u)) {
    if (getCoordinate(l) && getCoordinate(ul) && getCoordinate(u)) {
      return true;
    }
  }

  if (isValidSpot(u) && isValidSpot(ur) && isValidSpot(r)) {
    if (getCoordinate(u) && getCoordinate(ur) && getCoordinate(r)) {
      return true;
    }
  }

  if (isValidSpot(r) && isValidSpot(rd) && isValidSpot(d)) {
    if (getCoordinate(r) && getCoordinate(rd) && getCoordinate(d)) {
      return true;
    }
  }

  if (isValidSpot(d) && isValidSpot(dl) && isValidSpot(l)) {
    if (getCoordinate(d) && getCoordinate(dl) && getCoordinate(l)) {
      return true;
    }
  }

  return false;
};

// Retrieves neighbors (legitimate or not) for given position
var findNeighbors = function (pos) {
  var potentialSpots = [];
  potentialSpots.push(rightSpace(pos));
  potentialSpots.push(downSpace(pos));
  potentialSpots.push(leftSpace(pos));
  potentialSpots.push(upSpace(pos));
  return potentialSpots;
};

var rightSpace = function (pos) {
  return {
    x: pos.x + 1,
    y: pos.y
  }
};

var leftSpace = function (pos) {
  return {
    x: pos.x - 1,
    y: pos.y
  }
};

var upSpace = function (pos) {
  return {
    x: pos.x,
    y: pos.y - 1
  }
};

var downSpace = function (pos) {
  return {
    x: pos.x,
    y: pos.y + 1
  }
};

layDownHappyPath();
// printMaze();



drawMaze(maze);
