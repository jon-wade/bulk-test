var main = function() {
    var socket = io();
    //variable to hold a timeout function later in the routine
    var auto;

    //attach some handles to the input and output elements
    var input = document.getElementById('inputBox');
    var output = document.getElementById('serverResponse');

    input.addEventListener('input', function() {
        //messages to the server sent when an input is detected
        socket.emit('message', input.value);
    });

    //display messages from the server
    socket.on('message', function(message) {
        //reset any previous timeout functions running
        clearTimeout(auto);
        if (message === 'Waiting for you to type slower...' && input.value==='') {
            output.innerHTML = 'Waiting around, doing nothing really...';
        }
        else if (message === 'Waiting for you to type slower...' && input.value !== '') {
            output.innerHTML = message;
            auto = setTimeout(function() {
                output.innerHTML = 'You\'ve stopped typing, calling API...';
            }, 1500);
        }
        else {
            output.innerHTML = message;
        }
    });
};

document.addEventListener('DOMContentLoaded', main);

