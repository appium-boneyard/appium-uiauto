require('source-map-support').install();

/* globals $, rootPage, alerts */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _base = require('./base');

_base.instrumentsInstanceInit;

describe('alarm', function callee$0$0() {
  var imports;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        imports = { post: ['uiauto/lib/alerts.js', 'uiauto/lib/status.js', 'uiauto/lib/element-patch/nil-patch.js', 'uiauto/lib/element-patch/helper-patch.js', 'uiauto/lib/mechanic-ext/basics-ext.js', 'uiauto/lib/mechanic-ext/util-ext.js', 'uiauto/lib/mechanic-ext/lookup-ext.js', 'uiauto/lib/mechanic-ext/alert-ext.js'] };

        before(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap((0, _base.globalInit)(this, { imports: imports, bootstrap: 'basic' }));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

        describe('textfields', function callee$1$0() {
          var ctx;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this2 = this;

            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                ctx = undefined;

                before(function callee$2$0() {
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap((0, _base.instrumentsInstanceInit)());

                      case 2:
                        ctx = context$3$0.sent;
                        context$3$0.next = 5;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          alerts.configure();
                        }));

                      case 5:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this2);
                });

                afterEach(function callee$2$0() {
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          $('#UICatalog').first().tap();
                          $.delay(1000);
                        }));

                      case 2:
                        context$3$0.next = 4;
                        return _regeneratorRuntime.awrap((0, _base.killAll)(ctx));

                      case 4:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this2);
                });

                it('should retrieve alert text and then accept alert', function callee$2$0() {
                  var res;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          rootPage.clickMenuItem('Alert Views');
                          $.delay(2000);
                          $('#Okay / Cancel').first().tap();
                          $.delay(2000);
                          var alertText = $.getAlertText();
                          $.acceptAlert();
                          return alertText;
                        }));

                      case 2:
                        res = context$3$0.sent;

                        res.should.include('A Short Title Is Best');

                      case 4:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this2);
                });

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        });

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL2FsZXJ0LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7b0JBRzZELFFBQVE7O0FBRXJFLE1BRlMsdUJBQXVCLENBRVI7O0FBRXhCLFFBQVEsQ0FBQyxPQUFPLEVBQUU7TUFDWixPQUFPOzs7Ozs7QUFBUCxlQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FDcEIsc0JBQXNCLEVBQ3RCLHNCQUFzQixFQUN0Qix1Q0FBdUMsRUFDdkMsMENBQTBDLEVBQzFDLHVDQUF1QyxFQUN2QyxxQ0FBcUMsRUFDckMsdUNBQXVDLEVBQ3ZDLHNDQUFzQyxDQUN2QyxFQUFDOztBQUNGLGNBQU0sQ0FBQzs7Ozs7aURBQ0MsVUFoQndCLFVBQVUsRUFnQnZCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBQyxDQUFDOzs7Ozs7O1NBQ2hFLENBQUMsQ0FBQzs7QUFFSCxnQkFBUSxDQUFDLFlBQVksRUFBRTtjQUNqQixHQUFHOzs7Ozs7QUFBSCxtQkFBRzs7QUFFUCxzQkFBTSxDQUFDOzs7Ozt5REFDTyxVQXZCVCx1QkFBdUIsR0F1Qlc7OztBQUFyQywyQkFBRzs7eURBQ0csR0FBRyxDQUFDLFFBQVEsQ0FDaEIsWUFBWTtBQUNWLGdDQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7eUJBQ3BCLENBQ0Y7Ozs7Ozs7aUJBQ0YsQ0FBQyxDQUFDOztBQUVILHlCQUFTLENBQUM7Ozs7O3lEQUNGLEdBQUcsQ0FBQyxRQUFRLENBQ2hCLFlBQVk7QUFDViwyQkFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzlCLDJCQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNmLENBQ0Y7Ozs7eURBQ0ssVUF0Q2tDLE9BQU8sRUFzQ2pDLEdBQUcsQ0FBQzs7Ozs7OztpQkFDbkIsQ0FBQyxDQUFDOztBQUVILGtCQUFFLENBQUMsa0RBQWtELEVBQUU7c0JBQ2pELEdBQUc7Ozs7O3lEQUFTLEdBQUcsQ0FBQyxRQUFRLENBQzFCLFlBQVk7QUFDVixrQ0FBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN0QywyQkFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNkLDJCQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNsQywyQkFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNkLDhCQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDakMsMkJBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNoQixpQ0FBTyxTQUFTLENBQUM7eUJBQ2xCLENBQ0Y7OztBQVZHLDJCQUFHOztBQVdQLDJCQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7Ozs7O2lCQUM3QyxDQUFDLENBQUM7Ozs7Ozs7U0FDSixDQUFDLENBQUM7Ozs7Ozs7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91aWF1dG8vYWxlcnQtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcbi8qIGdsb2JhbHMgJCwgcm9vdFBhZ2UsIGFsZXJ0cyAqL1xuXG5pbXBvcnQgeyBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCwgZ2xvYmFsSW5pdCwga2lsbEFsbCB9IGZyb20gJy4vYmFzZSc7XG5cbmluc3RydW1lbnRzSW5zdGFuY2VJbml0O1xuXG5kZXNjcmliZSgnYWxhcm0nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBpbXBvcnRzID0geyBwb3N0OiBbXG4gICAgJ3VpYXV0by9saWIvYWxlcnRzLmpzJyxcbiAgICAndWlhdXRvL2xpYi9zdGF0dXMuanMnLFxuICAgICd1aWF1dG8vbGliL2VsZW1lbnQtcGF0Y2gvbmlsLXBhdGNoLmpzJyxcbiAgICAndWlhdXRvL2xpYi9lbGVtZW50LXBhdGNoL2hlbHBlci1wYXRjaC5qcycsXG4gICAgJ3VpYXV0by9saWIvbWVjaGFuaWMtZXh0L2Jhc2ljcy1leHQuanMnLFxuICAgICd1aWF1dG8vbGliL21lY2hhbmljLWV4dC91dGlsLWV4dC5qcycsXG4gICAgJ3VpYXV0by9saWIvbWVjaGFuaWMtZXh0L2xvb2t1cC1leHQuanMnLFxuICAgICd1aWF1dG8vbGliL21lY2hhbmljLWV4dC9hbGVydC1leHQuanMnXG4gIF19O1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGdsb2JhbEluaXQodGhpcywgeyBpbXBvcnRzOiBpbXBvcnRzLCBib290c3RyYXA6ICdiYXNpYyd9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3RleHRmaWVsZHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGN0eDtcblxuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICBjdHggPSBhd2FpdCBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCgpO1xuICAgICAgYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYWxlcnRzLmNvbmZpZ3VyZSgpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGN0eC5leGVjRnVuYyhcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQoJyNVSUNhdGFsb2cnKS5maXJzdCgpLnRhcCgpO1xuICAgICAgICAgICQuZGVsYXkoMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBhd2FpdCBraWxsQWxsKGN0eCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHJpZXZlIGFsZXJ0IHRleHQgYW5kIHRoZW4gYWNjZXB0IGFsZXJ0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGN0eC5leGVjRnVuYyhcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJvb3RQYWdlLmNsaWNrTWVudUl0ZW0oJ0FsZXJ0IFZpZXdzJyk7XG4gICAgICAgICAgJC5kZWxheSgyMDAwKTtcbiAgICAgICAgICAkKCcjT2theSAvIENhbmNlbCcpLmZpcnN0KCkudGFwKCk7XG4gICAgICAgICAgJC5kZWxheSgyMDAwKTtcbiAgICAgICAgICB2YXIgYWxlcnRUZXh0ID0gJC5nZXRBbGVydFRleHQoKTtcbiAgICAgICAgICAkLmFjY2VwdEFsZXJ0KCk7XG4gICAgICAgICAgcmV0dXJuIGFsZXJ0VGV4dDtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHJlcy5zaG91bGQuaW5jbHVkZSgnQSBTaG9ydCBUaXRsZSBJcyBCZXN0Jyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=