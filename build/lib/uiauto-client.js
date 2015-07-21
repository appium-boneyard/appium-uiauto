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

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _uiautoResponse = require('./uiauto-response');

var _uiautoResponse2 = _interopRequireDefault(_uiautoResponse);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _mkdirp2 = require('mkdirp');

var _mkdirp3 = _interopRequireDefault(_mkdirp2);

var _rimraf2 = require('rimraf');

var _rimraf3 = _interopRequireDefault(_rimraf2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var mkdirp = _bluebird2['default'].promisify(_mkdirp3['default']);
var rimraf = _bluebird2['default'].promisify(_rimraf3['default']);

var MORE_COMMAND = '#more';

var UIAutoClient = (function () {
  function UIAutoClient() {
    var sock = arguments.length <= 0 || arguments[0] === undefined ? '/tmp/instruments_sock' : arguments[0];

    _classCallCheck(this, UIAutoClient);

    this.curCommand = null;
    this.onReceiveCommand = null;
    this.commandQueue = [];
    this.sock = sock;
    this.socketServer = null;
    this.hasConnected = false;
    this.currentSocket = null;
  }

  _createClass(UIAutoClient, [{
    key: 'sendCommand',
    value: function sendCommand(cmd) {
      return _regeneratorRuntime.async(function sendCommand$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', new _bluebird2['default'](function (resolve, reject) {
              var cb = function cb(result) {
                // get back a JSONWP object, so decode and
                // just return the value
                if (result.status === 0) {
                  resolve(result.value);
                } else {
                  reject(new Error(result.value));
                }
              };
              _this.commandQueue.push({ cmd: cmd, cb: cb });
              if (_lodash2['default'].isFunction(_this.onReceiveCommand)) {
                _this.onReceiveCommand();
              }
            }));

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'start',

    /*
     * Returns true if the resulting connecting is the first
     * socket connection for this proxy session
     */
    value: function start() {
      return _regeneratorRuntime.async(function start$(context$2$0) {
        var _this4 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', new _bluebird2['default'](function callee$2$0(resolve) {
              var response;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                var _this3 = this;

                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    response = new _uiautoResponse2['default']();

                    this.socketServer = _net2['default'].createServer({ allowHalfOpen: true }, function callee$3$0(conn) {
                      return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                        var _this2 = this;

                        while (1) switch (context$4$0.prev = context$4$0.next) {
                          case 0:
                            if (!this.hasConnected) {
                              this.hasConnected = true;
                              _logger2['default'].info('Instruments is ready to receive commands');
                              resolve(true);
                            }
                            // up with strings! down with buffers!
                            conn.setEncoding('utf8');

                            // keep track of this so that we can destroy the socket
                            // when shutting down
                            this.currentSocket = conn;

                            conn.on('close', function () {
                              _this2.currentSocket = null;
                            });

                            // all data goes into buffer
                            conn.pipe((0, _through2['default'])(function (data) {
                              _logger2['default'].debug('Socket data received (' + data.length + ' bytes)');
                              response.addData(data);
                            }));

                            // when all data is in, deal with it
                            conn.on('end', function () {
                              // if we are midway through handling a command
                              // we want to try out the data, getting more if necessary
                              if (_this2.curCommand) {
                                var result = response.getResult();
                                if (result.needsMoreData) {
                                  _logger2['default'].debug('Not the last chunk, trying to get more');
                                  _this2.commandQueue.unshift({ cmd: MORE_COMMAND, cb: _this2.curCommand.cb });
                                } else {
                                  _this2.curCommand.cb(result);
                                  _this2.curCommand = null;
                                }
                              } else {
                                _logger2['default'].debug('Got a result when we were not expecting one! Ignoring it');
                                response.resetBuffer();
                              }

                              // set up a callback to handle the next command
                              var onReceiveCommand = function onReceiveCommand() {
                                _this2.onReceiveCommand = null;
                                _this2.curCommand = _this2.commandQueue.shift();
                                _logger2['default'].debug('Sending command to instruments: ' + _this2.curCommand.cmd);
                                conn.write(JSON.stringify({ cmd: _this2.curCommand.cmd }));
                                conn.end();
                              };
                              if (_this2.commandQueue.length) {
                                onReceiveCommand();
                              } else {
                                _this2.onReceiveCommand = onReceiveCommand;
                              }
                            });

                          case 6:
                          case 'end':
                            return context$4$0.stop();
                        }
                      }, null, _this3);
                    });

                    this.socketServer.on('close', function () {
                      _logger2['default'].debug('Instruments socket server was closed');
                    });

                    context$3$0.next = 5;
                    return _regeneratorRuntime.awrap(rimraf(this.sock));

                  case 5:
                    context$3$0.next = 7;
                    return _regeneratorRuntime.awrap(mkdirp(_path2['default'].dirname(this.sock)));

                  case 7:

                    this.socketServer.listen(this.sock);
                    _logger2['default'].debug('Instruments socket server started at ' + this.sock);

                  case 9:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this4);
            }));

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      return _regeneratorRuntime.async(function shutdown$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            // make sure clear out command cbs so we can't have any lingering cbs
            // if a socket request makes it through after exit somehow
            this.curCommand = null;
            this.onReceiveCommand = null;

            if (this.currentSocket) {
              _logger2['default'].debug('Destroying instruments client socket.');
              this.currentSocket.end();
              this.currentSocket.destroy();
              this.currentSocket = null;
            }

            if (!this.socketServer) {
              context$2$0.next = 8;
              break;
            }

            _logger2['default'].debug('Closing socket server.');
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(_bluebird2['default'].promisify(this.socketServer.close, this.socketServer)());

          case 7:
            this.socketServer = null;

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'safeShutdown',
    value: function safeShutdown() {
      return _regeneratorRuntime.async(function safeShutdown$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug('Shutting down command proxy and ignoring any errors');
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.shutdown());

          case 4:
            context$2$0.next = 9;
            break;

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](1);

            _logger2['default'].debug('Ignoring error: ' + context$2$0.t0);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 6]]);
    }
  }]);

  return UIAutoClient;
})();

exports['default'] = UIAutoClient;
module.exports = exports['default'];

// only resolve the promise when the server that is created actually connects
// remove socket file if it currently exists

// create the new socket file
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91aWF1dG8tY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQWUyQixtQkFBbUI7Ozs7c0JBQzlCLFVBQVU7Ozs7dUJBQ04sU0FBUzs7OzttQkFDYixLQUFLOzs7O3VCQUNELFFBQVE7Ozs7dUJBQ1IsUUFBUTs7OztvQkFDWCxNQUFNOzs7O3dCQUNILFVBQVU7Ozs7c0JBQ2hCLFFBQVE7Ozs7QUFFdEIsSUFBSSxNQUFNLEdBQUcsc0JBQVEsU0FBUyxxQkFBUyxDQUFDO0FBQ3hDLElBQUksTUFBTSxHQUFHLHNCQUFRLFNBQVMscUJBQVMsQ0FBQzs7QUFHeEMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDOztJQUd2QixZQUFZO0FBQ0osV0FEUixZQUFZLEdBQzZCO1FBQWhDLElBQUkseURBQUcsdUJBQXVCOzswQkFEdkMsWUFBWTs7QUFFZCxRQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixRQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLFFBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0dBQzNCOztlQVRHLFlBQVk7O1dBV0UscUJBQUMsR0FBRzs7Ozs7O2dEQUNiLDBCQUFZLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxrQkFBSSxFQUFFLEdBQUcsU0FBTCxFQUFFLENBQUksTUFBTSxFQUFLOzs7QUFHbkIsb0JBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdkIseUJBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3ZCLE1BQU07QUFDTCx3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Ozs7Ozs7S0FFNUI7OztXQUVrQjs7OztBQUNqQixnQ0FBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQzs7OzZDQUV6RCxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0FBRXJCLGdDQUFJLEtBQUsscUNBQTBCLENBQUM7Ozs7Ozs7S0FFdkM7OztTQXZJRyxZQUFZOzs7cUJBMElILFlBQVkiLCJmaWxlIjoibGliL3VpYXV0by1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgQ29tbWFuZCBQcm94eSByZWxheXMgVUlBdXRvIG1lc3NhZ2UgdG8gYW5kIGZyb20gQXBwaXVtLiBJdCBpcyBhbHNvIHRoZVxuLy8gVUlBdXRvIGZhY2FkZSBmb3IgQXBwaXVtLlxuLy9cbi8vIFRoZSBtZXNzYWdlIHJvdXRlIGlzIHRoZSBmb2xsb3dpbmc6XG4vLyBBcHBpdW0gPC0tPiBDb21tYW5kIFByb3h5IDwtLT4gSW5zdHJ1bWVudHNcbi8vIFRoZSBtZWRpdW0gYmV0d2VlbiBJbnN0cnVtZW50cyBhbmQgQ29tbWFuZCBQcm94eSBpcyB0aGUgY29tbWFuZC1wcm94eS1jbGllbnRcbi8vIHNjcmlwdC5cbi8vXG4vLyBDb21tYW5kIFByb3h5IC0tPiBJbnN0cnVtZW50cyBtZXNzYWdlIGZvcm1hdDoge2NtZDpcIjxDTUQ+XCJ9XG4vL1xuLy8gSW5zdHJ1bWVudHMgLS0+IENvbW1hbmQgUHJveHkgbWVzc2FnZSBmb3JtYXQ6XG4vLyA8b25lIGNoYXIgbWVzc2FnZSB0eXBlPiw8c3RyaW5naWZpZWQganNvbiBkYXRhPlxuLy8gPHN0cmluZ2lmaWVkIGpzb24gZGF0YT4gZm9ybWF0OlxuLy8ge3N0YXR1czo8c3RhdHVzPiwgdmFsdWU6PHJlc3VsdD59XG5cbmltcG9ydCBVSUF1dG9SZXNwb25zZSBmcm9tICcuL3VpYXV0by1yZXNwb25zZSc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB0aHJvdWdoIGZyb20gJ3Rocm91Z2gnO1xuaW1wb3J0IG5ldCBmcm9tICduZXQnO1xuaW1wb3J0IF9ta2RpcnAgZnJvbSAnbWtkaXJwJztcbmltcG9ydCBfcmltcmFmIGZyb20gJ3JpbXJhZic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmxldCBta2RpcnAgPSBQcm9taXNlLnByb21pc2lmeShfbWtkaXJwKTtcbmxldCByaW1yYWYgPSBQcm9taXNlLnByb21pc2lmeShfcmltcmFmKTtcblxuXG5jb25zdCBNT1JFX0NPTU1BTkQgPSAnI21vcmUnO1xuXG5cbmNsYXNzIFVJQXV0b0NsaWVudCB7XG4gIGNvbnN0cnVjdG9yIChzb2NrID0gJy90bXAvaW5zdHJ1bWVudHNfc29jaycpIHtcbiAgICB0aGlzLmN1ckNvbW1hbmQgPSBudWxsO1xuICAgIHRoaXMub25SZWNlaXZlQ29tbWFuZCA9IG51bGw7XG4gICAgdGhpcy5jb21tYW5kUXVldWUgPSBbXTtcbiAgICB0aGlzLnNvY2sgPSBzb2NrO1xuICAgIHRoaXMuc29ja2V0U2VydmVyID0gbnVsbDtcbiAgICB0aGlzLmhhc0Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudFNvY2tldCA9IG51bGw7XG4gIH1cblxuICBhc3luYyBzZW5kQ29tbWFuZCAoY21kKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBjYiA9IChyZXN1bHQpID0+IHtcbiAgICAgICAgLy8gZ2V0IGJhY2sgYSBKU09OV1Agb2JqZWN0LCBzbyBkZWNvZGUgYW5kXG4gICAgICAgIC8vIGp1c3QgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKHJlc3VsdC52YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdGhpcy5jb21tYW5kUXVldWUucHVzaCh7Y21kLCBjYn0pO1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLm9uUmVjZWl2ZUNvbW1hbmQpKSB7XG4gICAgICAgIHRoaXMub25SZWNlaXZlQ29tbWFuZCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByZXN1bHRpbmcgY29ubmVjdGluZyBpcyB0aGUgZmlyc3RcbiAgICogc29ja2V0IGNvbm5lY3Rpb24gZm9yIHRoaXMgcHJveHkgc2Vzc2lvblxuICAgKi9cbiAgYXN5bmMgc3RhcnQgKCkge1xuICAgIC8vIG9ubHkgcmVzb2x2ZSB0aGUgcHJvbWlzZSB3aGVuIHRoZSBzZXJ2ZXIgdGhhdCBpcyBjcmVhdGVkIGFjdHVhbGx5IGNvbm5lY3RzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBuZXcgVUlBdXRvUmVzcG9uc2UoKTtcbiAgICAgIHRoaXMuc29ja2V0U2VydmVyID0gbmV0LmNyZWF0ZVNlcnZlcih7YWxsb3dIYWxmT3BlbjogdHJ1ZX0sIGFzeW5jIChjb25uKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5oYXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmhhc0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgbG9nLmluZm8oJ0luc3RydW1lbnRzIGlzIHJlYWR5IHRvIHJlY2VpdmUgY29tbWFuZHMnKTtcbiAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwIHdpdGggc3RyaW5ncyEgZG93biB3aXRoIGJ1ZmZlcnMhXG4gICAgICAgIGNvbm4uc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcblxuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoaXMgc28gdGhhdCB3ZSBjYW4gZGVzdHJveSB0aGUgc29ja2V0XG4gICAgICAgIC8vIHdoZW4gc2h1dHRpbmcgZG93blxuICAgICAgICB0aGlzLmN1cnJlbnRTb2NrZXQgPSBjb25uO1xuXG4gICAgICAgIGNvbm4ub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVudFNvY2tldCA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFsbCBkYXRhIGdvZXMgaW50byBidWZmZXJcbiAgICAgICAgY29ubi5waXBlKHRocm91Z2goKGRhdGEpID0+IHtcbiAgICAgICAgICBsb2cuZGVidWcoYFNvY2tldCBkYXRhIHJlY2VpdmVkICgke2RhdGEubGVuZ3RofSBieXRlcylgKTtcbiAgICAgICAgICByZXNwb25zZS5hZGREYXRhKGRhdGEpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gd2hlbiBhbGwgZGF0YSBpcyBpbiwgZGVhbCB3aXRoIGl0XG4gICAgICAgIGNvbm4ub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAvLyBpZiB3ZSBhcmUgbWlkd2F5IHRocm91Z2ggaGFuZGxpbmcgYSBjb21tYW5kXG4gICAgICAgICAgLy8gd2Ugd2FudCB0byB0cnkgb3V0IHRoZSBkYXRhLCBnZXR0aW5nIG1vcmUgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgaWYgKHRoaXMuY3VyQ29tbWFuZCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlc3BvbnNlLmdldFJlc3VsdCgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5uZWVkc01vcmVEYXRhKSB7XG4gICAgICAgICAgICAgIGxvZy5kZWJ1ZygnTm90IHRoZSBsYXN0IGNodW5rLCB0cnlpbmcgdG8gZ2V0IG1vcmUnKTtcbiAgICAgICAgICAgICAgdGhpcy5jb21tYW5kUXVldWUudW5zaGlmdCh7Y21kOiBNT1JFX0NPTU1BTkQsIGNiOiB0aGlzLmN1ckNvbW1hbmQuY2J9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuY3VyQ29tbWFuZC5jYihyZXN1bHQpO1xuICAgICAgICAgICAgICB0aGlzLmN1ckNvbW1hbmQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoJ0dvdCBhIHJlc3VsdCB3aGVuIHdlIHdlcmUgbm90IGV4cGVjdGluZyBvbmUhIElnbm9yaW5nIGl0Jyk7XG4gICAgICAgICAgICByZXNwb25zZS5yZXNldEJ1ZmZlcigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCB1cCBhIGNhbGxiYWNrIHRvIGhhbmRsZSB0aGUgbmV4dCBjb21tYW5kXG4gICAgICAgICAgbGV0IG9uUmVjZWl2ZUNvbW1hbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uUmVjZWl2ZUNvbW1hbmQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jdXJDb21tYW5kID0gdGhpcy5jb21tYW5kUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhgU2VuZGluZyBjb21tYW5kIHRvIGluc3RydW1lbnRzOiAke3RoaXMuY3VyQ29tbWFuZC5jbWR9YCk7XG4gICAgICAgICAgICBjb25uLndyaXRlKEpTT04uc3RyaW5naWZ5KHtjbWQ6IHRoaXMuY3VyQ29tbWFuZC5jbWR9KSk7XG4gICAgICAgICAgICBjb25uLmVuZCgpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKHRoaXMuY29tbWFuZFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgb25SZWNlaXZlQ29tbWFuZCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uUmVjZWl2ZUNvbW1hbmQgPSBvblJlY2VpdmVDb21tYW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zb2NrZXRTZXJ2ZXIub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2cuZGVidWcoJ0luc3RydW1lbnRzIHNvY2tldCBzZXJ2ZXIgd2FzIGNsb3NlZCcpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHJlbW92ZSBzb2NrZXQgZmlsZSBpZiBpdCBjdXJyZW50bHkgZXhpc3RzXG4gICAgICBhd2FpdCByaW1yYWYodGhpcy5zb2NrKTtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBuZXcgc29ja2V0IGZpbGVcbiAgICAgIGF3YWl0IG1rZGlycChwYXRoLmRpcm5hbWUodGhpcy5zb2NrKSk7XG5cbiAgICAgIHRoaXMuc29ja2V0U2VydmVyLmxpc3Rlbih0aGlzLnNvY2spO1xuICAgICAgbG9nLmRlYnVnKGBJbnN0cnVtZW50cyBzb2NrZXQgc2VydmVyIHN0YXJ0ZWQgYXQgJHt0aGlzLnNvY2t9YCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzaHV0ZG93biAoKSB7XG4gICAgLy8gbWFrZSBzdXJlIGNsZWFyIG91dCBjb21tYW5kIGNicyBzbyB3ZSBjYW4ndCBoYXZlIGFueSBsaW5nZXJpbmcgY2JzXG4gICAgLy8gaWYgYSBzb2NrZXQgcmVxdWVzdCBtYWtlcyBpdCB0aHJvdWdoIGFmdGVyIGV4aXQgc29tZWhvd1xuICAgIHRoaXMuY3VyQ29tbWFuZCA9IG51bGw7XG4gICAgdGhpcy5vblJlY2VpdmVDb21tYW5kID0gbnVsbDtcblxuICAgIGlmICh0aGlzLmN1cnJlbnRTb2NrZXQpIHtcbiAgICAgIGxvZy5kZWJ1ZygnRGVzdHJveWluZyBpbnN0cnVtZW50cyBjbGllbnQgc29ja2V0LicpO1xuICAgICAgdGhpcy5jdXJyZW50U29ja2V0LmVuZCgpO1xuICAgICAgdGhpcy5jdXJyZW50U29ja2V0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuY3VycmVudFNvY2tldCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvY2tldFNlcnZlcikge1xuICAgICAgbG9nLmRlYnVnKCdDbG9zaW5nIHNvY2tldCBzZXJ2ZXIuJyk7XG4gICAgICBhd2FpdCAoUHJvbWlzZS5wcm9taXNpZnkodGhpcy5zb2NrZXRTZXJ2ZXIuY2xvc2UsIHRoaXMuc29ja2V0U2VydmVyKSkoKTtcbiAgICAgIHRoaXMuc29ja2V0U2VydmVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzYWZlU2h1dGRvd24gKCkge1xuICAgIGxvZy5kZWJ1ZygnU2h1dHRpbmcgZG93biBjb21tYW5kIHByb3h5IGFuZCBpZ25vcmluZyBhbnkgZXJyb3JzJyk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuc2h1dGRvd24oKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZy5kZWJ1ZyhgSWdub3JpbmcgZXJyb3I6ICR7ZXJyfWApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVSUF1dG9DbGllbnQ7XG4iXX0=