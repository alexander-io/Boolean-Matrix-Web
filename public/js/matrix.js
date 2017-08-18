let array_dimension = {
  w : 16,
  h : 16
}
let window_width = window.innerWidth, window_height = window.innerHeight, flag = false

let init_matrix_array = (array_dimension) => {
  let matrix_array = []
  for (let i = 0; i < array_dimension.w; i++) {
    let row = []
    for (let j = 0; j < array_dimension.h; j++) {
      flag ? row[j] = false : row[j] = true
      flag = !flag
    }
    matrix_array[i] = row
    flag = !flag
  }
  return matrix_array
}

let draw_matrix = function(matrix_array) {
  let mount = document.getElementById('mount');
  for (let i = 0; i < matrix_array.length;i++){
    for (let j = 0; j < matrix_array[0].length;j++){
      let block = document.createElement('div');
      block.style.display = 'inline-block'
      block.style.width = (window_width / matrix_array.length) - 1 + 'px'
      block.style.height = window_height / matrix_array[0].length + 'px'
      matrix_array[i][j] ? block.style.backgroundColor = '#212121': block.style.backgroundColor = 'white'
      mount.appendChild(block)
    }
  }
}

draw_matrix(init_matrix_array(array_dimension))
