let window_width = window.innerWidth, window_height = window.innerHeight;
var two;

two = new Two({
  fullscreen: false,
  autostart: true,
  width : window_width * .75,
  height : window_width * .75
}).appendTo(document.getElementById('maze-mount'));

let col = []

let dimension = {
  s:16
}

let block_size = (two.width / 24);
var maze, displayMaze;
var WALL_COLOR = 'rgb(0,0,0)';
var WALK_COLOR = '#87CEFA';
var PATH_COLOR = '#fffc00'; // Snapchat yellow

// Keep track of a velocity table
var velocityTable = {};

var spin = function (pos, direction) {
  var initVelocity = 0.3;
  velocityTable[coordinatesToString(pos)] = {
    pos: pos,
    velocity: (direction ? initVelocity : -initVelocity)
  };
};

var slowDown = function (pos) {
  var friction = 0.002;
  var velocity = velocityTable[coordinatesToString(pos)].velocity;

  if (velocity > 0) {
    velocityTable[coordinatesToString(pos)].velocity = velocity - friction;
  } else if (velocity < 0) {
    velocityTable[coordinatesToString(pos)].velocity = velocity + friction;
  } else {
    delete velocityTable[coordinatesToString(pos)];
  }
};

var setColor = function (pos, value) {
  if (value == 1) {
    displayMaze[pos.y][pos.x].fill = WALK_COLOR;
    spin(pos, false);
  } else if (value == 2) {
    displayMaze[pos.y][pos.x].fill = PATH_COLOR;
    spin(pos, true);
  }
};

let renderMaze = function (maze) {
  displayMaze = [];
  for (let y = 0; y < maze.length; y++) {
    let displayRow = [];
    for (let x = 0; x < maze.length; x++) {
      let spot = two.makeRectangle( block_size*y + (block_size/2), block_size*x + (block_size/2), (block_size), block_size);

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
  displayMaze[0][0].fill = '#a253e8';
  displayMaze[maze.length - 1][maze.length - 1].fill = '#a253e8';
};

// Kick off the Amazing Maze
solveMaze(maze);

two.bind('update', function() {
  for (var key in velocityTable) {
    if (velocityTable.hasOwnProperty(key)) {
      var displaySpot = velocityTable[key].pos;
      displayMaze[displaySpot.y][displaySpot.x].rotation += velocityTable[key].velocity;
      slowDown(displaySpot);
    }
  }
});
