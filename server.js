var Rx = require('rx');
var Observable = Rx.Observable;

//initialize dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//serve static assets from the public folder
app.use(express.static('public'));

//listen for a socket connection
io.on('connection', function(socket){
    //start the timer since connection received
    var start = process.hrtime();

    //set up an Observable to received the socket.io stream
    var messagesReceived = Observable.fromEvent(socket, 'message');

    //iterate over the Observable 'array stream'
    //first call back is fired each time a new event is received
    messagesReceived.forEach(function (message) {
        //if the time since the last socket.io event was received is less than 0.3 seconds
        //don't ping the db to reduce load
        if ((process.hrtime(start)[1] / 1000000) < 300) {
            //send message back to the browser to tell it what the server-side js is doing
            io.emit('message', 'Waiting for you to type slower...');
        }
        else {
            if (message !== '') {
                //if greater than 0.3 seconds, mock call to API/db
                io.emit('message', 'Calling API...');
            }
            else {
                io.emit('message', 'Waiting around, doing nothing really...');
            }
        }
        start = process.hrtime();
    });
});

//start websever on port:3000
http.listen(3000, function(){
    console.log('app listening on port: 3000');
});






