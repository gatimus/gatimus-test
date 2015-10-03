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
    socket.name = 'anonymous';
    users[socket.id] = {name: socket.name};
    console.log(users);

    io.emit('users',users);



    socket.on('message', function(data){
        if(data.substring(0,1)  == '/'){
            var cmd = data.substring(1, data.indexOf(' '));
            var arg = data.substring(data.indexOf(' ')+1);
            console.log(cmd+arg);
            switch(cmd){
                case 'name':
                    socket.name = arg;
                    users[socket.id].name = socket.name;
                    break;
                default:
                    socket.emit('message', {id: 'server', name: 'server', message: 'bad command'})
            }
        } else {
            //socket.broadcast.emit('message',{id: socket.id, name: socket.name, message: data});
            io.emit('message',{id: socket.id, name: socket.name, message: data});
        }

    });


    socket.on('disconnect', function () {
        //users[socket.id] = undefined;
        delete users[socket.id];
    });
});

server.listen(
  app.get('port'),
  function() {
    console.log('Running on port: ', app.get('port'));
  }
);