require('source-map-support').install();

/* globals $, env */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _base = require('./base');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

describe('sendKey', function callee$0$0() {
  var imports, ctx, keyStrategies;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        imports = { post: ['uiauto/lib/mechanic-ext/keyboard-ext.js', 'uiauto/lib/element-patch/helper-patch.js'] };
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

        keyStrategies = [undefined, 'oneByOne', 'grouped', 'setValue'];

        _lodash2['default'].each(keyStrategies, function (sendKeyStrategy) {
          var _this2 = this;

          it('should work with strategy: ' + sendKeyStrategy, function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(ctx.execFunc(function (sendKeyStrategy) {
                    env.sendKeyStrategy = sendKeyStrategy;
                    $.delay(1000);
                    rootPage.clickMenuItem('Text Fields');
                    $.delay(1000);
                    var textfield = $('textfield').first()[0];
                    textfield.setValue('');
                    $.delay(3000);
                    $('textfield').first()[0].setValueByType('Hello World');
                    $.delay(3000);
                  }, [sendKeyStrategy]));

                case 2:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });
        });

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

/* globals rootPage: true */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL3NlbmRrZXktc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O29CQUc2RCxRQUFROztzQkFDdkQsUUFBUTs7OztBQUV0QixRQUFRLENBQUMsU0FBUyxFQUFFO01BQ2QsT0FBTyxFQU1QLEdBQUcsRUFrQkgsYUFBYTs7Ozs7O0FBeEJiLGVBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxDQUNuQix5Q0FBeUMsRUFDMUMsMENBQTBDLENBQzNDLEVBQUM7QUFHRSxXQUFHOztBQUNQLGNBQU0sQ0FBQzs7Ozs7aURBQ0MsVUFad0IsVUFBVSxFQVl2QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQzs7OztpREFDbkQsVUFiUCx1QkFBdUIsR0FhUzs7O0FBQXJDLG1CQUFHOzs7Ozs7O1NBQ0osQ0FBQyxDQUFDO0FBQ0gsYUFBSyxDQUFDOzs7OztpREFDRSxVQWhCb0MsT0FBTyxFQWdCbkMsR0FBRyxDQUFDOzs7Ozs7O1NBQ25CLENBQUMsQ0FBQzs7QUFFSCxpQkFBUyxDQUFDOzs7OztpREFDRixHQUFHLENBQUMsUUFBUSxDQUNoQixZQUFZO0FBQ1YsbUJBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM5QixtQkFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZixDQUNGOzs7Ozs7O1NBQ0YsQ0FBQyxDQUFDOztBQUVDLHFCQUFhLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7O0FBQ2xFLDRCQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsVUFBVSxlQUFlLEVBQUU7OztBQUMvQyxZQUFFLGlDQUErQixlQUFlLEVBQUk7Ozs7O21EQUM1QyxHQUFHLENBQUMsUUFBUSxDQUNoQixVQUFVLGVBQWUsRUFBRTtBQUN6Qix1QkFBRyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDdEMscUJBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDZCw0QkFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN0QyxxQkFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNkLHdCQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsNkJBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdkIscUJBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDZCxxQkFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN4RCxxQkFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzttQkFDZixFQUFFLENBQUMsZUFBZSxDQUFDLENBQ3JCOzs7Ozs7O1dBQ0YsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDOzs7Ozs7O0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdWlhdXRvL3NlbmRrZXktc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcbi8qIGdsb2JhbHMgJCwgZW52ICovXG5cbmltcG9ydCB7IGluc3RydW1lbnRzSW5zdGFuY2VJbml0LCBnbG9iYWxJbml0LCBraWxsQWxsIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmRlc2NyaWJlKCdzZW5kS2V5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgaW1wb3J0cyA9IHsgcG9zdDogW1xuICAgICAndWlhdXRvL2xpYi9tZWNoYW5pYy1leHQva2V5Ym9hcmQtZXh0LmpzJyxcbiAgICAndWlhdXRvL2xpYi9lbGVtZW50LXBhdGNoL2hlbHBlci1wYXRjaC5qcydcbiAgXX07XG5cbiAgLyogZ2xvYmFscyByb290UGFnZTogdHJ1ZSAqL1xuICBsZXQgY3R4O1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGdsb2JhbEluaXQodGhpcywgeyBpbXBvcnRzOiBpbXBvcnRzLCBib290c3RyYXA6ICdiYXNpYyd9KTtcbiAgICBjdHggPSBhd2FpdCBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCgpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGtpbGxBbGwoY3R4KTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNVSUNhdGFsb2cnKS5maXJzdCgpLnRhcCgpO1xuICAgICAgICAkLmRlbGF5KDEwMDApO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIGxldCBrZXlTdHJhdGVnaWVzID0gW3VuZGVmaW5lZCwgJ29uZUJ5T25lJywgJ2dyb3VwZWQnLCAnc2V0VmFsdWUnXTtcbiAgXy5lYWNoKGtleVN0cmF0ZWdpZXMsIGZ1bmN0aW9uIChzZW5kS2V5U3RyYXRlZ3kpIHtcbiAgICBpdChgc2hvdWxkIHdvcmsgd2l0aCBzdHJhdGVneTogJHtzZW5kS2V5U3RyYXRlZ3l9YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgICBmdW5jdGlvbiAoc2VuZEtleVN0cmF0ZWd5KSB7XG4gICAgICAgICAgZW52LnNlbmRLZXlTdHJhdGVneSA9IHNlbmRLZXlTdHJhdGVneTtcbiAgICAgICAgICAkLmRlbGF5KDEwMDApO1xuICAgICAgICAgIHJvb3RQYWdlLmNsaWNrTWVudUl0ZW0oJ1RleHQgRmllbGRzJyk7XG4gICAgICAgICAgJC5kZWxheSgxMDAwKTtcbiAgICAgICAgICB2YXIgdGV4dGZpZWxkID0gJCgndGV4dGZpZWxkJykuZmlyc3QoKVswXTtcbiAgICAgICAgICB0ZXh0ZmllbGQuc2V0VmFsdWUoJycpO1xuICAgICAgICAgICQuZGVsYXkoMzAwMCk7XG4gICAgICAgICAgJCgndGV4dGZpZWxkJykuZmlyc3QoKVswXS5zZXRWYWx1ZUJ5VHlwZSgnSGVsbG8gV29ybGQnKTtcbiAgICAgICAgICAkLmRlbGF5KDMwMDApO1xuICAgICAgICB9LCBbc2VuZEtleVN0cmF0ZWd5XVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==