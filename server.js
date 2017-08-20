let express = require('express'), path = require('path')
let app = express()

const port = 8080

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/' + 'public/index.html'))
})

app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/' + 'public/css/style.css'))
})

app.get('/two.min.js', function(req, res) {
  res.sendFile(__dirname + '/' + 'public/js/two.min.js')
})

app.get('/position.js', function(req, res) {
  res.sendFile(__dirname + '/' + 'public/js/position.js')
})

app.get('/pathForger.js', function(req, res) {
  res.sendFile(__dirname + '/' + 'public/js/pathForger.js')
})

app.get('/pathFinder.js', function(req, res) {
  res.sendFile(__dirname + '/' + 'public/js/pathFinder.js')
})

app.get('/render.js', function(req, res) {
  res.sendFile(__dirname + '/' + 'public/js/render.js')
})

app.listen(port, function(){
  console.log('listening to :', port);
})
