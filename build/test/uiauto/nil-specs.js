require('source-map-support').install();

/* globals $ */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _base = require('./base');

describe('nil', function callee$0$0() {
  var imports, ctx;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        imports = { post: ['uiauto/lib/element-patch/nil-patch.js', 'uiauto/lib/mechanic-ext/basics-ext.js'] };
        ctx = undefined;

        before(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap((0, _base.globalInit)(this, { imports: imports, bootstrap: 'basic' }));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap((0, _base.instrumentsInstanceInit)());

              case 4:
                ctx = context$2$0.sent;

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        });
        after(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap((0, _base.killAll)(ctx));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

        afterEach(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                  $('#UICatalog').first().tap();
                  $.delay(1000);
                }));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

        it('isNil should return true for not nil elements', function callee$1$0() {
          var res;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                  return $('cell')[0].isNil();
                }));

              case 2:
                res = context$2$0.sent;

                res.should.be['false'];

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

        it('isNil should return true for nil elements', function callee$1$0() {
          var res;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                  return $('cell')[0].images().isNil();
                }));

              case 2:
                res = context$2$0.sent;

                res.should.be['true'];

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

        it('isNil should return true for manually created UIAElementNil', function callee$1$0() {
          var res;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                  return $.nil.isNil();
                }));

              case 2:
                res = context$2$0.sent;

                res.should.be['true'];

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL25pbC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O29CQUc2RCxRQUFROztBQUdyRSxRQUFRLENBQUMsS0FBSyxFQUFFO01BQ1YsT0FBTyxFQUlQLEdBQUc7Ozs7OztBQUpILGVBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxDQUNwQix1Q0FBdUMsRUFDdkMsdUNBQXVDLENBQ3hDLEVBQUM7QUFDRSxXQUFHOztBQUNQLGNBQU0sQ0FBQzs7Ozs7aURBQ0MsVUFWd0IsVUFBVSxFQVV2QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQzs7OztpREFDbkQsVUFYUCx1QkFBdUIsR0FXUzs7O0FBQXJDLG1CQUFHOzs7Ozs7O1NBQ0osQ0FBQyxDQUFDO0FBQ0gsYUFBSyxDQUFDOzs7OztpREFDRSxVQWRvQyxPQUFPLEVBY25DLEdBQUcsQ0FBQzs7Ozs7OztTQUNuQixDQUFDLENBQUM7O0FBRUgsaUJBQVMsQ0FBQzs7Ozs7aURBQ0YsR0FBRyxDQUFDLFFBQVEsQ0FDaEIsWUFBWTtBQUNWLG1CQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDOUIsbUJBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2YsQ0FDRjs7Ozs7OztTQUNGLENBQUMsQ0FBQzs7QUFFSCxVQUFFLENBQUMsK0NBQStDLEVBQUU7Y0FDOUMsR0FBRzs7Ozs7aURBQVMsR0FBRyxDQUFDLFFBQVEsQ0FDMUIsWUFBWTtBQUNWLHlCQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDN0IsQ0FDRjs7O0FBSkcsbUJBQUc7O0FBS1AsbUJBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFNLENBQUM7Ozs7Ozs7U0FDckIsQ0FBQyxDQUFDOztBQUVILFVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtjQUMxQyxHQUFHOzs7OztpREFBUyxHQUFHLENBQUMsUUFBUSxDQUMxQixZQUFZO0FBQ1YseUJBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN0QyxDQUNGOzs7QUFKRyxtQkFBRzs7QUFLUCxtQkFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztTQUNwQixDQUFDLENBQUM7O0FBRUgsVUFBRSxDQUFDLDZEQUE2RCxFQUFFO2NBQzVELEdBQUc7Ozs7O2lEQUFTLEdBQUcsQ0FBQyxRQUFRLENBQzFCLFlBQVk7QUFDVix5QkFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN0QixDQUNGOzs7QUFKRyxtQkFBRzs7QUFLUCxtQkFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztTQUNwQixDQUFDLENBQUM7Ozs7Ozs7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91aWF1dG8vbmlsLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG4vKiBnbG9iYWxzICQgKi9cblxuaW1wb3J0IHsgaW5zdHJ1bWVudHNJbnN0YW5jZUluaXQsIGdsb2JhbEluaXQsIGtpbGxBbGwgfSBmcm9tICcuL2Jhc2UnO1xuXG5cbmRlc2NyaWJlKCduaWwnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBpbXBvcnRzID0geyBwb3N0OiBbXG4gICAgJ3VpYXV0by9saWIvZWxlbWVudC1wYXRjaC9uaWwtcGF0Y2guanMnLFxuICAgICd1aWF1dG8vbGliL21lY2hhbmljLWV4dC9iYXNpY3MtZXh0LmpzJ1xuICBdfTtcbiAgbGV0IGN0eDtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBnbG9iYWxJbml0KHRoaXMsIHsgaW1wb3J0czogaW1wb3J0cywgYm9vdHN0cmFwOiAnYmFzaWMnfSk7XG4gICAgY3R4ID0gYXdhaXQgaW5zdHJ1bWVudHNJbnN0YW5jZUluaXQoKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBraWxsQWxsKGN0eCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjVUlDYXRhbG9nJykuZmlyc3QoKS50YXAoKTtcbiAgICAgICAgJC5kZWxheSgxMDAwKTtcbiAgICAgIH1cbiAgICApO1xuICB9KTtcblxuICBpdCgnaXNOaWwgc2hvdWxkIHJldHVybiB0cnVlIGZvciBub3QgbmlsIGVsZW1lbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCByZXMgPSBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKCdjZWxsJylbMF0uaXNOaWwoKTtcbiAgICAgIH1cbiAgICApO1xuICAgIHJlcy5zaG91bGQuYmUuZmFsc2U7XG4gIH0pO1xuXG4gIGl0KCdpc05pbCBzaG91bGQgcmV0dXJuIHRydWUgZm9yIG5pbCBlbGVtZW50cycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgcmVzID0gYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJCgnY2VsbCcpWzBdLmltYWdlcygpLmlzTmlsKCk7XG4gICAgICB9XG4gICAgKTtcbiAgICByZXMuc2hvdWxkLmJlLnRydWU7XG4gIH0pO1xuXG4gIGl0KCdpc05pbCBzaG91bGQgcmV0dXJuIHRydWUgZm9yIG1hbnVhbGx5IGNyZWF0ZWQgVUlBRWxlbWVudE5pbCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgcmVzID0gYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJC5uaWwuaXNOaWwoKTtcbiAgICAgIH1cbiAgICApO1xuICAgIHJlcy5zaG91bGQuYmUudHJ1ZTtcbiAgfSk7XG59KTtcbiJdfQ==