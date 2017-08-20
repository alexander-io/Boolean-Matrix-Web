let window_width = window.innerWidth, window_height = window.innerHeight

var two = new Two({
  fullscreen: false,
  autostart: true,
  width : window_width/2,
  height : window_width/2,
  fill : 'black'
}).appendTo(document.getElementById('maze-mount'));

let col = []

let dimension = {
  s:16
}

let block_size = (two.width / 16);
var maze, displayMaze;
var WALL_COLOR = 'rgb(0, 0, 0)';
var WALK_COLOR = 'rgb(0, 200, 255)';
var PATH_COLOR = 'rgb(150, 30, 190)';

var setColor = function (pos, value) {
  if (value == 1) {
    displayMaze[pos.y][pos.x].fill = WALK_COLOR;
  } else if (value == 2) {
    displayMaze[pos.y][pos.x].fill = PATH_COLOR;
  }
};

let renderMaze = function (maze) {
  displayMaze = [];
  for (let y = 0; y < maze.length; y++) {
    let displayRow = [];
    for (let x = 0; x < maze.length; x++) {
      let spot = two.makeRectangle( block_size*y + (block_size/2), block_size*x + (block_size/2), block_size ,block_size);

      if (maze[x][y] == 0) { // Wall
        spot.fill = WALL_COLOR;
      } else if (maze[x][y] == 1) { // Walkway
        spot.fill = WALK_COLOR;
      } else if (maze[x][y] == 2) { // Solved path
        spot.fill = PATH_COLOR;
      }

      displayRow.push(spot);
    }
    displayMaze.push(displayRow);
  }
  displayMaze[0][0].fill = 'rgb(111, 111, 111)';
  displayMaze[maze.length - 1][maze.length - 1].fill = 'rgb(111, 111, 111)';
};

// Kick off the Amazing Maze
solveMaze(maze);

two.bind('update', function() {
  // rect.rotation += 0.001;
  // for (var y = 0; y < displayMaze.length; y++) {
  //   for (var x = 0; x < displayMaze.length; x++) {
  //     if (maze[y][x] == 2) {
  //       displayMaze[x][y].rotation += 0.01;
  //     }
  //   }
  // }
  // displayMaze[0][0].rotation += 0.1;
  // displayMaze[1][1].rotation += 0.05;
  // displayMaze[displayMaze.length - 1][displayMaze.length - 1].rotation += 0.1;
});
