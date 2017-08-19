// console.log('canary');
let window_width = window.innerWidth, window_height = window.innerHeight
// console.log(window_width, window_height)

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

// let make_matrix_of_rectangles = function(dimension) {
//   let outer = []
//   for (let x = 0; x < dimension.s; x++) {
//     let inner = []
//     for (let xx = 0; xx < dimension.s; xx++) {
//       inner.push(two.makeRectangle( block_size*xx + (block_size/2), block_size*x + (block_size/2), block_size ,block_size))
//     }
//     outer.push(inner)
//   }
// }
// make_matrix_of_rectangles(dimension)

let renderMaze = function () {
  let maze = buildMaze();
  solveMaze(maze);
  let displayMaze = [];
  for (let y = 0; y < maze.length; y++) {
    let displayRow = [];
    for (let x = 0; x < maze.length; x++) {
      let spot = two.makeRectangle( block_size*y + (block_size/2), block_size*x + (block_size/2), block_size ,block_size);

      if (maze[x][y]) {
        spot.fill = 'rgb(0, 200, 255)';
      } else {
        spot.fill = 'rgb(0, 0, 0)';
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
