## Objects

<dl>
<dt><a href="#protocolRef">protocolRef</a> : <code>object</code></dt>
<dd><p>References used to validate  <a href="/mysensors/#mysensorsapi">MySensors</a>  payloads</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#mySensorsToOmaObject">mySensorsToOmaObject(msg)</a> ⇒ <code>object</code></dt>
<dd><p>Find corresponding <a href="/mysensors/#omaobjects">OMA object</a> following a MySensors presentation message</p>
</dd>
<dt><a href="#mySensorsToOmaResources">mySensorsToOmaResources(msg)</a> ⇒ <code>object</code></dt>
<dd><p>Find corresponding <a href="/mysensors/#omaresources">OMA resource</a> to incoming MySensors datas</p>
</dd>
<dt><a href="#mySensorsDecoder">mySensorsDecoder(packet, protocol)</a> ⇒ <code>object</code></dt>
<dd><p>Convert incoming MySensors data to Aloes Client
pattern - &quot;+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+subType&quot;</p>
</dd>
<dt><a href="#mySensorsPatternDetector">mySensorsPatternDetector(packet)</a> ⇒ <code>object</code></dt>
<dd><p>Check incoming MQTT packet against <a href="/mysensors/#mysensorsapi">MySensors</a> Serial API
pattern - &quot;+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+subType&quot;</p>
</dd>
<dt><a href="#mySensorsEncoder">mySensorsEncoder(packet, protocol)</a></dt>
<dd><p>Convert incoming Aloes Client data to <a href="/mysensors/#mysensorsapi">MySensors</a> protocol
pattern - &quot;+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+subType&quot;</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_OmaObjects">OmaObjects</a></dt>
<dd><p>Oma Object References.</p>
</dd>
<dt><a href="#external_OmaResources">OmaResources</a></dt>
<dd><p>Oma Resources References.</p>
</dd>
<dt><a href="#external_MySensorsAPI">MySensorsAPI</a></dt>
<dd><p>MySensors Serial API</p>
</dd>
</dl>

<a name="protocolRef"></a>

## protocolRef : <code>object</code>
References used to validate  [MySensors](/mysensors/#mysensorsapi)  payloads

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pattern | <code>string</code> | The pattern used by [MySensors](/mysensors/#mysensorsapi) devices. |
| validators | <code>object</code> | Check inputs / build outputs |
| validators.nodeId | <code>array</code> |  |
| validators.methods | <code>array</code> | [0, 1, 2, 3, 4]. |
| labelsPresentation | <code>array</code> | Labels used by Mysensors to identify sensor type in presentation commands. |
| labelsPresentation[0].Type | <code>string</code> | [MySensors](/mysensors/#mysensorsapi) Type |
| labelsPresentation[0].value | <code>int</code> | MySensors Type value ( used by transport ) |
| labelsPresentation[0].omaObject | <code>int</code> | [OMA Object](/mysensors/#omaobjects) ID |
| labelsPresentation[0].description | <code>string</code> | MySensors Type description |
| labelsPresentation[0].resources | <code>string</code> | MySensors variable subtype used by this type |
| labelsSet | <code>array</code> | Labels used by Mysensors to identify sensor type in Set/req commands. |
| labelsSet[0].Type | <code>string</code> | MySensors subtype |
| labelsSet[0].value | <code>int</code> | MySensors Subype value ( used by transport ) |
| labelsSet[0].omaResources | <code>object</code> | [OMA Resources](/mysensors/#omaresources) attached to `labelsPresentation[0].omaObject` |
| labelsSet[0].Unit | <code>string</code> | Sensor value unit |
| labelsSet[0].description | <code>string</code> | MySensors Subtype description |
| labelsSet[0].sensorTypes | <code>string</code> | MySensors Type using this variable |

<a name="mySensorsToOmaObject"></a>

## mySensorsToOmaObject(msg) ⇒ <code>object</code>
Find corresponding [OMA object](/mysensors/#omaobjects) following a MySensors presentation message

**Kind**: global function  
**Returns**: <code>object</code> - composed instance  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>object</code> | Decoded MQTT packet. |

<a name="mySensorsToOmaResources"></a>

## mySensorsToOmaResources(msg) ⇒ <code>object</code>
Find corresponding [OMA resource](/mysensors/#omaresources) to incoming MySensors datas

**Kind**: global function  
**Returns**: <code>object</code> - composed instance  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>object</code> | Decoded MQTT packet. |

<a name="mySensorsDecoder"></a>

## mySensorsDecoder(packet, protocol) ⇒ <code>object</code>
Convert incoming MySensors data to Aloes Client
pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+subType"

**Kind**: global function  
**Returns**: <code>object</code> - composed instance  

| Param | Type | Description |
| --- | --- | --- |
| packet | <code>object</code> | Incoming MQTT packet. |
| protocol | <code>object</code> | Protocol paramters ( coming from patternDetector ). |

<a name="mySensorsPatternDetector"></a>

## mySensorsPatternDetector(packet) ⇒ <code>object</code>
Check incoming MQTT packet against [MySensors](/mysensors/#mysensorsapi) Serial API
pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+subType"

**Kind**: global function  
**Returns**: <code>object</code> - found pattern.name and pattern.params  
**Mthod**: mySensorsPatternDetector  

| Param | Type | Description |
| --- | --- | --- |
| packet | <code>object</code> | The MQTT packet. |

<a name="mySensorsEncoder"></a>

## mySensorsEncoder(packet, protocol)
Convert incoming Aloes Client data to [MySensors](/mysensors/#mysensorsapi) protocol
pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+subType"

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| packet | <code>object</code> | Sensor instance. |
| protocol | <code>object</code> | Protocol paramters ( coming from patternDetector ). |

<a name="external_OmaObjects"></a>

## OmaObjects
Oma Object References.

**Kind**: global external  
**See**: [https://api.aloes.io/api/omaObjects](https://api.aloes.io/api/omaObjects)  
<a name="external_OmaResources"></a>

## OmaResources
Oma Resources References.

**Kind**: global external  
**See**: [https://api.aloes.io/api/omaResources](https://api.aloes.io/api/omaResources)  
<a name="external_MySensorsAPI"></a>

## MySensorsAPI
MySensors Serial API

**Kind**: global external  
**See**: [https://www.mysensors.org/download/serial_api_20](https://www.mysensors.org/download/serial_api_20)  
