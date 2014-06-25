'use strict';

var chai = require('chai'),
    fs = require('fs'),
    prepareBootstrap = require('../../lib/dynamic-bootstrap').prepareBootstrap,
    logger = require('../../lib/logger'),
    Q = require('q'),
    rimraf = Q.denodeify(require('rimraf')),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai"),
    _ = require('underscore');

chai.should();
chai.use(sinonChai);

describe('dynamic bootstrap', function () {
  function envFromCode(code) {
    /* jshint unused:false */
    var bootstrap = function (env) {
      return env;
    };
    /* jshint evil:true */
    return eval(code.replace(/#import.*/g, ''));
  }

  function checkCode(code, opts) {
    code.should.match(/#import/);
    /* jshint evil:true */
    var env = envFromCode(code);
    env.USER.should.equal(process.env.USER);
    env.NODE_BIN.should.equal(process.execPath);
    env.CWD.should.equal(process.cwd());
    env.COMMAND_PROXY_CLIENT_PATH.should.exist;
    fs.existsSync(env.COMMAND_PROXY_CLIENT_PATH).should.be.ok;
    env.VERBOSE_INSTRUMENTS.should.equal(opts.VERBOSE_INSTRUMENTS);
  }

  var origEnv = {};
  before(function () {
    origEnv = _.clone(process.env);
    process.env.VERBOSE_INSTRUMENTS = false;
    sinon.spy(logger, "debug");
  });

  after(function () {
    process.env.VERBOSE_INSTRUMENTS = origEnv.VERBOSE_INSTRUMENTS;
    logger.debug.restore();
  });

  it('should generate dynamic bootstrap', function (done) {
    process.env.APPIUM_BOOTSTRAP_DIR = '/tmp/appium-uiauto/test/unit/bootstrap';
    rimraf(process.env.APPIUM_BOOTSTRAP_DIR)
      // first call: should create new bootstrap file
      .then(function () { return prepareBootstrap(); })
      .then(function (bootstrapFile) {
        bootstrapFile.should.match(/\/tmp\/appium-uiauto\/test\/unit\/bootstrap\/bootstrap\-.*\.js/);
        var code = fs.readFileSync(bootstrapFile, 'utf8');
        checkCode(code, {VERBOSE_INSTRUMENTS: false});
      }).then(function () {
        logger.debug.calledWithMatch(/Creating or overwritting dynamic bootstrap/).should.be.ok;
        logger.debug.reset();
      })
      // second call: should reuse bootstrap file
      .then(function () { return prepareBootstrap(); })
      .then(function (bootstrapFile) {
        bootstrapFile.should.match(/\/tmp\/appium-uiauto\/test\/unit\/bootstrap\/bootstrap\-.*\.js/);
        var code = fs.readFileSync(bootstrapFile, 'utf8');
        checkCode(code, {VERBOSE_INSTRUMENTS: false});
      }).then(function () {
        logger.debug.calledWithMatch(/Reusing dynamic bootstrap/).should.be.ok;
        logger.debug.reset();
      })
      // third call call with different param: should create different bootstrap file
      .then(function () { return prepareBootstrap({verboseInstruments: true});})
      .then(function (bootstrapFile) {
        bootstrapFile.should.match(/\/tmp\/appium-uiauto\/test\/unit\/bootstrap\/bootstrap\-.*\.js/);
        var code = fs.readFileSync(bootstrapFile, 'utf8');
        checkCode(code, {VERBOSE_INSTRUMENTS: true});
      })
      .then(function () {
        logger.debug.calledWithMatch(/Creating or overwritting dynamic bootstrap/).should.be.ok;
      })
      .nodeify(done);
  });

});
