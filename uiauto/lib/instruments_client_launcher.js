/* globals system, nodePath, fileExists */

var sendResultAndGetNext,
    getFirstCommand,
    curAppiumCmdId = -1;

(function () {
  var waitForDataTimeout = 3600;
  // figure out where instruments client is (relative to where appium is run)
  var getClientPath = function () {
    var possiblePaths = [
      './node_modules/.bin/instruments-client.js',
      './node_modules/appium/node_modules/.bin/instruments-client.js'
    ];
    for (var i = 0; i < possiblePaths.length; i++) {
      if (fileExists(possiblePaths[i])) {
        return possiblePaths[i];
      }
    }
  };
  var clientPath = getClientPath();
  console.log('Using instrument client with path: ' + clientPath);

  sendResultAndGetNext = function (result) {
    curAppiumCmdId++;
    var args = [clientPath, '-s', '/tmp/instruments_sock'], res;

    if (typeof result !== "undefined") {
      args = args.concat(['-r', JSON.stringify(result)]);
    }
    var cmd = nodePath + " " + args.join(" ");
    var cmdLog = cmd.slice(0, 300);
    try {
      console.log("Running command #" + curAppiumCmdId + ": " + cmdLog);
      res = system.performTaskWithPathArgumentsTimeout(nodePath, args, waitForDataTimeout);
    } catch (e) {
      console.log(e.name + " error getting command " + curAppiumCmdId + ": " + e.message);
      return null;
    }
    if (!res) {
      console.log("Instruments client (" + cmd + ") exited with null res");
      return null;
    }
    if (res.exitCode !== 0) {
      console.log("Instruments client (" + cmd + ") exited with " + res.exitCode +
                  ", here's stderr:");
      console.log(res.stderr);
      console.log("And stdout:");
      console.log(res.stdout);
      return null;
    }
    return res.stdout;
  };

  getFirstCommand = function () {
    return sendResultAndGetNext();
  };
})();
