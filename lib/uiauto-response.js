import log from './logger';
import _ from 'lodash';

const MESSAGE_TYPES = ['error', 'no data', 'regular', 'chunk', 'last chunk'];

const UNKNOWN_ERROR = {
  status: 13,
  value: 'Error parsing socket data from instruments'
};


class UIAutoResponse {
  constructor () {
    this.bufferedData = '';
    this.resultBuffer = '';
  }

  resetBuffer () {
    this.bufferedData = '';
  }

  addData (data) {
    this.bufferedData += data;
  }

  finalizeData () {
    var data = this.bufferedData;
    this.bufferedData = '';
    var parsedData;
    try {
      parsedData = {
        type: MESSAGE_TYPES[parseInt(data[0], 10)],
      };
      if (parsedData.type !== 'no data') {
        // format is <one char message type>,<DATA>
        parsedData.result = data.substring(2);
      }
    } catch (err) {
      log.error(`Could not parse data from socket: ${err}`);
      log.error(data);
      parsedData = {
        type: 'error',
        error: UNKNOWN_ERROR
      };
    }

    return parsedData;
  }

  getResult () {
    let data = this.finalizeData();

    let hasResult = !_.isUndefined(data.result) && data.result !== false;
    if (hasResult) {
      if (data.result) {
        log.debug(`Got result from instruments: ${data.result.slice(0, 300)}`);
      } else {
        log.debug('Got null result from instruments');
      }

      if (data.type && data.type.indexOf('chunk') !== -1) {
        this.resultBuffer += data.result;
        log.debug(`Got chunk data, current resultBuffer length: ${this.resultBuffer.length}`);
        if (data.type === 'last chunk') {
          log.debug(`This is the last data final length: ${this.resultBuffer.length}`);
          // this is the last row, unpack and return response
          let result;
          try {
            result = JSON.parse(this.resultBuffer);
          } catch (err) {
            log.error(`Could not parse result buffer: ${err}`);
            result = UNKNOWN_ERROR;
          }
          this.resultBuffer = '';
          return result;
        } else {
          log.debug('Not the last chunk, trying to get more');
          return {
            needsMoreData: true
          };
        }
      } else {
        let result;
        try {
          result = JSON.parse(data.result);
        } catch (err) {
          log.error(`Could not parse result buffer: ${err}`);
          result = UNKNOWN_ERROR;
        }
        return result;
      }
    }
  }
}

export default UIAutoResponse;
