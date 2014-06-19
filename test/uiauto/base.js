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

var newInstruments = function (bootstrapFile) {
  return instrumentsUtils.quickInstrument({
    app: path.resolve(__dirname, '../assets/TestApp.app'),
    bootstrap: bootstrapFile
  });
};

var init = function (bootstrapFile) {
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
      newInstruments(bootstrapFile).then(function (_instruments) {
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

var bootstrapFile;

exports.globalInit = function (ctx) {
  ctx.timeout(180000);

  before(function () {
    return prepareBootstrap().then(function (_bootstrapFile) {
      bootstrapFile = _bootstrapFile;
    });
  });
};

exports.instrumentsInstanceInit = function () {
  var deferred = Q.defer();

  var ctx;
  before(function () {
    return init(bootstrapFile)
      .then(function (_ctx) {
        ctx = _ctx;

        ctx.sendCommand = function (cmd) {
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

        ctx.exec = ctx.sendCommand;

        ctx.execFunc = function (func) {
          return ctx.exec('(' + func.toString() + ')();');
        };
        deferred.resolve(ctx);
      });
  });

  after(function () {
    return killAll(ctx);
  });

  return deferred.promise;
};
