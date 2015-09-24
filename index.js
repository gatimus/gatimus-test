var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/user/:id', function(request, response){
  response.send('user ' + request.params.id);
});

app.listen(
  app.get('port'),
  function() {
    console.log('Running on port: ', app.get('port'));
  }
);