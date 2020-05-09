export type Value = string | number | object;

export enum Commands {
  'presentation',
  'set',
  'req',
  'internal',
  'stream',
}

export enum SensorTypes {
  'S_DOOR',
  'S_MOTION',
  'S_SMOKE',
  'S_BINARY',
  'S_DIMMER',
  'S_COVER',
  'S_TEMP',
  'S_HUM',
  'S_BARO',
  'S_WIND',
  'S_RAIN',
  'S_UV',
  'S_WEIGHT',
  'S_POWER',
  'S_HEATER',
  'S_DISTANCE',
  'S_LIGHT_LEVEL',
  'S_ARDUINO_NODE',
  'S_ARDUINO_REPEATER_NODE',
  'S_LOCK',
  'S_IR',
  'S_WATER',
  'S_AIR_QUALITY',
  'S_CUSTOM',
  'S_DUST',
  'S_SCENE_CONTROLLER',
  'S_RGB_LIGHT',
  'S_RGBW_LIGHT',
  'S_COLOR_SENSOR',
  'S_HVAC',
  'S_MULTIMETER',
  'S_SPRINKLER',
  'S_WATER_LEAK',
  'S_SOUND',
  'S_VIBRATION',
  'S_MOISTURE',
  'S_INFO',
  'S_GAS',
  'S_GPS',
  'S_WATER_QUALITY',
}

export enum VariableTypes {
  'V_TEMP',
  'V_HUM',
  'V_STATUS',
  'V_PERCENTAGE',
  'V_PRESSURE',
  'V_FORECAST',
  'V_RAIN',
  'V_RAINRATE',
  'V_WIND',
  'V_GUST',
  'V_DIRECTION',
  'V_UV',
  'V_WEIGHT',
  'V_DISTANCE',
  'V_IMPEDANCE',
  'V_ARMED',
  'V_TRIPPED',
  'V_WATT',
  'V_KWH',
  'V_SCENE_ON',
  'V_SCENE_OFF',
  'V_HVAC_FLOW_STATE',
  'V_HVAC_SPEED',
  'V_LIGHT_LEVEL',
  'V_VAR1',
  'V_VAR2',
  'V_VAR3',
  'V_VAR4',
  'V_VAR5',
  'V_UP',
  'V_DOWN',
  'V_STOP',
  'V_IR_SEND',
  'V_IR_RECEIVE',
  'V_FLOW',
  'V_VOLUME',
  'V_LOCK_STATUS',
  'V_LEVEL',
  'V_VOLTAGE',
  'V_CURRENT',
  'V_RGB',
  'V_RGBW',
  'V_ID',
  'V_UNIT_PREFIX',
  'V_HVAC_SETPOINT_COOL',
  'V_HVAC_SETPOINT_HEAT',
  'V_HVAC_FLOW_MODE',
  'V_TEXT',
  'V_CUSTOM',
  'V_POSITION',
  'V_IR_RECORD',
  'V_PH',
  'V_ORP',
  'V_VAR',
  'V_VA',
  'V_POWER_FACTOR',
}

export enum InternalTypes {
  'I_BATTERY_LEVEL',
  'I_TIME',
  'I_VERSION',
  'I_ID_REQUEST',
  'I_ID_RESPONSE',
  'I_INCLUSION_MODE',
  'I_BATTERY_LEVEL',
  'I_CONFIG',
  'I_FIND_PARENT',
  'I_FIND_PARENT_RESPONSE',
  'I_LOG_MESSAGE',
  'I_CHILDREN',
  'I_SKETCH_NAME',
  'I_SKETCH_VERSION',
  'I_REBOOT',
  'I_GATEWAY_READY',
  'I_SIGNING_PRESENTATION',
  'I_NONCE_REQUEST',
  'I_NONCE_RESPONSE',
  'I_HEARTBEAT_REQUEST',
  'I_PRESENTATION',
  'I_DISCOVER_REQUEST',
  'I_DISCOVER_RESPONSE',
  'I_HEARTBEAT_RESPONSE',
  'I_LOCKED',
  'I_PING',
  'I_PONG',
  'I_REGISTRATION_REQUEST',
  'I_REGISTRATION_RESPONSE',
  'I_DEBUG',
}

export enum Units {
  '°C',
  '%',
  'Pa',
  'mm',
  'm',
  'mm/d',
  'kg',
  'W',
  'kWh',
  'mV',
  'V',
  'ms/cm',
  'VA',
}

export type Sensor = {
  name: string;
  devEui: string;
  value: Value;
  type: number;
  resources?: object;
  resource: number;
  createdAt: Date;
  lastSignal: Date;
  frameCounter: number;
  icons?: string[];
  colors?: object;
  transportProtocol: string;
  transportProtocolVersion?: string;
  messageProtocol: string;
  messageProtocolVersion?: string;
  nativeSensorId: string;
  nativeNodeId?: string;
  nativeType: number;
  nativeResource?: number;
  // nativeType?: SensorTypes;
  // nativeResource?: VariableTypes;
  inputPath?: string;
  outputPath?: string;
  inPrefix?: string;
  outPrefix?: string;
};

// export enum Methods {
//   '0',
//   '1',
//   '2',
//   '3',
//   '4',
// }

export enum OuputMethods {
  'HEAD',
  'POST',
  'GET',
  'PUT',
  'DELETE',
  'STREAM',
}

export enum Directions {
  '-in',
  '-out',
}

export enum MySensorsCommands {
  'presentation',
  'set',
  'req',
  'internal',
  'stream',
}

export type MySensorProtocol = {
  prefixedDevEui: string;
  nodeId: number;
  sensorId: number;
  type: number;
  ack: string;
  method: string;
};

export type Pattern = {
  name: string;
  params: MySensorProtocol;
};

export type Packet = {
  topic: string;
  payload: Value;
};

export type ProtocolRef = {
  pattern: string;
  validators: {
    userId: string;
    nodeId: number;
    sensorId: number;
    type: number;
    methods: [0, 1, 2, 3, 4];
    directions: Directions[];
  };
};

export type LabelCommand = {
  Type: MySensorsCommands;
  value: number;
  description: string;
};

export type LabelPresentation = {
  Type: SensorTypes;
  value: number;
  description: string;
  // omaObject: OmaObjectId,
  omaObject: number;
  ressources: VariableTypes[];
};

export type LabelSet = {
  Type: VariableTypes;
  value: number;
  omaResources: {[key: string]: Value};
  Unit: Units;
  description: string;
  sensorTypes: SensorTypes[];
};

export type LabelInternal = {
  Type: InternalTypes;
  value: number;
  description: string;
};

export declare const protocolRef: ProtocolRef;

export declare const labelsCommand: LabelCommand[];

export declare const labelsPresentation: LabelPresentation[];

export declare const labelsSet: LabelSet[];

export declare const labelsInternal: LabelInternal[];

export declare function mySensorsEncoder(
  instance: Sensor,
  protocol: MySensorProtocol,
): Packet | null;

export declare function mySensorsDecoder(
  packet: Packet,
  protocol: MySensorProtocol,
): Sensor | null;

export declare function mySensorsPatternDetector(
  packet: Packet,
): Pattern | null;
