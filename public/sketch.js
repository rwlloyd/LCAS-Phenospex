// P5.js sketch served as the interface for LCAS-Phenospex 

// Keep track of our socket connection
var socket;

function setup() {
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  //socket = io.connect('http://192.168.1.84:3000')
  // We make a named event called 'newData' and write an
  // anonymous callback function
  // socket.on('newData',
  //   // When we receive data
  //   function (data) {
  //     console.log("Got: " + data.x + " " + data.y);
  //     // Draw a blue circle
  //     fill(0, 0, 255);
  //     noStroke();
  //     ellipse(data.x, data.y, 20, 20);
  //   }
  // );

  //createCanvas(400, 400);
  // background(0);
  noCanvas();
  
  // DOM element for the desired block-id
  let blockId = null;
  let input = createInput('');
  input.position(50, 10);
  input.size(100);
  input.input(blockIdCallback);

  let button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(sendBlockId(blockId));

  let doclink = createSpan(
    // <a href="RESTAPI-doc.html">Planteye RESTAPI Documentation</a>
    "Planteye RESTAPI Documentation"
  );
  doclink.position(20, windowHeight - 20);
}

function blockIdCallback() {
  console.log('you are typing...', this.value());
  blockId = this.value();
  sendBlockId(blockId)
}

// Function for sending to the socket
function sendBlockId(blockId) {
  // We are sending!
  console.log("blockID to send: " + blockId);

  // Make a little object with  and y
  var data = {
    ID: blockId
  };

  // Send that object to the socket
  socket.emit('newData', data);
}

function draw() {
  // Nothing
}