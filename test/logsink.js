import npmlog from 'npmlog';
import { patchLogger } from 'appium-logger';

// pass  --require './build/test/logsink' arguments in mocha
patchLogger(npmlog);
global._global_npmlog = npmlog;
npmlog.level = process.env.VERBOSE ? 'debug' : 'info';
