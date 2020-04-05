const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('home.ejs');
});

app.listen('4080', function(){
  console.log('server listening on port 4080');
})