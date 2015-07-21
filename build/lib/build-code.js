'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var fs = {
  readFile: _bluebird2['default'].promisify(_fs3['default'].readFile)
};

var root = _path2['default'].resolve(__dirname, '../uiauto');
// keep a list of files we examine for the purposes of making sure we're
// not adding the same file to the collated version twice
var filesExamined = undefined;

// this regex helps us get the file path of an import
var importRe = /^#import ('|")([^('|")]+)('|")$/mg;

function getDepsForFile(file) {
  var extraImports = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var data, deps, matches, match, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, importedFile, importedPath, importedDeps;

  return _regeneratorRuntime.async(function getDepsForFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!_lodash2['default'].contains(filesExamined, file)) {
          context$1$0.next = 2;
          break;
        }

        throw new Error('Re-examining file ' + file + '; you need to make sure ' + 'the graph is set up so we don\'t require files twice');

      case 2:

        filesExamined.push(file);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(fs.readFile(file, 'utf8'));

      case 5:
        data = context$1$0.sent;
        deps = _defineProperty({}, file, []);
        matches = [];
        match = importRe.exec(data);

        while (match) {
          if (match) {
            matches.push(match[2]);
          }
          match = importRe.exec(data);
        }
        if (extraImports && extraImports.length > 0) {
          matches = extraImports.concat(matches);
        }

        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 14;
        _iterator = _getIterator(matches);

      case 16:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 26;
          break;
        }

        importedFile = _step.value;
        importedPath = _path2['default'].resolve(_path2['default'].dirname(file), importedFile);
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(getDepsForFile(importedPath));

      case 21:
        importedDeps = context$1$0.sent;

        deps[file].push(importedDeps);

      case 23:
        _iteratorNormalCompletion = true;
        context$1$0.next = 16;
        break;

      case 26:
        context$1$0.next = 32;
        break;

      case 28:
        context$1$0.prev = 28;
        context$1$0.t0 = context$1$0['catch'](14);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 32:
        context$1$0.prev = 32;
        context$1$0.prev = 33;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 35:
        context$1$0.prev = 35;

        if (!_didIteratorError) {
          context$1$0.next = 38;
          break;
        }

        throw _iteratorError;

      case 38:
        return context$1$0.finish(35);

      case 39:
        return context$1$0.finish(32);

      case 40:
        return context$1$0.abrupt('return', deps);

      case 41:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[14, 28, 32, 40], [33,, 35, 39]]);
}

function buildScriptFromDeps(deps) {
  var script, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, file, subDepsArray, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, subDeps, fileContents, newFileData, fileWithoutRoot;

  return _regeneratorRuntime.async(function buildScriptFromDeps$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        script = '';
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 4;
        _iterator2 = _getIterator(_lodash2['default'].pairs(deps));

      case 6:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 48;
          break;
        }

        _step2$value = _slicedToArray(_step2.value, 2);
        file = _step2$value[0];
        subDepsArray = _step2$value[1];
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 13;
        _iterator3 = _getIterator(subDepsArray);

      case 15:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 23;
          break;
        }

        subDeps = _step3.value;
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(buildScriptFromDeps(subDeps));

      case 19:
        script += context$1$0.sent;

      case 20:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 15;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t0 = context$1$0['catch'](13);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError3) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError3;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(fs.readFile(file, 'utf8'));

      case 39:
        fileContents = context$1$0.sent;
        newFileData = stripImports(fileContents);
        fileWithoutRoot = file.replace(root + '/', '');

        script += '\n/* begin file: ' + fileWithoutRoot + ' */\n';
        script += newFileData;
        script += '\n/* end file: ' + fileWithoutRoot + ' */\n';

      case 45:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 6;
        break;

      case 48:
        context$1$0.next = 54;
        break;

      case 50:
        context$1$0.prev = 50;
        context$1$0.t1 = context$1$0['catch'](4);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t1;

      case 54:
        context$1$0.prev = 54;
        context$1$0.prev = 55;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 57:
        context$1$0.prev = 57;

        if (!_didIteratorError2) {
          context$1$0.next = 60;
          break;
        }

        throw _iteratorError2;

      case 60:
        return context$1$0.finish(57);

      case 61:
        return context$1$0.finish(54);

      case 62:
        return context$1$0.abrupt('return', script);

      case 63:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 50, 54, 62], [13, 25, 29, 37], [30,, 32, 36], [55,, 57, 61]]);
}

function stripImports(data) {
  data = data.replace(importRe, '');
  data = data.trim();
  return data;
}

function buildScript(entryPoint, extraImports) {
  var deps, script;
  return _regeneratorRuntime.async(function buildScript$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:

        filesExamined = [];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(getDepsForFile(entryPoint, extraImports));

      case 3:
        deps = context$1$0.sent;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(buildScriptFromDeps(deps));

      case 6:
        script = context$1$0.sent;
        return context$1$0.abrupt('return', script);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports['default'] = buildScript;
module.exports = exports['default'];

// recursively get dependencies for imported files

//console.log('array' + subDepsArray);
//# sourceMappingURL=data:application/json;base64,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O0FBQ3JELGNBQU0sSUFBSSxXQUFXLENBQUM7QUFDdEIsY0FBTSx3QkFBc0IsZUFBZSxVQUFPLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0Q0FFOUMsTUFBTTs7Ozs7OztDQUNkOztBQUVELFNBQVMsWUFBWSxDQUFFLElBQUksRUFBRTtBQUMzQixNQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEMsTUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNuQixTQUFPLElBQUksQ0FBQztDQUNiOztBQUVELFNBQWUsV0FBVyxDQUFFLFVBQVUsRUFBRSxZQUFZO01BRzlDLElBQUksRUFDSixNQUFNOzs7OztBQUZWLHFCQUFhLEdBQUcsRUFBRSxDQUFDOzt5Q0FDRixjQUFjLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQzs7O0FBQXJELFlBQUk7O3lDQUNZLG1CQUFtQixDQUFDLElBQUksQ0FBQzs7O0FBQXpDLGNBQU07NENBQ0gsTUFBTTs7Ozs7OztDQUNkOztxQkFFYyxXQUFXIiwiZmlsZSI6ImxpYi9idWlsZC1jb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBfZnMgZnJvbSAnZnMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxubGV0IGZzID0ge1xuICByZWFkRmlsZTogQi5wcm9taXNpZnkoX2ZzLnJlYWRGaWxlKVxufTtcblxubGV0IHJvb3QgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vdWlhdXRvJyk7XG4vLyBrZWVwIGEgbGlzdCBvZiBmaWxlcyB3ZSBleGFtaW5lIGZvciB0aGUgcHVycG9zZXMgb2YgbWFraW5nIHN1cmUgd2UncmVcbi8vIG5vdCBhZGRpbmcgdGhlIHNhbWUgZmlsZSB0byB0aGUgY29sbGF0ZWQgdmVyc2lvbiB0d2ljZVxubGV0IGZpbGVzRXhhbWluZWQ7XG5cbi8vIHRoaXMgcmVnZXggaGVscHMgdXMgZ2V0IHRoZSBmaWxlIHBhdGggb2YgYW4gaW1wb3J0XG5sZXQgaW1wb3J0UmUgPSAvXiNpbXBvcnQgKCd8XCIpKFteKCd8XCIpXSspKCd8XCIpJC9tZztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0RGVwc0ZvckZpbGUgKGZpbGUsIGV4dHJhSW1wb3J0cyA9IFtdKSB7XG4gIGlmIChfLmNvbnRhaW5zKGZpbGVzRXhhbWluZWQsIGZpbGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBSZS1leGFtaW5pbmcgZmlsZSAke2ZpbGV9OyB5b3UgbmVlZCB0byBtYWtlIHN1cmUgYCArXG4gICAgICAgICAgICAgICAgICAgIGB0aGUgZ3JhcGggaXMgc2V0IHVwIHNvIHdlIGRvbid0IHJlcXVpcmUgZmlsZXMgdHdpY2VgKTtcbiAgfVxuXG4gIGZpbGVzRXhhbWluZWQucHVzaChmaWxlKTtcbiAgbGV0IGRhdGEgPSBhd2FpdCBmcy5yZWFkRmlsZShmaWxlLCAndXRmOCcpO1xuICBsZXQgZGVwcyA9IHtcbiAgICBbZmlsZV06IFtdXG4gIH07XG5cbiAgbGV0IG1hdGNoZXMgPSBbXTtcbiAgbGV0IG1hdGNoID0gaW1wb3J0UmUuZXhlYyhkYXRhKTtcbiAgd2hpbGUgKG1hdGNoKSB7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBtYXRjaGVzLnB1c2gobWF0Y2hbMl0pO1xuICAgIH1cbiAgICBtYXRjaCA9IGltcG9ydFJlLmV4ZWMoZGF0YSk7XG4gIH1cbiAgaWYgKGV4dHJhSW1wb3J0cyAmJiBleHRyYUltcG9ydHMubGVuZ3RoID4gMCkge1xuICAgIG1hdGNoZXMgPSBleHRyYUltcG9ydHMuY29uY2F0KG1hdGNoZXMpO1xuICB9XG4gXG4gIGZvciAobGV0IGltcG9ydGVkRmlsZSBvZiBtYXRjaGVzKSB7XG4gICAgbGV0IGltcG9ydGVkUGF0aCA9IHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoZmlsZSksIGltcG9ydGVkRmlsZSk7XG4gICAgbGV0IGltcG9ydGVkRGVwcyA9IGF3YWl0IGdldERlcHNGb3JGaWxlKGltcG9ydGVkUGF0aCk7XG4gICAgZGVwc1tmaWxlXS5wdXNoKGltcG9ydGVkRGVwcyk7XG4gIH1cbiAgLy8gcmVjdXJzaXZlbHkgZ2V0IGRlcGVuZGVuY2llcyBmb3IgaW1wb3J0ZWQgZmlsZXNcbiAgcmV0dXJuIGRlcHM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkU2NyaXB0RnJvbURlcHMgKGRlcHMpIHtcbiAgbGV0IHNjcmlwdCA9ICcnO1xuICBmb3IgKGxldCBbZmlsZSwgc3ViRGVwc0FycmF5XSBvZiBfLnBhaXJzKGRlcHMpKSB7XG4gICAgLy9jb25zb2xlLmxvZygnYXJyYXknICsgc3ViRGVwc0FycmF5KTtcbiAgICBmb3IgKGxldCBzdWJEZXBzIG9mIHN1YkRlcHNBcnJheSkge1xuICAgICAgc2NyaXB0ICs9IGF3YWl0IGJ1aWxkU2NyaXB0RnJvbURlcHMoc3ViRGVwcyk7XG4gICAgfSAgXG4gICAgbGV0IGZpbGVDb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGUsICd1dGY4Jyk7XG4gICAgbGV0IG5ld0ZpbGVEYXRhID0gc3RyaXBJbXBvcnRzKGZpbGVDb250ZW50cyk7XG4gICAgXG4gICAgbGV0IGZpbGVXaXRob3V0Um9vdCA9IGZpbGUucmVwbGFjZShgJHtyb290fS9gLCAnJyk7XG4gICAgc2NyaXB0ICs9IGBcXG4vKiBiZWdpbiBmaWxlOiAke2ZpbGVXaXRob3V0Um9vdH0gKi9cXG5gO1xuICAgIHNjcmlwdCArPSBuZXdGaWxlRGF0YTtcbiAgICBzY3JpcHQgKz0gYFxcbi8qIGVuZCBmaWxlOiAke2ZpbGVXaXRob3V0Um9vdH0gKi9cXG5gO1xuICB9XG4gIHJldHVybiBzY3JpcHQ7XG59XG5cbmZ1bmN0aW9uIHN0cmlwSW1wb3J0cyAoZGF0YSkge1xuICBkYXRhID0gZGF0YS5yZXBsYWNlKGltcG9ydFJlLCBcIlwiKTtcbiAgZGF0YSA9IGRhdGEudHJpbSgpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYnVpbGRTY3JpcHQgKGVudHJ5UG9pbnQsIGV4dHJhSW1wb3J0cykge1xuICBcbiAgZmlsZXNFeGFtaW5lZCA9IFtdO1xuICBsZXQgZGVwcyA9IGF3YWl0IGdldERlcHNGb3JGaWxlKGVudHJ5UG9pbnQsIGV4dHJhSW1wb3J0cyk7XG4gIGxldCBzY3JpcHQgPSAgYXdhaXQgYnVpbGRTY3JpcHRGcm9tRGVwcyhkZXBzKTtcbiAgcmV0dXJuIHNjcmlwdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRTY3JpcHQ7Il19