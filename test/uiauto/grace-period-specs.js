/* globals $ */
'use strict';

var base = require('./base');
describe('grace period', function () {
  var imports = { post: [
    'uiauto/lib/mechanic-ext/gesture-ext.js',
    'uiauto/lib/mechanic-ext/keyboard-ext.js',
  ]};
  base.globalInit(this, { imports: imports, bootstrap: 'basic'});

  describe("looking for unexistant object", function () {
    var ctx;
    base.instrumentsInstanceInit()
      .then(function (_ctx) { ctx = _ctx; }).done();

    it('should be quick when grace period is not set', function () {
      var refMs = Date.now();
      return ctx.execFunc(
        function () {
          return $('#not exist');
        }
      ).should.eventually.have.length(0)
      .then(function () { (Date.now() - refMs).should.be.below(1000); });
    });

    it('should be quick when pushing and poping 0 timeout', function () {
      var refMs = Date.now();
      return ctx.execFunc(
        function () {
          $.target().pushTimeout(0);
          var res = $('#not exist');
          $.target().popTimeout();
          return res;
        }
      ).should.eventually.have.length(0)
      .then(function () { (Date.now() - refMs).should.be.below(1000); });
    });

    // Skipping because of bug, it takes more than 25 second!
    it.skip('should be quick when grace period is set to 1', function () {
      var refMs = Date.now();
      return ctx.execFunc(
        function () {
          $.target().setTimeout(1);
          $.warn('lookup starting');
          var res = $('#not exist');
          $.warn('lookup finished');
          return res;
        }
      ).should.eventually.have.length(0)
      .then(function () {
        (Date.now() - refMs).should.be.below(5000);
      });
    });

  });

});
