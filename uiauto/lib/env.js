var env;

(function () {

  env = {};
  env.init = function (dynamicEnv) {
    this.nodePath = dynamicEnv.nodePath;
    this.commandProxyClientPath = dynamicEnv.commandProxyClientPath;
  };

})();
