var maze, start, end, visited;

var visitCoordinate = function (pos) {
  visited[coordinatesToString(pos)] = true;
};

// Wrapper function to solve maze
var solveMaze = function (maze) {
  maze = maze;

  start = {x: 0, y: 0};
  end = {x: maze.length - 1, y: maze.length - 1};

  visited = {};
  visitCoordinate(start);

  findPath(start);
  return maze;
};

// Look at your 4 options for traversal
var findPath = function (pos) {
  // BASE CASE --> we found the endpoint
  if (pos.x == end.x && pos.y == end.y) {
    return true;
  }
  var neighbors = findNeighbors(pos);

  while (neighbors.length > 0) {
    // Randomly pick from neighbors to randomize search
    var index = Math.floor(Math.random()*neighbors.length);
    var spot = neighbors[index];

    if(explore(neighbors[index])) {
      return true;
    }

    // Remove spot from the potential spots
    neighbors.splice(index, 1);
  }
  return false;
};

// Recurse down a specific path
var explore = function (pos) {
  // If this position does not exist in the maze, don't explore
  if (!isValidSpot(pos, maze.length)) {
    return false;
  }

  // If this position is a wall
  if (!getCoordinate(pos)) {
    return false;
  }

  // If we have already been here, no need to explore
  if (visited[coordinatesToString(pos)]) {
    return false;
  }

  updateCoordinate(pos, 2);
  visitCoordinate(pos);
  var foundPath = findPath(pos);
  if (!foundPath) {
    updateCoordinate(pos, 1);
  }
  return foundPath;
};
