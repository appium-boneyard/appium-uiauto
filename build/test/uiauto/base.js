// 'use strict';

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _2 = require('../..');

var _appiumInstruments = require('appium-instruments');

var _appiumInstruments2 = _interopRequireDefault(_appiumInstruments);

var _libDynamicBootstrap = require('../../lib/dynamic-bootstrap');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _libLogger = require('../../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var fs = {
  readFile: _bluebird2['default'].promisify(_fs3['default'].readFile)
};

_chai2['default'].use(_chaiAsPromised2['default']);
_chai2['default'].should();

process.env.APPIUM_BOOTSTRAP_DIR = '/tmp/appium-uiauto/test/functional/bootstrap';

if (process.env.VERBOSE) _libLogger2['default'].setConsoleLevel('debug');

function localPrepareBootstrap(opts) {
  var rootDir, env, postImports, code, vars, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value;

  return _regeneratorRuntime.async(function localPrepareBootstrap$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        opts = opts || {};
        rootDir = _path2['default'].resolve(__dirname, '../../..');

        if (!(opts.bootstrap === 'basic')) {
          context$1$0.next = 33;
          break;
        }

        env = (0, _libDynamicBootstrap.getEnv)();
        postImports = [];

        if (opts.imports && opts.imports.post) {
          postImports = opts.imports.post;
        }
        postImports = postImports.map(function (item) {
          return '#import "' + _path2['default'].resolve(rootDir, item) + '"';
        });
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(fs.readFile(_path2['default'].resolve(__dirname, '../../../test/assets/base-bootstrap.js'), 'utf8'));

      case 9:
        code = context$1$0.sent;
        vars = {
          '<ROOT_DIR>': rootDir,
          '"<POST_IMPORTS>"': postImports.join('\n'),
          '<commandProxyClientPath>': env.commandProxyClientPath,
          '<nodePath>': env.nodePath,
          '<instrumentsSock>': env.instrumentsSock
        };
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 14;

        for (_iterator = _getIterator(_lodash2['default'].pairs(vars)); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _step$value = _slicedToArray(_step.value, 2);
          key = _step$value[0];
          value = _step$value[1];

          code = code.replace(new RegExp(key, 'g'), value);
        }
        context$1$0.next = 22;
        break;

      case 18:
        context$1$0.prev = 18;
        context$1$0.t0 = context$1$0['catch'](14);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 22:
        context$1$0.prev = 22;
        context$1$0.prev = 23;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 25:
        context$1$0.prev = 25;

        if (!_didIteratorError) {
          context$1$0.next = 28;
          break;
        }

        throw _iteratorError;

      case 28:
        return context$1$0.finish(25);

      case 29:
        return context$1$0.finish(22);

      case 30:
        return context$1$0.abrupt('return', (0, _2.prepareBootstrap)({
          code: code,
          isVerbose: true
        }));

      case 33:
        opts = _lodash2['default'].clone(opts);
        if (opts.chai) {
          opts.imports = {};
          opts.imports.pre = [_path2['default'].resolve(rootDir, 'node_modules/chai/chai.js')];
        }
        delete opts.chai;
        return context$1$0.abrupt('return', (0, _2.prepareBootstrap)(opts));

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[14, 18, 22, 30], [23,, 25, 29]]);
}

function newInstruments(bootstrapFile) {
  return _regeneratorRuntime.async(function newInstruments$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', _appiumInstruments2['default'].utils.quickInstrument({
          app: _path2['default'].resolve(__dirname, '../../../test/assets/UICatalog.app'),
          bootstrap: bootstrapFile,
          simulatorSdkAndDevice: 'iPhone 6 (8.1 Simulator)',
          launchTries: 2
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function init(bootstrapFile, sock) {
  var proxy, instruments;
  return _regeneratorRuntime.async(function init$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        proxy = new _2.UIAutoClient(sock);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(newInstruments(bootstrapFile));

      case 3:
        instruments = context$1$0.sent;

        instruments.start(null, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(proxy.safeShutdown());

              case 2:
                throw new Error('Unexpected shutdown of instruments');

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(proxy.start());

      case 8:
        instruments.launchHandler();
        context$1$0.next = 15;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](5);

        // need to make sure instruments handles business
        instruments.launchHandler(context$1$0.t0);
        throw context$1$0.t0;

      case 15:
        return context$1$0.abrupt('return', { proxy: proxy, instruments: instruments });

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 11]]);
}

function killAll(ctx) {
  var asyncShutdown;
  return _regeneratorRuntime.async(function killAll$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        asyncShutdown = _bluebird2['default'].promisify(ctx.instruments.shutdown, ctx.instruments);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(asyncShutdown());

      case 4:
        context$1$0.next = 9;
        break;

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](1);

        // pass
        console.log(context$1$0.t0);

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(_appiumInstruments2['default'].utils.killAllInstruments());

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(ctx.proxy.safeShutdown());

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 6]]);
}

var bootstrapFile;

function globalInit(ctx, opts) {
  return _regeneratorRuntime.async(function globalInit$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        ctx.timeout(20000);

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(localPrepareBootstrap(opts));

      case 3:
        bootstrapFile = context$1$0.sent;

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function instrumentsInstanceInit() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var ctx, cmd;
  return _regeneratorRuntime.async(function instrumentsInstanceInit$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(init(bootstrapFile, opts.sock));

      case 2:
        ctx = context$1$0.sent;

        ctx.sendCommand = function callee$1$0(cmd) {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                return context$2$0.abrupt('return', ctx.proxy.sendCommand(cmd));

              case 1:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        };
        ctx.exec = ctx.sendCommand;

        ctx.execFunc = function callee$1$0(func, params) {
          var script;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                params = params || [];
                script = '(function (){' + '  var params = JSON.parse(\'' + JSON.stringify(params) + '\');\n' + '  return (' + func.toString() + ').apply(null, params);' + '})();';
                return context$2$0.abrupt('return', ctx.exec(script));

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        };

        cmd = '$.isVerbose = ' + (process.env.VERBOSE ? true : false) + ';\n';
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(ctx.exec(cmd));

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
          /* global rootPage:true */
          rootPage = {};
          // click item in root page menu
          rootPage.clickMenuItem = function (partialText) {
            $.each($('tableview').children(), function (idx, child) {
              if (child.name().indexOf(partialText) >= 0) {
                $(child).tap();
                return false;
              }
            });
          };
        }));

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(ctx.execFunc(function () {
          /* global $ */
          $.delay(500);
          while (!$('tableview').isVisible()) {
            $.warn('waiting for page to load');
            $.delay(500);
          }
        }));

      case 13:
        return context$1$0.abrupt('return', ctx);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.instrumentsInstanceInit = instrumentsInstanceInit;
exports.globalInit = globalInit;
exports.killAll = killAll;

// some uiauto helpers
//# sourceMappingURL=data:application/json;base64,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QUFLLENBQUEsQUFBQyxHQUFHLEtBQUs7O3lDQUNuRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozt5Q0FHYixHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVk7O0FBRTdCLGtCQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVkLGtCQUFRLENBQUMsYUFBYSxHQUFHLFVBQVUsV0FBVyxFQUFFO0FBQzlDLGFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUN0RCxrQkFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMxQyxpQkFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2YsdUJBQU8sS0FBSyxDQUFDO2VBQ2Q7YUFDRixDQUFDLENBQUM7V0FDSixDQUFDO1NBQ0gsQ0FBQzs7Ozt5Q0FFSSxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVk7O0FBRTdCLFdBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDYixpQkFBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtBQUNsQyxhQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDbkMsYUFBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztXQUNkO1NBQ0YsQ0FBQzs7OzRDQUVLLEdBQUc7Ozs7Ozs7Q0FDWDs7UUFFUSx1QkFBdUIsR0FBdkIsdUJBQXVCO1FBQUUsVUFBVSxHQUFWLFVBQVU7UUFBRSxPQUFPLEdBQVAsT0FBTyIsImZpbGUiOiJ0ZXN0L3VpYXV0by9iYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gJ3VzZSBzdHJpY3QnO1xuXG5cbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgVUlBdXRvQ2xpZW50LCBwcmVwYXJlQm9vdHN0cmFwIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IEluc3RydW1lbnRzIGZyb20gJ2FwcGl1bS1pbnN0cnVtZW50cyc7XG5pbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuLi8uLi9saWIvZHluYW1pYy1ib290c3RyYXAnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF9mcyBmcm9tICdmcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uLy4uL2xpYi9sb2dnZXInO1xuXG5sZXQgZnMgPSB7XG4gIHJlYWRGaWxlOiBQcm9taXNlLnByb21pc2lmeShfZnMucmVhZEZpbGUpXG59O1xuXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5jaGFpLnNob3VsZCgpO1xuXG5cbnByb2Nlc3MuZW52LkFQUElVTV9CT09UU1RSQVBfRElSID0gJy90bXAvYXBwaXVtLXVpYXV0by90ZXN0L2Z1bmN0aW9uYWwvYm9vdHN0cmFwJztcblxuaWYgKHByb2Nlc3MuZW52LlZFUkJPU0UpIGxvZ2dlci5zZXRDb25zb2xlTGV2ZWwoJ2RlYnVnJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGxvY2FsUHJlcGFyZUJvb3RzdHJhcCAob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgbGV0IHJvb3REaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4nKTtcbiAgaWYgKG9wdHMuYm9vdHN0cmFwID09PSAnYmFzaWMnKSB7XG4gICAgbGV0IGVudiA9IGdldEVudigpO1xuICAgIGxldCBwb3N0SW1wb3J0cyA9IFtdO1xuICAgIGlmIChvcHRzLmltcG9ydHMgJiYgb3B0cy5pbXBvcnRzLnBvc3QpIHtcbiAgICAgIHBvc3RJbXBvcnRzID0gb3B0cy5pbXBvcnRzLnBvc3Q7XG4gICAgfVxuICAgIHBvc3RJbXBvcnRzID0gcG9zdEltcG9ydHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gJyNpbXBvcnQgXCInICsgcGF0aC5yZXNvbHZlKCByb290RGlyICwgaXRlbSkgKyAnXCInO1xuICAgIH0pO1xuICAgIGxldCBjb2RlID0gYXdhaXQgZnMucmVhZEZpbGUocGF0aC5yZXNvbHZlKFxuICAgICAgX19kaXJuYW1lLCAnLi4vLi4vLi4vdGVzdC9hc3NldHMvYmFzZS1ib290c3RyYXAuanMnKSwgJ3V0ZjgnKTtcbiAgICBsZXQgdmFycyA9IHtcbiAgICAgICc8Uk9PVF9ESVI+Jzogcm9vdERpcixcbiAgICAgICdcIjxQT1NUX0lNUE9SVFM+XCInOiBwb3N0SW1wb3J0cy5qb2luKCdcXG4nKSxcbiAgICAgICc8Y29tbWFuZFByb3h5Q2xpZW50UGF0aD4nOiBlbnYuY29tbWFuZFByb3h5Q2xpZW50UGF0aCxcbiAgICAgICc8bm9kZVBhdGg+JzogZW52Lm5vZGVQYXRoLFxuICAgICAgJzxpbnN0cnVtZW50c1NvY2s+JzogZW52Lmluc3RydW1lbnRzU29ja1xuICAgIH07XG4gICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIF8ucGFpcnModmFycykpIHtcbiAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UobmV3IFJlZ0V4cChrZXksICdnJyksIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHByZXBhcmVCb290c3RyYXAoe1xuICAgICAgY29kZTogY29kZSxcbiAgICAgIGlzVmVyYm9zZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9wdHMgPSBfLmNsb25lKG9wdHMpO1xuICAgIGlmIChvcHRzLmNoYWkpIHtcbiAgICAgIG9wdHMuaW1wb3J0cyA9IHt9O1xuICAgICAgb3B0cy5pbXBvcnRzLnByZSA9XG4gICAgICAgIFtwYXRoLnJlc29sdmUocm9vdERpciwgJ25vZGVfbW9kdWxlcy9jaGFpL2NoYWkuanMnKV07XG4gICAgfVxuICAgIGRlbGV0ZSBvcHRzLmNoYWk7XG4gICAgcmV0dXJuIHByZXBhcmVCb290c3RyYXAob3B0cyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbmV3SW5zdHJ1bWVudHMgKGJvb3RzdHJhcEZpbGUpIHtcbiAgcmV0dXJuIEluc3RydW1lbnRzLnV0aWxzLnF1aWNrSW5zdHJ1bWVudCh7XG4gICAgYXBwOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vdGVzdC9hc3NldHMvVUlDYXRhbG9nLmFwcCcpLFxuICAgIGJvb3RzdHJhcDogYm9vdHN0cmFwRmlsZSxcbiAgICBzaW11bGF0b3JTZGtBbmREZXZpY2U6ICdpUGhvbmUgNiAoOC4xIFNpbXVsYXRvciknLFxuICAgIGxhdW5jaFRyaWVzOiAyXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0IChib290c3RyYXBGaWxlLCBzb2NrKSB7XG4gIGxldCBwcm94eSA9IG5ldyBVSUF1dG9DbGllbnQoc29jayk7XG4gIGxldCBpbnN0cnVtZW50cyA9IGF3YWl0IG5ld0luc3RydW1lbnRzKGJvb3RzdHJhcEZpbGUpO1xuICBpbnN0cnVtZW50cy5zdGFydChudWxsLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgcHJveHkuc2FmZVNodXRkb3duKCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHNodXRkb3duIG9mIGluc3RydW1lbnRzJyk7XG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgcHJveHkuc3RhcnQoKTtcbiAgICBpbnN0cnVtZW50cy5sYXVuY2hIYW5kbGVyKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIG5lZWQgdG8gbWFrZSBzdXJlIGluc3RydW1lbnRzIGhhbmRsZXMgYnVzaW5lc3NcbiAgICBpbnN0cnVtZW50cy5sYXVuY2hIYW5kbGVyKGVycik7XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHJldHVybiB7cHJveHksIGluc3RydW1lbnRzfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24ga2lsbEFsbCAoY3R4KSB7XG4gIGxldCBhc3luY1NodXRkb3duID0gUHJvbWlzZS5wcm9taXNpZnkoY3R4Lmluc3RydW1lbnRzLnNodXRkb3duLCBjdHguaW5zdHJ1bWVudHMpO1xuICB0cnkge1xuICAgIGF3YWl0IGFzeW5jU2h1dGRvd24oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIHBhc3NcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxuICBhd2FpdCBJbnN0cnVtZW50cy51dGlscy5raWxsQWxsSW5zdHJ1bWVudHMoKTtcbiAgYXdhaXQgY3R4LnByb3h5LnNhZmVTaHV0ZG93bigpO1xufVxuXG52YXIgYm9vdHN0cmFwRmlsZTtcblxuYXN5bmMgZnVuY3Rpb24gZ2xvYmFsSW5pdCAoY3R4LCBvcHRzKSB7XG4gIGN0eC50aW1lb3V0KDIwMDAwKTtcblxuICBib290c3RyYXBGaWxlID0gYXdhaXQgbG9jYWxQcmVwYXJlQm9vdHN0cmFwKG9wdHMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbnN0cnVtZW50c0luc3RhbmNlSW5pdCAob3B0cyA9IHt9KSB7XG4gIGxldCBjdHggPSBhd2FpdCBpbml0KGJvb3RzdHJhcEZpbGUsIG9wdHMuc29jayk7XG4gIGN0eC5zZW5kQ29tbWFuZCA9IGFzeW5jIChjbWQpID0+IHtcbiAgICByZXR1cm4gY3R4LnByb3h5LnNlbmRDb21tYW5kKGNtZCk7XG4gIH07XG4gIGN0eC5leGVjID0gY3R4LnNlbmRDb21tYW5kO1xuXG4gIGN0eC5leGVjRnVuYyA9IGFzeW5jIChmdW5jLCBwYXJhbXMpID0+IHtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwgW107XG4gICAgbGV0IHNjcmlwdCA9XG4gICAgICAnKGZ1bmN0aW9uICgpeycgK1xuICAgICAgJyAgdmFyIHBhcmFtcyA9IEpTT04ucGFyc2UoXFwnJyArIEpTT04uc3RyaW5naWZ5KHBhcmFtcykgKyAnXFwnKTtcXG4nICtcbiAgICAgICcgIHJldHVybiAoJyArIGZ1bmMudG9TdHJpbmcoKSArICcpLmFwcGx5KG51bGwsIHBhcmFtcyk7JyArXG4gICAgICAnfSkoKTsnO1xuICAgIHJldHVybiBjdHguZXhlYyhzY3JpcHQpO1xuICB9O1xuXG4gIGxldCBjbWQgPSAnJC5pc1ZlcmJvc2UgPSAnICsgKHByb2Nlc3MuZW52LlZFUkJPU0UgPyB0cnVlIDogZmFsc2UpICsgJztcXG4nO1xuICBhd2FpdCBjdHguZXhlYyhjbWQpO1xuXG4gIC8vIHNvbWUgdWlhdXRvIGhlbHBlcnNcbiAgYXdhaXQgY3R4LmV4ZWNGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAvKiBnbG9iYWwgcm9vdFBhZ2U6dHJ1ZSAqL1xuICAgIHJvb3RQYWdlID0ge307XG4gICAgLy8gY2xpY2sgaXRlbSBpbiByb290IHBhZ2UgbWVudVxuICAgIHJvb3RQYWdlLmNsaWNrTWVudUl0ZW0gPSBmdW5jdGlvbiAocGFydGlhbFRleHQpIHtcbiAgICAgICQuZWFjaCgkKCd0YWJsZXZpZXcnKS5jaGlsZHJlbigpLCBmdW5jdGlvbiAoaWR4LCBjaGlsZCkge1xuICAgICAgICBpZiAoY2hpbGQubmFtZSgpLmluZGV4T2YocGFydGlhbFRleHQpID49IDAgKXtcbiAgICAgICAgICAkKGNoaWxkKS50YXAoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIGF3YWl0IGN0eC5leGVjRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgLyogZ2xvYmFsICQgKi9cbiAgICAkLmRlbGF5KDUwMCk7XG4gICAgd2hpbGUgKCEkKCd0YWJsZXZpZXcnKS5pc1Zpc2libGUoKSkge1xuICAgICAgJC53YXJuKCd3YWl0aW5nIGZvciBwYWdlIHRvIGxvYWQnKTtcbiAgICAgICQuZGVsYXkoNTAwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjdHg7XG59XG5cbmV4cG9ydCB7IGluc3RydW1lbnRzSW5zdGFuY2VJbml0LCBnbG9iYWxJbml0LCBraWxsQWxsIH07Il19