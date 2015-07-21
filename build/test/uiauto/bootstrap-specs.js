require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _base = require('./base');

describe('bootstrap', function () {
  describe('basic test bootstrap', function () {
    var _this = this;

    var ctx = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _base.globalInit)(this, { bootstrap: 'basic' }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _base.instrumentsInstanceInit)());

          case 4:
            ctx = context$3$0.sent;

          case 5:
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

    it('should start and execute one command', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.sendCommand('\'123\''));

          case 2:
            context$3$0.sent.should.equal('123');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(ctx.sendCommand('typeof $.lookup'));

          case 5:
            context$3$0.sent.should.equal('undefined');
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(ctx.sendCommand('typeof chai'));

          case 8:
            context$3$0.sent.should.equal('object');

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('regular bootstrap without chai', function () {
    var _this2 = this;

    var ctx = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _base.globalInit)(this));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _base.instrumentsInstanceInit)());

          case 4:
            ctx = context$3$0.sent;

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!ctx) {
              context$3$0.next = 3;
              break;
            }

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _base.killAll)(ctx));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    it('should start and execute one command', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.sendCommand('\'123\''));

          case 2:
            context$3$0.sent.should.equal('123');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(ctx.sendCommand('typeof chai'));

          case 5:
            context$3$0.sent.should.equal('undefined');

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });

  describe('regular bootstrap with chai', function () {
    var _this3 = this;

    var ctx = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _base.globalInit)(this, { bootstrap: 'basic' }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _base.instrumentsInstanceInit)());

          case 4:
            ctx = context$3$0.sent;

          case 5:
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
      }, null, _this3);
    });

    it('should start and execute one command', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.sendCommand('\'123\''));

          case 2:
            context$3$0.sent.should.equal('123');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(ctx.sendCommand('typeof chai'));

          case 5:
            context$3$0.sent.should.equal('object');

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL2Jvb3RzdHJhcC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBRTZELFFBQVE7O0FBR3JFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTtBQUNoQyxVQUFRLENBQUMsc0JBQXNCLEVBQUUsWUFBWTs7O0FBQzNDLFFBQUksR0FBRyxZQUFBLENBQUM7QUFDUixVQUFNLENBQUM7Ozs7OzZDQUNDLFVBUHNCLFVBQVUsRUFPckIsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxDQUFDOzs7OzZDQUNoQyxVQVJULHVCQUF1QixHQVFXOzs7QUFBckMsZUFBRzs7Ozs7OztLQUNKLENBQUMsQ0FBQztBQUNILFNBQUssQ0FBQzs7Ozs7NkNBQ0UsVUFYa0MsT0FBTyxFQVdqQyxHQUFHLENBQUM7Ozs7Ozs7S0FDbkIsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxzQ0FBc0MsRUFBRTs7Ozs7NkNBQ2xDLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBTyxDQUFDOzs7NkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLOzs2Q0FDNUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQzs7OzZCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVzs7NkNBQzVELEdBQUcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDOzs7NkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFROzs7Ozs7O0tBQzdELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsZ0NBQWdDLEVBQUUsWUFBWTs7O0FBQ3JELFFBQUksR0FBRyxZQUFBLENBQUM7QUFDUixVQUFNLENBQUM7Ozs7OzZDQUNDLFVBeEJzQixVQUFVLEVBd0JyQixJQUFJLENBQUM7Ozs7NkNBQ1YsVUF6QlQsdUJBQXVCLEdBeUJXOzs7QUFBckMsZUFBRzs7Ozs7OztLQUNKLENBQUMsQ0FBQztBQUNILFNBQUssQ0FBQzs7OztpQkFDQSxHQUFHOzs7Ozs7NkNBQ0MsVUE3QmdDLE9BQU8sRUE2Qi9CLEdBQUcsQ0FBQzs7Ozs7OztLQUVyQixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLHNDQUFzQyxFQUFFOzs7Ozs2Q0FDbEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFPLENBQUM7Ozs2QkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7OzZDQUM1QyxHQUFHLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7OzZCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVzs7Ozs7OztLQUNoRSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLDZCQUE2QixFQUFFLFlBQVk7OztBQUNsRCxRQUFJLEdBQUcsWUFBQSxDQUFDO0FBQ1IsVUFBTSxDQUFDOzs7Ozs2Q0FDQyxVQTFDc0IsVUFBVSxFQTBDckIsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxDQUFDOzs7OzZDQUNoQyxVQTNDVCx1QkFBdUIsR0EyQ1c7OztBQUFyQyxlQUFHOzs7Ozs7O0tBQ0osQ0FBQyxDQUFDO0FBQ0gsU0FBSyxDQUFDOzs7Ozs2Q0FDRSxVQTlDa0MsT0FBTyxFQThDakMsR0FBRyxDQUNkOzs7Ozs7O0tBQ0osQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxzQ0FBc0MsRUFBRTs7Ozs7NkNBQ2xDLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBTyxDQUFDOzs7NkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLOzs2Q0FDNUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7Ozs2QkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7Ozs7Ozs7S0FDN0QsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBRUosQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdWlhdXRvL2Jvb3RzdHJhcC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgeyBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCwgZ2xvYmFsSW5pdCwga2lsbEFsbCB9IGZyb20gJy4vYmFzZSc7XG5cblxuZGVzY3JpYmUoJ2Jvb3RzdHJhcCcsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoJ2Jhc2ljIHRlc3QgYm9vdHN0cmFwJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjdHg7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGdsb2JhbEluaXQodGhpcywge2Jvb3RzdHJhcDogJ2Jhc2ljJ30pO1xuICAgICAgY3R4ID0gYXdhaXQgaW5zdHJ1bWVudHNJbnN0YW5jZUluaXQoKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBraWxsQWxsKGN0eCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHN0YXJ0IGFuZCBleGVjdXRlIG9uZSBjb21tYW5kJywgYXN5bmMgKCkgPT4ge1xuICAgICAgKGF3YWl0IGN0eC5zZW5kQ29tbWFuZChcIicxMjMnXCIpKS5zaG91bGQuZXF1YWwoJzEyMycpO1xuICAgICAgKGF3YWl0IGN0eC5zZW5kQ29tbWFuZCgndHlwZW9mICQubG9va3VwJykpLnNob3VsZC5lcXVhbCgndW5kZWZpbmVkJyk7XG4gICAgICAoYXdhaXQgY3R4LnNlbmRDb21tYW5kKCd0eXBlb2YgY2hhaScpKS5zaG91bGQuZXF1YWwoJ29iamVjdCcpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVndWxhciBib290c3RyYXAgd2l0aG91dCBjaGFpJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjdHg7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGdsb2JhbEluaXQodGhpcyk7XG4gICAgICBjdHggPSBhd2FpdCBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCgpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgYXdhaXQga2lsbEFsbChjdHgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzdGFydCBhbmQgZXhlY3V0ZSBvbmUgY29tbWFuZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIChhd2FpdCBjdHguc2VuZENvbW1hbmQoXCInMTIzJ1wiKSkuc2hvdWxkLmVxdWFsKCcxMjMnKTtcbiAgICAgIChhd2FpdCBjdHguc2VuZENvbW1hbmQoJ3R5cGVvZiBjaGFpJykpLnNob3VsZC5lcXVhbCgndW5kZWZpbmVkJyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwicmVndWxhciBib290c3RyYXAgd2l0aCBjaGFpXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY3R4O1xuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBnbG9iYWxJbml0KHRoaXMsIHtib290c3RyYXA6ICdiYXNpYyd9KTtcbiAgICAgIGN0eCA9IGF3YWl0IGluc3RydW1lbnRzSW5zdGFuY2VJbml0KCk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQga2lsbEFsbChjdHhcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc3RhcnQgYW5kIGV4ZWN1dGUgb25lIGNvbW1hbmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAoYXdhaXQgY3R4LnNlbmRDb21tYW5kKFwiJzEyMydcIikpLnNob3VsZC5lcXVhbCgnMTIzJyk7XG4gICAgICAoYXdhaXQgY3R4LnNlbmRDb21tYW5kKCd0eXBlb2YgY2hhaScpKS5zaG91bGQuZXF1YWwoJ29iamVjdCcpO1xuICAgIH0pO1xuICB9KTtcblxufSk7XG4iXX0=