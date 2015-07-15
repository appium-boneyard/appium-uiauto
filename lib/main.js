var path = require('path');

module.exports = {
  prepareBootstrap: require('./dynamic-bootstrap').prepareBootstrap,
  CommandProxy: require('./command-proxy'),
  rotate: path.resolve(__dirname, "../osa/Rotate.applescript"),
  logger: require('./logger')
};
