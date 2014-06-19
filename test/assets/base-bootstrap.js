/* globals commands */
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

commands.startProcessing();
