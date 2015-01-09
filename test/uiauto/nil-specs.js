/* globals $ */
'use strict';

var base = require('./base');

describe('nil', function () {
  var imports = { post: [
    'uiauto/lib/element-patch/nil-patch.js',
    'uiauto/lib/mechanic-ext/basics-ext.js'
  ]};
  base.globalInit(this, { imports: imports, bootstrap: 'basic'});

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

  it('isNil should return true for not nil elements', function () {
    return ctx.execFunc(
      function () {
        return $('cell')[0].isNil();
      }
    ).then(function (res) {
      console.warn('res -->', res);
      res.should.not.be.ok;
    });
  });

  it('isNil should return true for nil elements', function () {
    return ctx.execFunc(
      function () {
        return $('cell')[0].images().isNil();
      }
    ).then(function (res) {
      console.warn('res -->', res);
      res.should.be.ok;
    });
  });

  it('isNil should return true for manually created UIAElementNil', function () {
    return ctx.execFunc(
      function () {
        return $.nil.isNil();
      }
    ).then(function (res) {
      console.warn('res -->', res);
      res.should.be.ok;
    });
  });


});
