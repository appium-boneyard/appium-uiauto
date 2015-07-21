'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libBuildCode = require('../../lib/build-code');

var _libBuildCode2 = _interopRequireDefault(_libBuildCode);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

_chai2['default'].should();

describe('build-code', function () {
  it('should include all dependencies in a combined script', function callee$1$0() {
    var path, script;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          path = 'test/assets/testFiles/test1.js';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _libBuildCode2['default'])(path));

        case 3:
          script = context$2$0.sent;

          script.should.include('var testFileNum = \'1\';');
          script.should.include('var testFileNum = \'2\';');
          script.should.include('var testFileNum = \'4\';');

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should not repeat imports', function callee$1$0() {
    var path;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          path = 'test/assets/testFiles/test3.js';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _libBuildCode2['default'])(path).should.be.rejected);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should take in extra imports', function callee$1$0() {
    var path, script;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          path = 'test/assets/testFiles/test4.js';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _libBuildCode2['default'])(path, ['./test2.js']));

        case 3:
          script = context$2$0.sent;

          script.should.include('var testFileNum = \'2\';');
          script.should.include('var testFileNum = \'4\';');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL2J1aWxkLWNvZGUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OzRCQUN3QixzQkFBc0I7Ozs7b0JBQzdCLE1BQU07Ozs7QUFFdkIsa0JBQUssTUFBTSxFQUFFLENBQUM7O0FBRWQsUUFBUSxDQUFDLFlBQVksRUFBRSxZQUFZO0FBQ2pDLElBQUUsQ0FBQyxzREFBc0QsRUFBRTtRQUNyRCxJQUFJLEVBQ0osTUFBTTs7OztBQUROLGNBQUksR0FBRyxnQ0FBZ0M7OzJDQUN4QiwrQkFBWSxJQUFJLENBQUM7OztBQUFoQyxnQkFBTTs7QUFDVixnQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQXdCLENBQUMsQ0FBQztBQUNoRCxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQXdCLENBQUMsQ0FBQztBQUNoRCxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQXdCLENBQUMsQ0FBQzs7Ozs7OztHQUNqRCxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzFCLElBQUk7Ozs7QUFBSixjQUFJLEdBQUcsZ0NBQWdDOzsyQ0FDckMsK0JBQVksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0dBQzNDLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsOEJBQThCLEVBQUU7UUFDN0IsSUFBSSxFQUNKLE1BQU07Ozs7QUFETixjQUFJLEdBQUcsZ0NBQWdDOzsyQ0FDeEIsK0JBQVksSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7OztBQUFoRCxnQkFBTTs7QUFDVixnQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQXdCLENBQUMsQ0FBQztBQUNoRCxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQXdCLENBQUMsQ0FBQzs7Ozs7OztHQUNqRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91aWF1dG8vYnVpbGQtY29kZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IGJ1aWxkU2NyaXB0IGZyb20gJy4uLy4uL2xpYi9idWlsZC1jb2RlJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknOyBcblxuY2hhaS5zaG91bGQoKTtcblxuZGVzY3JpYmUoJ2J1aWxkLWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCdzaG91bGQgaW5jbHVkZSBhbGwgZGVwZW5kZW5jaWVzIGluIGEgY29tYmluZWQgc2NyaXB0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBwYXRoID0gJ3Rlc3QvYXNzZXRzL3Rlc3RGaWxlcy90ZXN0MS5qcyc7XG4gICAgbGV0IHNjcmlwdCA9IGF3YWl0IGJ1aWxkU2NyaXB0KHBhdGgpO1xuICAgIHNjcmlwdC5zaG91bGQuaW5jbHVkZShcInZhciB0ZXN0RmlsZU51bSA9ICcxJztcIik7XG4gICAgc2NyaXB0LnNob3VsZC5pbmNsdWRlKFwidmFyIHRlc3RGaWxlTnVtID0gJzInO1wiKTtcbiAgICBzY3JpcHQuc2hvdWxkLmluY2x1ZGUoXCJ2YXIgdGVzdEZpbGVOdW0gPSAnNCc7XCIpO1xuICB9KTsgXG5cbiAgaXQoJ3Nob3VsZCBub3QgcmVwZWF0IGltcG9ydHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHBhdGggPSAndGVzdC9hc3NldHMvdGVzdEZpbGVzL3Rlc3QzLmpzJztcbiAgICBhd2FpdCBidWlsZFNjcmlwdChwYXRoKS5zaG91bGQuYmUucmVqZWN0ZWQ7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdGFrZSBpbiBleHRyYSBpbXBvcnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBwYXRoID0gJ3Rlc3QvYXNzZXRzL3Rlc3RGaWxlcy90ZXN0NC5qcyc7XG4gICAgbGV0IHNjcmlwdCA9IGF3YWl0IGJ1aWxkU2NyaXB0KHBhdGgsIFsnLi90ZXN0Mi5qcyddKTtcbiAgICBzY3JpcHQuc2hvdWxkLmluY2x1ZGUoXCJ2YXIgdGVzdEZpbGVOdW0gPSAnMic7XCIpO1xuICAgIHNjcmlwdC5zaG91bGQuaW5jbHVkZShcInZhciB0ZXN0RmlsZU51bSA9ICc0JztcIik7XG4gIH0pO1xufSk7Il19