/* exported WAIT_FOR_DATA_TIMEOUT, system, target, mainWindow, mainWindow, wd_frame */
/* exported setenv, user, isVerbose, nodePath, instrumentsClientPath, WAIT_FOR_DATA_TIMEOUT */

// automation globals
var system = UIATarget.localTarget().host();
var target = UIATarget.localTarget();
var mainWindow = target.frontMostApp().mainWindow();
var wd_frame = target.frontMostApp();

// local environment
var user, isVerbose, nodePath, instrumentsClientPath,
    WAIT_FOR_DATA_TIMEOUT = 3600;

var setenv = function(dynamicEnv) {
  user = dynamicEnv.USER;
  isVerbose = dynamicEnv.VERBOSE_INSTRUMENTS;
  nodePath = dynamicEnv.NODE_BIN;
  instrumentsClientPath = dynamicEnv.INSTRUMENTS_CLIENT_PATH;
};
