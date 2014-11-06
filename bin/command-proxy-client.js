#!/usr/bin/env node

// This script is used by the UIAuto job, running on Instruments, to connect
// to the Command Proxy. It transmits the Instruments messages exactly as they
// come in. Because stderr is unreliable, we append logs and program output
// before sending them to the UIAuto script in the following form:
// ----- LOGS -----
// blah blah blah...
// blah blah blah...
// ----- OUTPUT -----
// <OUTPUT>

"use strict";

var output = '';

function exit(status) {
  console.log('----- OUTPUT -----');
  console.log(output);
  // chill out before exiting
  process.nextTick(function () {
    process.exit(status);
  });
}

var d = require('domain').create();

d.on('error', function (err) {
  console.log('An error occured:', (err||"").toString());
  exit(1);
});

d.run(function () {
  var net = require('net');

  function connect(sock, dataFromInstruments) {
    var client = net.connect({path:sock}, function () {
      if (dataFromInstruments && dataFromInstruments.length > 0){
        console.log("Data from instruments to command proxy:");
        console.log(dataFromInstruments.substring(0, 100));
      }
      client.end(dataFromInstruments, "utf8");
    });
    client.setEncoding('utf8');
    client.on('data', function (dataFromCommandProxy) {
      console.log("Data from command proxy to instruments: " + dataFromCommandProxy);
      output += dataFromCommandProxy;
    });
    client.on('error', function (err) {
      console.log("Error from command proxy to instruments: " + err);
    });
    client.on('end', function () {
      client.end();
      exit(0);
    });
  }

  console.log('----- LOGS -----');
  connect(process.argv[2], process.argv[3]);
});
