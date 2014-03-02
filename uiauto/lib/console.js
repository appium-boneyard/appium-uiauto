/* jshint -W079 */

/* exported console */
var console = {
  log: function (msg) {
    UIALogger.logMessage(msg);
    if (typeof isVerbose !== "undefined" && isVerbose) UIALogger.logMessage(msg);
  }
};
