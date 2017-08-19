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

// var rect = two.makeRectangle(0, 0 / 2, 50 ,50);

let col = []

let dimension = {
  s:16
}

let block_size = (two.width / 16);

let make_matrix_of_rectangles = function(dimension) {
  let outer = []
  for (let x = 0; x < dimension.s; x++) {
    let inner = []
    for (let xx = 0; xx < dimension.s; xx++) {
      inner.push(two.makeRectangle( block_size*xx + (block_size/2), block_size*x + (block_size/2), block_size ,block_size))
    }
    outer.push(inner)
  }
}

make_matrix_of_rectangles(dimension)

two.bind('update', function() {
  // rect.rotation += 0.001;
});