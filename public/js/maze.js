// Holds all main variables and functions
var maze, start, end, visited, waitTime;
var size, direction, walkways;

var INTERVAL_TIME = 50;

// Small delay between mazes
var DELAY = 200;

// Global variables, used for setInterval function
var mazeCompleted = false;
var pathStack; // Key = coordinatesToString, Value = {pos: coordinate, neighborsLeft: neigbors}

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

// Refreshes the maze
var refreshMaze = function () {
  two.clear(); // Don't clutter the browser with old maze parts

  maze = buildMaze();
  renderMaze(maze);

  velocityTable = {};

  start = {x: 0, y: 0};
  end = {x: maze.length - 1, y: maze.length - 1};

  visited = {};
  visitCoordinate(start);

  pathStack = [];
  stackCoordinate(start);

  waitTime = DELAY;
};

// Kick off the Amazing Maze
var initMaze = function () {
  size = 24; // Size of maze
  refreshMaze();
  setInterval(findPath, INTERVAL_TIME);
};

initMaze();
