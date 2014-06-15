/* globals $, errors, env */

var commands;

(function () {
  var BOOTSTRAP_CONFIG_PREFIX = "setBootstrapConfig: ";

  commands = {};

  var WAIT_FOR_DATA_TIMEOUT = 3600;
  var curAppiumCmdId = -1;
  var sendResultAndGetNext = function (result) {
    curAppiumCmdId++;
    var args = [env.instrumentsClientPath, '-s', '/tmp/instruments_sock'], res;

    if (typeof result !== "undefined") {
      args = args.concat(['-r', JSON.stringify(result)]);
    }
    var cmd = env.nodePath + " " + args.join(" ");
    var cmdLog = cmd.slice(0, 300);
    try {
      $.log("Running command #" + curAppiumCmdId + ": " + cmdLog);
      res = $.system().performTaskWithPathArgumentsTimeout(env.nodePath, args, WAIT_FOR_DATA_TIMEOUT);
    } catch (e) {
      $.log(e.name + " error getting command " + curAppiumCmdId + ": " + e.message);
      return null;
    }
    if (!res) {
      $.log("Instruments client (" + cmd + ") exited with null res");
      return null;
    }
    if (res.exitCode !== 0) {
      $.log("Instruments client (" + cmd + ") exited with " + res.exitCode +
                  ", here's stderr:");
      $.log(res.stderr);
      $.log("And stdout:");
      $.log(res.stdout);
      return null;
    }
    return res.stdout;
  };

  var getFirstCommand = function () {
    return sendResultAndGetNext();
  };

  commands.startProcessing = function() {
    // let server know we're alive and get first command
    var cmd = getFirstCommand();

    while (true) {
      if (cmd) {
        var result;
        $.log("Got new command " + curAppiumCmdId + " from instruments: " + cmd);
        try {

          if (cmd.indexOf(BOOTSTRAP_CONFIG_PREFIX) === 0) {
            var configStr = cmd.slice(BOOTSTRAP_CONFIG_PREFIX.length);
            $.log("Got bootstrap config: " + configStr);
            eval(configStr);
          } else {
            /* jshint evil:true */
            try {
              result = eval(cmd);
            } catch (possStaleEl) {
              if (possStaleEl.message === errors.StaleElementReference.code) {
                result = {
                  status: errors.StaleElementReference.code,
                  value: errors.StaleElementReference.summary
                };
              } else {
                throw possStaleEl;
              }
            }
          }
        } catch (e) {
          result = {
            status: errors.JavaScriptError.code
          , value: e.message
          };
        }
        if (typeof result === "undefined" || result === null) {
          result = '';
          $.log("Command executed without response");
        }
        if (typeof result.status === "undefined" || typeof result.status === "object") {
          $.log("Result is not protocol compliant, wrapping");
          result = {
            status: errors.Success.code,
            value: result
          };
        }
        cmd = sendResultAndGetNext(result);
      } else {
        throw new Error("Error getting next command, shutting down :-(");
      }
    }
  };
})();


