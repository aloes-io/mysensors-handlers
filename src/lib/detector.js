const mqttPattern = require('mqtt-pattern');
const logger = require('aloes-logger');
const {
  protocolRef,
  labelsPresentation,
  labelsSet,
  labelsInternal,
} = require('./common');

/**
 * Check incoming MQTT packet against [MySensors Serial API]{@link /mysensors/#mysensorsapi}
 * pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"
 * @mthod mySensorsPatternDetector
 * @param {object} packet - The MQTT packet.
 * @returns {object | null} pattern
 */

const mySensorsPatternDetector = (packet) => {
  try {
    const pattern = {name: 'empty', params: {}};
    if (
      packet.topic &&
      mqttPattern.matches(protocolRef.pattern, packet.topic)
    ) {
      logger(4, 'mysensors-handlers', 'patternDetector:res', 'reading API ...');
      const mysensorsProtocol = mqttPattern.exec(
        protocolRef.pattern,
        packet.topic,
      );
      logger(3, 'mysensors-handlers', 'patternDetector:res', mysensorsProtocol);
      let typeExists = false;
      const method = Number(mysensorsProtocol.method);
      const type = Number(mysensorsProtocol.type);

      const methodExists = protocolRef.validators.methods.some(
        (meth) => meth === method,
      );
      if (method === 0) {
        typeExists = labelsPresentation.some(({value}) => value === type);
      } else if (method > 0 && method < 3) {
        typeExists = labelsSet.some(({value}) => value === type);
      } else if (method === 3) {
        typeExists = labelsInternal.some(({value}) => value === type);
      }
      logger(3, 'mysensors-handlers', 'patternDetector:res', {
        methodExists,
        typeExists,
      });
      if (methodExists && typeExists) {
        pattern.name = 'mySensors';
        pattern.params = mysensorsProtocol;
        return pattern;
      }
      return pattern;
    }
    return pattern;
  } catch (error) {
    logger(2, 'mysensors-handlers', 'patternDetector:err', error);
    return null;
  }
};

module.exports = {
  mySensorsPatternDetector,
};
