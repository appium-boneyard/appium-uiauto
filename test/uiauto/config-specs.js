'use strict';

var base = require('./base'),
    path = require('path'),
    rimraf = require('rimraf');

describe('config', function () {
  describe("custom sock", function () {
    var altSockDir = '/tmp/abcd';
    var altSock = path.resolve(altSockDir, 'sock');

    before(function () {
      rimraf.sync('/tmp/abcd');
    });

    base.globalInit(this, { chai: true, sock: altSock });

    var ctx;
    base.instrumentsInstanceInit({ sock: altSock })
      .then(function (_ctx) { ctx = _ctx; }).done();

    it('should use the alternate sock', function () {
      ctx.proxy.should.exist;
      ctx.proxy.getSock().should.equal(altSock);
    });

    it('should work', function () {
      return ctx.execFunc(
        function () {
          return "OK Boss";
        }
      ).then(function (res) {
        res.should.equal("OK Boss");
      });
    });

  });

});
