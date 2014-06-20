/* globals commands, chai */
/* exported testCreateDefaultOptions */
/* jshint strict:false */

/* jshint ignore:start */
#import "<ROOT_DIR>/node_modules/chai/chai.js"
#import "<ROOT_DIR>/uiauto/vendors/mechanic.js"
#import "<ROOT_DIR>/uiauto/lib/mechanic-ext/basics-ext.js"
#import "<ROOT_DIR>/uiauto/lib/errors.js"
#import "<ROOT_DIR>/uiauto/lib/commands.js"
"<EXTRA_IMPORTS>"
/* jshint ignore:end */

chai.should();

var env = {};
env.commandProxyClientPath = "<COMMAND_PROXY_CLIENT_PATH>";
env.nodePath = "<NODE_BIN>";

// default tuneup.js options
var testCreateDefaultOptions = function () {
  return {
    logStackTrace: false,
    logTree: true,
    logTreeJSON: false,
    screenCapture: true,
    rethrow: true
  };
};

commands.startProcessing();
