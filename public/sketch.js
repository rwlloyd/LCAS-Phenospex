// P5.js sketch served as the interface for LCAS-Phenospex 

// Basically, this is a load of typing to save you typing this repetitively; 
// POST http://192.168.3.241:1612/scan/block-id?id=123
// POST http://192.168.3.240:1612/scan/block-id?id=123

// Keep track of our socket connection
var socket;
// Keep track of the IP addresses of sensors
let master_ip = '192.168.3.240';
let slave_ip = '192.168.3.241';
let master_url = 'http://' + master_ip + ':1612/scan/block-id?id='
let slave_url = 'http://' + slave_ip + ':1612/scan/block-id?id='

// A couple of flags to check the sensors are happy 
// before we ask to start a scan
let master_gtg = false;
let slave_gtg = false;

// create input for the desired block-id
let new_id;
let user_input;
let last_block_id = "####";

function preload() {
  //console.log("You don't preload anything yet, but remember you can");
}

function setup() {
  // Setup for the page, creating elements for later.
  //createCanvas(400, 400);
  createCanvas(windowWidth, 400);
  background(225);

  let user_input = createInput('');
  user_input.position(160, 75);
  user_input.size(100);

  let setIDbutton = createButton('Set block-id');
  setIDbutton.position(280, 74);
  setIDbutton.size(90);
  // On mouse click call new_block_id, pass it the new id
  setIDbutton.mouseClicked(new_block_id);

  // let runScan = createButton('Run Scan');
  // runScan.position(280, 135);
  // runScan.size(90);
  // runScan.mouseClicked(run_scan);

  // Links
  let rest_doc_link = createA("RESTAPI-doc.html", 'Planteye RESTAPI Documentation');
  rest_doc_link.position = (20, height - 20);

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  //socket = io.connect('http://192.168.1.84:3000')
  // We make a named event called 'newData' and write an
  // anonymous callback function
  socket.on('newData',
    // When we receive data
    function (data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0, 0, 255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
}

function draw() {
  background(225);
  textFont('Trebuchet MS');
  textSize(20);
  fill(25);
  text('Phenospex REST Interface', 20, 35);

  textSize(16);
  text('Next Block ID', 20, 85);

  //let new_id = user_input.value();

  textSize(16);
  text('Last Block ID', 20, 110);

  text(last_block_id, 160, 110)

  // Tell users to press the button when everything is ready
  if (master_gtg && slave_gtg){
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Please press 'Start' on PHX control box.", height/2, width/2); 
  }
  //text("Please press 'Start' on PHX control box.", height/2, width/2);

  // This is for the green lights
  if (master_gtg == false){
    fill(255,0,0);
  }
  if (master_gtg == true){
    fill(0,255,0);
  }
  noStroke()
  rect(273, 95, 40, 20);

  if (slave_gtg == false){
    fill(255,0,0);
  }
  if (slave_gtg == true){
    fill(0,255,0);
  }
  noStroke()
  rect(320, 95, 40, 20);
}

// Function that runs when the 'setBlockID' button is pressed. 
// https://p5js.org/reference/#/p5/httpDo
function new_block_id() {
  // Get the new block id
  new_id = user_input.value();
  // some feedback
  console.log('you entered' + new_id);
  console.log('sending new block ID:' + new_id);
  
  // Make the call to the master sensor
  httpDo(
    master_url + new_id,
    "POST",
    function (response) {
      console.log(response)
      if (response == "200") {
        console.log("Master response GOOD");
        last_block_id = new_id;
        master_gtg = true;
      } else {
        console.log("Master response BAD");
        master_gtg = false;
      }
    }
  );
  // Make the post request to the slave sensor
  httpDo(
    slave_url + new_id,
    "POST",
    function (response) {
      if (response == "200") {
        console.log("Slave response GOOD");
        last_block_id = new_id;
        slave_gtg = true;
      } else {
        console.log("Slave response: " + response);
        slave_gtg = false;
      }
    }
  );
}

function run_scan(){
  // Send ID to the server for logs and to initiate scan
  if (master_gtg && slave_gtg){
    send_message(new_id);
  }
}

// Function for sending to the socket
function send_message(newID) {
  console.log("Starting Scan with new block-id: " + newID);
  // Make a little object our new id
  var newData = {
    id: newID
  };
  // Send that object to the socket
  socket.emit('newData', newData);
}