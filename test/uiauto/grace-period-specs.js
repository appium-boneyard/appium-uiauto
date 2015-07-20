// transpile:mocha
/* globals $ */

import { instrumentsInstanceInit, globalInit, killAll } from './base';


describe('grace period', async () => {
  let imports = { post: [
    'uiauto/lib/mechanic-ext/gesture-ext.js',
    'uiauto/lib/mechanic-ext/keyboard-ext.js',
  ]};
  before(async function () {
    await globalInit(this, { imports: imports, bootstrap: 'basic'});
  });

  describe('looking for non-existant object', async function () {
    let ctx;
    before(async () => {
      ctx = await instrumentsInstanceInit();
    });
    after(async () => {
      await killAll(ctx);
    });

    it('should be quick when grace period is not set', async () => {
      let refMs = Date.now();
      let res = await ctx.execFunc(
        function () {
          return $('#not exist');
        }
      );
      res.should.have.length(0);
      (Date.now() - refMs).should.be.below(1000);
    });

    it('should be quick when pushing and popping 0 timeout', async () => {
      let refMs = Date.now();
      let res = await ctx.execFunc(
        function () {
          $.target().pushTimeout(0);
          var res = $('#not exist');
          $.target().popTimeout();
          return res;
        }
      );
      res.should.have.length(0);
      (Date.now() - refMs).should.be.below(1000);
    });

    // Skipping because of bug, it takes more than 25 second!
    it.skip('should be quick when grace period is set to 1', async () => {
      let refMs = Date.now();
      let res = await ctx.execFunc(
        function () {
          $.target().setTimeout(1);
          $.warn('lookup starting');
          var res = $('#not exist');
          $.warn('lookup finished');
          return res;
        }
      );
      res.should.have.length(0)
      (Date.now() - refMs).should.be.below(5000);
    });
  });
});
