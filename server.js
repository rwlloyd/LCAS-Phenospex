// node.js based interface for the Phenospex Planteye 500 Sensors
// Communicates VIa a REST API. See
// 

// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

// lets have the webserver bit that runs on the pi, http://ipaddress:3000

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku //// may have to change this in production
//var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
//function listen() {
//  var host = server.address().address;
//  var port = server.address().port;
//  console.log('Example app listening at http://' + host + ':' + port);

var server = app.listen(3000)
console.log('App listening on port 3000');

app.use(express.static('public'));

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
    // We are given a websocket object in our function
    function (socket) {

        console.log("We have a new client: " + socket.id);

        // When this user emits, client side: socket.emit('otherevent',some data);
        // expect incoming data to be labeled 'newData'
        socket.on('data',
            function (data) {
                // Data comes in as whatever was sent, including objects
                console.log("Received: 'newData' " + data.blockId);

                // Here is where we do something with the new data


                // Send it to all other clients
                //socket.broadcast.emit('mouse', data);

                // This is a way to send to everyone including sender
                // io.sockets.emit('message', "this goes to everyone");

            }
        );

        socket.on('disconnect', function () {
            console.log("Client has disconnected");
        });
    }
);

///// HARDWARE STUFF to coontrol the start scan button ----------------------------------------

// const Gpio = require('pigpio').Gpio;

// const buttonPin = 25;
// var scanning = false;

// const button = new Gpio(buttonPin, {
//   mode: Gpio.OUTPUT,
// });
// // Map function lifted directly from p5.js source code
// // https://github.com/processing/p5.js/blob/main/src/math/calculation.js
// map = function(n, start1, stop1, start2, stop2, withinBounds) {
//     const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
//     return newval;
// };