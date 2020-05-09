const mqttPattern = require('mqtt-pattern');
const {omaObjects, omaViews} = require('oma-json');
const logger = require('aloes-logger');
const {protocolRef, labelsPresentation, labelsSet} = require('./common');

/**
 * Find corresponding [OMA object]{@link /mysensors/#omaobjects} following a MySensors presentation message
 * @method mySensorsToOmaObject
 * @param {object} msg - Decoded MQTT packet.
 * @returns {object | null} sensor
 */
const mySensorsToOmaObject = (msg) => {
  try {
    logger(4, 'mysensors-handlers', 'toOmaObject:req', msg);
    if (!msg || msg.sensorId === 255 || msg.type === null) {
      throw new Error('Wrong instance input');
    }
    const foundOmaObject = omaObjects.find(({value}) => value === msg.type);
    if (!foundOmaObject) throw new Error('no OMA Object found');
    const foundOmaViews = omaViews.find(({value}) => value === msg.type);
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
    return null;
  }
};

/**
 * Find corresponding [OMA resource]{@link /mysensors/#omaresources} to incoming MySensors datas
 * @method mySensorsToOmaResources
 * @param {object} msg - Decoded MQTT packet.
 * @returns {object | null} sensor
 */
const mySensorsToOmaResources = (msg) => {
  try {
    logger(4, 'mysensors-handlers', 'toOmaResources:req', msg);
    if (!msg || msg.sensorId === 255 || !msg.nativeResource) {
      throw new Error('Wrong instance input');
    }

    if (!msg.resources || msg.resources === null) {
      msg.resources = labelsSet[msg.nativeResource].omaResources;
    }
    const resourcesKeys = Object.getOwnPropertyNames(msg.resources);
    if (Object.prototype.hasOwnProperty.call(msg.resources, resourcesKeys[0])) {
      msg.resource = resourcesKeys[0];
    }
    if (!msg.resource) throw new Error('no OMA Resource found');
    const decoded = {...msg};
    logger(3, 'mysensors-handlers', 'toOmaResources:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'mysensors-handlers', 'toOmaResources:err', error);
    return null;
  }
};

/**
 * Convert incoming MySensors data to Aloes Client
 * pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"
 * @method mySensorsDecoder
 * @param {object} packet - Incoming MQTT packet.
 * @param {object} protocol - Protocol paramters ( coming from patternDetector ).
 * @returns {object | null} sensor
 */

const mySensorsDecoder = (packet, protocol) => {
  try {
    logger(4, 'mysensors-handlers', 'decoder:req', protocol);
    const protocolKeys = Object.getOwnPropertyNames(protocol);
    if (!protocolKeys || protocolKeys.length !== 6) {
      throw new Error("Topic doesn't match");
    }

    let sensor;
    const type = Number(protocol.type);
    const gatewayIdParts = protocol.prefixedDevEui.split('-');
    const inPrefix = protocolRef.validators.directions[0];
    const outPrefix = protocolRef.validators.directions[1];
    const params = {
      ...protocol,
      prefixedDevEui: `${gatewayIdParts[0]}${inPrefix}`,
    };
    const decoded = {
      messageProtocol: 'mySensors',
      transportProtocol: 'mySensors',
      inPrefix,
      outPrefix,
      prefix: gatewayIdParts[1],
      devEui: gatewayIdParts[0],
      lastSignal: new Date(),
    };

    switch (Number(protocol.method)) {
      case 0: // Presentation
        decoded.nativeNodeId = protocol.nodeId;
        decoded.nativeSensorId = protocol.sensorId;
        decoded.type = labelsPresentation[type].omaObject;
        decoded.nativeType = type;
        decoded.value = packet.payload.toString();
        decoded.method = 'HEAD';
        sensor = mySensorsToOmaObject(decoded);
        break;
      case 1: // Set
        decoded.inputPath = mqttPattern.fill(protocolRef.pattern, params);
        params.prefixedDevEui = `${gatewayIdParts[0]}${outPrefix}`;
        decoded.outputPath = mqttPattern.fill(protocolRef.pattern, params);
        decoded.nativeNodeId = protocol.nodeId;
        decoded.nativeSensorId = protocol.sensorId;
        decoded.nativeResource = type;
        decoded.value = packet.payload;
        decoded.method = 'POST';
        sensor = mySensorsToOmaResources(decoded);
        break;
      case 2: // Req
        decoded.nativeNodeId = protocol.nodeId;
        decoded.nativeSensorId = protocol.sensorId;
        decoded.nativeResource = type;
        decoded.method = 'GET';
        sensor = decoded;
        break;
      case 3: // Internal
        decoded.nativeNodeId = protocol.nodeId;
        decoded.nativeSensorId = protocol.sensorId;
        decoded.internalType = type;
        decoded.value = packet.payload.toString();
        break;
      case 4: // Stream - OTA firmware update
        decoded.nativeNodeId = protocol.nodeId;
        decoded.nativeSensorId = protocol.sensorId;
        decoded.nativeResource = type;
        decoded.value = packet.payload;
        decoded.method = 'STREAM';
        sensor = decoded;
        break;
      default:
        break;
    }
    logger(3, 'mysensors-handlers', 'decoder:res', sensor);
    return sensor;
  } catch (error) {
    logger(2, 'mysensors-handlers', 'decoder:err', error);
    return null;
  }
};

module.exports = {
  mySensorsToOmaObject,
  mySensorsToOmaResources,
  mySensorsDecoder,
};
