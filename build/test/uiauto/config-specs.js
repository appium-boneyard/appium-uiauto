require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _base = require('./base');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rimraf2 = require('rimraf');

var _rimraf3 = _interopRequireDefault(_rimraf2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var rimraf = _bluebird2['default'].promisify(_rimraf3['default']);

describe('config', function () {
  var _this = this;

  describe('custom socket', function () {
    var altSockDir = '/tmp/abcd';
    var altSock = _path2['default'].resolve(altSockDir, 'sock');

    var ctx = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(rimraf(altSockDir));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _base.globalInit)(this, { chai: true, sock: altSock }));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _base.instrumentsInstanceInit)({ sock: altSock }));

          case 6:
            ctx = context$3$0.sent;

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _base.killAll)(ctx));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should use the alternate sock', function () {
      ctx.proxy.should.exist;
      ctx.proxy.sock.should.equal(altSock);
    });

    it('should work', function callee$2$0() {
      var res;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.execFunc(function () {
              return 'OK Boss';
            }));

          case 2:
            res = context$3$0.sent;

            res.should.equal('OK Boss');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL2NvbmZpZy1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFFNkQsUUFBUTs7b0JBQ3JELE1BQU07Ozs7dUJBQ0YsUUFBUTs7Ozt3QkFDUixVQUFVOzs7O0FBRTlCLElBQUksTUFBTSxHQUFHLHNCQUFRLFNBQVMscUJBQVMsQ0FBQzs7QUFHeEMsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZOzs7QUFDN0IsVUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFNO0FBQzlCLFFBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQztBQUM3QixRQUFJLE9BQU8sR0FBRyxrQkFBSyxPQUFPLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUUvQyxRQUFJLEdBQUcsWUFBQSxDQUFDO0FBQ1IsVUFBTSxDQUFDOzs7Ozs2Q0FDQyxNQUFNLENBQUMsVUFBVSxDQUFDOzs7OzZDQUNsQixVQWhCc0IsVUFBVSxFQWdCckIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7Ozs7NkNBQ3pDLFVBakJULHVCQUF1QixFQWlCVSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzs7O0FBQXRELGVBQUc7Ozs7Ozs7S0FDSixDQUFDLENBQUM7QUFDSCxTQUFLLENBQUM7Ozs7OzZDQUNFLFVBcEJrQyxPQUFPLEVBb0JqQyxHQUFHLENBQUM7Ozs7Ozs7S0FDbkIsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQywrQkFBK0IsRUFBRSxZQUFZO0FBQzlDLFNBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN2QixTQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3RDLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsYUFBYSxFQUFFO1VBQ1osR0FBRzs7Ozs7NkNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FDMUIsWUFBWTtBQUNWLHFCQUFPLFNBQVMsQ0FBQzthQUNsQixDQUNGOzs7QUFKRyxlQUFHOztBQUtQLGVBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7O0tBQzdCLENBQUMsQ0FBQztHQUVKLENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VpYXV0by9jb25maWctc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcblxuaW1wb3J0IHsgaW5zdHJ1bWVudHNJbnN0YW5jZUluaXQsIGdsb2JhbEluaXQsIGtpbGxBbGwgfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHBhdGggZnJvbSdwYXRoJztcbmltcG9ydCBfcmltcmFmIGZyb20gJ3JpbXJhZic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmxldCByaW1yYWYgPSBQcm9taXNlLnByb21pc2lmeShfcmltcmFmKTtcblxuXG5kZXNjcmliZSgnY29uZmlnJywgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZSgnY3VzdG9tIHNvY2tldCcsICgpID0+IHtcbiAgICBsZXQgYWx0U29ja0RpciA9ICcvdG1wL2FiY2QnO1xuICAgIGxldCBhbHRTb2NrID0gcGF0aC5yZXNvbHZlKGFsdFNvY2tEaXIsICdzb2NrJyk7XG5cbiAgICBsZXQgY3R4O1xuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCByaW1yYWYoYWx0U29ja0Rpcik7XG4gICAgICBhd2FpdCBnbG9iYWxJbml0KHRoaXMsIHsgY2hhaTogdHJ1ZSwgc29jazogYWx0U29jayB9KTtcbiAgICAgIGN0eCA9IGF3YWl0IGluc3RydW1lbnRzSW5zdGFuY2VJbml0KHsgc29jazogYWx0U29jayB9KTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBraWxsQWxsKGN0eCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVzZSB0aGUgYWx0ZXJuYXRlIHNvY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjdHgucHJveHkuc2hvdWxkLmV4aXN0O1xuICAgICAgY3R4LnByb3h5LnNvY2suc2hvdWxkLmVxdWFsKGFsdFNvY2spO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB3b3JrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGN0eC5leGVjRnVuYyhcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnT0sgQm9zcyc7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICByZXMuc2hvdWxkLmVxdWFsKCdPSyBCb3NzJyk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbn0pO1xuIl19