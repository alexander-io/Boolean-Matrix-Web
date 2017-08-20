let window_width = window.innerWidth, window_height = window.innerHeight;

var two = new Two({
  fullscreen: false,
  autostart: true,
  width : window_width * .75,
  height : window_width * .75
}).appendTo(document.getElementById('maze-mount'));

let block_size = (two.width / 24);
var displayMaze;
var WALL_COLOR = 'rgb(0,0,0)';
var WALK_COLOR = '#87CEFA';
var PATH_COLOR = '#fffc00'; // Snapchat yellow

// Keep track of a velocity table
var velocityTable = {};

// Spin the given position in a given direction (depends on if the path is digging or backtracking)
var spin = function (pos, direction) {
  var initVelocity = 0.3;
  velocityTable[coordinatesToString(pos)] = {
    pos: pos,
    velocity: (direction ? initVelocity : -initVelocity)
  };
};

// Function to slow down the rotation of a spinning position
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

// Function to change the color of a position as well as put spin on it as the path goes by
var passPosition = function (pos, value) {
  if (value == 1) {
    displayMaze[pos.y][pos.x].fill = WALK_COLOR;
    spin(pos, false);
  } else if (value == 2) {
    displayMaze[pos.y][pos.x].fill = PATH_COLOR;
    spin(pos, true);
  }
};

// Function to render the maze (used when walls for a new maze are built)
let renderMaze = function (maze) {
  // Keep track of the actual display in a data structure reflecting the underlying maze
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

  // Give the start and endpoints a unique color
  displayMaze[0][0].fill = '#a253e8';
  displayMaze[maze.length - 1][maze.length - 1].fill = '#a253e8';
};

// Rotate spinning positions (and slow them down)
two.bind('update', function() {
  for (var key in velocityTable) {
    if (velocityTable.hasOwnProperty(key)) {
      var displaySpot = velocityTable[key].pos;
      displayMaze[displaySpot.y][displaySpot.x].rotation += velocityTable[key].velocity;
      slowDown(displaySpot);
    }
  }
});
