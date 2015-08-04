// 'use strict';


import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Promise from 'bluebird';
import { UIAutoClient, prepareBootstrap } from '../..';
import Instruments from 'appium-instruments';
import { getEnv } from '../../lib/dynamic-bootstrap';
import _ from 'lodash';
import path from 'path';
import { fs } from 'appium-support';
import logger from '../../lib/logger';

chai.use(chaiAsPromised);
chai.should();


process.env.APPIUM_BOOTSTRAP_DIR = '/tmp/appium-uiauto/test/functional/bootstrap';

if (process.env.VERBOSE) logger.setConsoleLevel('debug');

async function localPrepareBootstrap (opts) {
  opts = opts || {};
  let rootDir = path.resolve(__dirname, '../../..');
  if (opts.bootstrap === 'basic') {
    let env = getEnv();
    let postImports = [];
    if (opts.imports && opts.imports.post) {
      postImports = opts.imports.post;
    }
    postImports = postImports.map(function (item) {
      return '#import "' + path.resolve(rootDir , item) + '"';
    });
    let code = await fs.readFile(path.resolve(
      __dirname, '../../../test/assets/base-bootstrap.js'), 'utf8');
    let vars = {
      '<ROOT_DIR>': rootDir,
      '"<POST_IMPORTS>"': postImports.join('\n'),
      '<commandProxyClientPath>': env.commandProxyClientPath,
      '<nodePath>': env.nodePath,
      '<instrumentsSock>': env.instrumentsSock
    };
    for (let [key, value] of _.pairs(vars)) {
      code = code.replace(new RegExp(key, 'g'), value);
    }
    return prepareBootstrap({
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
    return prepareBootstrap(opts);
  }
}

async function newInstruments (bootstrapFile) {
  return Instruments.utils.quickInstrument({
    app: path.resolve(__dirname, '../../../test/assets/UICatalog.app'),
    bootstrap: bootstrapFile,
    simulatorSdkAndDevice: 'iPhone 6 (8.1 Simulator)',
    launchTries: 2
  });
}

async function init (bootstrapFile, sock) {
  let proxy = new UIAutoClient(sock);
  let instruments = await newInstruments(bootstrapFile);
  instruments.start(null, async () => {
    await proxy.safeShutdown();
    throw new Error('Unexpected shutdown of instruments');
  });

  try {
    await proxy.start();
    instruments.launchHandler();
  } catch (err) {
    // need to make sure instruments handles business
    instruments.launchHandler(err);
    throw err;
  }
  return {proxy, instruments};
}

async function killAll (ctx) {
  let asyncShutdown = Promise.promisify(ctx.instruments.shutdown, ctx.instruments);
  try {
    await asyncShutdown();
  } catch (e) {
    // pass
    console.log(e);
  }
  await Instruments.utils.killAllInstruments();
  await ctx.proxy.safeShutdown();
}

var bootstrapFile;

async function globalInit (ctx, opts) {
  ctx.timeout(20000);

  bootstrapFile = await localPrepareBootstrap(opts);
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
      '(function (){' +
      '  var params = JSON.parse(\'' + JSON.stringify(params) + '\');\n' +
      '  return (' + func.toString() + ').apply(null, params);' +
      '})();';
    return ctx.exec(script);
  };

  let cmd = '$.isVerbose = ' + (process.env.VERBOSE ? true : false) + ';\n';
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
