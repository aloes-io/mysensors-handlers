import mqttPattern from 'mqtt-pattern';
import {omaObjects, omaViews} from 'oma-json';
import {logger} from '../logger';
import protocolRef from './common';

/**
 * Find corresponding [OMA object]{@link /mysensors/#omaobjects} following a MySensors presentation message
 * @method mySensorsToOmaObject
 * @param {object} msg - Decoded MQTT packet.
 * @returns {object} composed instance
 */
const mySensorsToOmaObject = msg => {
  try {
    logger(4, 'mysensors-handlers', 'toOmaObject:req', msg);
    if (!msg || msg == null || msg.sensorId === 255 || msg.type === null) {
      throw new Error('Wrong instance input');
    }
    const foundOmaObject = omaObjects.find(object => object.value === msg.type);
    if (!foundOmaObject) throw new Error('no OMA Object found');
    const foundOmaViews = omaViews.find(object => object.value === msg.type);
    const decoded = {
      ...msg,
      name: foundOmaObject.name,
      icons: foundOmaViews.icons,
      colors: foundOmaViews.resources,
      resources: foundOmaObject.resources,
      frameCounter: 0,
    };
    logger(3, 'mysensors-handlers', 'toOmaObject:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'mysensors-handlers', 'toOmaObject:err', error);
    return error;
  }
};

/**
 * Find corresponding [OMA resource]{@link /mysensors/#omaresources} to incoming MySensors datas
 * @method mySensorsToOmaResources
 * @param {object} msg - Decoded MQTT packet.
 * @returns {object} composed instance
 */
const mySensorsToOmaResources = msg => {
  try {
    logger(4, 'mysensors-handlers', 'toOmaResources:req', msg);
    if (!msg || msg == null || msg.sensorId === 255 || !msg.nativeResource) {
      throw new Error('Wrong instance input');
    }
    const baseResources =
      protocolRef.labelsSet[msg.nativeResource].omaResources;
    if (!msg.resources || msg.resources == null) {
      msg.resources = baseResources;
    }
    const resourcesKeys = Object.getOwnPropertyNames(msg.resources);
    if (Object.prototype.hasOwnProperty.call(msg.resources, resourcesKeys[0])) {
      msg.resource = resourcesKeys[0];
    }
    if (!msg.resource) throw new Error('no OMA Resource found');
    const decoded = {
      ...msg,
    };
    logger(3, 'mysensors-handlers', 'toOmaResources:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'mysensors-handlers', 'toOmaResources:err', error);
    return error;
  }
};

/**
 * Convert incoming MySensors data to Aloes Client
 * pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"
 * @method mySensorsDecoder
 * @param {object} packet - Incoming MQTT packet.
 * @param {object} protocol - Protocol paramters ( coming from patternDetector ).
 * @returns {object} composed instance
 */

const mySensorsDecoder = (packet, protocol) => {
  const decoded = {};
  try {
    logger(4, 'mysensors-handlers', 'decoder:req', protocol);
    const protocolKeys = Object.getOwnPropertyNames(protocol);
    if (protocolKeys && protocolKeys.length === 6) {
      let decodedPayload;
      const gatewayIdParts = protocol.prefixedDevEui.split('-');
      const inPrefix = protocolRef.validators.directions[0];
      const outPrefix = protocolRef.validators.directions[1];
      const params = {
        ...protocol,
        prefixedDevEui: `${gatewayIdParts[0]}${inPrefix}`,
      };
      decoded.messageProtocol = 'mySensors';
      decoded.transportProtocol = 'mySensors';
      decoded.inPrefix = inPrefix;
      decoded.outPrefix = outPrefix;
      decoded.prefix = gatewayIdParts[1];
      decoded.devEui = gatewayIdParts[0];
      //  decoded.deviceId = gatewayIdParts[0];
      decoded.lastSignal = new Date();
      switch (Number(protocol.method)) {
        case 0: // Presentation
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.type =
            protocolRef.labelsPresentation[Number(protocol.type)].omaObject;
          decoded.nativeType = Number(protocol.type);
          decoded.value = packet.payload.toString();
          decoded.method = 'HEAD';
          decodedPayload = mySensorsToOmaObject(decoded);
          break;
        case 1: // Set
          decoded.inputPath = mqttPattern.fill(protocolRef.pattern, params);
          params.prefixedDevEui = `${gatewayIdParts[0]}${outPrefix}`;
          decoded.outputPath = mqttPattern.fill(protocolRef.pattern, params);
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeResource = Number(protocol.type);
          decoded.value = packet.payload;
          decoded.method = 'POST';
          decodedPayload = mySensorsToOmaResources(decoded);
          break;
        case 2: // Req
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeResource = Number(protocol.type);
          decoded.method = 'GET';
          decodedPayload = decoded;
          break;
        case 3: // Internal
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.internalType = Number(protocol.type);
          decoded.value = packet.payload.toString();
          break;
        case 4: // Stream - OTA firmware update
          decoded.nativeNodeId = protocol.nodeId;
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeResource = Number(protocol.type);
          decoded.value = packet.payload;
          decoded.method = 'STREAM';
          decodedPayload = decoded;
          break;
        default:
          break;
      }
      logger(3, 'mysensors-handlers', 'decoder:res', decodedPayload);
      return decodedPayload;
    }
    throw new Error("topic doesn't match");
  } catch (error) {
    logger(2, 'mysensors-handlers', 'decoder:err', error);
    return error;
  }
};

module.exports = {
  // mySensorsToOmaObject,
  // mySensorsToOmaResources,
  mySensorsDecoder,
};
