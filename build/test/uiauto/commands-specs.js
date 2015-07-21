require('source-map-support').install();

/* globals $ */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _base = require('./base');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

describe('commands', function () {
  var _this = this;

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _base.globalInit)(this, { bootstrap: 'basic' }));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  describe('simple sequences', function () {
    var _this2 = this;

    var ctx = undefined;
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
      }, null, _this2);
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
      }, null, _this2);
    });

    it('should send one valid command returning a value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.sendCommand('\'123\''));

          case 2:
            context$3$0.sent.should.equal('123');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    it('should send one valid command returning empty value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.sendCommand('$.warn(\'starting\')'));

          case 2:
            context$3$0.sent.should.equal('');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    it('should respond to invalid command and not die', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.sendCommand('i_am_invalid()').should.be.rejectedWith(/Can't find variable: i_am_invalid/));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(ctx.sendCommand('$.warn(\'still alive\')'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    it('should repond to 10 commands in a row', function callee$2$0() {
      var seq;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this4 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            seq = [];

            _lodash2['default'].times(10, function (i) {
              var _this3 = this;

              seq.push(function callee$4$0() {
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap(ctx.sendCommand('(function () { return ' + i + '})()'));

                    case 2:
                      context$5$0.t0 = i;
                      context$5$0.sent.should.equal(context$5$0.t0);

                    case 4:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, _this3);
              });
            });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].reduce(seq, function callee$3$0(res, task) {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(res);

                  case 2:
                    return context$4$0.abrupt('return', task());

                  case 3:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this4);
            }, null));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });

  describe('sending 100 valid commands', function () {
    var ctx = undefined;
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

    it('should work', function callee$2$0() {
      var seq;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this5 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            seq = [];

            _lodash2['default'].times(100, function (i) {
              seq.push(function callee$4$0() {
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap(ctx.sendCommand('(function () { return "' + i + '"})()'));

                    case 2:
                      context$5$0.t0 = i.toString();
                      context$5$0.sent.should.equal(context$5$0.t0);

                    case 4:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, _this5);
              });
            });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].reduce(seq, function callee$3$0(res, task) {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(res);

                  case 2:
                    return context$4$0.abrupt('return', task());

                  case 3:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this5);
            }, null));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('sending 100 alternating valid and invalid', function () {
    var ctx = undefined;
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

    it('should work', function callee$2$0() {
      var seq;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this6 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            seq = [];

            _lodash2['default'].times(100, function (i) {
              if (i % 2 === 0) seq.push(function callee$4$0() {
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap(ctx.sendCommand('(function () { return "' + i + '"})()'));

                    case 2:
                      context$5$0.t0 = i.toString();
                      context$5$0.sent.should.equal(context$5$0.t0);

                    case 4:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, _this6);
              });else seq.push(function callee$4$0() {
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap(ctx.sendCommand('(ffffunction () { return "' + i + '"})()').should.be.rejectedWith(/Unexpected token/));

                    case 2:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, _this6);
              });
            });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].reduce(seq, function callee$3$0(res, task) {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(res);

                  case 2:
                    return context$4$0.abrupt('return', task());

                  case 3:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this6);
            }, null));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('command with big result', function () {
    var ctx = undefined;
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

    // UIAuto code
    var configureUIAuto = function configureUIAuto() {
      $.extend($, {
        oneMamaLongString: function oneMamaLongString(n, mapping) {
          var i;
          if (!mapping) {
            mapping = [];
            for (i = 0; i < n; i++) {
              mapping.push(i);
            }
          }
          var main = '';
          for (i = 0; i < n; i++) {
            main += mapping[i % 10];
          }
          return main;
        },

        oneMamaHugeTree: function oneMamaHugeTree(n, d) {
          function addChildren(root, depth) {
            if (depth === d) return;
            root.children = {};
            var i;
            for (i = 0; i < n; i++) {
              root.children['c' + i] = { name: 'child ' + i };
              addChildren(root.children['c' + i], depth + 1);
            }
          }
          var root = { name: 'root' };
          addChildren(root, 0);
          return root;
        }

      });
    };

    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.execFunc(configureUIAuto));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    var testN = function testN(n) {
      var s;
      return _regeneratorRuntime.async(function testN$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.sendCommand('$.oneMamaLongString(' + n + ')'));

          case 2:
            s = context$3$0.sent;

            s.should.have.length(n);
            _lodash2['default'].times(n, function (i) {
              parseInt(s[i], 10).should.equal(i % 10);
            });

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    };

    it('should work a small string', function () {
      return testN(1000);
    });

    it('should work a medium string', function () {
      return testN(100000);
    });

    it('should work a big string', function () {
      return testN(1000000);
    });

    var testNWithSpaces = function testNWithSpaces(n) {
      var s;
      return _regeneratorRuntime.async(function testNWithSpaces$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(ctx.sendCommand('$.oneMamaLongString(' + n + ', [0,1,2,3,4,\' \',6,7,8,9])'));

          case 2:
            s = context$3$0.sent;

            s.should.have.length(n);
            _lodash2['default'].times(n, function (i) {
              if (i % 10 === 5) {
                s[i].should.equal(' ');
              } else {
                parseInt(s[i], 10).should.equal(i % 10);
              }
            });

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    };

    it('should work with a big string with spaces', function () {
      return testNWithSpaces(200000);
    });

    var getHugeTree = function getHugeTree(n, d) {
      return _regeneratorRuntime.async(function getHugeTree$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            return context$3$0.abrupt('return', ctx.sendCommand('$.oneMamaHugeTree(' + n + ', ' + d + ')'));

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    };

    it('should work with a medium tree', function callee$2$0() {
      var res;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(getHugeTree(5, 3));

          case 2:
            res = context$3$0.sent;

            res.name.should.equal('root');
            res.children.c1.children.c2.children.c3.name.should.equal('child 3');
            JSON.stringify(res).length.should.be.above(4000);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should work with a huge tree', function callee$2$0() {
      var res;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(getHugeTree(5, 7));

          case 2:
            res = context$3$0.sent;

            res.name.should.equal('root');
            res.children.c1.children.c2.children.c3.children.c2.name.should.equal('child 2');
            JSON.stringify(res).length.should.be.above(2000000);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});

// if ((i+1)%10 === 0) console.log('sent:', (i+1));

// if ((i+1)%10 === 0) console.log('sent:', (i+1));

// if ((i+1)%10 === 0) console.log('sent:', (i+1));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL2NvbW1hbmRzLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztvQkFHNkQsUUFBUTs7c0JBQ3ZELFFBQVE7Ozs7d0JBQ0YsVUFBVTs7OztBQUc5QixRQUFRLENBQUMsVUFBVSxFQUFFLFlBQVk7OztBQUMvQixRQUFNLENBQUM7Ozs7OzJDQUNDLFVBUHdCLFVBQVUsRUFPdkIsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxDQUFDOzs7Ozs7O0dBQzdDLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsa0JBQWtCLEVBQUUsWUFBWTs7O0FBQ3ZDLFFBQUksR0FBRyxZQUFBLENBQUM7QUFDUixVQUFNLENBQUM7Ozs7OzZDQUNPLFVBYlQsdUJBQXVCLEdBYVc7OztBQUFyQyxlQUFHOzs7Ozs7O0tBQ0osQ0FBQyxDQUFDO0FBQ0gsU0FBSyxDQUFDOzs7Ozs2Q0FDRSxVQWhCa0MsT0FBTyxFQWdCakMsR0FBRyxDQUFDOzs7Ozs7O0tBQ25CLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsaURBQWlELEVBQUU7Ozs7OzZDQUM3QyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQU8sQ0FBQzs7OzZCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSzs7Ozs7OztLQUNwRCxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLHFEQUFxRCxFQUFFOzs7Ozs2Q0FDakQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBb0IsQ0FBQzs7OzZCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTs7Ozs7OztLQUM5RCxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLCtDQUErQyxFQUFFOzs7Ozs2Q0FDNUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLG1DQUFtQyxDQUFDOzs7OzZDQUM3RixHQUFHLENBQUMsV0FBVyxDQUFDLHlCQUF1QixDQUFDOzs7Ozs7O0tB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OlsiLy8gdHJhbnNwaWxlOm1vY2hhXG4vKiBnbG9iYWxzICQgKi9cblxuaW1wb3J0IHsgaW5zdHJ1bWVudHNJbnN0YW5jZUluaXQsIGdsb2JhbEluaXQsIGtpbGxBbGwgfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuXG5kZXNjcmliZSgnY29tbWFuZHMnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZ2xvYmFsSW5pdCh0aGlzLCB7Ym9vdHN0cmFwOiAnYmFzaWMnfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzaW1wbGUgc2VxdWVuY2VzJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjdHg7XG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgIGN0eCA9IGF3YWl0IGluc3RydW1lbnRzSW5zdGFuY2VJbml0KCk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQga2lsbEFsbChjdHgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZW5kIG9uZSB2YWxpZCBjb21tYW5kIHJldHVybmluZyBhIHZhbHVlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgKGF3YWl0IGN0eC5zZW5kQ29tbWFuZChcIicxMjMnXCIpKS5zaG91bGQuZXF1YWwoJzEyMycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZW5kIG9uZSB2YWxpZCBjb21tYW5kIHJldHVybmluZyBlbXB0eSB2YWx1ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIChhd2FpdCBjdHguc2VuZENvbW1hbmQoXCIkLndhcm4oJ3N0YXJ0aW5nJylcIikpLnNob3VsZC5lcXVhbCgnJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlc3BvbmQgdG8gaW52YWxpZCBjb21tYW5kIGFuZCBub3QgZGllJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgY3R4LnNlbmRDb21tYW5kKCdpX2FtX2ludmFsaWQoKScpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL0Nhbid0IGZpbmQgdmFyaWFibGU6IGlfYW1faW52YWxpZC8pO1xuICAgICAgYXdhaXQgY3R4LnNlbmRDb21tYW5kKFwiJC53YXJuKCdzdGlsbCBhbGl2ZScpXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXBvbmQgdG8gMTAgY29tbWFuZHMgaW4gYSByb3cnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc2VxID0gW107XG4gICAgICBfLnRpbWVzKDEwLCBmdW5jdGlvbiAoaSkge1xuICAgICAgICBzZXEucHVzaChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgKGF3YWl0IGN0eC5zZW5kQ29tbWFuZChgKGZ1bmN0aW9uICgpIHsgcmV0dXJuICR7aX19KSgpYCkpLnNob3VsZC5lcXVhbChpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFByb21pc2UucmVkdWNlKHNlcSwgYXN5bmMgKHJlcywgdGFzaykgPT4ge1xuICAgICAgICBhd2FpdCByZXM7XG4gICAgICAgIHJldHVybiB0YXNrKCk7XG4gICAgICB9LCBudWxsKTtcbiAgICB9KTtcblxuICB9KTtcblxuICBkZXNjcmliZSgnc2VuZGluZyAxMDAgdmFsaWQgY29tbWFuZHMnLCAoKSA9PiB7XG4gICAgbGV0IGN0eDtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgY3R4ID0gYXdhaXQgaW5zdHJ1bWVudHNJbnN0YW5jZUluaXQoKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBraWxsQWxsKGN0eCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHdvcmsnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc2VxID0gW107XG4gICAgICBfLnRpbWVzKDEwMCwgKGkpID0+IHtcbiAgICAgICAgc2VxLnB1c2goYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIChhd2FpdCBjdHguc2VuZENvbW1hbmQoYChmdW5jdGlvbiAoKSB7IHJldHVybiBcIiR7aX1cIn0pKClgKSkuc2hvdWxkLmVxdWFsKGkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgLy8gaWYgKChpKzEpJTEwID09PSAwKSBjb25zb2xlLmxvZygnc2VudDonLCAoaSsxKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBQcm9taXNlLnJlZHVjZShzZXEsIGFzeW5jIChyZXMsIHRhc2spID0+IHtcbiAgICAgICAgYXdhaXQgcmVzO1xuICAgICAgICByZXR1cm4gdGFzaygpO1xuICAgICAgfSwgbnVsbCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZW5kaW5nIDEwMCBhbHRlcm5hdGluZyB2YWxpZCBhbmQgaW52YWxpZCcsICgpID0+IHtcbiAgICBsZXQgY3R4O1xuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICBjdHggPSBhd2FpdCBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCgpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGtpbGxBbGwoY3R4KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgd29yaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzZXEgPSBbXTtcbiAgICAgIF8udGltZXMoMTAwLCAoaSkgPT4ge1xuICAgICAgICBpZiAoaSUyID09PSAwKVxuICAgICAgICAgIHNlcS5wdXNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIChhd2FpdCBjdHguc2VuZENvbW1hbmQoYChmdW5jdGlvbiAoKSB7IHJldHVybiBcIiR7aX1cIn0pKClgKSkuc2hvdWxkLmVxdWFsKGkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAvLyBpZiAoKGkrMSklMTAgPT09IDApIGNvbnNvbGUubG9nKCdzZW50OicsIChpKzEpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHNlcS5wdXNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IGN0eC5zZW5kQ29tbWFuZCgnKGZmZmZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiJyArIGkgKyAnXCJ9KSgpJylcbiAgICAgICAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL1VuZXhwZWN0ZWQgdG9rZW4vKTtcbiAgICAgICAgICAgIC8vIGlmICgoaSsxKSUxMCA9PT0gMCkgY29uc29sZS5sb2coJ3NlbnQ6JywgKGkrMSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBQcm9taXNlLnJlZHVjZShzZXEsIGFzeW5jIChyZXMsIHRhc2spID0+IHtcbiAgICAgICAgYXdhaXQgcmVzO1xuICAgICAgICByZXR1cm4gdGFzaygpO1xuICAgICAgfSwgbnVsbCk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NvbW1hbmQgd2l0aCBiaWcgcmVzdWx0JywgKCkgPT4ge1xuICAgIGxldCBjdHg7XG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgIGN0eCA9IGF3YWl0IGluc3RydW1lbnRzSW5zdGFuY2VJbml0KCk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQga2lsbEFsbChjdHgpO1xuICAgIH0pO1xuXG4gICAgLy8gVUlBdXRvIGNvZGVcbiAgICBsZXQgY29uZmlndXJlVUlBdXRvID0gKCkgPT4ge1xuICAgICAgJC5leHRlbmQoJCwge1xuICAgICAgICBvbmVNYW1hTG9uZ1N0cmluZzogZnVuY3Rpb24gKG4sIG1hcHBpbmcpIHtcbiAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICBpZiAoIW1hcHBpbmcpIHtcbiAgICAgICAgICAgIG1hcHBpbmcgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaT0wOyBpPG47IGkrKyl7XG4gICAgICAgICAgICAgIG1hcHBpbmcucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG1haW4gPSBcIlwiO1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIG1haW4gKz0gbWFwcGluZ1tpICUgMTBdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWFpbjtcbiAgICAgICAgfSxcblxuICAgICAgICBvbmVNYW1hSHVnZVRyZWU6IGZ1bmN0aW9uIChuLCBkKSB7XG4gICAgICAgICAgZnVuY3Rpb24gYWRkQ2hpbGRyZW4ocm9vdCwgZGVwdGgpIHtcbiAgICAgICAgICAgIGlmIChkZXB0aCA9PT0gZCkgcmV0dXJuO1xuICAgICAgICAgICAgcm9vdC5jaGlsZHJlbiA9IHt9O1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICBmb3IgKGk9MDsgaTxuOyBpKyspe1xuICAgICAgICAgICAgICByb290LmNoaWxkcmVuWydjJyArIGldID0geyBuYW1lOiAnY2hpbGQgJyArIGkgfTtcbiAgICAgICAgICAgICAgYWRkQ2hpbGRyZW4ocm9vdC5jaGlsZHJlblsnYycgKyBpXSwgZGVwdGggKzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcm9vdCA9IHtuYW1lOiAncm9vdCd9O1xuICAgICAgICAgIGFkZENoaWxkcmVuKHJvb3QsIDApO1xuICAgICAgICAgIHJldHVybiByb290O1xuICAgICAgICB9LFxuXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGN0eC5leGVjRnVuYyhjb25maWd1cmVVSUF1dG8pO1xuICAgIH0pO1xuXG4gICAgbGV0IHRlc3ROID0gYXN5bmMgKG4pID0+IHtcbiAgICAgIGxldCBzID0gYXdhaXQgY3R4LnNlbmRDb21tYW5kKGAkLm9uZU1hbWFMb25nU3RyaW5nKCR7bn0pYCk7XG4gICAgICBzLnNob3VsZC5oYXZlLmxlbmd0aChuKTtcbiAgICAgIF8udGltZXMobiwgZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcGFyc2VJbnQoc1tpXSAsIDEwKS5zaG91bGQuZXF1YWwoaSUxMCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaXQoJ3Nob3VsZCB3b3JrIGEgc21hbGwgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRlc3ROKDEwMDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB3b3JrIGEgbWVkaXVtIHN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0ZXN0TigxMDAwMDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB3b3JrIGEgYmlnIHN0cmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0ZXN0TigxMDAwMDAwKTtcbiAgICB9KTtcblxuICAgIGxldCB0ZXN0TldpdGhTcGFjZXMgPSBhc3luYyAobikgPT4ge1xuICAgICAgbGV0IHMgPSBhd2FpdCBjdHguc2VuZENvbW1hbmQoYCQub25lTWFtYUxvbmdTdHJpbmcoJHtufSwgWzAsMSwyLDMsNCwnICcsNiw3LDgsOV0pYCk7XG4gICAgICBzLnNob3VsZC5oYXZlLmxlbmd0aChuKTtcbiAgICAgIF8udGltZXMobiwgZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaWYgKGklMTAgPT09IDUpe1xuICAgICAgICAgIHNbaV0uc2hvdWxkLmVxdWFsKCcgJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyc2VJbnQoc1tpXSAsIDEwKS5zaG91bGQuZXF1YWwoaSUxMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBhIGJpZyBzdHJpbmcgd2l0aCBzcGFjZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGVzdE5XaXRoU3BhY2VzKDIwMDAwMCk7XG4gICAgfSk7XG5cbiAgICBsZXQgZ2V0SHVnZVRyZWUgPSBhc3luYyAobiwgZCkgPT4ge1xuICAgICAgcmV0dXJuIGN0eC5zZW5kQ29tbWFuZChgJC5vbmVNYW1hSHVnZVRyZWUoJHtufSwgJHtkfSlgKTtcbiAgICB9O1xuXG4gICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggYSBtZWRpdW0gdHJlZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCBnZXRIdWdlVHJlZSg1LCAzKTtcbiAgICAgIHJlcy5uYW1lLnNob3VsZC5lcXVhbCgncm9vdCcpO1xuICAgICAgcmVzLmNoaWxkcmVuLmMxLmNoaWxkcmVuLmMyLmNoaWxkcmVuXG4gICAgICAgIC5jMy5uYW1lLnNob3VsZC5lcXVhbCgnY2hpbGQgMycpO1xuICAgICAgSlNPTi5zdHJpbmdpZnkocmVzKS5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDQwMDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggYSBodWdlIHRyZWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgZ2V0SHVnZVRyZWUoNSwgNyk7XG4gICAgICByZXMubmFtZS5zaG91bGQuZXF1YWwoJ3Jvb3QnKTtcbiAgICAgIHJlcy5jaGlsZHJlbi5jMS5jaGlsZHJlbi5jMi5jaGlsZHJlblxuICAgICAgICAuYzMuY2hpbGRyZW4uYzIubmFtZS5zaG91bGQuZXF1YWwoJ2NoaWxkIDInKTtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHJlcykubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgyMDAwMDAwKTtcbiAgICB9KTtcbiAgfSk7XG5cbn0pO1xuIl19