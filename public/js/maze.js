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

let renderMaze = function () {
  let maze = solveMaze(buildMaze());
  // console.log(maze);
  let displayMaze = [];
  for (let y = 0; y < maze.length; y++) {
    let displayRow = [];
    for (let x = 0; x < maze.length; x++) {
      let spot = two.makeRectangle( block_size*y + (block_size/2), block_size*x + (block_size/2), block_size ,block_size);

      if (maze[x][y] == 0) { // Wall
        spot.fill = 'rgb(0, 0, 0)';
      } else if (maze[x][y] == 1) { // Walkway
        spot.fill = 'rgb(0, 200, 255)';
      } else if (maze[x][y] == 2) { // Solved path
        spot.fill = 'rgb(150, 30, 190)';
      }

      displayRow.push(spot);
    }
    displayMaze.push(displayRow);
  }
  displayMaze[0][0].fill = 'rgb(111, 111, 111)';
  displayMaze[maze.length - 1][maze.length - 1].fill = 'rgb(111, 111, 111)';
};

renderMaze();

// two.bind('update', function() {
//   // rect.rotation += 0.001;
// });
