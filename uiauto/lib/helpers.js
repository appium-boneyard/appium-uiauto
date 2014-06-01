/* globals isVerbose */
/* exported console */
/* jshint -W079 */

var console = {
  log: function (msg) {
    if (typeof isVerbose !== "undefined" && isVerbose) UIALogger.logMessage(msg);
  },
  warn: function (msg) {
    UIALogger.logWarning("Warn: " + msg);
  },
  start: function (msg) {
    UIALogger.logStart(msg);
  },
  error: function (msg) {
    UIALogger.logError("Error: " + msg);
  }
};
