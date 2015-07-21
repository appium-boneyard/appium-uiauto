require('source-map-support').install();

/* globals $ */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _this2 = this;

var _base = require('./base');

describe('grace period', function callee$0$0() {
  var imports;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        imports = { post: ['uiauto/lib/mechanic-ext/gesture-ext.js', 'uiauto/lib/mechanic-ext/keyboard-ext.js'] };

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

        describe('looking for non-existant object', function callee$1$0() {
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

                it('should be quick when grace period is not set', function callee$2$0() {
                  var refMs, res;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        refMs = Date.now();
                        context$3$0.next = 3;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          return $('#not exist');
                        }));

                      case 3:
                        res = context$3$0.sent;

                        res.should.have.length(0);
                        (Date.now() - refMs).should.be.below(1000);

                      case 6:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this);
                });

                it('should be quick when pushing and popping 0 timeout', function callee$2$0() {
                  var refMs, res;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        refMs = Date.now();
                        context$3$0.next = 3;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          $.target().pushTimeout(0);
                          var res = $('#not exist');
                          $.target().popTimeout();
                          return res;
                        }));

                      case 3:
                        res = context$3$0.sent;

                        res.should.have.length(0);
                        (Date.now() - refMs).should.be.below(1000);

                      case 6:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this);
                });

                // Skipping because of bug, it takes more than 25 second!
                it.skip('should be quick when grace period is set to 1', function callee$2$0() {
                  var refMs, res;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        refMs = Date.now();
                        context$3$0.next = 3;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          $.target().setTimeout(1);
                          $.warn('lookup starting');
                          var res = $('#not exist');
                          $.warn('lookup finished');
                          return res;
                        }));

                      case 3:
                        res = context$3$0.sent;

                        res.should.have.length(0)(Date.now() - refMs).should.be.below(5000);

                      case 5:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this);
                });

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        });

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL2dyYWNlLXBlcmlvZC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7b0JBRzZELFFBQVE7O0FBR3JFLFFBQVEsQ0FBQyxjQUFjLEVBQUU7TUFDbkIsT0FBTzs7OztBQUFQLGVBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxDQUNwQix3Q0FBd0MsRUFDeEMseUNBQXlDLENBQzFDLEVBQUM7O0FBQ0YsY0FBTSxDQUFDOzs7OztpREFDQyxVQVR3QixVQUFVLEVBU3ZCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBQyxDQUFDOzs7Ozs7O1NBQ2hFLENBQUMsQ0FBQzs7QUFFSCxnQkFBUSxDQUFDLGlDQUFpQyxFQUFFO2NBQ3RDLEdBQUc7Ozs7OztBQUFILG1CQUFHOztBQUNQLHNCQUFNLENBQUM7Ozs7O3lEQUNPLFVBZlQsdUJBQXVCLEdBZVc7OztBQUFyQywyQkFBRzs7Ozs7OztpQkFDSixDQUFDLENBQUM7QUFDSCxxQkFBSyxDQUFDOzs7Ozt5REFDRSxVQWxCa0MsT0FBTyxFQWtCakMsR0FBRyxDQUFDOzs7Ozs7O2lCQUNuQixDQUFDLENBQUM7O0FBRUgsa0JBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtzQkFDN0MsS0FBSyxFQUNMLEdBQUc7Ozs7QUFESCw2QkFBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7O3lEQUNOLEdBQUcsQ0FBQyxRQUFRLENBQzFCLFlBQVk7QUFDVixpQ0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7eUJBQ3hCLENBQ0Y7OztBQUpHLDJCQUFHOztBQUtQLDJCQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIseUJBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQSxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O2lCQUM1QyxDQUFDLENBQUM7O0FBRUgsa0JBQUUsQ0FBQyxvREFBb0QsRUFBRTtzQkFDbkQsS0FBSyxFQUNMLEdBQUc7Ozs7QUFESCw2QkFBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7O3lEQUNOLEdBQUcsQ0FBQyxRQUFRLENBQzFCLFlBQVk7QUFDViwyQkFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQiw4QkFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFCLDJCQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDeEIsaUNBQU8sR0FBRyxDQUFDO3lCQUNaLENBQ0Y7OztBQVBHLDJCQUFHOztBQVFQLDJCQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIseUJBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQSxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O2lCQUM1QyxDQUFDLENBQUM7OztBQUdILGtCQUFFLENBQUMsSUFBSSxDQUFDLCtDQUErQyxFQUFFO3NCQUNuRCxLQUFLLEVBQ0wsR0FBRzs7OztBQURILDZCQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTs7eURBQ04sR0FBRyxDQUFDLFFBQVEsQ0FDMUIsWUFBWTtBQUNWLDJCQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLDJCQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDMUIsOEJBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQiwyQkFBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzFCLGlDQUFPLEdBQUcsQ0FBQzt5QkFDWixDQUNGOzs7QUFSRywyQkFBRzs7QUFTUCwyQkFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUN4QixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7aUJBQzVDLENBQUMsQ0FBQzs7Ozs7OztTQUNKLENBQUMsQ0FBQzs7Ozs7OztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VpYXV0by9ncmFjZS1wZXJpb2Qtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcbi8qIGdsb2JhbHMgJCAqL1xuXG5pbXBvcnQgeyBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCwgZ2xvYmFsSW5pdCwga2lsbEFsbCB9IGZyb20gJy4vYmFzZSc7XG5cblxuZGVzY3JpYmUoJ2dyYWNlIHBlcmlvZCcsIGFzeW5jICgpID0+IHtcbiAgbGV0IGltcG9ydHMgPSB7IHBvc3Q6IFtcbiAgICAndWlhdXRvL2xpYi9tZWNoYW5pYy1leHQvZ2VzdHVyZS1leHQuanMnLFxuICAgICd1aWF1dG8vbGliL21lY2hhbmljLWV4dC9rZXlib2FyZC1leHQuanMnLFxuICBdfTtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBnbG9iYWxJbml0KHRoaXMsIHsgaW1wb3J0czogaW1wb3J0cywgYm9vdHN0cmFwOiAnYmFzaWMnfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdsb29raW5nIGZvciBub24tZXhpc3RhbnQgb2JqZWN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjdHg7XG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgIGN0eCA9IGF3YWl0IGluc3RydW1lbnRzSW5zdGFuY2VJbml0KCk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQga2lsbEFsbChjdHgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSBxdWljayB3aGVuIGdyYWNlIHBlcmlvZCBpcyBub3Qgc2V0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlZk1zID0gRGF0ZS5ub3coKTtcbiAgICAgIGxldCByZXMgPSBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJCgnI25vdCBleGlzdCcpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmVzLnNob3VsZC5oYXZlLmxlbmd0aCgwKTtcbiAgICAgIChEYXRlLm5vdygpIC0gcmVmTXMpLnNob3VsZC5iZS5iZWxvdygxMDAwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmUgcXVpY2sgd2hlbiBwdXNoaW5nIGFuZCBwb3BwaW5nIDAgdGltZW91dCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZWZNcyA9IERhdGUubm93KCk7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJC50YXJnZXQoKS5wdXNoVGltZW91dCgwKTtcbiAgICAgICAgICB2YXIgcmVzID0gJCgnI25vdCBleGlzdCcpO1xuICAgICAgICAgICQudGFyZ2V0KCkucG9wVGltZW91dCgpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICByZXMuc2hvdWxkLmhhdmUubGVuZ3RoKDApO1xuICAgICAgKERhdGUubm93KCkgLSByZWZNcykuc2hvdWxkLmJlLmJlbG93KDEwMDApO1xuICAgIH0pO1xuXG4gICAgLy8gU2tpcHBpbmcgYmVjYXVzZSBvZiBidWcsIGl0IHRha2VzIG1vcmUgdGhhbiAyNSBzZWNvbmQhXG4gICAgaXQuc2tpcCgnc2hvdWxkIGJlIHF1aWNrIHdoZW4gZ3JhY2UgcGVyaW9kIGlzIHNldCB0byAxJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlZk1zID0gRGF0ZS5ub3coKTtcbiAgICAgIGxldCByZXMgPSBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkLnRhcmdldCgpLnNldFRpbWVvdXQoMSk7XG4gICAgICAgICAgJC53YXJuKCdsb29rdXAgc3RhcnRpbmcnKTtcbiAgICAgICAgICB2YXIgcmVzID0gJCgnI25vdCBleGlzdCcpO1xuICAgICAgICAgICQud2FybignbG9va3VwIGZpbmlzaGVkJyk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHJlcy5zaG91bGQuaGF2ZS5sZW5ndGgoMClcbiAgICAgIChEYXRlLm5vdygpIC0gcmVmTXMpLnNob3VsZC5iZS5iZWxvdyg1MDAwKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==