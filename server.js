// node.js based interface for the Phenospex Planteye 500 Sensors
// Communicates the REST API on the sensors to set the block-id manually. 
// See associated documentation in repository.
// R. Lloyd. Lincoln. 2021.
// 
// message format {block_id, last_block_id, master_ok, slave_ok, start_scan}
//

// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

// lets have the webserver bit that runs on the pi, http://ipaddress:3000

// Keep track of the IP addresses of sensors
let master_ip = '192.168.3.240';
let slave_ip = '192.168.3.241';
let master_url = 'http://' + master_ip + ':1612/scan/block-id?id='
let slave_url = 'http://' + slave_ip + ':1612/scan/block-id?id='

// list of allowed addresses use * to allow all
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

// create variables for the data object and give them some initial values
let new_id = '';
let last_block_id;
let master_ok = false;
let slave_ok = false;
let start_scan = false;

// Make a little data object from those variables. The contents of this object control the 
// flow of the script
let data = {
    "newblock": new_id,
    "lastblock": last_block_id,
    "mok": master_ok,
    "sok": slave_ok,
    "start": start_scan,
    "scan_finished":false
  };


// Using express: http://expressjs.com/
const express = require('express');
// Create the app
const app = express();

// set allowed addresses on app instance
const cors = require("cors");
app.use(cors(corsOptions));

// Set up the server
// process.env.PORT is related to deploying on heroku //// may have to change this in production
//var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
//function listen() 
//  var host = server.address().address;
//  var port = server.address().port;
//  console.log('Example app listening at http://' + host + ':' + port);

const server = app.listen(3000)
console.log('App listening on port 3000');

app.use(express.static('public'));

// WebSocket Portion
// WebSockets work with the HTTP server
const io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
    // We are given a websocket object in our function
    function (socket) {

        console.log("We have a new client: " + socket.id);

        // lets initialise the client from the server instead. seems a bit better
        io.sockets.emit('data', data);

        // When this user emits, client side: socket.emit('otherevent',some data);
        // expect incoming data to be labeled 'newData'
        socket.on('data',
            function (data) {
                // Data comes in as whatever was sent, including objects
                console.log("Received: " + data.newblock + ', ' + data.lastblock + ', ' + data.mok + ', ' + data.sok + ', ' + data.start);

                if (data.start && data.mok && data.sok) {
                    //runscan
                    console.log("Running scan?")
                    // <--- call to close the relay goes here  --->

                    // Don't forget to reset the UI
                    data.lastblock = last_block_id;
                    data.mok = false;
                    data.sok = false;
                    data.newblock = ''; 
                } else {
                    // save the new block id
                    new_id = data.newblock;
                    // Send the new block ID to the sensors
                    // Lets assume it returns good

                    // Set the result of talking with the sensors
                    data.mok = true;
                    data.sok = true;

                    // Let's sort out the whole last id. Everything is controlled by the server
                    // so the server needs to set the last block ID. only when it has actually been sent to the 
                    // sensors
                    // set new block to old block for the reply
                    last_block_id = data.newblock;
                    // set the last block id to send back
                    data.lastblock = last_block_id;

                    // reset newblock id
                    data.newblock = '';
                    // we dont need to touch start-scan 

                    console.log("Sent: " + data.newblock + ', ' + data.lastblock + ', ' + data.mok + ', ' + data.sok + ', ' + data.start + ', ' + data.scan_finished);
                    // Send the message to the clients so it can update th UI and wat for the start click
                    io.sockets.emit('data', data);
                    
                }

                if (scan_finished){
                    data.lastblock = last_block_id;
                }
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

// // Make the call to the master sensor this is from a p5 js sketch. probably won't work as is
//   master_url + new_id,
//   "POST",
//   function (response) {
//     console.log(response)
//     if (response == "200") {
//       console.log("Master response GOOD");
//       last_block_id = new_id;
//       master_gtg = true;
//     } else {
//       console.log("Master response BAD");
//       master_gtg = false;
//     }
//   }
// );
// // Make the post request to the slave sensor
// httpDo(
//   slave_url + new_id,
//   "POST",
//   function (response) {
//     if (response == "200") {
//       console.log("Slave response GOOD");
//       last_block_id = new_id;
//       slave_gtg = true;
//     } else {
//       console.log("Slave response: " + response);
//       slave_gtg = false;
//     }
//   }
// );

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
