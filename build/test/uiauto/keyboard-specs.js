require('source-map-support').install();

/* globals $ */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this4 = this;

var _base = require('./base');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

describe('keyboard', function callee$0$0() {
  var imports;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        imports = { post: ['uiauto/lib/mechanic-ext/gesture-ext.js', 'uiauto/lib/mechanic-ext/keyboard-ext.js', 'uiauto/lib/element-patch/nil-patch.js'] };

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
          }, null, this);
        });

        describe('hide keyboard', function callee$1$0() {
          var ctx;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this = this;

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

                      case 3:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this);
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
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this);
                });

                _lodash2['default'].each(['pressKey', 'press'], function (strategy) {
                  var _this2 = this;

                  it('should hide the keyboard by pressing the done key (' + strategy + ')', function callee$3$0() {
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap(ctx.execFunc(function (strategy) {
                            rootPage.clickMenuItem('Text Fields');
                            $('textfield').first().tap();
                            $('#Done').should.have.length(1);
                            $.hideKeyboard(strategy, 'Done');
                            $('#Done').should.have.length(0);
                          }, [strategy]));

                        case 2:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, _this2);
                  });
                });

                _lodash2['default'].each(['tapOutside', 'tapOut'], function (strategy) {
                  var _this3 = this;

                  it('should hide the keyboard by tapping outside (' + strategy + ')', function callee$3$0() {
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap(ctx.execFunc(function (strategy) {
                            rootPage.clickMenuItem('Web View');
                            $('textfield').first().tap();
                            $('#Go').should.have.length(1);
                            $.hideKeyboard(strategy);
                            $('#Go').should.have.length(0);
                          }, [strategy]));

                        case 2:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, _this3);
                  });
                });

                it('should hide the keyboard with the default strategy', function callee$2$0() {
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          rootPage.clickMenuItem('Web View');
                          $('textfield').first().tap();
                          $('#Go').should.have.length(1);
                          $.hideKeyboard('default');
                          $('#Go').should.have.length(0);
                        }));

                      case 2:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this);
                });

              case 7:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        });

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this4);
});

/* globals rootPage: true */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL2tleWJvYXJkLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O29CQUc2RCxRQUFROztzQkFDdkQsUUFBUTs7OztBQUd0QixRQUFRLENBQUMsVUFBVSxFQUFFO01BQ2YsT0FBTzs7OztBQUFQLGVBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxDQUNwQix3Q0FBd0MsRUFDeEMseUNBQXlDLEVBQ3pDLHVDQUF1QyxDQUN4QyxFQUFDOztBQUNGLGNBQU0sQ0FBQzs7Ozs7aURBQ0MsVUFYd0IsVUFBVSxFQVd2QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQzs7Ozs7OztTQUNoRSxDQUFDLENBQUM7O0FBRUgsZ0JBQVEsQ0FBQyxlQUFlLEVBQUU7Y0FFcEIsR0FBRzs7Ozs7O0FBQUgsbUJBQUc7O0FBQ1Asc0JBQU0sQ0FBQzs7Ozs7eURBQ08sVUFsQlQsdUJBQXVCLEdBa0JXOzs7QUFBckMsMkJBQUc7Ozs7Ozs7aUJBQ0osQ0FBQyxDQUFDO0FBQ0gscUJBQUssQ0FBQzs7Ozs7eURBQ0UsVUFyQmtDLE9BQU8sRUFxQmpDLEdBQUcsQ0FBQzs7Ozs7OztpQkFDbkIsQ0FBQyxDQUFDOztBQUVILHlCQUFTLENBQUM7Ozs7O3lEQUNGLEdBQUcsQ0FBQyxRQUFRLENBQ2hCLFlBQVk7QUFDViwyQkFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzlCLDJCQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNmLENBQ0Y7Ozs7Ozs7aUJBQ0YsQ0FBQyxDQUFDOztBQUVILG9DQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRSxVQUFVLFFBQVEsRUFBRTs7O0FBQ2hELG9CQUFFLHlEQUF1RCxRQUFRLFFBQUs7Ozs7OzJEQUM5RCxHQUFHLENBQUMsUUFBUSxDQUNoQixVQUFVLFFBQVEsRUFBRTtBQUNsQixvQ0FBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN0Qyw2QkFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzdCLDZCQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsNkJBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2pDLDZCQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7MkJBQ2xDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FDZDs7Ozs7OzttQkFDRixDQUFDLENBQUM7aUJBQ0osQ0FBQyxDQUFDOztBQUVILG9DQUFFLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsRUFBRSxVQUFVLFFBQVEsRUFBRTs7O0FBQ25ELG9CQUFFLG1EQUFpRCxRQUFRLFFBQUs7Ozs7OzJEQUN4RCxHQUFHLENBQUMsUUFBUSxDQUNoQixVQUFVLFFBQVEsRUFBRTtBQUNsQixvQ0FBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyw2QkFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzdCLDZCQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0IsNkJBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekIsNkJBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzsyQkFDaEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUNkOzs7Ozs7O21CQUNGLENBQUMsQ0FBQztpQkFDSixDQUFDLENBQUM7O0FBRUgsa0JBQUUsQ0FBQyxvREFBb0QsRUFBRTs7Ozs7eURBQ2pELEdBQUcsQ0FBQyxRQUFRLENBQ2hCLFlBQVk7QUFDVixrQ0FBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQywyQkFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzdCLDJCQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0IsMkJBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUIsMkJBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDaEMsQ0FDRjs7Ozs7OztpQkFDRixDQUFDLENBQUM7Ozs7Ozs7U0FDSixDQUFDLENBQUM7Ozs7Ozs7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91aWF1dG8va2V5Ym9hcmQtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcbi8qIGdsb2JhbHMgJCAqL1xuXG5pbXBvcnQgeyBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCwgZ2xvYmFsSW5pdCwga2lsbEFsbCB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbmRlc2NyaWJlKCdrZXlib2FyZCcsIGFzeW5jICgpID0+IHtcbiAgbGV0IGltcG9ydHMgPSB7IHBvc3Q6IFtcbiAgICAndWlhdXRvL2xpYi9tZWNoYW5pYy1leHQvZ2VzdHVyZS1leHQuanMnLFxuICAgICd1aWF1dG8vbGliL21lY2hhbmljLWV4dC9rZXlib2FyZC1leHQuanMnLFxuICAgICd1aWF1dG8vbGliL2VsZW1lbnQtcGF0Y2gvbmlsLXBhdGNoLmpzJ1xuICBdfTtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBnbG9iYWxJbml0KHRoaXMsIHsgaW1wb3J0czogaW1wb3J0cywgYm9vdHN0cmFwOiAnYmFzaWMnfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoaWRlIGtleWJvYXJkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIC8qIGdsb2JhbHMgcm9vdFBhZ2U6IHRydWUgKi9cbiAgICBsZXQgY3R4O1xuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICBjdHggPSBhd2FpdCBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCgpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGtpbGxBbGwoY3R4KTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKCcjVUlDYXRhbG9nJykuZmlyc3QoKS50YXAoKTtcbiAgICAgICAgICAkLmRlbGF5KDEwMDApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgXy5lYWNoKFsncHJlc3NLZXknLCAncHJlc3MnXSwgZnVuY3Rpb24gKHN0cmF0ZWd5KSB7XG4gICAgICBpdChgc2hvdWxkIGhpZGUgdGhlIGtleWJvYXJkIGJ5IHByZXNzaW5nIHRoZSBkb25lIGtleSAoJHtzdHJhdGVneX0pYCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICAgICAgZnVuY3Rpb24gKHN0cmF0ZWd5KSB7XG4gICAgICAgICAgICByb290UGFnZS5jbGlja01lbnVJdGVtKCdUZXh0IEZpZWxkcycpO1xuICAgICAgICAgICAgJCgndGV4dGZpZWxkJykuZmlyc3QoKS50YXAoKTtcbiAgICAgICAgICAgICQoJyNEb25lJykuc2hvdWxkLmhhdmUubGVuZ3RoKDEpO1xuICAgICAgICAgICAgJC5oaWRlS2V5Ym9hcmQoc3RyYXRlZ3ksICdEb25lJyk7XG4gICAgICAgICAgICAkKCcjRG9uZScpLnNob3VsZC5oYXZlLmxlbmd0aCgwKTtcbiAgICAgICAgICB9LCBbc3RyYXRlZ3ldXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIF8uZWFjaChbJ3RhcE91dHNpZGUnLCAndGFwT3V0J10sIGZ1bmN0aW9uIChzdHJhdGVneSkge1xuICAgICAgaXQoYHNob3VsZCBoaWRlIHRoZSBrZXlib2FyZCBieSB0YXBwaW5nIG91dHNpZGUgKCR7c3RyYXRlZ3l9KWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgICAgIGZ1bmN0aW9uIChzdHJhdGVneSkge1xuICAgICAgICAgICAgcm9vdFBhZ2UuY2xpY2tNZW51SXRlbSgnV2ViIFZpZXcnKTtcbiAgICAgICAgICAgICQoJ3RleHRmaWVsZCcpLmZpcnN0KCkudGFwKCk7XG4gICAgICAgICAgICAkKCcjR28nKS5zaG91bGQuaGF2ZS5sZW5ndGgoMSk7XG4gICAgICAgICAgICAkLmhpZGVLZXlib2FyZChzdHJhdGVneSk7XG4gICAgICAgICAgICAkKCcjR28nKS5zaG91bGQuaGF2ZS5sZW5ndGgoMCk7XG4gICAgICAgICAgfSwgW3N0cmF0ZWd5XVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhpZGUgdGhlIGtleWJvYXJkIHdpdGggdGhlIGRlZmF1bHQgc3RyYXRlZ3knLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByb290UGFnZS5jbGlja01lbnVJdGVtKCdXZWIgVmlldycpO1xuICAgICAgICAgICQoJ3RleHRmaWVsZCcpLmZpcnN0KCkudGFwKCk7XG4gICAgICAgICAgJCgnI0dvJykuc2hvdWxkLmhhdmUubGVuZ3RoKDEpO1xuICAgICAgICAgICQuaGlkZUtleWJvYXJkKCdkZWZhdWx0Jyk7XG4gICAgICAgICAgJCgnI0dvJykuc2hvdWxkLmhhdmUubGVuZ3RoKDApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19