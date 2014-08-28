'use strict';

var chai = require('chai'),
    fs = require('fs'),
    prepareBootstrap = require('../../lib/dynamic-bootstrap').prepareBootstrap,
    logger = require('../../lib/logger'),
    Q = require('q'),
    rimraf = Q.denodeify(require('rimraf')),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('dynamic bootstrap', function () {
  function envFromCode(code) {
    // let's pick out the dynamic env from the new bootrap file with this
    // regex so we can be sure it matches what we expect
    var envRe = /^bootstrap\((\{[^]+})\);$/m;
    var envStr = envRe.exec(code)[1];
    var env = JSON.parse(envStr);
    return env;
  }

  function checkCode(code) {
    var env = envFromCode(code);
    env.nodePath.should.equal(process.execPath);
    env.commandProxyClientPath.should.exist;
    env.instrumentsSock.should.exist;
    fs.existsSync(env.commandProxyClientPath).should.be.ok;
    return env;
  }

  before(function () {
    sinon.spy(logger, "debug");
  });

  after(function () {
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
        checkCode(code);
      })
      .then(function () {
        logger.debug.calledWithMatch(/Creating or overwritting dynamic bootstrap/).should.be.ok;
        logger.debug.reset();
      })

      // second call: should reuse bootstrap file
      .then(function () { return prepareBootstrap(); })
      .then(function (bootstrapFile) {
        bootstrapFile.should.match(/\/tmp\/appium-uiauto\/test\/unit\/bootstrap\/bootstrap\-.*\.js/);
        var code = fs.readFileSync(bootstrapFile, 'utf8');
        checkCode(code);
      }).then(function () {
        logger.debug.calledWithMatch(/Reusing dynamic bootstrap/).should.be.ok;
        logger.debug.reset();
      })

      // fourth call using custom socket path: should create different bootstrap file
      .then(function () {
        return prepareBootstrap({sock: '/tmp/abcd/sock'});
      }).then(function (bootstrapFile) {
        bootstrapFile.should.match(/\/tmp\/appium-uiauto\/test\/unit\/bootstrap\/bootstrap\-.*\.js/);
        var code = fs.readFileSync(bootstrapFile, 'utf8');
        var env = checkCode(code, {isVerbose: true, gracePeriod: 5});
        env.instrumentsSock.should.equal('/tmp/abcd/sock');
      })
      .then(function () {
        logger.debug.calledWithMatch(/Creating or overwritting dynamic bootstrap/).should.be.ok;
        logger.debug.reset();
      })

      .nodeify(done);
  });

});
