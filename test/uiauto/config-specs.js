// transpile:mocha

import { instrumentsInstanceInit, globalInit, killAll } from './base';
import path from'path';
import _rimraf from 'rimraf';
import Promise from 'bluebird';

let rimraf = Promise.promisify(_rimraf);


describe('config', function () {
  describe('custom socket', () => {
    let altSockDir = '/tmp/abcd';
    let altSock = path.resolve(altSockDir, 'sock');

    let ctx;
    before(async function () {
      await rimraf(altSockDir);
      await globalInit(this, { chai: true, sock: altSock });
      ctx = await instrumentsInstanceInit({ sock: altSock });
    });
    after(async () => {
      await killAll(ctx);
    });

    it('should use the alternate sock', function () {
      ctx.proxy.should.exist;
      ctx.proxy.sock.should.equal(altSock);
    });

    it('should work', async () => {
      let res = await ctx.execFunc(
        function () {
          return 'OK Boss';
        }
      );
      res.should.equal('OK Boss');
    });

  });

});
