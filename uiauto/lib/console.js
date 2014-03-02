/* jshint -W079 */

/* exported console */
var console = {
  log: function (msg) {
    if (typeof isVerbose !== "undefined" && isVerbose) UIALogger.logMessage(msg);
  }
};
