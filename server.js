// node.js based controller for Servo Pan and Tilt Mechanism based on 
// a Raspberrpy Pi single board computer

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

// // WebSocket Portion
// // WebSockets work with the HTTP server
// var io = require('socket.io')(server);

// // Register a callback function to run when we have an individual connection
// // This is run for each individual user that connects
// io.sockets.on('connection',
//   // We are given a websocket object in our function
//   function (socket) {
  
//     console.log("We have a new client: " + socket.id);
  
//     // When this user emits, client side: socket.emit('otherevent',some data);
//     socket.on('mouse',
//       function(data) {
//         // Data comes in as whatever was sent, including objects
//         console.log("Received: 'mouse' " + data.x + " " + data.y);
        
//         // Here is where we control the servos
//         setServo(panServo, data.x);
//         setServo(tiltServo, data.y);

//         // Send it to all other clients
//         //socket.broadcast.emit('mouse', data);
        
//         // This is a way to send to everyone including sender
//         // io.sockets.emit('message', "this goes to everyone");

//       }
//     );
    
//     socket.on('disconnect', function() {
//       console.log("Client has disconnected");
//     });
//   }
// );


///// HARDWARE STUFF to control servos ----------------------------------------

// const Gpio = require('pigpio').Gpio;

// const panServoPin = 23;
// const tiltServoPin = 24;
// const buttonPin = 25;
// var scanning = false;

// // These are angles from the centre point
// const panMin = -60;
// const panMax = 60;
// const tiltMin = -60;
// const tiltMax = 60;

// // Scanning Parameters
// scan_shape =  [5,5] // X x Y positions..
// home = [0,0]  // Save the home position for later

// const panServo = new Gpio(panServoPin, {mode: Gpio.OUTPUT});
// const tiltServo = new Gpio(tiltServoPin, {mode: Gpio.OUTPUT});

// const button = new Gpio(buttonPin, {
//   mode: Gpio.INPUT,
//   pullUpDown: Gpio.PUD_UP,
//   edge: Gpio.RISING_EDGE
// });

// // Map function lifted directly from p5.js source code
// // https://github.com/processing/p5.js/blob/main/src/math/calculation.js
// map = function(n, start1, stop1, start2, stop2, withinBounds) {
//     const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
//     return newval;
// };

// // Function to move a servo between minangle and maxangle
// // data coming in is from 0-canvasSize with all of the coordinate implications that has
// function setServo(servo, pos){
//     console.log("Writing " + pos+200 + " to " + servo);
    
//     //calculate the pulsewidth for the given position on the screen (400px)
//     // pulsewidth is between 1000 and 2000 (0.1-0.2ms - 0-180 deg)
//     pulseWidth = Math.floor(map(pos, 400, 0, 1250, 1750));

//     servo.servoWrite(pulseWidth);
//   }
