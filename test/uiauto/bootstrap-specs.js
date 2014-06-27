'use strict';

var base = require('./base');

describe('bootstrap', function () {

  describe("basic test bootstrap", function () {
    base.globalInit(this, {bootstrap: 'basic'});
    var ctx;
    base.instrumentsInstanceInit().then(function (_ctx) { ctx = _ctx; });

    it('should start and execute one command', function () {
      return ctx.sendCommand("'123'")
        .should.become('123')
        .then(function () { return ctx.sendCommand("typeof $.lookup"); })
        .should.become('undefined')
        .then(function () { return ctx.sendCommand("typeof chai"); })
        .should.become('object');
    });
  });

  describe("regular bootstrap without chai", function () {
    base.globalInit(this);
    var ctx;
    base.instrumentsInstanceInit().then(function (_ctx) { ctx = _ctx; });

    it('should start and execute one command', function () {
      return ctx.sendCommand("'123'")
        .should.become('123')
      .then(function () { return ctx.sendCommand("typeof chai"); })
      .should.become('undefined');
    });
  });

  describe("regular bootstrap with chai", function () {
    base.globalInit(this, {chai: true});
    var ctx;
    base.instrumentsInstanceInit().then(function (_ctx) { ctx = _ctx; });

    it('should start and execute one command', function () {
      return ctx.sendCommand("'123'")
        .should.become('123')
      .then(function () { return ctx.sendCommand("typeof chai"); })
      .should.become('object');
    });
  });

});
