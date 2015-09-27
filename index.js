var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/user/:id', function(req, res){
  res.send('user: ' + req.params.id + ', function: ' + req.query.q);
});

app.use(function(req, res) {
  res.status(404).send('404');
});


var users = {};
io.on('connection',function (socket){
    users[socket.id] = {name: 'blank'};
    console.log(users);
    io.emit('users',users);
    socket.emit('message',{"alert" : socket.id});

    socket.on('disconnect', function () {
        users.splice(socket.id,1);
        console.log(users);
    });
});

server.listen(
  app.get('port'),
  function() {
    console.log('Running on port: ', app.get('port'));
  }
);