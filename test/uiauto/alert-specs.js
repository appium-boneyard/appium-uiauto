/* globals $, rootPage, alerts */
'use strict';

var base = require('./base');

describe('alarm', function () {
  var imports = { post: [
    'uiauto/lib/alerts.js',
    'uiauto/lib/status.js',
    'uiauto/lib/element-patch/nil-patch.js',
    'uiauto/lib/element-patch/helper-patch.js',
    'uiauto/lib/mechanic-ext/basics-ext.js',
    'uiauto/lib/mechanic-ext/util-ext.js',
    'uiauto/lib/mechanic-ext/lookup-ext.js',
    'uiauto/lib/mechanic-ext/alert-ext.js'
  ]};
  base.globalInit(this, { imports: imports, bootstrap: 'basic'});

  describe("textfields", function () {
    var ctx;
    base.instrumentsInstanceInit()
      .then(function (_ctx) { ctx = _ctx; }).done();

    before(function () {
      return ctx.execFunc(
        function () {
          alerts.configure();
        }
      );
    });

    afterEach(function () {
      return ctx.execFunc(
        function () {
          $('#UICatalog').first().tap();
          $.delay(1000);
        }
      );
    });

    it('should retrieve alert text and then accept alert', function () {
      return ctx.execFunc(
        function () {
          rootPage.clickMenuItem('Alert Views');
          $.delay(2000);
          $('#Okay / Cancel').first().tap();
          $.delay(2000);
          var alertText = $.getAlertText();
          $.acceptAlert();
          return alertText;
        }
      ).then(function (res) {
        console.warn('res -->', res);
        res.should.include('A Short Title Is Best');
      });
    });
  });
});
