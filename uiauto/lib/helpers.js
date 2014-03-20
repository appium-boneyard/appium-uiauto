/* globals isVerbose, system, user */
/* exported console, fileExists, dirExists, sysExec */
/* jshint -W079 */

var console = {
  log: function (msg) {
    if (typeof isVerbose !== "undefined" && isVerbose) UIALogger.logMessage(msg);
  },
  error: function (msg) {
    UIALogger.logMessage("Error: " + msg);
  }
};

var fileExists = function (filename) {
  var params = [];
  params = params.concat(['-f', filename]);
  var res = system.performTaskWithPathArgumentsTimeout("/bin/test", params, 3);
  if (res.exitCode === 0) {
    return true;
  } else {
    return false;
  }
};

var dirExists = function (filename) {
  var params = [];
  params = params.concat(['-d', filename]);
  var res = system.performTaskWithPathArgumentsTimeout("/bin/test", params, 3);
  if (res.exitCode === 0) {
    return true;
  } else {
    return false;
  }
};

var sysExec = function (cmd) {
  var params = [];
  if (user !== null) {
    if (fileExists('/Users/' + user + '/.profile')) {
      params = params.concat(['--rcfile', '/Users/' + user + '/.profile']);
    } else {
      if (fileExists('/Users/' + user + '/.bash_profile')) {
        params = params.concat(['--rcfile', '/Users/' + user + '/.bash_profile']);
      } else {
        if (fileExists('/Users/' + user + '/.bashrc')) {
          params = params.concat(['--rcfile', '/Users/' + user + '/.bashrc']);
        }
      }
    }
  }
  params = params.concat(['-c', cmd]);
  var res = system.performTaskWithPathArgumentsTimeout("/bin/bash",
      params, 3);
  if (res.exitCode !== 0) {
    throw new Error("Failed executing the command " + cmd + " (exit code " + res.exitCode + ")");
  } else {
    var output = res.stdout.trim();
    if (output.length) {
      return output;
    } else {
      throw new Error("Executing " + cmd + " failed since there was no output");
    }
  }
};

