'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var MESSAGE_TYPES = ['error', 'no data', 'regular', 'chunk', 'last chunk'];

var UNKNOWN_ERROR = {
  status: 13,
  value: 'Error parsing socket data from instruments'
};

var UIAutoResponse = (function () {
  function UIAutoResponse() {
    _classCallCheck(this, UIAutoResponse);

    this.bufferedData = '';
    this.resultBuffer = '';
  }

  _createClass(UIAutoResponse, [{
    key: 'resetBuffer',
    value: function resetBuffer() {
      this.bufferedData = '';
    }
  }, {
    key: 'addData',
    value: function addData(data) {
      this.bufferedData += data;
    }
  }, {
    key: 'finalizeData',
    value: function finalizeData() {
      var data = this.bufferedData;
      this.bufferedData = '';
      var parsedData;
      try {
        parsedData = {
          type: MESSAGE_TYPES[parseInt(data[0], 10)]
        };
        if (parsedData.type !== 'no data') {
          // format is <one char message type>,<DATA>
          parsedData.result = data.substring(2);
        }
      } catch (err) {
        _logger2['default'].error('Could not parse data from socket: ' + err);
        _logger2['default'].error(data);
        parsedData = {
          type: 'error',
          error: UNKNOWN_ERROR
        };
      }

      return parsedData;
    }
  }, {
    key: 'getResult',
    value: function getResult() {
      var data = this.finalizeData();

      var hasResult = !_lodash2['default'].isUndefined(data.result) && data.result !== false;
      if (hasResult) {
        if (data.result) {
          _logger2['default'].debug('Got result from instruments: ' + data.result.slice(0, 300));
        } else {
          _logger2['default'].debug('Got null result from instruments');
        }

        if (data.type && data.type.indexOf('chunk') !== -1) {
          this.resultBuffer += data.result;
          _logger2['default'].debug('Got chunk data, current resultBuffer length: ' + this.resultBuffer.length);
          if (data.type === 'last chunk') {
            _logger2['default'].debug('This is the last data final length: ' + this.resultBuffer.length);
            // this is the last row, unpack and return response
            var result = undefined;
            try {
              result = JSON.parse(this.resultBuffer);
            } catch (err) {
              _logger2['default'].error('Could not parse result buffer: ' + err);
              result = UNKNOWN_ERROR;
            }
            this.resultBuffer = '';
            return result;
          } else {
            _logger2['default'].debug('Not the last chunk, trying to get more');
            return {
              needsMoreData: true
            };
          }
        } else {
          var result = undefined;
          try {
            result = JSON.parse(data.result);
          } catch (err) {
            _logger2['default'].error('Could not parse result buffer: ' + err);
            result = UNKNOWN_ERROR;
          }
          return result;
        }
      }
    }
  }]);

  return UIAutoResponse;
})();

exports['default'] = UIAutoResponse;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUMsT0FBTyxHQUFHLEVBQUU7QUFDWixrQ0FBSSxLQUFLLHFDQUFtQyxHQUFHLENBQUcsQ0FBQztBQUNuRCxvQkFBTSxHQUFHLGFBQWEsQ0FBQzthQUN4QjtBQUNELGdCQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN2QixtQkFBTyxNQUFNLENBQUM7V0FDZixNQUFNO0FBQ0wsZ0NBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFDcEQsbUJBQU87QUFDTCwyQkFBYSxFQUFFLElBQUk7YUFDcEIsQ0FBQztXQUNIO1NBQ0YsTUFBTTtBQUNMLGNBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxjQUFJO0FBQ0Ysa0JBQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUNsQyxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ1osZ0NBQUksS0FBSyxxQ0FBbUMsR0FBRyxDQUFHLENBQUM7QUFDbkQsa0JBQU0sR0FBRyxhQUFhLENBQUM7V0FDeEI7QUFDRCxpQkFBTyxNQUFNLENBQUM7U0FDZjtPQUNGO0tBQ0Y7OztTQWpGRyxjQUFjOzs7cUJBb0ZMLGNBQWMiLCJmaWxlIjoibGliL3VpYXV0by1yZXNwb25zZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuY29uc3QgTUVTU0FHRV9UWVBFUyA9IFsnZXJyb3InLCAnbm8gZGF0YScsICdyZWd1bGFyJywgJ2NodW5rJywgJ2xhc3QgY2h1bmsnXTtcblxuY29uc3QgVU5LTk9XTl9FUlJPUiA9IHtcbiAgc3RhdHVzOiAxMyxcbiAgdmFsdWU6ICdFcnJvciBwYXJzaW5nIHNvY2tldCBkYXRhIGZyb20gaW5zdHJ1bWVudHMnXG59O1xuXG5cbmNsYXNzIFVJQXV0b1Jlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuYnVmZmVyZWREYXRhID0gJyc7XG4gICAgdGhpcy5yZXN1bHRCdWZmZXIgPSAnJztcbiAgfVxuXG4gIHJlc2V0QnVmZmVyICgpIHtcbiAgICB0aGlzLmJ1ZmZlcmVkRGF0YSA9ICcnO1xuICB9XG5cbiAgYWRkRGF0YSAoZGF0YSkge1xuICAgIHRoaXMuYnVmZmVyZWREYXRhICs9IGRhdGE7XG4gIH1cblxuICBmaW5hbGl6ZURhdGEgKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5idWZmZXJlZERhdGE7XG4gICAgdGhpcy5idWZmZXJlZERhdGEgPSAnJztcbiAgICB2YXIgcGFyc2VkRGF0YTtcbiAgICB0cnkge1xuICAgICAgcGFyc2VkRGF0YSA9IHtcbiAgICAgICAgdHlwZTogTUVTU0FHRV9UWVBFU1twYXJzZUludChkYXRhWzBdLCAxMCldLFxuICAgICAgfTtcbiAgICAgIGlmIChwYXJzZWREYXRhLnR5cGUgIT09ICdubyBkYXRhJykge1xuICAgICAgICAvLyBmb3JtYXQgaXMgPG9uZSBjaGFyIG1lc3NhZ2UgdHlwZT4sPERBVEE+XG4gICAgICAgIHBhcnNlZERhdGEucmVzdWx0ID0gZGF0YS5zdWJzdHJpbmcoMik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZXJyb3IoYENvdWxkIG5vdCBwYXJzZSBkYXRhIGZyb20gc29ja2V0OiAke2Vycn1gKTtcbiAgICAgIGxvZy5lcnJvcihkYXRhKTtcbiAgICAgIHBhcnNlZERhdGEgPSB7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIGVycm9yOiBVTktOT1dOX0VSUk9SXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZWREYXRhO1xuICB9XG5cbiAgZ2V0UmVzdWx0ICgpIHtcbiAgICBsZXQgZGF0YSA9IHRoaXMuZmluYWxpemVEYXRhKCk7XG5cbiAgICBsZXQgaGFzUmVzdWx0ID0gIV8uaXNVbmRlZmluZWQoZGF0YS5yZXN1bHQpICYmIGRhdGEucmVzdWx0ICE9PSBmYWxzZTtcbiAgICBpZiAoaGFzUmVzdWx0KSB7XG4gICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgbG9nLmRlYnVnKGBHb3QgcmVzdWx0IGZyb20gaW5zdHJ1bWVudHM6ICR7ZGF0YS5yZXN1bHQuc2xpY2UoMCwgMzAwKX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5kZWJ1ZygnR290IG51bGwgcmVzdWx0IGZyb20gaW5zdHJ1bWVudHMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEudHlwZSAmJiBkYXRhLnR5cGUuaW5kZXhPZignY2h1bmsnKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRCdWZmZXIgKz0gZGF0YS5yZXN1bHQ7XG4gICAgICAgIGxvZy5kZWJ1ZyhgR290IGNodW5rIGRhdGEsIGN1cnJlbnQgcmVzdWx0QnVmZmVyIGxlbmd0aDogJHt0aGlzLnJlc3VsdEJ1ZmZlci5sZW5ndGh9YCk7XG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT09ICdsYXN0IGNodW5rJykge1xuICAgICAgICAgIGxvZy5kZWJ1ZyhgVGhpcyBpcyB0aGUgbGFzdCBkYXRhIGZpbmFsIGxlbmd0aDogJHt0aGlzLnJlc3VsdEJ1ZmZlci5sZW5ndGh9YCk7XG4gICAgICAgICAgLy8gdGhpcyBpcyB0aGUgbGFzdCByb3csIHVucGFjayBhbmQgcmV0dXJuIHJlc3BvbnNlXG4gICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZSh0aGlzLnJlc3VsdEJ1ZmZlcik7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoYENvdWxkIG5vdCBwYXJzZSByZXN1bHQgYnVmZmVyOiAke2Vycn1gKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IFVOS05PV05fRVJST1I7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucmVzdWx0QnVmZmVyID0gJyc7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2cuZGVidWcoJ05vdCB0aGUgbGFzdCBjaHVuaywgdHJ5aW5nIHRvIGdldCBtb3JlJyk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5lZWRzTW9yZURhdGE6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoZGF0YS5yZXN1bHQpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2cuZXJyb3IoYENvdWxkIG5vdCBwYXJzZSByZXN1bHQgYnVmZmVyOiAke2Vycn1gKTtcbiAgICAgICAgICByZXN1bHQgPSBVTktOT1dOX0VSUk9SO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJQXV0b1Jlc3BvbnNlO1xuIl19