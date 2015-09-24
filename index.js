var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/user/:id', function(req, res){
  res.send('user: ' + req.params.id + ', function: ' + req.query.q);
});

app.use(function(req, res) {
  res.status(404).send('404');
});

app.listen(
  app.get('port'),
  function() {
    console.log('Running on port: ', app.get('port'));
  }
);