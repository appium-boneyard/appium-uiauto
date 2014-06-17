'use strict';


var logger = require('./logger.js'),
    fs = require('fs'),
    through = require('through'),
    _ = require('underscore'),
    net = require('net');

var UNKNOWN_ERROR = {
  status: 13,
  value: "Error parsing socket data from instruments"
};

var Proxy = function (opts) {
  var curCommand = null;
  var onReceiveCommand = null;
  var commandQueue = [];
  var sock = opts.sock || '/tmp/instruments_sock'; // TODO: is it really necessary?
  var socketServer = null;
  var hasConnected = false;
  var bufferedData = "";
  var currentSocket = null;
  var eventRouter = {};
  var firstSocketConnectionCb = null;

  var onSocketConnect = function (conn) {
    if (!hasConnected) {
      hasConnected = true;
      logger.debug("Instruments is ready to receive commands");
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
      try {
        data = JSON.parse(data);
      } catch (e) {
        logger.error("Couldn't parse JSON data from socket, maybe buffer issue?");
        logger.error(data);
        data = {
          event: 'cmd',
          result: UNKNOWN_ERROR
        };
      }
      if (!_.has(data, 'event')) {
        logger.error("Socket data came in without event, it was:");
        logger.error(JSON.stringify(data));
      } else if (!_.has(eventRouter, data.event)) {
        logger.error("Socket is asking for event '" + data.event +
                    "' which doesn't exist");
      } else {
        logger.debug("Socket data being routed for '" + data.event + "' event");
        eventRouter[data.event](data, conn);
      }
    });
  };

  var waitForCommand = function (cb) {
    if (commandQueue.length) {
      cb();
    } else {
      onReceiveCommand = cb;
    }
  };

  eventRouter.cmd = function (data, c) {
    var hasResult = typeof data.result !== "undefined";
    if (hasResult && !curCommand) {
      logger.info("Got a result when we weren't expecting one! Ignoring it");
      logger.info("Result was: " + JSON.stringify(data.result));
    } else if (!hasResult && curCommand) {
      logger.info("Instruments didn't send a result even though we were expecting one");
      hasResult = true;
      data.result = false;
    }

    if (hasResult && curCommand) {
      if (data.result) {
        logger.debug("Got result from instruments: " +
                   JSON.stringify(data.result).slice(0, 300));
      } else {
        logger.debug("Got null result from instruments");
      }
      curCommand.cb(data.result);
      curCommand = null;
    }

    waitForCommand(function () {
      curCommand = commandQueue.shift();
      onReceiveCommand = null;
      logger.debug("Sending command to instruments: " + curCommand.cmd);
      c.write(JSON.stringify({nextCommand: curCommand.cmd}));
      c.end();
      //debug("Closing our half of the connection");
    });
  };
  // TODO: how to use this
  this.sendCommand = function (cmd, cb) {
    commandQueue.push({cmd: cmd, cb: cb});
    if (onReceiveCommand) {
      onReceiveCommand();
    }
  };

  this.close = function (cb) {
    // make sure clear out command cbs so we can't have any lingering cbs
    // if a socket request makes it through after exit somehow
    curCommand = null;
    onReceiveCommand = null;

    if (currentSocket) {
      logger.debug("Closing instruments client socket due to exit");
      currentSocket.end();
      currentSocket.destroy(); // close this
      socketServer.close(cb);      
    }
  };

  this.start = function (_firstSocketConnectionCb, cb) {
    firstSocketConnectionCb = _firstSocketConnectionCb;
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

    socketServer.listen(sock, function (err) {
      if (err) return cb(err);
      logger.debug("Instruments socket server started at " + sock);
      cb();
    });
  };

};

module.exports = Proxy;

