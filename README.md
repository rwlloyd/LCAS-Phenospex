# LCAS-Phenospex
Manual Interface for Phenospex API

# Usage

  git clone https://github.com/rwlloyd/LCAS-Phenospex.git
  
  cd LCAS-Phenospex
  
  npm install
  
  node server.js
  
## to-do

Getting an error when making the POST request from p5.js. it needs to come from the node server

https://nodejs.dev/learn/make-an-http-post-request-using-nodejs

## Alternatively...

For microcomtroller version, start here...

were going to take a wemos d1 mini, and a relay board to send the new 
block ids to the sensors. these can be input via a p5 sketch and then sent by the 
wemos to the sensors. once it gets the response, it can update the p5 sketch and 
trigger a relay to hijack the 'start scan' pushbutton on the system. all with 
a USB port. 

https://randomnerdtutorials.com/esp8266-nodemcu-http-get-post-arduino/

Will this work while connected to the phenospex WiFi system?

If that all works, mash it up with the p5 example and make it fire a relay board.


