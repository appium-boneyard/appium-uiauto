/* globals system, nodePath , instrumentsClientPath, 
           WAIT_FOR_DATA_TIMEOUT 
*/

var sendResultAndGetNext,
    getFirstCommand,
    curAppiumCmdId = -1;

(function () {
  sendResultAndGetNext = function (result) {
    curAppiumCmdId++;
    var args = [instrumentsClientPath, '-s', '/tmp/instruments_sock'], res;

    if (typeof result !== "undefined") {
      args = args.concat(['-r', JSON.stringify(result)]);
    }
    var cmd = nodePath + " " + args.join(" ");
    var cmdLog = cmd.slice(0, 300);
    try {
      console.log("Running command #" + curAppiumCmdId + ": " + cmdLog);
      res = system.performTaskWithPathArgumentsTimeout(nodePath, args, WAIT_FOR_DATA_TIMEOUT);
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
