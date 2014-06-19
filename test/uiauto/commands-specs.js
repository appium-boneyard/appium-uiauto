/* globals $ */
'use strict';


var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    Q = require('q'),
    CommandProxy = require('../../lib/command-proxy.js'),
    instrumentsUtils = require('appium-instruments').utils,
    getEnv = require('../../lib/dynamic-bootstrap').getEnv,
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs');

chai.use(chaiAsPromised);
chai.should();

process.env.APPIUM_BOOTSTRAP_DIR = '/tmp/appium-uiauto/test/functional/bootstrap';

describe('commands', function () {
  this.timeout(180000);
  var bootstrapFile;

  var prepareBootstrap = function () {
    var env = getEnv();
    var code = fs.readFileSync(path.resolve(
      __dirname, '../../test/assets/base-bootstrap.js'), 'utf8');

    _({
      '<ROOT_DIR>': path.resolve(__dirname, '../..'),
      '<COMMAND_PROXY_CLIENT_PATH>': env.COMMAND_PROXY_CLIENT_PATH,
      '<NODE_BIN>': env.NODE_BIN
    }).each(function (value, key) {
      code = code.replace(new RegExp(key, 'g'), value);
    });
    return require('../../lib/dynamic-bootstrap').prepareBootstrap({
      code: code
    });
  };

  var newInstruments = function () {
    return instrumentsUtils.quickInstrument({
      app: path.resolve(__dirname, '../assets/TestApp.app'),
      bootstrap: bootstrapFile
    });
  };

  var init = function () {
    var deferred = Q.defer();
    var proxy = new CommandProxy();
    proxy.start(
      // first connection
      function () {
        // TODO
      },
      // regular cb
      function (err) {
        if (err) return deferred.reject(err);
        newInstruments({
          app: path.resolve(__dirname, '../assets/TestApp.app'),
          bootstrap: path.resolve(__dirname, '../assets/bootstrap.js'),
        }).then(function (_instruments) {

          var instruments = _instruments;
          instruments.start(null, function () {
            proxy.safeShutdown();
          });
          setTimeout(function () {
            instruments.launchHandler();
            deferred.resolve({proxy: proxy, instruments: instruments});
          }, 1000);
        })
        .catch(function (err) { deferred.reject(err); })
        .done();
      }
    );
    return deferred.promise;
  };

  var killAll = function (ctx) {
    return Q.nfcall(ctx.instruments.shutdown.bind(ctx.instruments))
      .then(function () {
        return instrumentsUtils.killAllInstruments();
      }).catch(function () {})
      .then(function () {
        return ctx.proxy.safeShutdown();
      });
  };

  var sendCommandBase = function (ctx, cmd) {
    var deferred = Q.defer();
    ctx.proxy.sendCommand(cmd, function (result) {
      if (result.status === 0) {
        deferred.resolve(result.value);
      } else {
        deferred.reject(JSON.stringify(result));
      }
    });
    return deferred.promise;
  };

  before(function () {
    return prepareBootstrap().then(function (_bootstrapFile) {
      bootstrapFile = _bootstrapFile;
    });
  });

  afterEach(function () {
    return Q.delay(1000);
  });

  describe("simple sequences", function () {
    var ctx, sendCommand;
    before(function () {
      return init()
        .then(function (_ctx) {
          ctx = _ctx;
          sendCommand = sendCommandBase.bind(null, ctx);
        });
    });

    after(function () {
      return killAll(ctx);
    });

    it('should send one valid command returning a value', function () {
      return sendCommand("'123'")
        .should.become('123');
    });

    it('should send one valid command returning empty value', function () {
      return sendCommand("$.warn('starting')")
        .should.become('');
    });

    it('should respond to invalid command and not die', function () {
      return sendCommand("i_am_invalid()")
        .should.be.rejectedWith(/"status":17/)
        .then(function () {
          return sendCommand("$.warn('still alive')");
        });
    });

    it('should repond to 10 commands in a row', function () {
      var seq = [];
      _(10).times(function (i) {
        seq.push(function () {
          return sendCommand('(function () { return ' + i + '})()')
            .should.become(i);
        });
      });
      return seq.reduce(Q.when, new Q());
    });

  });

  describe("sending 100 valid commands", function () {
    var ctx, sendCommand;
    before(function () {
      return init()
        .then(function (_ctx) {
          ctx = _ctx;
          sendCommand = sendCommandBase.bind(null, ctx);
        });
    });

    after(function () {
      return killAll(ctx);
    });

   it('should work', function () {
      var seq = [];
      _(100).times(function (i) {
        seq.push(function () {
          return sendCommand('(function () { return "' + i + '"})()')
            .should.become("" + i)
            .then(function () {
              if ((i+1)%10 === 0) console.log('sent:', (i+1));
            });
        });
      });
      return seq.reduce(Q.when, new Q());
    });

  });

  describe("sending 100 alternating valid and invalid", function () {
    var ctx, sendCommand;

    before(function () {
      return init()
        .then(function (_ctx) {
          ctx = _ctx;
          sendCommand = sendCommandBase.bind(null, ctx);
        });
    });

    after(function () {
      return killAll(ctx);
    });

   it('should work', function () {
      var seq = [];
      _(100).times(function (i) {
        if (i%2 === 0)
          seq.push(function () {
            return sendCommand('(function () { return "' + i + '"})()')
              .should.become("" + i)
              .then(function () {
                if ((i+1)%10 === 0) console.log('sent:', (i+1));
              });
          });
        else
          seq.push(function () {
            return sendCommand('(ffffunction () { return "' + i + '"})()')
              .should.be.rejectedWith(/"status":17/)
              .then(function () {
                if ((i+1)%10 === 0) console.log('sent:', (i+1));
              });
          });
      });
      return seq.reduce(Q.when, new Q());
    });

  });


  describe("command with big result", function () {

    var ctx, sendCommand;

    var testN = function (n) {
      return sendCommand('$.oneMamaLongString(' + n + ')')
        .then(function (s) {
          s.should.have.length(n);
          _(n).times(function (i) {
            parseInt(s[i] , 10).should.equal(i%10);
          });
        });
    };

    var testNWithSpaces = function (n) {
      return sendCommand("$.oneMamaLongString(" + n + ",[0,1,2,3,4,' ',6,7,8,9])")
        .then(function (s) {
          s.should.have.length(n);
          _(n).times(function (i) {
            if (i%10 === 5){
              s[i].should.equal(' ');
            } else {
              parseInt(s[i] , 10).should.equal(i%10);
            }
          });
        });
    };

    var getHugeTree = function (n,d) {
      return sendCommand('$.oneMamaHugeTree(' + n + ', ' + d + ')');
    };

    // UIAuto code
    var configureUIAuto = function () {
      $.extend($, {
        oneMamaLongString: function (n, mapping) {
          var i;
          if (!mapping) {
            mapping = [];
            for (i=0; i<n; i++){
              mapping.push(i);
            }
          }
          var main = "";
          for (i = 0; i < n; i++) {
            main += mapping[i % 10];
          }
          return main;
        },

        oneMamaHugeTree: function (n, d) {
          //var root = {name: 'root'};
          function addChildren(root, depth) {
            if (depth === d) return;
            root.children = {};
            var i;
            for (i=0; i<n; i++){
              root.children['c' + i] = { name: 'child ' + i };
              addChildren(root.children['c' + i], depth +1);
            }
          }
          var root = {name: 'root'};
          addChildren(root, 0);
          return root;
        },

      });
    };

    before(function () {
      return init()
        .then(function (_ctx) {
          ctx = _ctx;
          sendCommand = sendCommandBase.bind(null, ctx);
        }).then(function () {
          return sendCommand('(' +configureUIAuto.toString() + ')()');
        });
    });

    after(function () {
      return killAll(ctx);
    });

    it('should work a small string', function () {
      return testN(1000);
    });

    it('should work a medium string', function () {
      return testN(100000);
    });

    it('should work a big string', function () {
      return testN(1000000);
    });

    it('should work with a big string with spaces', function () {
      return testNWithSpaces(200000);
    });

    it('should work with a medium tree', function () {
      return getHugeTree(5,3);
    });

    it('should work with a huge tree', function () {
      return getHugeTree(5,7).then(function (res) {
        res.name.should.equal('root');
        res.children.c1.children.c2.children
          .c3.children.c2.name.should.equal('child 2');
        JSON.stringify(res).length.should.be.above(2000000);
      });
    });


  });

});
