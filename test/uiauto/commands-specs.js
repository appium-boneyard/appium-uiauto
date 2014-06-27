/* globals $ */
'use strict';

var base = require('./base'),
    _ = require('underscore'),
    Q = require('q');

describe('commands', function () {
  base.globalInit(this, {bootstrap: 'basic'});

  describe("simple sequences", function () {
    var ctx;
    base.instrumentsInstanceInit().then(function (_ctx) { ctx = _ctx; });

    it('should send one valid command returning a value', function () {
      return ctx.sendCommand("'123'")
        .should.become('123');
    });

    it('should send one valid command returning empty value', function () {
      return ctx.sendCommand("$.warn('starting')")
        .should.become('');
    });

    it('should respond to invalid command and not die', function () {
      return ctx.sendCommand("i_am_invalid()")
        .should.be.rejectedWith(/"status":17/)
        .then(function () {
          return ctx.sendCommand("$.warn('still alive')");
        });
    });

    it('should repond to 10 commands in a row', function () {
      var seq = [];
      _(10).times(function (i) {
        seq.push(function () {
          return ctx.sendCommand('(function () { return ' + i + '})()')
            .should.become(i);
        });
      });
      return seq.reduce(Q.when, new Q());
    });

  });

  describe("sending 100 valid commands", function () {
    var ctx;
    base.instrumentsInstanceInit().then(function (_ctx) { ctx = _ctx; });

   it('should work', function () {
      var seq = [];
      _(100).times(function (i) {
        seq.push(function () {
          return ctx.sendCommand('(function () { return "' + i + '"})()')
            .should.become("" + i)
            .then(function () {
              if ((i+1)%10 === 0) console.log('sent:', (i+1));
            });
        });
      });
      return seq.reduce(Q.when, new Q());
    });

  });

  describe("sending 100 alternating valid and invalid", function () {
    var ctx;
    base.instrumentsInstanceInit().then(function (_ctx) { ctx = _ctx; });

   it('should work', function () {
      var seq = [];
      _(100).times(function (i) {
        if (i%2 === 0)
          seq.push(function () {
            return ctx.sendCommand('(function () { return "' + i + '"})()')
              .should.become("" + i)
              .then(function () {
                if ((i+1)%10 === 0) console.log('sent:', (i+1));
              });
          });
        else
          seq.push(function () {
            return ctx.sendCommand('(ffffunction () { return "' + i + '"})()')
              .should.be.rejectedWith(/"status":17/)
              .then(function () {
                if ((i+1)%10 === 0) console.log('sent:', (i+1));
              });
          });
      });
      return seq.reduce(Q.when, new Q());
    });

  });

  describe("command with big result", function () {
    var ctx;
    base.instrumentsInstanceInit().then(function (_ctx) { ctx = _ctx; });

    // UIAuto code
    var configureUIAuto = function () {
      $.extend($, {
        oneMamaLongString: function (n, mapping) {
          var i;
          if (!mapping) {
            mapping = [];
            for (i=0; i<n; i++){
              mapping.push(i);
            }
          }
          var main = "";
          for (i = 0; i < n; i++) {
            main += mapping[i % 10];
          }
          return main;
        },

        oneMamaHugeTree: function (n, d) {
          //var root = {name: 'root'};
          function addChildren(root, depth) {
            if (depth === d) return;
            root.children = {};
            var i;
            for (i=0; i<n; i++){
              root.children['c' + i] = { name: 'child ' + i };
              addChildren(root.children['c' + i], depth +1);
            }
          }
          var root = {name: 'root'};
          addChildren(root, 0);
          return root;
        },

      });
    };

    before(function () {
      return ctx.execFunc(configureUIAuto);
    });

    var testN = function (n) {
      return ctx.sendCommand('$.oneMamaLongString(' + n + ')')
        .then(function (s) {
          s.should.have.length(n);
          _(n).times(function (i) {
            parseInt(s[i] , 10).should.equal(i%10);
          });
        });
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

    var testNWithSpaces = function (n) {
      return ctx.sendCommand("$.oneMamaLongString(" + n + ",[0,1,2,3,4,' ',6,7,8,9])")
        .then(function (s) {
          s.should.have.length(n);
          _(n).times(function (i) {
            if (i%10 === 5){
              s[i].should.equal(' ');
            } else {
              parseInt(s[i] , 10).should.equal(i%10);
            }
          });
        });
    };

    it('should work with a big string with spaces', function () {
      return testNWithSpaces(200000);
    });

    var getHugeTree = function (n,d) {
      return ctx.sendCommand('$.oneMamaHugeTree(' + n + ', ' + d + ')');
    };

    it('should work with a medium tree', function () {
      return getHugeTree(5,3);
    });

    it('should work with a huge tree', function () {
      return getHugeTree(5,7).then(function (res) {
        res.name.should.equal('root');
        res.children.c1.children.c2.children
          .c3.children.c2.name.should.equal('child 2');
        JSON.stringify(res).length.should.be.above(2000000);
      });
    });
  });

});
