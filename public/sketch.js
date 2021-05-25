// P5.js sketch served as the interface for LCAS-Phenospex 
// R. Lloyd. Lincoln. 2021.

// Basically, this is a load of typing to save you typing this repetitively; 
// POST http://192.168.3.241:1612/scan/block-id?id=123
// POST http://192.168.3.240:1612/scan/block-id?id=123

// message format {new_block_id, last_block_id, master_ok, slave_ok, start_scan}

// Keep track of our socket connection
var socket;

// create variables for the data object and give them some initial values
let new_id = '';
let last_block_id = '';
let master_ok = false;
let slave_ok = false;
let start_scan = false;
// let data = [new_id, last_block_id, master_ok, slave_ok, start_scan];

// Make a little data object from those variables. The contents of this object control the 
// flow of the script
let data = {
  "newblock": new_id,
  "lastblock": last_block_id,
  "mok": master_ok,
  "sok": slave_ok,
  "start": start_scan
};

function preload() {
  //console.log("You don't preload anything yet, but remember you can");
}

function setup() {
  // Setup for the page, creating elements for later.
  //createCanvas(400, 400);
  createCanvas(windowWidth, 400);
  background(225);

  user_input = createInput('');
  user_input.position(160, 75);
  user_input.size(100);

  let setIDbutton = createButton('Set block-id');
  setIDbutton.position(280, 74);
  setIDbutton.size(90);
  // On mouse click call new_block_id, pass it the new id
  setIDbutton.mouseClicked(new_block_id);

  let runScan = createButton('Run Scan');
  runScan.position(280, 135);
  runScan.size(90);
  runScan.mouseClicked(run_scan);

  // Links
  let rest_doc_link = createA("RESTAPI-doc.html", 'Planteye RESTAPI Documentation');
  rest_doc_link.position = (20, height - 20);

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  //socket = io.connect('http://localhost:3000');
  // socket = io.connect('http://192.168.1.84:3000')
  socket = io.connect('http://10.101.12.56:3000')
  // We make a named event called 'newData' and write an
  // anonymous callback function
  socket.on('data',
    // When we receive data
    function (data) {
      console.log("Got: " + data.newblock + ', ' + data.lastblock + ', ' + data.mok + ', ' + data.sok + ', ' + data.start);
      user_input.value(data.newblock); ///// HOw do you set the text?
      last_block_id = data.lastblock;
      master_ok = data.mok;
      slave_ok = data.sok;
      start_scan = data.start;
    }
  );
}

function draw() {
  background(225);
  textAlign(LEFT);
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
  if (master_ok && slave_ok) {
    textSize(16);
    textAlign(CENTER);
    text("Please press 'Start' on PHX control box.", height / 2, width / 2);
  }
  //text("Please press 'Start' on PHX control box.", height/2, width/2);

  // This is for the green lights
  if (master_ok == false) {
    fill(255, 0, 0);
  }
  if (master_ok == true) {
    fill(0, 255, 0);
  }
  noStroke()
  rect(273, 95, 40, 20);

  if (slave_ok == false) {
    fill(255, 0, 0);
  }
  if (slave_ok == true) {
    fill(0, 255, 0);
  }
  noStroke()
  rect(320, 95, 40, 20);
}

// callback function that runs when the 'set-block-id' button is pressed
function new_block_id() {
  // Get the new block id
  data.newblock = user_input.value();
  // some feedback
  console.log('you entered: ' + data.newblock);
  send_message(data);
}

// callback function that runs when the 'run-scan' button is pressed
function run_scan(data) {
  // Set data.start to true so the server will close the switch
  if (master_ok && slave_ok) {
    data.start = true;
    // Send the data object back for the server to deal with
    send_message(data);
  }
}

// Function for sending to the socket
function send_message(data) {
  var newData = data;
  console.log('Sending: ' + newData);
  // Send that object to the socket
  socket.emit('data', newData);
}