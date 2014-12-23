/* globals $, rootPage */
'use strict';

var base = require('./base');

describe('find', function () {
  base.globalInit(this, { chai: true });

  describe("textfields", function () {
    var ctx;
    base.instrumentsInstanceInit()
      .then(function (_ctx) { ctx = _ctx; }).done();

    afterEach(function () {
      return ctx.execFunc(
        function () {
          $('#UICatalog').first().tap();
          $.delay(1000);
        }
      );
    });

    it('should not return duplicate UIATextField', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Text Fields');
          $.delay(2000);
          var cell = $('cell')[0];
          var id = '' + $.getId(cell);
          var res = $.getElementsByType('UIATextField', id);
          return res;
        }
      ).then(function (res) {
        console.warn('res -->', res);
        res.should.have.length(1);
      });
    });

    it('should not return duplicate UIASecureTextField', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Text Fields');
          $.delay(2000);
          var cell = $('cell')[2];
          var id = '' + $.getId(cell);
          var res = $.getElementsByType('UIASecureTextField', id);
          return res;
        }
      ).then(function (res) {
        res.should.have.length(1);
      });
    });

  });

  describe("byUIAutomation", function () {
    var ctx;
    base.instrumentsInstanceInit()
      .then(function (_ctx) { ctx = _ctx; }).done();

    afterEach(function () {
      return ctx.execFunc(
        function () {
          $('#UICatalog').first().tap();
          $.delay(1000);
        }
      );
    });

    it('should use global context by default', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Text Fields');
          $.delay(2000);
          var res = $.getElementsByUIAutomation('.getAllWithPredicate("type contains[c] \'textfield\'", true)');
          return res;
        }
      ).then(function (res) {
        res.should.have.length(5);
        res[0].ELEMENT.should.exist;
      });
    });

    it('should eval the raw code if it doesn\'t start with a dot', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Text Fields');
          $.delay(2000);
          var res = $.getElementsByUIAutomation('$.getElementByType(\'UIATableCell\').getAllWithPredicate("type contains[c] \'textfield\'", true)');
          return res;
        }
      ).then(function (res) {
        res.should.have.length(1);
        res[0].ELEMENT.should.exist;
      });
    });

    it('should retrieve context from cache when ctx param is a string', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Text Fields');
          $.delay(2000);
          var parent = $.getElementByType('UIATableCell');
          var parentId = $.getId(parent);
          var res = $.getElementsByUIAutomation(
            '.getAllWithPredicate("type contains[c] \'textfield\'", true)',
            parentId
          );
          return res;
        }
      ).then(function (res) {
        res.should.have.length(1);
        res[0].ELEMENT.should.exist;
      });
    });

    it('should use context when ctx param is an object', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Text Fields');
          $.delay(2000);
          var parent = $.getElementByType('UIATableCell');
          var res = $.getElementsByUIAutomation(
            '.getAllWithPredicate("type contains[c] \'textfield\'", true)',
            parent
          );
          return res;
        }
      ).then(function (res) {
        res.should.have.length(1);
        res[0].ELEMENT.should.exist;
      });
    });

    it('should work when retrieving only one element', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Text Fields');
          $.delay(2000);
          var res = [], parent, el;
          el = $.getElementByUIAutomation(
            '.getAllWithPredicate("type contains[c] \'textfield\'", true)'
          );
          res.push(el);

          el = $.getElementByUIAutomation('$.getElementByType(\'UIATableCell\').getAllWithPredicate("type contains[c] \'textfield\'", true)');
          res.push(el);

          parent = $.getElementsByType('UIATableCell')[1];
          var parentId = $.getId(parent);
          el = $.getElementByUIAutomation(
            '.getAllWithPredicate("type contains[c] \'textfield\'", true)',
            parentId
          );
          res.push(el);

          parent = $.getElementsByType('UIATableCell')[2];
          el = $.getElementByUIAutomation(
            '.getAllWithPredicate("type contains[c] \'textfield\'", true)',
            parent
          );
          res.push(el);

          return res;
        }
      ).then(function (res) {
        res.should.have.length(4);
        res[0].ELEMENT.should.exist;
      });
    });

  });
});
