var maze, start, end;

// Wrapper function to solve maze
var solveMaze = function (maze) {
  maze = maze;

  start = {x: 0, y: 0};
  end = {x: maze.length - 1, y: maze.length - 1};

  // console.log(maze.length);

  findPath(start);
};

var findPath = function (pos) {

};
