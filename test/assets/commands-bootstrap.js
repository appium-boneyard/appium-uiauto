/* globals $, commands */
/* jshint strict:false */

/* jshint ignore:start */
#import "<ROOT_DIR>/uiauto/vendors/mechanic.js"
#import "<ROOT_DIR>/uiauto/lib/mechanic-ext/basics-ext.js"
#import "<ROOT_DIR>/uiauto/lib/errors.js"
#import "<ROOT_DIR>/uiauto/lib/commands.js"
/* jshint ignore:end */

var env = {};
env.commandProxyClientPath = "<COMMAND_PROXY_CLIENT_PATH>";
env.nodePath = "<NODE_BIN>";

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

$.log = $.warn;
$.debug = $.warn;

commands.startProcessing();
