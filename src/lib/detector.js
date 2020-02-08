const mqttPattern = require('mqtt-pattern');
const logger = require('aloes-logger');
const protocolRef = require('./common');

/**
 * Check incoming MQTT packet against [MySensors Serial API]{@link /mysensors/#mysensorsapi}
 * pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"
 * @mthod mySensorsPatternDetector
 * @param {object} packet - The MQTT packet.
 * @returns {object} found pattern.name and pattern.params
 */

const mySensorsPatternDetector = packet => {
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
      const methodExists = protocolRef.validators.methods.some(
        meth => meth === Number(mysensorsProtocol.method),
      );
      if (Number(mysensorsProtocol.method) === 0) {
        typeExists = protocolRef.labelsPresentation.some(
          label => label.value === Number(mysensorsProtocol.type),
        );
      } else if (
        Number(mysensorsProtocol.method) > 0 &&
        Number(mysensorsProtocol.method) < 3
      ) {
        typeExists = protocolRef.labelsSet.some(
          label => label.value === Number(mysensorsProtocol.type),
        );
      } else if (Number(mysensorsProtocol.method) === 3) {
        typeExists = protocolRef.labelsInternal.some(
          label => label.value === Number(mysensorsProtocol.type),
        );
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
