import mqttPattern from 'mqtt-pattern';
import {logger} from '../logger';
import protocolRef from './common';

/**
 * Convert incoming Aloes Client data to [MySensors protocol]{@link /mysensors/#mysensorsapi}
 * pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"
 * @method mySensorsEncoder
 * @param {object} packet - Sensor instance.
 * @param {object} protocol - Protocol paramters ( coming from patternDetector ).
 */
const mySensorsEncoder = (instance, protocol) => {
  try {
    if (
      instance &&
      instance.messageProtocol &&
      instance.messageProtocol.toLowerCase() === 'mysensors'
    ) {
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
      if (!topic || topic === null) {
        //  err = Error({message: 'Method not supported yet'});
        throw new Error('Method not supported yet');
      }
      logger(3, 'mysensors-handlers', 'encoder:res', topic);
      return {topic, payload: instance.value};
    }
    throw new Error('Wrong protocol input');
  } catch (error) {
    logger(3, 'mysensors-handlers', 'encoder:err', error);
    return error;
  }
};

module.exports = {
  mySensorsEncoder,
};
