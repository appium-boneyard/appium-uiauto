require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _ = require('../..');

var _libLogger = require('../../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _rimraf2 = require('rimraf');

var _rimraf3 = _interopRequireDefault(_rimraf2);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var fs = {
  exists: _appiumSupport.util.fileExists,
  readFile: _bluebird2['default'].promisify(_fs3['default'].readFile)
};
var rimraf = _bluebird2['default'].promisify(_rimraf3['default']);

_chai2['default'].should();
_chai2['default'].use(_sinonChai2['default']);

describe('dynamic bootstrap', function () {
  var _this = this;

  function envFromCode(code) {
    // let's pick out the dynamic env from the new bootsrap file with this
    // regex so we can be sure it matches what we expect
    var envRe = /^bootstrap\((\{[^]+})\);$/m;
    var envStr = envRe.exec(code)[1];
    var env = JSON.parse(envStr);
    return env;
  }

  function checkCode(code) {
    var env;
    return _regeneratorRuntime.async(function checkCode$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          env = envFromCode(code);

          env.nodePath.should.equal(process.execPath);
          env.commandProxyClientPath.should.exist;
          env.instrumentsSock.should.exist;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(fs.exists(env.commandProxyClientPath));

        case 6:
          context$2$0.sent.should.be['true'];
          return context$2$0.abrupt('return', env);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  before(function () {
    _sinon2['default'].spy(_libLogger2['default'], 'debug');
  });

  after(function () {
    _libLogger2['default'].debug.restore();
  });

  it('should generate dynamic bootstrap', function callee$1$0() {
    var bootstrapFile, code, env;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          process.env.APPIUM_BOOTSTRAP_DIR = '/tmp/appium-uiauto/test/unit/bootstrap';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(rimraf(process.env.APPIUM_BOOTSTRAP_DIR));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _.prepareBootstrap)());

        case 5:
          bootstrapFile = context$2$0.sent;

          bootstrapFile.should.match(/\/tmp\/appium-uiauto\/test\/unit\/bootstrap\/bootstrap\-.*\.js/);
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(fs.readFile(bootstrapFile, 'utf8'));

        case 9:
          code = context$2$0.sent;
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(checkCode(code));

        case 12:
          _libLogger2['default'].debug.calledWithMatch(/Creating or overwriting dynamic bootstrap/).should.be['true'];
          _libLogger2['default'].debug.reset();

          context$2$0.next = 16;
          return _regeneratorRuntime.awrap((0, _.prepareBootstrap)());

        case 16:
          bootstrapFile = context$2$0.sent;

          bootstrapFile.should.match(/\/tmp\/appium-uiauto\/test\/unit\/bootstrap\/bootstrap\-.*\.js/);
          context$2$0.next = 20;
          return _regeneratorRuntime.awrap(fs.readFile(bootstrapFile, 'utf8'));

        case 20:
          code = context$2$0.sent;
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(checkCode(code));

        case 23:
          _libLogger2['default'].debug.calledWithMatch(/Reusing dynamic bootstrap/).should.be['true'];
          _libLogger2['default'].debug.reset();

          context$2$0.next = 27;
          return _regeneratorRuntime.awrap((0, _.prepareBootstrap)({ sock: '/tmp/abcd/sock' }));

        case 27:
          bootstrapFile = context$2$0.sent;

          bootstrapFile.should.match(/\/tmp\/appium-uiauto\/test\/unit\/bootstrap\/bootstrap\-.*\.js/);
          context$2$0.next = 31;
          return _regeneratorRuntime.awrap(fs.readFile(bootstrapFile, 'utf8'));

        case 31:
          code = context$2$0.sent;
          context$2$0.next = 34;
          return _regeneratorRuntime.awrap(checkCode(code, { isVerbose: true, gracePeriod: 5 }));

        case 34:
          env = context$2$0.sent;

          env.instrumentsSock.should.equal('/tmp/abcd/sock');
          _libLogger2['default'].debug.calledWithMatch(/Creating or overwriting dynamic bootstrap/).should.be.ok;
          _libLogger2['default'].debug.reset();

        case 38:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// first call: should create new bootstrap file
// second call: should reuse bootstrap file
// third call using custom socket path: should create different bootstrap file
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9keW5hbWljLWJvb3RzdHJhcC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztnQkFFaUMsT0FBTzs7eUJBQ3hCLGtCQUFrQjs7Ozs2QkFDYixnQkFBZ0I7O3dCQUNqQixVQUFVOzs7O29CQUNiLE1BQU07Ozs7bUJBQ1AsSUFBSTs7Ozt1QkFDQSxRQUFROzs7O3FCQUNWLE9BQU87Ozs7eUJBQ0gsWUFBWTs7OztBQUVsQyxJQUFJLEVBQUUsR0FBRztBQUNQLFFBQU0sRUFBRSxlQVRELElBQUksQ0FTRSxVQUFVO0FBQ3ZCLFVBQVEsRUFBRSxzQkFBUSxTQUFTLENBQUMsZ0JBQUksUUFBUSxDQUFDO0NBQzFDLENBQUM7QUFDRixJQUFJLE1BQU0sR0FBRyxzQkFBUSxTQUFTLHFCQUFTLENBQUM7O0FBRXhDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyx3QkFBVyxDQUFDOztBQUVwQixRQUFRLENBQUMsbUJBQW1CLEVBQUUsWUFBWTs7O0FBQ3hDLFdBQVMsV0FBVyxDQUFDLElBQUksRUFBRTs7O0FBR3pCLFFBQUksS0FBSyxHQUFHLDRCQUE0QixDQUFDO0FBQ3pDLFFBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsUUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixXQUFPLEdBQUcsQ0FBQztHQUNaOztBQUVELFdBQWUsU0FBUyxDQUFFLElBQUk7UUFDeEIsR0FBRzs7OztBQUFILGFBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDOztBQUMzQixhQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLGFBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3hDLGFBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7MkNBQzFCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDOzs7MkJBQUUsTUFBTSxDQUFDLEVBQUU7OENBQ2hELEdBQUc7Ozs7Ozs7R0FDWDs7QUFFRCxRQUFNLENBQUMsWUFBWTtBQUNqQix1QkFBTSxHQUFHLHlCQUFNLE9BQU8sQ0FBQyxDQUFDO0dBQ3pCLENBQUMsQ0FBQzs7QUFFSCxPQUFLLENBQUMsWUFBWTtBQUNoQiwyQkFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDckIsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtRQUtsQyxhQUFhLEVBRWIsSUFBSSxFQWlCSixHQUFHOzs7O0FBdkJQLGlCQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLHdDQUF3QyxDQUFDOzsyQ0FDdEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7Ozs7MkNBR3BCLE1BbkRyQixnQkFBZ0IsR0FtRHVCOzs7QUFBeEMsdUJBQWE7O0FBQ2pCLHVCQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDOzsyQ0FDNUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDOzs7QUFBL0MsY0FBSTs7MkNBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQzs7O0FBQ3JCLGlDQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsMkNBQTJDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7QUFDdEYsaUNBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7MkNBR0ksTUEzRGpCLGdCQUFnQixHQTJEbUI7OztBQUF4Qyx1QkFBYTs7QUFDYix1QkFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQzs7MkNBQ2hGLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQzs7O0FBQS9DLGNBQUk7OzJDQUNFLFNBQVMsQ0FBQyxJQUFJLENBQUM7OztBQUNyQixpQ0FBSSxLQUFLLENBQUMsZUFBZSxDQUFDLDJCQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDO0FBQ3RFLGlDQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7OzJDQUdJLE1BbkVqQixnQkFBZ0IsRUFtRWtCLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDLENBQUM7OztBQUFoRSx1QkFBYTs7QUFDYix1QkFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQzs7MkNBQ2hGLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQzs7O0FBQS9DLGNBQUk7OzJDQUNZLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUMsQ0FBQzs7O0FBQTlELGFBQUc7O0FBQ1AsYUFBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDbkQsaUNBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3BGLGlDQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7OztHQUNuQixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2R5bmFtaWMtYm9vdHN0cmFwLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IHByZXBhcmVCb290c3RyYXAgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgbG9nIGZyb20gJy4uLy4uL2xpYi9sb2dnZXInO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IF9mcyBmcm9tICdmcyc7XG5pbXBvcnQgX3JpbXJhZiBmcm9tICdyaW1yYWYnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBzaW5vbkNoYWkgZnJvbSAnc2lub24tY2hhaSc7XG5cbmxldCBmcyA9IHtcbiAgZXhpc3RzOiB1dGlsLmZpbGVFeGlzdHMsXG4gIHJlYWRGaWxlOiBQcm9taXNlLnByb21pc2lmeShfZnMucmVhZEZpbGUpXG59O1xubGV0IHJpbXJhZiA9IFByb21pc2UucHJvbWlzaWZ5KF9yaW1yYWYpO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2Uoc2lub25DaGFpKTtcblxuZGVzY3JpYmUoJ2R5bmFtaWMgYm9vdHN0cmFwJywgZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBlbnZGcm9tQ29kZShjb2RlKSB7XG4gICAgLy8gbGV0J3MgcGljayBvdXQgdGhlIGR5bmFtaWMgZW52IGZyb20gdGhlIG5ldyBib290c3JhcCBmaWxlIHdpdGggdGhpc1xuICAgIC8vIHJlZ2V4IHNvIHdlIGNhbiBiZSBzdXJlIGl0IG1hdGNoZXMgd2hhdCB3ZSBleHBlY3RcbiAgICB2YXIgZW52UmUgPSAvXmJvb3RzdHJhcFxcKChcXHtbXl0rfSlcXCk7JC9tO1xuICAgIHZhciBlbnZTdHIgPSBlbnZSZS5leGVjKGNvZGUpWzFdO1xuICAgIHZhciBlbnYgPSBKU09OLnBhcnNlKGVudlN0cik7XG4gICAgcmV0dXJuIGVudjtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrQ29kZSAoY29kZSkge1xuICAgIHZhciBlbnYgPSBlbnZGcm9tQ29kZShjb2RlKTtcbiAgICBlbnYubm9kZVBhdGguc2hvdWxkLmVxdWFsKHByb2Nlc3MuZXhlY1BhdGgpO1xuICAgIGVudi5jb21tYW5kUHJveHlDbGllbnRQYXRoLnNob3VsZC5leGlzdDtcbiAgICBlbnYuaW5zdHJ1bWVudHNTb2NrLnNob3VsZC5leGlzdDtcbiAgICAoYXdhaXQgZnMuZXhpc3RzKGVudi5jb21tYW5kUHJveHlDbGllbnRQYXRoKSkuc2hvdWxkLmJlLnRydWU7XG4gICAgcmV0dXJuIGVudjtcbiAgfVxuXG4gIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgc2lub24uc3B5KGxvZywgJ2RlYnVnJyk7XG4gIH0pO1xuXG4gIGFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICBsb2cuZGVidWcucmVzdG9yZSgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGdlbmVyYXRlIGR5bmFtaWMgYm9vdHN0cmFwJywgYXN5bmMgKCkgPT4ge1xuICAgIHByb2Nlc3MuZW52LkFQUElVTV9CT09UU1RSQVBfRElSID0gJy90bXAvYXBwaXVtLXVpYXV0by90ZXN0L3VuaXQvYm9vdHN0cmFwJztcbiAgICBhd2FpdCByaW1yYWYocHJvY2Vzcy5lbnYuQVBQSVVNX0JPT1RTVFJBUF9ESVIpO1xuXG4gICAgICAvLyBmaXJzdCBjYWxsOiBzaG91bGQgY3JlYXRlIG5ldyBib290c3RyYXAgZmlsZVxuICAgIGxldCBib290c3RyYXBGaWxlID0gYXdhaXQgcHJlcGFyZUJvb3RzdHJhcCgpO1xuICAgIGJvb3RzdHJhcEZpbGUuc2hvdWxkLm1hdGNoKC9cXC90bXBcXC9hcHBpdW0tdWlhdXRvXFwvdGVzdFxcL3VuaXRcXC9ib290c3RyYXBcXC9ib290c3RyYXBcXC0uKlxcLmpzLyk7XG4gICAgbGV0IGNvZGUgPSBhd2FpdCBmcy5yZWFkRmlsZShib290c3RyYXBGaWxlLCAndXRmOCcpO1xuICAgIGF3YWl0IGNoZWNrQ29kZShjb2RlKTtcbiAgICBsb2cuZGVidWcuY2FsbGVkV2l0aE1hdGNoKC9DcmVhdGluZyBvciBvdmVyd3JpdGluZyBkeW5hbWljIGJvb3RzdHJhcC8pLnNob3VsZC5iZS50cnVlO1xuICAgIGxvZy5kZWJ1Zy5yZXNldCgpO1xuXG4gICAgLy8gc2Vjb25kIGNhbGw6IHNob3VsZCByZXVzZSBib290c3RyYXAgZmlsZVxuICAgIGJvb3RzdHJhcEZpbGUgPSBhd2FpdCBwcmVwYXJlQm9vdHN0cmFwKCk7XG4gICAgYm9vdHN0cmFwRmlsZS5zaG91bGQubWF0Y2goL1xcL3RtcFxcL2FwcGl1bS11aWF1dG9cXC90ZXN0XFwvdW5pdFxcL2Jvb3RzdHJhcFxcL2Jvb3RzdHJhcFxcLS4qXFwuanMvKTtcbiAgICBjb2RlID0gYXdhaXQgZnMucmVhZEZpbGUoYm9vdHN0cmFwRmlsZSwgJ3V0ZjgnKTtcbiAgICBhd2FpdCBjaGVja0NvZGUoY29kZSk7XG4gICAgbG9nLmRlYnVnLmNhbGxlZFdpdGhNYXRjaCgvUmV1c2luZyBkeW5hbWljIGJvb3RzdHJhcC8pLnNob3VsZC5iZS50cnVlO1xuICAgIGxvZy5kZWJ1Zy5yZXNldCgpO1xuXG4gICAgLy8gdGhpcmQgY2FsbCB1c2luZyBjdXN0b20gc29ja2V0IHBhdGg6IHNob3VsZCBjcmVhdGUgZGlmZmVyZW50IGJvb3RzdHJhcCBmaWxlXG4gICAgYm9vdHN0cmFwRmlsZSA9IGF3YWl0IHByZXBhcmVCb290c3RyYXAoe3NvY2s6ICcvdG1wL2FiY2Qvc29jayd9KTtcbiAgICBib290c3RyYXBGaWxlLnNob3VsZC5tYXRjaCgvXFwvdG1wXFwvYXBwaXVtLXVpYXV0b1xcL3Rlc3RcXC91bml0XFwvYm9vdHN0cmFwXFwvYm9vdHN0cmFwXFwtLipcXC5qcy8pO1xuICAgIGNvZGUgPSBhd2FpdCBmcy5yZWFkRmlsZShib290c3RyYXBGaWxlLCAndXRmOCcpO1xuICAgIGxldCBlbnYgPSBhd2FpdCBjaGVja0NvZGUoY29kZSwge2lzVmVyYm9zZTogdHJ1ZSwgZ3JhY2VQZXJpb2Q6IDV9KTtcbiAgICBlbnYuaW5zdHJ1bWVudHNTb2NrLnNob3VsZC5lcXVhbCgnL3RtcC9hYmNkL3NvY2snKTtcbiAgICBsb2cuZGVidWcuY2FsbGVkV2l0aE1hdGNoKC9DcmVhdGluZyBvciBvdmVyd3JpdGluZyBkeW5hbWljIGJvb3RzdHJhcC8pLnNob3VsZC5iZS5vaztcbiAgICBsb2cuZGVidWcucmVzZXQoKTtcbiAgfSk7XG59KTtcbiJdfQ==