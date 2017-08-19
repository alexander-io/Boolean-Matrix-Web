var size, maze, start, end, direction, walkways;

// Space to the right of the given position
var rightSpace = function (pos) {
  return {
    x: pos.x + 1,
    y: pos.y
  }
};

// Space to the left of the given position
var leftSpace = function (pos) {
  return {
    x: pos.x - 1,
    y: pos.y
  }
};

// Space above the given position
var upSpace = function (pos) {
  return {
    x: pos.x,
    y: pos.y - 1
  }
};

// Space below the given position
var downSpace = function (pos) {
  return {
    x: pos.x,
    y: pos.y + 1
  }
};

// Creates empty row for maze
var createRow = function () {
  var newRow = []
  for (var i = 0; i < size; i++) {
    newRow.push(false);
  }
  return newRow;
};

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

// Wrapper to recursive maze builder
// The forging algorithm will eventually find the end of the maze,
// but it will chizzle out the rest of the large chunks of wall along the way.
var buildMaze = function () {
  size = 16; // Size of maze

  // Keep track of the number of walkways vs. number of walls
  walkways = 0;

  // Initialize Maze
  maze = [];
  for (var i = 0; i < size; i++) {
    maze.push(createRow());
  }

  // Initialize start and endpoints
  start = {x: 0, y: 0};
  end = {x: size - 1, y: size - 1};

  // Forge start and endpoints
  updateCoordinate(start, true);
  updateCoordinate(end, true);

  // Direction the path is forging (start --> end == true)
  direction = false;

  // Start from the end, forge to the start
  // This makes different directions through the maze more available towards the front
  forgePath(end);

  // CORNER CASE: sometimes the pathForger does not reach the start
  // So, breakthrough until the start is connected to a path
  if (!getCoordinate(rightSpace(start)) && !getCoordinate(downSpace(start))) {
    var nextDown = start;
    while (true) {
      nextDown = downSpace(nextDown);
      updateCoordinate(nextDown, true);
      walkways++;
      if (getCoordinate(rightSpace(nextDown) || getCoordinate(downSpace(nextDown)))) {
        break;
      }
    }

    // Then, in case the corner case cut off a GIANT amound of the maze, run the pathForger from start to end
    direction = true;
    forgePath(start);
  }

  console.log(walkways / (size*size));
  return maze;
};

// Explore which path to take
var forgePath = function (pos) {
  // There is forging left to do
  var potentialSpots = findNeighbors(pos);

  while (potentialSpots.length > 0) {
    // Randomly pick from potentialSpots to randomize forging direction
    var index = Math.floor(Math.random()*potentialSpots.length);
    var spot = potentialSpots[index];

    forgeSpot(potentialSpots[index]);

    // Remove spot from the potential spots
    potentialSpots.splice(index, 1);
  }
};

// If possible, forge the given spot/position
var forgeSpot = function (pos) {
  // If we can go here, and we have not been here...
  if (canMove(pos) && !getCoordinate(pos)) {
    updateCoordinate(pos, true);
    walkways++;
    forgePath(pos);
  }
};

// Determines whether you can move to the given position
var canMove = function (pos) {
  if (!isValidSpot(pos)) {
    return false;
  }
  if (breaksThrough(pos)) {
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

// Will chizzling out this section of wall break through to another section of the path?
// If it does, the maze becomes too easy to solve...
var breaksThrough = function (pos) {
  var neighbors = findNeighbors(pos);
  var justOne = false; // Only allowed one walkway neighbor
  for (var i = 0; i < neighbors.length; i++) {
    // BASE CASE --> We hit the end (or start) of the maze
    // This is the one time we DO want to break through
    if (direction) {
      if (neighbors[i].x == end.x && neighbors[i].y == end.y) {
        return false;
      }
    } else {
      if (neighbors[i].x == start.x && neighbors[i].y == start.y) {
        return false;
      }
    }

    if (isValidSpot(neighbors[i]) && getCoordinate(neighbors[i])) {
      if (justOne) {
        return true;
      } else {
        justOne = true;
      }
    }
  }
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
