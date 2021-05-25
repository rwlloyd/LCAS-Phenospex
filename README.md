# LCAS-Phenospex
Manual Interface for Phenospex API

# Installation on hardware

install nodejs on an old raspberry pi, 

[https://www.thepolyglotdeveloper.com/2018/03/install-nodejs-raspberry-pi-zero-w-nodesource/](https://www.thepolyglotdeveloper.com/2018/03/install-nodejs-raspberry-pi-zero-w-nodesource/)

the latest binary that supports ARMv6 Processors is:

[https://nodejs.org/dist/latest-v11.x/node-v11.15.0-linux-armv6l.tar.gz](https://nodejs.org/dist/latest-v11.x/node-v11.15.0-linux-armv6l.tar.gz)

So, following the tutorial above:

    curl -o node-v11.15.0-linux-armv6l.tar.gz https://nodejs.org/dist/latest-v11.x/node-v11.15.0-linux-armv6l.tar.gz
    tar -xzf node-v11.15.0-linux-armv6l.tar.gz
    sudo cp -r node-v11.15.0-linux-armv6l/* /usr/local/

Install pigpio library for better control of GPIO port

    sudo apt install pigpio

At this point, it 'should' work. But a reboot will probably help

 # Clone this repository

    git clone https://github.com/rwlloyd/LCAS-Phenospex.git
    cd LCAS-Phenospex
    npm install
    node server.js

# Driving

### [Thorvalds Quick-Start guide](./DrivingThorvalds.md)




