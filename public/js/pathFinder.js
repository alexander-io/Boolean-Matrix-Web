// Mark coordinate as visited
var visitCoordinate = function (pos) {
  visited[coordinatesToString(pos)] = true;
};

// Find neighbors of pos, and push all info onto the stack
var stackCoordinate = function (pos) {
  var neighbors = findNeighbors(pos);
  var posInfo = {};
  posInfo.pos = pos;
  posInfo.neighbors = neighbors;
  pushCoordinate(posInfo);
};

// Function to find neighbors of newly visited position, push onto stack
var pushCoordinate = function (posInfo) {
  pathStack.push(posInfo);
};

// Function to pop top position off stack
var popCoordinate = function () {
  return pathStack.pop();
};

// The algorithm will continue working until it either puts a new step onto the path or removes one from a dead end
// Then, it takes a break for the given interval
var findPath = function () {
  if (mazeCompleted) {
    if (waitTime > INTERVAL_TIME) {
      waitTime -= INTERVAL_TIME;
      return;
    } else {
      waitTime = DELAY;
    }
    refreshMaze();
    mazeCompleted = false;
    return;
  }

  if (pathStack.length == 0) {
    return;
  }

  var posInfo = popCoordinate();
  var pos = posInfo.pos;

  // BASE CASE --> we found the endpoint
  if (pos.x == end.x && pos.y == end.y) {
    pathStack = []; // Wipe out pathStack - we're done
    mazeCompleted = true;
    return;
  }

  var stillChecking = true;
  while (stillChecking) {
    if (posInfo.neighbors.length == 0) {
      // No more neighbors means we have hit a dead end
      updateCoordinate(pos, 1);
      passPosition(pos, 1);
      stillChecking = false;
    } else {
      // Randomly pick from neighbors to randomize search
      var index = Math.floor(Math.random()*posInfo.neighbors.length);
      var spot = posInfo.neighbors[index];

      // Remove spot from the potential spots
      posInfo.neighbors.splice(index, 1);

      // If this position exists in the maze
      // If this position is a wall
      // If we haven't already been here
      if (isValidSpot(spot, maze.length) && getCoordinate(spot) && !visited[coordinatesToString(spot)]) {

        updateCoordinate(spot, 2);
        passPosition(spot, 2);
        visitCoordinate(spot);

        pushCoordinate(posInfo);

        // Add latest position onto stack last
        stackCoordinate(spot);

        stillChecking = false;
      }
    }
  }
};
