/* globals $, env */
'use strict';

var base = require('./base'),
    _ = require('underscore');

describe('sendKey', function () {
  var imports = { post: [
     'uiauto/lib/mechanic-ext/keyboard-ext.js',
    'uiauto/lib/element-patch/helper-patch.js'
  ]};
  base.globalInit(this, { imports: imports, bootstrap: 'basic'});

  /* globals rootPage: true */
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

  _([undefined,'oneByOne', 'grouped', 'setValue']).each(function (sendKeyStrategy) {
    it('should work with strategy: ' + sendKeyStrategy, function () {
      return ctx.execFunc(
        function (sendKeyStrategy) {
          env.sendKeyStrategy = sendKeyStrategy;
          $.delay(1000);
          rootPage.clickMenuItem('Text Fields');
          $.delay(1000);
          var textfield = $('textfield').first()[0];
          textfield.setValue('');
          $.delay(3000);
          $('textfield').first()[0].setValueByType('Hello World');
          $.delay(3000);
        }, [sendKeyStrategy]
      );
    });
  });

});
