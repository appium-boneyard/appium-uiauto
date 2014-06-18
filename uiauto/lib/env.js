/* globals $ */

var env;

// TODO: we should not need those
var target, au;

(function () {

  env = {};
  env.init = function (dynamicEnv) {
    // safe default
    $.target().setTimeout(1);
    target = $.target();
    au = $;

    // TODO: move to dynamic env
    this.autoAcceptAlerts = false;

    this.user = dynamicEnv.USER;
    this.isVerbose = dynamicEnv.VERBOSE_INSTRUMENTS;
    this.nodePath = dynamicEnv.NODE_BIN;
    this.commandProxyClientPath = dynamicEnv.COMMAND_PROXY_CLIENT_PATH;
  };

})();


