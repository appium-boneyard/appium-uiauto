/* globals sysExec, dirExists, fileExists */

// automation globals
var system = UIATarget.localTarget().host();
var target = UIATarget.localTarget();
var mainWindow = target.frontMostApp().mainWindow();
var wd_frame = target.frontMostApp();


/* local env */
/* exported system, target, mainWindow, mainWindow, wd_frame */
var user = null,
    settings = {},
    isVerbose = false,
    nodePath;

(function () {
  console.start('Bootstrapping uiauto');
  var earlyLogs = []; // cannot properly log before isVerbose has been read from settings    

  // retrieving user
  (function () {
    var getUserFromCommand = function (cmd) {
      var _user;
      try {
        _user = sysExec(cmd);
      } catch (ign) {}
      if (_user && dirExists('/Users/' + _user)) {
        earlyLogs.push("Found user using cmd: " + cmd + ', user:' + _user);
        return _user;
      } else return null;
    };

    var cmds = [
      'whoami',
      'echo $HOME | cut -d / -f3',
      'ls -d ~ | cut -d / -f3'
    ];
    for (var i = 0; i < cmds.length; i++) {
      user = getUserFromCommand(cmds[i]);
      if (user) break;
    }
    console.start(user ? "Got user: " + user : "Could not get user");
  })();

  // retrieving settings + isVerbose
  (function () {
    var settingsFile = "/Users/" + user + "/.instruments.conf";
    if (fileExists(settingsFile)) {
      console.start('Using setting file: ' + settingsFile);
      var lines = sysExec("/bin/cat " + settingsFile).split('\n');
      for (var index = 0; index < lines.length; index++) {
        var line = lines[index];
        if (line[0] === '#') continue;
        if (line.indexOf('=') !== -1) {
          var parts = line.split('=');
          if (parts.length !== 2) {
            throw new Error("Error reading " + settingsFile);
          }
          settings[parts[0]] = parts[1];
        }
      }
      isVerbose = settings.verbose === 'true';
      console.start("isVerbose:" + isVerbose);
      // now it's time to print early logs
      for (var i = 0; i < earlyLogs.length; i++) {
        console.log(earlyLogs[i]);
      }
      if (settings.length > 0) {
        console.log("Read in settings: ");
        for (var key in settings) {
          if (settings.hasOwnProperty(key)) {
            console.log("  " + key + ": " + settings[key]);
          }
        }
      }
    } else {
      console.start('Not using settings file.');
      console.start("isVerbose:" + isVerbose);
      isVerbose = false;
    }
  })();

  // retrieving node path
  (function () {
    var getNodePathFromCommand = function (cmd) {
      var path;
      try {
        path = sysExec(cmd);
      } catch (ign) {}
      if (path && fileExists(path)) {
        console.log("Found node using cmd: " + cmd + ', path:' + path);
        return path;
      } else return null;
    };

    var getNodePathFromSettings = function () {
      var path;
      if ((typeof settings !== "undefined") && ('NODE_BIN' in settings)) {
        path = settings.NODE_BIN;
      }
      if (path && fileExists(path)) {
        console.log("Using settings override for NODE_BIN: " + settings.NODE_BIN);
        return path;
      } else return null;
    };

    var getNodePathFromAppiumApp = function () {
      var appScript = [
        'try',
        '  set appiumIsRunning to false',
        '  tell application "System Events"',
        '    set appiumIsRunning to name of every process contains "Appium"',
        '  end tell',
        '  if appiumIsRunning then',
        '    tell application "Appium" to return node path',
        '  end if',
        'end try',
        'return "NULL"'
      ].join("\n");
      var path = null;
      try {
        path = sysExec("osascript -e '" + appScript + "'");
      } catch (ign) {}
      if (path === "NULL") path = null;
      if (path && fileExists(path)) {
        console.log("Found node in Appium.app. path: " + path);
        return path;
      } else return null;
    };

    nodePath = getNodePathFromSettings();
    if (!nodePath) nodePath = getNodePathFromCommand('/usr/bin/env node -e "console.log(process.execPath);"');
    if (!nodePath) nodePath = getNodePathFromAppiumApp();
    if (!nodePath) {
      var cmds = [
        'echo $NODE_BIN',
        'which node',
        'ls /usr/local/bin/node',
        'ls /opt/local/bin/node'
      ];
      for (var i = 0; i < cmds.length; i++) {
        nodePath = getNodePathFromCommand(cmds[i]);
        if (nodePath) break;
      }
    }
    if (!nodePath) {
      throw new Error("Could not find node, Where is it?");
    }
    console.start("Using node at: " + nodePath);
  })();
})();
