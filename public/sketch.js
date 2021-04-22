// P5.js sketch served as the interface for LCAS-Phenospex 

// Based on
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;

function setup() {
  createCanvas(400, 400);
  background(0);

  // DOM element for the desired block-id
  const blockId = null;
  let blockIDinput = createInput('');
  blockIDinput.position(50,10);
  blockIDinput.size(100);
  blockIDinput.input(blockIdCallback);



  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  //socket = io.connect('http://192.168.1.84:3000')
  // We make a named event called 'newData' and write an
  // anonymous callback function
  socket.on('newData',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
}

function draw() {
  // Nothing
}

function blockIdCallback(){
  console.log('you are typing...', 
  this.value());
}

function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var newData = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('newData', newData);
}
