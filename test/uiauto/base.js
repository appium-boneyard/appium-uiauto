// 'use strict';


import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Promise from 'bluebird';
import CommandProxy from '../../lib/command-proxy';
import instrumentsLib from 'appium-instruments';
import bootstrapLib from '../../lib/dynamic-bootstrap';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import logger from '../../lib/logger';

chai.use(chaiAsPromised);
chai.should();

let instrumentsUtils = instrumentsLib.utils;
let getEnv = bootstrapLib.getEnv;

process.env.APPIUM_BOOTSTRAP_DIR = '/tmp/appium-uiauto/test/functional/bootstrap';

if (process.env.VERBOSE) logger.setConsoleLevel('debug');

async function prepareBootstrap (opts) {
  opts = opts || {};
  var rootDir = path.resolve(__dirname, '../../..');
  if (opts.bootstrap === 'basic') {
    var env = getEnv();
    var postImports = [];
    if (opts.imports && opts.imports.post) {
      postImports = opts.imports.post;
    }
    postImports = postImports.map(function (item) {
      return '#import "' + path.resolve( rootDir , item) + '"';
    });
    var code = fs.readFileSync(path.resolve(
      __dirname, '../../../test/assets/base-bootstrap.js.asset'), 'utf8');
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
    return bootstrapLib.prepareBootstrap({
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
    return bootstrapLib.prepareBootstrap(opts);
  }
}

async function newInstruments (bootstrapFile) {
  return instrumentsUtils.quickInstrument({
    app: path.resolve(__dirname, '../../../test/assets/UICatalog.app'),
    bootstrap: bootstrapFile,
    simulatorSdkAndDevice: 'iPhone 6 (8.1 Simulator)',
    launchTries: 2
  });
}

async function init (bootstrapFile, opts) {
  let deferred = Promise.pending();
  let proxy = new CommandProxy(opts);
  let instruments;
  proxy.start(
    // first connection
    function (err) {
      instruments.launchHandler(err);
      if (err) return deferred.reject(err);
      deferred.resolve({proxy: proxy, instruments: instruments});
    },
    // regular cb
    async (err) => {
      if (err) return deferred.reject(err);
      instruments = await newInstruments(bootstrapFile);
      instruments.start(null, function () {
        proxy.safeShutdown(_.noop);
        deferred.reject('Unexpected shutdown of instruments');
      });
    }
  );
  return deferred.promise;
}

async function killAll (ctx) {
  let asyncShutdown = Promise.promisify(ctx.instruments.shutdown, ctx.instruments);
  await asyncShutdown();
  await instrumentsUtils.killAllInstruments();
  ctx.proxy.safeShutdown(_.noop);
}

var bootstrapFile;

async function globalInit (ctx, opts) {
  // ctx.timeout(180000);
  ctx.timeout(20000);

  bootstrapFile = await prepareBootstrap(opts);
}

async function instrumentsInstanceInit (opts) {
  let ctx = await init(bootstrapFile, opts);
  ctx.sendCommand = async (cmd) => {
    let deferred = Promise.pending();
    ctx.proxy.sendCommand(cmd, (result) => {
      if (result.status === 0) {
        deferred.resolve(result.value);
      } else {
        deferred.reject(JSON.stringify(result));
      }
    });
    return deferred.promise;
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
