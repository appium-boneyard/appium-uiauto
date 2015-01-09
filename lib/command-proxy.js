// The Command Proxy relays UIAuto message to and from Appium. It is also the
// UIAuto facade for Appium.
//
// The message route is the following:
// Appium <--> Command Proxy <--> Instruments
// The medium between Instruments and Command Proxy is the command-proxy-client
// script.
//
// Command Proxy --> Instruments message format: {cmd:"<CMD>"}
//
// Instruments --> Command Proxy message format:
// <one char message type>,<stringified json data>
// <stringified json data> format:
// {status:<status>, value:<result>}

'use strict';

var logger = require('./logger.js'),
    fs = require('fs'),
    through = require('through'),
    net = require('net'),
    mkdirp = require('mkdirp'),
    path = require('path');

var MORE_COMMAND = "#more";
var MESSAGE_TYPES = ['error','no data','regular','chunk','last chunk'];

var UNKNOWN_ERROR = {
  status: 13,
  value: "Error parsing socket data from instruments"
};

function isChunk(data) { return data.type && data.type.indexOf('chunk') >= 0; }

var TheProxy = function (opts) {
  opts = opts || {};
  var curCommand = null;
  var onReceiveCommand = null;
  var commandQueue = [];
  var sock = opts.sock || '/tmp/instruments_sock';
  var socketServer = null;
  var hasConnected = false;
  var bufferedData = "";
  var currentSocket = null;
  var firstSocketConnectionCb = null;
  var resultBuffer = "";
  var onSocketConnect = function (conn) {
    if (!hasConnected) {
      hasConnected = true;
      logger.info("Instruments is ready to receive commands");
      firstSocketConnectionCb();
    }
    conn.setEncoding('utf8'); // get strings from sockets rather than buffers

    conn.pipe(through(function (data) {
      // when data comes in, route it according to the "event" property
      logger.debug("Socket data received (" + data.length + " bytes)");
      bufferedData += data;
    }));

    currentSocket = conn;

    conn.on('close', function () {
      currentSocket = null;
    });

    conn.on('end', function () {
      var data = bufferedData;
      bufferedData = "";
      var parsedData;
      try {
        parsedData = {
          type: MESSAGE_TYPES[parseInt(data[0], 10)],
        };
        if (parsedData.type !== 'no data') {
          // format is <one char message type>,<DATA>
          parsedData.result = data.substring(2);
        }
      } catch (e) {
        logger.error("Couldn't parse data from socket, maybe buffer issue?");
        logger.error(data);
        parsedData = {
          type: 'error',
          error: UNKNOWN_ERROR
        };
      }
      logger.debug("Socket data being routed.");
      getResultAndSendNext(parsedData, conn);
    });

  };

  var waitForCommand = function (cb) {
    if (commandQueue.length) {
      cb();
    } else {
      onReceiveCommand = cb;
    }
  };

  var getResultAndSendNext  = function (data, c) {
    var hasResult = typeof data.result !== "undefined";
    var result;
    if (hasResult && !curCommand) {
      logger.debug("Got a result when we weren't expecting one! Ignoring it");
      logger.debug("Result was: " + data.result);
    } else if (!hasResult && curCommand) {
      logger.debug("Instruments didn't send a result even though we were expecting one");
      hasResult = true;
      data.result = false;
    }

    if (hasResult && curCommand) {
      if (data.result) {
        logger.debug("Got result from instruments: " +
            data.result.slice(0, 300));
      } else {
        logger.debug("Got null result from instruments");
      }
      if (isChunk(data)) {
        resultBuffer += data.result;
        logger.debug("Got chunk data, current resultBuffer length: " + resultBuffer.length);
        if (data.type === 'last chunk') {
          logger.debug("This is the last data final length: " + resultBuffer.length);
          // this is the last row, unpack and respond to command
          try {
            result = JSON.parse(resultBuffer);
          } catch (err) {
            logger.error("Couldn't parse result buffer: " + err);
            result = UNKNOWN_ERROR;
          }
          resultBuffer = "";
          curCommand.cb(result);
          curCommand = null;
        } else {
          logger.debug("Not the last chunk, trying to get more");
          commandQueue.unshift({cmd: MORE_COMMAND, cb: curCommand.cb});
        }
      } else {
        try {
          result = JSON.parse(data.result);
        } catch (err) {
          logger.error("Couldn't parse result buffer: " + err);
          result = UNKNOWN_ERROR;
        }
        curCommand.cb(result);
        curCommand = null;
      }
    }

    waitForCommand(function () {
      curCommand = commandQueue.shift();
      onReceiveCommand = null;
      logger.debug("Sending command to instruments: " + curCommand.cmd);
      c.write(JSON.stringify({cmd: curCommand.cmd}));
      c.end();
      //debug("Closing our half of the connection");
    });
  };

  this.getSock = function () {
    return sock;
  };

  this.sendCommand = function (cmd, cb) {
    commandQueue.push({cmd: cmd, cb: cb});
    if (onReceiveCommand) {
      onReceiveCommand();
    }
  };

  this.shutdown = function (cb) {
    // make sure clear out command cbs so we can't have any lingering cbs
    // if a socket request makes it through after exit somehow
    curCommand = null;
    onReceiveCommand = null;

    if (currentSocket) {
      logger.debug("Destroying instruments client socket.");
      currentSocket.end();
      currentSocket.destroy(); // close this
      currentSocket = null;
    }
    if (socketServer) {
      logger.debug("Closing socket server.");
      socketServer.close(cb);
      socketServer = null;
    } else {
      cb();
    }
  };

  this.safeShutdown = function (cb) {
    logger.debug("Shutting down command proxy and ignoring any errors");
    try {
      this.shutdown(function (err) {
        if (err) logger.debug("Ignoring error: " + err);
        cb();
      });
    } catch (ign) {
      logger.debug("Ignoring error: " + ign);
      cb();
    }
  };

  this.start = function (_firstSocketConnectionCb, cb) {
    cb = cb || function () {};
    firstSocketConnectionCb = _firstSocketConnectionCb || function () {};
    //initSocketServer
    socketServer = net.createServer({allowHalfOpen: true},
        onSocketConnect);

    socketServer.on('close', function () {
      logger.debug("Instruments socket server was closed");
    });

    // remove socket file if it currently exists
    try {
      fs.unlinkSync(sock);
    } catch (err) {
      // if we get any error other than "socket doesn't exist", fail
      if (err.message.indexOf("ENOENT") === -1) {
        return cb(err);
      }
    }
    mkdirp(path.dirname(sock), function (err) {
      if (err) return cb(err);
      socketServer.listen(sock, function (err) {
        if (err) return cb(err);
        logger.debug("Instruments socket server started at " + sock);
        cb();
      });
    });

  };

};

module.exports = TheProxy;

