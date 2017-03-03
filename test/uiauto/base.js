import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import B from 'bluebird';
import { UIAutoClient, prepareBootstrap } from '../..';
import { utils as instrumentsUtils } from 'appium-instruments';
import { getEnv } from '../../lib/dynamic-bootstrap';
import log from '../../lib/logger';
import _ from 'lodash';
import path from 'path';
import { fs } from 'appium-support';
import { getVersion } from 'appium-xcode';


chai.use(chaiAsPromised);
chai.should();

process.env.APPIUM_BOOTSTRAP_DIR = '/tmp/appium-uiauto/test/functional/bootstrap';

let rootDir = path.resolve(__dirname, '..', '..', '..');
if (!__dirname.match(/build\/test\/uiauto$/)) {
  // we are not running tests in the `build` directory
  rootDir = path.resolve(__dirname, '..', '..');
}

async function localPrepareBootstrap (opts = {}) {
  if (opts.bootstrap === 'basic') {
    let env = getEnv();
    let postImports = [];
    if (opts.imports && opts.imports.post) {
      postImports = opts.imports.post;
    }
    postImports = postImports.map((item) => {
      return `#import "${path.resolve(rootDir , item)}"`;
    });
    let code = await fs.readFile(path.resolve(
      rootDir, 'test', 'assets', 'base-bootstrap.js'), 'utf8');
    let vars = {
      '<ROOT_DIR>': rootDir,
      '"<POST_IMPORTS>"': postImports.join('\n'),
      '<commandProxyClientPath>': env.commandProxyClientPath,
      '<nodePath>': env.nodePath,
      '<instrumentsSock>': env.instrumentsSock
    };
    for (let [key, value] of _.toPairs(vars)) {
      code = code.replace(new RegExp(key, 'g'), value);
    }
    return await prepareBootstrap({
      code: code,
      isVerbose: true
    });
  } else {
    opts = _.clone(opts);
    if (opts.chai) {
      opts.imports = {
        pre: [path.resolve(rootDir, 'node_modules/chai/chai.js')]
      };
    }
    delete opts.chai;
    return await prepareBootstrap(opts);
  }
}

async function newInstruments (bootstrapFile) {
  // starting tests differs on Xcode 7 vs. 6
  let simulatorSdkAndDevice = 'iPhone 6 (8.1 Simulator)';
  let withoutDelay = true;
  let xcodeVersion = await getVersion(true);
  if (xcodeVersion.versionFloat >= 7) {
    simulatorSdkAndDevice = 'iPhone 6 (9.3)';
    withoutDelay = false;
  }

  return await instrumentsUtils.quickInstruments({
    app: path.resolve(rootDir, 'test', 'assets', 'UICatalog.app'),
    bootstrap: bootstrapFile,
    simulatorSdkAndDevice,
    launchTries: 2,
    withoutDelay
  });
}

async function init (bootstrapFile, sock) {
  let proxy = new UIAutoClient(sock);
  let instruments = await newInstruments(bootstrapFile);
  instruments.onShutdown
    .then(() => {
      // expected shutdown, nothing to do
    }).catch(async (err) => {
      log.error(err);
      await proxy.safeShutdown();
      throw new Error('Unexpected shutdown of instruments');
    }).done();
  await B.all([
    proxy.start().then(() => {
      // everything looks good, notify instruments.
      instruments.registerLaunch();
    }),
    instruments.launch()
  ]);
  return {proxy, instruments};
}

async function killAll (ctx) {
  try {
    await ctx.instruments.shutdown();
  } catch (e) {
    // pass
    log.error(e);
  }
  await instrumentsUtils.killAllInstruments();
  await ctx.proxy.safeShutdown();
}

let bootstrapFile;

async function globalInit (ctx, opts) {
  ctx.timeout(240000);
  before(async () => {
    bootstrapFile = await localPrepareBootstrap(opts);
  });
}

async function instrumentsInstanceInit (opts = {}) {
  let ctx = await init(bootstrapFile, opts.sock);
  ctx.sendCommand = async (cmd) => {
    return ctx.proxy.sendCommand(cmd);
  };
  ctx.exec = ctx.sendCommand;

  ctx.execFunc = async (func, params) => {
    params = params || [];
    let script =
      `(function (){\n` +
      `  var params = JSON.parse('${JSON.stringify(params)}');\n` +
      `  return (${func.toString()}).apply(null, params);\n` +
      `})();`;
    return ctx.exec(script);
  };

  let cmd = `$.isVerbose = ${process.env.VERBOSE ? true : false};\n`;
  await ctx.exec(cmd);

  // some uiauto helpers
  await ctx.execFunc(function () {
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

  await ctx.execFunc(function () {
    /* global $ */
    $.delay(500);
    while (!$('tableview').isVisible()) {
      $.warn('waiting for page to load');
      $.delay(500);
    }
  });

  return ctx;
}

export { instrumentsInstanceInit, globalInit, killAll };
