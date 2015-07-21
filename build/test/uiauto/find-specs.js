require('source-map-support').install();

/* globals $, rootPage */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _this3 = this;

var _base = require('./base');

describe('find', function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        before(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap((0, _base.globalInit)(this, { chai: true }));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        });

        describe('textfields', function callee$1$0() {
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

                it('should not return duplicate UIATextField', function callee$2$0() {
                  var res;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          rootPage.clickMenuItem('Text Fields');
                          $.delay(2000);
                          var cell = $('cell')[0];
                          var id = '' + $.getId(cell);
                          var res = $.getElementsByType('UIATextField', id);
                          return res;
                        }));

                      case 2:
                        res = context$3$0.sent;

                        res.should.have.length(1);

                      case 4:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this);
                });

                it('should not return duplicate UIASecureTextField', function callee$2$0() {
                  var res;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                          rootPage.clickMenuItem('Text Fields');
                          $.delay(2000);
                          var cell = $('cell')[2];
                          var id = '' + $.getId(cell);
                          var res = $.getElementsByType('UIASecureTextField', id);
                          return res;
                        }));

                      case 2:
                        res = context$3$0.sent;

                        res.should.have.length(1);

                      case 4:
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

        describe('byUIAutomation', function () {
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
            }, null, _this2);
          });

          it('should use global context by default', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                    rootPage.clickMenuItem('Text Fields');
                    $.delay(2000);
                    var res = $.getElementsByUIAutomation('.getAllWithPredicate("type contains[c] \'textfield\'", true)');
                    return res;
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.have.length(5);
                  res[0].ELEMENT.should.exist;

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

          it('should eval the raw code if it does not start with a dot', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                    rootPage.clickMenuItem('Text Fields');
                    $.delay(2000);
                    var res = $.getElementsByUIAutomation('$.getElementByType(\'UIATableCell\').getAllWithPredicate("type contains[c] \'textfield\'", true)');
                    return res;
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.have.length(1);
                  res[0].ELEMENT.should.exist;

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

          it('should retrieve context from cache when ctx param is a string', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                    rootPage.clickMenuItem('Text Fields');
                    $.delay(2000);
                    var parent = $.getElementByType('UIATableCell');
                    var parentId = $.getId(parent);
                    var res = $.getElementsByUIAutomation('.getAllWithPredicate("type contains[c] \'textfield\'", true)', parentId);
                    return res;
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.have.length(1);
                  res[0].ELEMENT.should.exist;

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

          it('should use context when ctx param is an object', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                    rootPage.clickMenuItem('Text Fields');
                    $.delay(2000);
                    var parent = $.getElementByType('UIATableCell');
                    var res = $.getElementsByUIAutomation('.getAllWithPredicate("type contains[c] \'textfield\'", true)', parent);
                    return res;
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.have.length(1);
                  res[0].ELEMENT.should.exist;

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

          it('should work when retrieving only one element', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(ctx.execFunc(function () {
                    rootPage.clickMenuItem('Text Fields');
                    $.delay(2000);
                    var res = [],
                        parent,
                        el;
                    el = $.getElementByUIAutomation('.getAllWithPredicate("type contains[c] \'textfield\'", true)');
                    res.push(el);

                    el = $.getElementByUIAutomation('$.getElementByType(\'UIATableCell\').getAllWithPredicate("type contains[c] \'textfield\'", true)');
                    res.push(el);

                    parent = $.getElementsByType('UIATableCell')[1];
                    var parentId = $.getId(parent);
                    el = $.getElementByUIAutomation('.getAllWithPredicate("type contains[c] \'textfield\'", true)', parentId);
                    res.push(el);

                    parent = $.getElementsByType('UIATableCell')[2];
                    el = $.getElementByUIAutomation('.getAllWithPredicate("type contains[c] \'textfield\'", true)', parent);
                    res.push(el);

                    return res;
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.have.length(4);
                  res[0].ELEMENT.should.exist;

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });
        });

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this3);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdWlhdXRvL2ZpbmQtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O29CQUc2RCxRQUFROztBQUVyRSxRQUFRLENBQUMsTUFBTSxFQUFFOzs7Ozs7QUFDZixjQUFNLENBQUM7Ozs7O2lEQUNDLFVBSndCLFVBQVUsRUFJdkIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDOzs7Ozs7O1NBQ3ZDLENBQUMsQ0FBQzs7QUFFSCxnQkFBUSxDQUFDLFlBQVksRUFBRTtjQUNqQixHQUFHOzs7Ozs7QUFBSCxtQkFBRzs7QUFDUCxzQkFBTSxDQUFDOzs7Ozt5REFDTyxVQVZULHVCQUF1QixHQVVXOzs7QUFBckMsMkJBQUc7Ozs7Ozs7aUJBQ0osQ0FBQyxDQUFDO0FBQ0gscUJBQUssQ0FBQzs7Ozs7eURBQ0UsVUFia0MsT0FBTyxFQWFqQyxHQUFHLENBQUM7Ozs7Ozs7aUJBQ25CLENBQUMsQ0FBQzs7QUFFSCx5QkFBUyxDQUFDOzs7Ozt5REFDRixHQUFHLENBQUMsUUFBUSxDQUNoQixZQUFZO0FBQ1YsMkJBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM5QiwyQkFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDZixDQUNGOzs7Ozs7O2lCQUNGLENBQUMsQ0FBQzs7QUFFSCxrQkFBRSxDQUFDLDBDQUEwQyxFQUFFO3NCQUN6QyxHQUFHOzs7Ozt5REFBUyxHQUFHLENBQUMsUUFBUSxDQUMxQixZQUFZO0FBQ1Ysa0NBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEMsMkJBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDZCw4QkFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLDhCQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUss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Q0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFYiwwQkFBTSxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRCxzQkFBRSxHQUFHLENBQUMsQ0FBQyx3QkFBd0IsQ0FDN0IsOERBQThELEVBQzlELE1BQU0sQ0FDUCxDQUFDO0FBQ0YsdUJBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRWIsMkJBQU8sR0FBRyxDQUFDO21CQUNaLENBQ0Y7OztBQTlCRyxxQkFBRzs7QUErQlAscUJBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixxQkFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O1dBQzdCLENBQUMsQ0FBQztTQUVKLENBQUMsQ0FBQzs7Ozs7OztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VpYXV0by9maW5kLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG4vKiBnbG9iYWxzICQsIHJvb3RQYWdlICovXG5cbmltcG9ydCB7IGluc3RydW1lbnRzSW5zdGFuY2VJbml0LCBnbG9iYWxJbml0LCBraWxsQWxsIH0gZnJvbSAnLi9iYXNlJztcblxuZGVzY3JpYmUoJ2ZpbmQnLCBhc3luYyAoKSA9PiB7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZ2xvYmFsSW5pdCh0aGlzLCB7IGNoYWk6IHRydWUgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKFwidGV4dGZpZWxkc1wiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGN0eDtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgY3R4ID0gYXdhaXQgaW5zdHJ1bWVudHNJbnN0YW5jZUluaXQoKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBraWxsQWxsKGN0eCk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCgnI1VJQ2F0YWxvZycpLmZpcnN0KCkudGFwKCk7XG4gICAgICAgICAgJC5kZWxheSgxMDAwKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHJldHVybiBkdXBsaWNhdGUgVUlBVGV4dEZpZWxkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGN0eC5leGVjRnVuYyhcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJvb3RQYWdlLmNsaWNrTWVudUl0ZW0oJ1RleHQgRmllbGRzJyk7XG4gICAgICAgICAgJC5kZWxheSgyMDAwKTtcbiAgICAgICAgICB2YXIgY2VsbCA9ICQoJ2NlbGwnKVswXTtcbiAgICAgICAgICB2YXIgaWQgPSAnJyArICQuZ2V0SWQoY2VsbCk7XG4gICAgICAgICAgdmFyIHJlcyA9ICQuZ2V0RWxlbWVudHNCeVR5cGUoJ1VJQVRleHRGaWVsZCcsIGlkKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmVzLnNob3VsZC5oYXZlLmxlbmd0aCgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHJldHVybiBkdXBsaWNhdGUgVUlBU2VjdXJlVGV4dEZpZWxkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGN0eC5leGVjRnVuYyhcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJvb3RQYWdlLmNsaWNrTWVudUl0ZW0oJ1RleHQgRmllbGRzJyk7XG4gICAgICAgICAgJC5kZWxheSgyMDAwKTtcbiAgICAgICAgICB2YXIgY2VsbCA9ICQoJ2NlbGwnKVsyXTtcbiAgICAgICAgICB2YXIgaWQgPSAnJyArICQuZ2V0SWQoY2VsbCk7XG4gICAgICAgICAgdmFyIHJlcyA9ICQuZ2V0RWxlbWVudHNCeVR5cGUoJ1VJQVNlY3VyZVRleHRGaWVsZCcsIGlkKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmVzLnNob3VsZC5oYXZlLmxlbmd0aCgxKTtcbiAgICB9KTtcblxuICB9KTtcblxuICBkZXNjcmliZSgnYnlVSUF1dG9tYXRpb24nLCAoKSA9PiB7XG4gICAgbGV0IGN0eDtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgY3R4ID0gYXdhaXQgaW5zdHJ1bWVudHNJbnN0YW5jZUluaXQoKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBraWxsQWxsKGN0eCk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCgnI1VJQ2F0YWxvZycpLmZpcnN0KCkudGFwKCk7XG4gICAgICAgICAgJC5kZWxheSgxMDAwKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdXNlIGdsb2JhbCBjb250ZXh0IGJ5IGRlZmF1bHQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcm9vdFBhZ2UuY2xpY2tNZW51SXRlbSgnVGV4dCBGaWVsZHMnKTtcbiAgICAgICAgICAkLmRlbGF5KDIwMDApO1xuICAgICAgICAgIHZhciByZXMgPSAkLmdldEVsZW1lbnRzQnlVSUF1dG9tYXRpb24oJy5nZXRBbGxXaXRoUHJlZGljYXRlKFwidHlwZSBjb250YWluc1tjXSBcXCd0ZXh0ZmllbGRcXCdcIiwgdHJ1ZSknKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmVzLnNob3VsZC5oYXZlLmxlbmd0aCg1KTtcbiAgICAgIHJlc1swXS5FTEVNRU5ULnNob3VsZC5leGlzdDtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZXZhbCB0aGUgcmF3IGNvZGUgaWYgaXQgZG9lcyBub3Qgc3RhcnQgd2l0aCBhIGRvdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByb290UGFnZS5jbGlja01lbnVJdGVtKCdUZXh0IEZpZWxkcycpO1xuICAgICAgICAgICQuZGVsYXkoMjAwMCk7XG4gICAgICAgICAgdmFyIHJlcyA9ICQuZ2V0RWxlbWVudHNCeVVJQXV0b21hdGlvbignJC5nZXRFbGVtZW50QnlUeXBlKFxcJ1VJQVRhYmxlQ2VsbFxcJykuZ2V0QWxsV2l0aFByZWRpY2F0ZShcInR5cGUgY29udGFpbnNbY10gXFwndGV4dGZpZWxkXFwnXCIsIHRydWUpJyk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHJlcy5zaG91bGQuaGF2ZS5sZW5ndGgoMSk7XG4gICAgICByZXNbMF0uRUxFTUVOVC5zaG91bGQuZXhpc3Q7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHJpZXZlIGNvbnRleHQgZnJvbSBjYWNoZSB3aGVuIGN0eCBwYXJhbSBpcyBhIHN0cmluZycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByb290UGFnZS5jbGlja01lbnVJdGVtKCdUZXh0IEZpZWxkcycpO1xuICAgICAgICAgICQuZGVsYXkoMjAwMCk7XG4gICAgICAgICAgdmFyIHBhcmVudCA9ICQuZ2V0RWxlbWVudEJ5VHlwZSgnVUlBVGFibGVDZWxsJyk7XG4gICAgICAgICAgdmFyIHBhcmVudElkID0gJC5nZXRJZChwYXJlbnQpO1xuICAgICAgICAgIHZhciByZXMgPSAkLmdldEVsZW1lbnRzQnlVSUF1dG9tYXRpb24oXG4gICAgICAgICAgICAnLmdldEFsbFdpdGhQcmVkaWNhdGUoXCJ0eXBlIGNvbnRhaW5zW2NdIFxcJ3RleHRmaWVsZFxcJ1wiLCB0cnVlKScsXG4gICAgICAgICAgICBwYXJlbnRJZFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHJlcy5zaG91bGQuaGF2ZS5sZW5ndGgoMSk7XG4gICAgICByZXNbMF0uRUxFTUVOVC5zaG91bGQuZXhpc3Q7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVzZSBjb250ZXh0IHdoZW4gY3R4IHBhcmFtIGlzIGFuIG9iamVjdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCBjdHguZXhlY0Z1bmMoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByb290UGFnZS5jbGlja01lbnVJdGVtKCdUZXh0IEZpZWxkcycpO1xuICAgICAgICAgICQuZGVsYXkoMjAwMCk7XG4gICAgICAgICAgdmFyIHBhcmVudCA9ICQuZ2V0RWxlbWVudEJ5VHlwZSgnVUlBVGFibGVDZWxsJyk7XG4gICAgICAgICAgdmFyIHJlcyA9ICQuZ2V0RWxlbWVudHNCeVVJQXV0b21hdGlvbihcbiAgICAgICAgICAgICcuZ2V0QWxsV2l0aFByZWRpY2F0ZShcInR5cGUgY29udGFpbnNbY10gXFwndGV4dGZpZWxkXFwnXCIsIHRydWUpJyxcbiAgICAgICAgICAgIHBhcmVudFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHJlcy5zaG91bGQuaGF2ZS5sZW5ndGgoMSk7XG4gICAgICByZXNbMF0uRUxFTUVOVC5zaG91bGQuZXhpc3Q7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHdvcmsgd2hlbiByZXRyaWV2aW5nIG9ubHkgb25lIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgY3R4LmV4ZWNGdW5jKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcm9vdFBhZ2UuY2xpY2tNZW51SXRlbSgnVGV4dCBGaWVsZHMnKTtcbiAgICAgICAgICAkLmRlbGF5KDIwMDApO1xuICAgICAgICAgIHZhciByZXMgPSBbXSwgcGFyZW50LCBlbDtcbiAgICAgICAgICBlbCA9ICQuZ2V0RWxlbWVudEJ5VUlBdXRvbWF0aW9uKFxuICAgICAgICAgICAgJy5nZXRBbGxXaXRoUHJlZGljYXRlKFwidHlwZSBjb250YWluc1tjXSBcXCd0ZXh0ZmllbGRcXCdcIiwgdHJ1ZSknXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXMucHVzaChlbCk7XG5cbiAgICAgICAgICBlbCA9ICQuZ2V0RWxlbWVudEJ5VUlBdXRvbWF0aW9uKCckLmdldEVsZW1lbnRCeVR5cGUoXFwnVUlBVGFibGVDZWxsXFwnKS5nZXRBbGxXaXRoUHJlZGljYXRlKFwidHlwZSBjb250YWluc1tjXSBcXCd0ZXh0ZmllbGRcXCdcIiwgdHJ1ZSknKTtcbiAgICAgICAgICByZXMucHVzaChlbCk7XG5cbiAgICAgICAgICBwYXJlbnQgPSAkLmdldEVsZW1lbnRzQnlUeXBlKCdVSUFUYWJsZUNlbGwnKVsxXTtcbiAgICAgICAgICB2YXIgcGFyZW50SWQgPSAkLmdldElkKHBhcmVudCk7XG4gICAgICAgICAgZWwgPSAkLmdldEVsZW1lbnRCeVVJQXV0b21hdGlvbihcbiAgICAgICAgICAgICcuZ2V0QWxsV2l0aFByZWRpY2F0ZShcInR5cGUgY29udGFpbnNbY10gXFwndGV4dGZpZWxkXFwnXCIsIHRydWUpJyxcbiAgICAgICAgICAgIHBhcmVudElkXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXMucHVzaChlbCk7XG5cbiAgICAgICAgICBwYXJlbnQgPSAkLmdldEVsZW1lbnRzQnlUeXBlKCdVSUFUYWJsZUNlbGwnKVsyXTtcbiAgICAgICAgICBlbCA9ICQuZ2V0RWxlbWVudEJ5VUlBdXRvbWF0aW9uKFxuICAgICAgICAgICAgJy5nZXRBbGxXaXRoUHJlZGljYXRlKFwidHlwZSBjb250YWluc1tjXSBcXCd0ZXh0ZmllbGRcXCdcIiwgdHJ1ZSknLFxuICAgICAgICAgICAgcGFyZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXMucHVzaChlbCk7XG5cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmVzLnNob3VsZC5oYXZlLmxlbmd0aCg0KTtcbiAgICAgIHJlc1swXS5FTEVNRU5ULnNob3VsZC5leGlzdDtcbiAgICB9KTtcblxuICB9KTtcbn0pO1xuIl19