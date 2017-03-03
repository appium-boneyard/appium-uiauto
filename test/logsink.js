import npmlog from 'npmlog';
import { logger } from 'appium-support';


// pass  --require './build/test/logsink' arguments in mocha
logger.patchLogger(npmlog);
global._global_npmlog = npmlog;
npmlog.level = (process.env.VERBOSE || process.env._FORCE_LOGS) ? 'debug' : 'info';
