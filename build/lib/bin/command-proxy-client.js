#!/usr/bin/env node


// This script is used by the UIAuto job, running on Instruments, to connect
// to the Command Proxy. It transmits the Instruments messages exactly as they
// come in. Because stderr is unreliable, we append logs and program output
// before sending them to the UIAuto script in the following form:
// ----- LOGS -----
// blah blah blah...
// blah blah blah...
// ----- OUTPUT -----
// <OUTPUT>

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var output = '';

function exit(status) {
  console.log('----- OUTPUT -----');
  console.log(output);
  // chill out before exiting
  process.nextTick(function () {
    process.exit(status);
  });
}

function connect(sock, dataFromInstruments) {
  var client = _net2['default'].connect({ path: sock }, function () {
    if (dataFromInstruments && dataFromInstruments.length > 0) {
      console.log('Data from instruments to command proxy:');
      console.log(dataFromInstruments.substring(0, 100));
    }
    client.end(dataFromInstruments, 'utf8');
  });
  client.setEncoding('utf8');
  client.on('data', function (dataFromCommandProxy) {
    console.log('Data from command proxy to instruments: ' + dataFromCommandProxy);
    output += dataFromCommandProxy;
  });
  client.on('error', function (err) {
    console.log('Error from command proxy to instruments: ' + err);
  });
  client.on('end', function () {
    client.end();
    exit(0);
  });
}

try {
  console.log('----- LOGS -----');
  connect(process.argv[2], process.argv[3]);
} catch (err) {
  console.log('An error occured: ' + err.message);
  exit(1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iaW4vY29tbWFuZC1wcm94eS1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OzttQkFZZ0IsS0FBSzs7OztBQUVyQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O0FBRWhCLFNBQVMsSUFBSSxDQUFFLE1BQU0sRUFBRTtBQUNyQixTQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEMsU0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFcEIsU0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFNO0FBQ3JCLFdBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDdEIsQ0FBQyxDQUFDO0NBQ0o7O0FBRUQsU0FBUyxPQUFPLENBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFO0FBQzNDLE1BQUksTUFBTSxHQUFHLGlCQUFJLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxZQUFNO0FBQzNDLFFBQUksbUJBQW1CLElBQUksbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztBQUN4RCxhQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDdkQsYUFBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDcEQ7QUFDRCxVQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0dBQ3pDLENBQUMsQ0FBQztBQUNILFFBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsUUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxvQkFBb0IsRUFBRTtBQUNoRCxXQUFPLENBQUMsR0FBRyw4Q0FBNEMsb0JBQW9CLENBQUcsQ0FBQztBQUMvRSxVQUFNLElBQUksb0JBQW9CLENBQUM7R0FDaEMsQ0FBQyxDQUFDO0FBQ0gsUUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUs7QUFDMUIsV0FBTyxDQUFDLEdBQUcsK0NBQTZDLEdBQUcsQ0FBRyxDQUFDO0dBQ2hFLENBQUMsQ0FBQztBQUNILFFBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQU07QUFDckIsVUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2IsUUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ1QsQ0FBQyxDQUFDO0NBQ0o7O0FBRUQsSUFBSTtBQUNGLFNBQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNoQyxTQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNaLFNBQU8sQ0FBQyxHQUFHLHdCQUFzQixHQUFHLENBQUMsT0FBTyxDQUFHLENBQUM7QUFDaEQsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ1QiLCJmaWxlIjoibGliL2Jpbi9jb21tYW5kLXByb3h5LWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vLyBUaGlzIHNjcmlwdCBpcyB1c2VkIGJ5IHRoZSBVSUF1dG8gam9iLCBydW5uaW5nIG9uIEluc3RydW1lbnRzLCB0byBjb25uZWN0XG4vLyB0byB0aGUgQ29tbWFuZCBQcm94eS4gSXQgdHJhbnNtaXRzIHRoZSBJbnN0cnVtZW50cyBtZXNzYWdlcyBleGFjdGx5IGFzIHRoZXlcbi8vIGNvbWUgaW4uIEJlY2F1c2Ugc3RkZXJyIGlzIHVucmVsaWFibGUsIHdlIGFwcGVuZCBsb2dzIGFuZCBwcm9ncmFtIG91dHB1dFxuLy8gYmVmb3JlIHNlbmRpbmcgdGhlbSB0byB0aGUgVUlBdXRvIHNjcmlwdCBpbiB0aGUgZm9sbG93aW5nIGZvcm06XG4vLyAtLS0tLSBMT0dTIC0tLS0tXG4vLyBibGFoIGJsYWggYmxhaC4uLlxuLy8gYmxhaCBibGFoIGJsYWguLi5cbi8vIC0tLS0tIE9VVFBVVCAtLS0tLVxuLy8gPE9VVFBVVD5cblxuaW1wb3J0IG5ldCBmcm9tICduZXQnO1xuXG5sZXQgb3V0cHV0ID0gJyc7XG5cbmZ1bmN0aW9uIGV4aXQgKHN0YXR1cykge1xuICBjb25zb2xlLmxvZygnLS0tLS0gT1VUUFVUIC0tLS0tJyk7XG4gIGNvbnNvbGUubG9nKG91dHB1dCk7XG4gIC8vIGNoaWxsIG91dCBiZWZvcmUgZXhpdGluZ1xuICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHtcbiAgICBwcm9jZXNzLmV4aXQoc3RhdHVzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbm5lY3QgKHNvY2ssIGRhdGFGcm9tSW5zdHJ1bWVudHMpIHtcbiAgbGV0IGNsaWVudCA9IG5ldC5jb25uZWN0KHtwYXRoOiBzb2NrfSwgKCkgPT4ge1xuICAgIGlmIChkYXRhRnJvbUluc3RydW1lbnRzICYmIGRhdGFGcm9tSW5zdHJ1bWVudHMubGVuZ3RoID4gMCl7XG4gICAgICBjb25zb2xlLmxvZygnRGF0YSBmcm9tIGluc3RydW1lbnRzIHRvIGNvbW1hbmQgcHJveHk6Jyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhRnJvbUluc3RydW1lbnRzLnN1YnN0cmluZygwLCAxMDApKTtcbiAgICB9XG4gICAgY2xpZW50LmVuZChkYXRhRnJvbUluc3RydW1lbnRzLCAndXRmOCcpO1xuICB9KTtcbiAgY2xpZW50LnNldEVuY29kaW5nKCd1dGY4Jyk7XG4gIGNsaWVudC5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhRnJvbUNvbW1hbmRQcm94eSkge1xuICAgIGNvbnNvbGUubG9nKGBEYXRhIGZyb20gY29tbWFuZCBwcm94eSB0byBpbnN0cnVtZW50czogJHtkYXRhRnJvbUNvbW1hbmRQcm94eX1gKTtcbiAgICBvdXRwdXQgKz0gZGF0YUZyb21Db21tYW5kUHJveHk7XG4gIH0pO1xuICBjbGllbnQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBFcnJvciBmcm9tIGNvbW1hbmQgcHJveHkgdG8gaW5zdHJ1bWVudHM6ICR7ZXJyfWApO1xuICB9KTtcbiAgY2xpZW50Lm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgY2xpZW50LmVuZCgpO1xuICAgIGV4aXQoMCk7XG4gIH0pO1xufVxuXG50cnkge1xuICBjb25zb2xlLmxvZygnLS0tLS0gTE9HUyAtLS0tLScpO1xuICBjb25uZWN0KHByb2Nlc3MuYXJndlsyXSwgcHJvY2Vzcy5hcmd2WzNdKTtcbn0gY2F0Y2ggKGVycikge1xuICBjb25zb2xlLmxvZyhgQW4gZXJyb3Igb2NjdXJlZDogJHtlcnIubWVzc2FnZX1gKTtcbiAgZXhpdCgxKTtcbn1cbiJdfQ==