'use strict';


var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    Q = require('q'),
    CommandProxy = require('../../lib/command-proxy'),
    instrumentsUtils = require('appium-instruments').utils,
    getEnv = require('../../lib/dynamic-bootstrap').getEnv,
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs'),
    logger = require('../../lib/logger');

chai.use(chaiAsPromised);
chai.should();

process.env.APPIUM_BOOTSTRAP_DIR = '/tmp/appium-uiauto/test/functional/bootstrap';

if (process.env.VERBOSE) logger.setConsoleLevel('debug');

var prepareBootstrap = function (opts) {
  opts = opts || {};
  var rootDir = path.resolve(__dirname, '../..');
  if (opts.bootstrap === 'basic') {
    var env = getEnv();
    var postImports = [];
    if (opts.imports && opts.imports.post) {
      postImports = opts.imports.post;
    }
    postImports = _(postImports).map(function (item) {
      return '#import "' + path.resolve( rootDir , item) + '"';
    });
    var code = fs.readFileSync(path.resolve(
      __dirname, '../../test/assets/base-bootstrap.js'), 'utf8');
    _({
      '<ROOT_DIR>': rootDir,
      '"<POST_IMPORTS>"': postImports.join('\n'),
      '<commandProxyClientPath>': env.commandProxyClientPath,
      '<nodePath>': env.nodePath,
      '<instrumentsSock>': env.instrumentsSock
    }).each(function (value, key) {
      code = code.replace(new RegExp(key, 'g'), value);
    });
    return require('../../lib/dynamic-bootstrap').prepareBootstrap({
      code: code,
      isVerbose: true
    });
  } else {
    opts = _.clone(opts);
    if (opts.chai) {
      opts.imports = {};
      opts.imports.pre =
        [path.resolve(rootDir, 'node_modules/chai/chai.js')];
    }
    delete opts.chai;
    return require('../../lib/dynamic-bootstrap')
      .prepareBootstrap(opts);
  }
};

var newInstruments = function (bootstrapFile) {
  return instrumentsUtils.quickInstrument({
    app: path.resolve(__dirname, '../assets/UICatalog.app'),
    bootstrap: bootstrapFile,
    logger: logger.instance()
  });
};

var init = function (bootstrapFile, opts) {
  var deferred = Q.defer();
  var proxy = new CommandProxy(opts);
  proxy.start(
    // first connection
    function () {
      // TODO
    },
    // regular cb
    function (err) {
      if (err) return deferred.reject(err);
      newInstruments(bootstrapFile).then(function (_instruments) {
        var instruments = _instruments;
        instruments.start(null, function () {
          proxy.safeShutdown(function () {});
        });
        setTimeout(function () {
          instruments.launchHandler();
          deferred.resolve({proxy: proxy, instruments: instruments});
        }, 2000);
      })
      .catch(function (err) { deferred.reject(err); })
      .done();
    }
  );
  return deferred.promise;
};

var killAll = function (ctx) {
  return Q.nfcall(ctx.instruments.shutdown.bind(ctx.instruments))
    .then(function () {
      return instrumentsUtils.killAllInstruments();
    }).catch(function () {})
    .then(function () {
      return ctx.proxy.safeShutdown(function () {});
    });
};

var bootstrapFile;

exports.globalInit = function (ctx, opts) {
  ctx.timeout(180000);

  before(function () {
    return prepareBootstrap(opts).then(function (_bootstrapFile) {
      bootstrapFile = _bootstrapFile;
    });
  });
};

exports.instrumentsInstanceInit = function (opts) {
  var deferred = Q.defer();

  var ctx;
  before(function () {
    return init(bootstrapFile, opts)
      .then(function (_ctx) {
        ctx = _ctx;
        ctx.sendCommand = function (cmd) {
          var deferred = Q.defer();
          ctx.proxy.sendCommand(cmd, function (result) {
            if (result.status === 0) {
              deferred.resolve(result.value);
            } else {
              deferred.reject(JSON.stringify(result));
            }
          });
          return deferred.promise;
        };

        ctx.exec = ctx.sendCommand;

        ctx.execFunc = function (func, params) {
          params = params || [];
          var script =
            '(function (){' +
            '  var params = JSON.parse(\'' + JSON.stringify(params) + '\');\n' +
            '  return (' + func.toString() + ').apply(null, params);' +
            '})();';
          return ctx.exec(script);
        };
      }).then(function () {
        var cmd = '';
        cmd += '$.isVerbose = ' + (process.env.VERBOSE ? true : false) + ';\n';
        return ctx.exec(cmd);
      })
      .then(function () {
        // some uiauto helpers
        return ctx.execFunc(function () {
          /* global rootPage:true */
          rootPage = {};
          // click item in root page menu
          rootPage.clickMenuItem = function (partialText) {
            $.each($('tableview').children(), function (idx, child) {
              if (child.name().indexOf(partialText) >= 0 ){
                $(child).tap();
                return false;
              }
            });
          };
        });
      }).then(function () {
        return ctx.execFunc(function () {
          /* global $ */
          $.delay(500);
          while (!$('tableview').isVisible()) {
            $.warn('waiting for page to load');
            $.delay(500);
          }
        }).then(
          function () {
            deferred.resolve(ctx);
          },
          function (err) {
            deferred.reject(err);
          }
        );
      });
  });

  after(function () {
    return killAll(ctx);
  });

  return deferred.promise;
};
