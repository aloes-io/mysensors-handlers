const {mySensorsEncoder} = require('./lib/encoder');
const {mySensorsDecoder} = require('./lib/decoder');
const {mySensorsPatternDetector} = require('./lib/detector');
const {
  protocolRef,
  labelsCommand,
  labelsPresentation,
  labelsSet,
  labelsInternal,
} = require('./lib/common');
const version = require('../package.json').version;

module.exports = {
  version,
  protocolRef,
  labelsCommand,
  labelsPresentation,
  labelsSet,
  labelsInternal,
  mySensorsEncoder,
  mySensorsDecoder,
  mySensorsPatternDetector,
};
