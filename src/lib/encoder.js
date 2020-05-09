const mqttPattern = require('mqtt-pattern');
const logger = require('aloes-logger');
const {protocolRef} = require('./common');

/**
 * Convert incoming Aloes Client data to [MySensors protocol]{@link /mysensors/#mysensorsapi}
 * pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"
 * @method mySensorsEncoder
 * @param {object} instance - Sensor instance.
 * @param {object} protocol - Protocol parameters ( coming from patternDetector ).
 * @throws {Error} 'Wrong protocol input'
 * @returns {object | null} packet
 */
const mySensorsEncoder = (instance, protocol) => {
  if (
    !instance ||
    !instance.messageProtocol ||
    instance.messageProtocol.toLowerCase() !== 'mysensors'
  ) {
    throw new Error('Wrong protocol input');
  }
  try {
    let topic = null;
    const params = {
      prefixedDevEui: `${instance.devEui}${instance.inPrefix}`,
      nodeId: instance.nativeNodeId,
      sensorId: instance.nativeSensorId,
      type: instance.nativeResource,
    };
    logger(4, 'mysensors-handlers', 'encoder:req', params);
    if (protocol.method === 'HEAD') {
      params.method = 0;
      params.ack = 0;
      topic = mqttPattern.fill(protocolRef.pattern, params);
    } else if (protocol.method === 'POST' || protocol.method === 'PUT') {
      params.method = 1;
      params.ack = 0;
      topic = mqttPattern.fill(protocolRef.pattern, params);
    } else if (protocol.method === 'GET') {
      params.method = 2;
      params.ack = 0;
      topic = mqttPattern.fill(protocolRef.pattern, params);
    }
    if (!topic) {
      throw new Error('Method not supported yet');
    }
    logger(3, 'mysensors-handlers', 'encoder:res', topic);
    return {topic, payload: instance.value};
  } catch (error) {
    logger(3, 'mysensors-handlers', 'encoder:err', error);
    return null;
  }
};

module.exports = {
  mySensorsEncoder,
};
