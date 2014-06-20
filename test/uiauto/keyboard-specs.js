/* globals $ */
'use strict';

var base = require('./base'),
    _ = require('underscore');

describe('keyboard', function () {

  base.globalInit(this, { extraImports: [
    'uiauto/lib/mechanic-ext/gesture-ext.js',
    'uiauto/lib/mechanic-ext/keyboard-ext.js',
  ]});

  describe("hide keyboard", function () {
    /* globals rootPage: true */
    var ctx;
    base.instrumentsInstanceInit()
      .then(function (_ctx) { ctx = _ctx; }).done();

    before(function () {
      // some uiauto helpers
      return ctx.execFunc(function () {
        rootPage = {};
        // click item in root page menu
        rootPage.clickMenuItem = function (partialText) {
          $.each($('tableview').children(), function (idx, child) {
            if (child.name().indexOf(partialText) >= 0 ){
              $(child).tap();
              return false;
            }
          });
        };
      });
    });

    afterEach(function () {
      return ctx.execFunc(
        function () {
          $('#UICatalog').first().tap();
          $.delay(1000);
        }
      );
    });


    _(['pressKey', 'press']).each(function (strategy) {
      it('should hide the keyboard by pressing the done key (' +
          strategy + ')', function () {
        return ctx.execFunc(
          function (strategy) {
            rootPage.clickMenuItem('Text Fields');
            $('textfield').first().tap();
            $('#Done').should.have.length(1);
            $.hideKeyboard(strategy, 'Done');
            $('#Done').should.have.length(0);
          }, [strategy]
        );
      });
    });

    _(['tapOutside', 'tapOut']).each(function (strategy) {
      it('should hide the keyboard by tapping outside(' +
          strategy + ')', function () {
        return ctx.execFunc(
          function (strategy) {
            rootPage.clickMenuItem('Web View');
            $('textfield').first().tap();
            $('#Go').should.have.length(1);
            $.hideKeyboard(strategy);
            $('#Go').should.have.length(0);
          }, [strategy]
        );
      });
    });

    it('should hide the keyboard with the default strategy', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Web View');
          $('textfield').first().tap();
          $('#Go').should.have.length(1);
          $.hideKeyboard('default');
          $('#Go').should.have.length(0);
        }
      );
    });

  });

});
