## Objects

<dl>
<dt><a href="#protocolRef">protocolRef</a> : <code>object</code></dt>
<dd><p>References used to validate <a href="/mysensors/#mysensorsapi">MySensors</a> payloads</p>
</dd>
<dt><a href="#labelsCommand">labelsCommand</a> : <code>object</code></dt>
<dd><p>Labels used in Mysensors message to identify commands.</p>
</dd>
<dt><a href="#labelsPresentation">labelsPresentation</a> : <code>object</code></dt>
<dd><p>Labels used in Mysensors message to identify sensor type in presentation commands.</p>
</dd>
<dt><a href="#labelsSet">labelsSet</a> : <code>object</code></dt>
<dd><p>Labels used in Mysensors message to identify sensor type in Set/req commands.</p>
</dd>
<dt><a href="#labelsInternal">labelsInternal</a> : <code>object</code></dt>
<dd><p>Labels used in Mysensors message to identify sensor type in Internal commands.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#mySensorsToOmaObject">mySensorsToOmaObject(msg)</a> ⇒ <code>object</code> | <code>null</code></dt>
<dd><p>Find corresponding <a href="/mysensors/#omaobjects">OMA object</a> following a MySensors presentation message</p>
</dd>
<dt><a href="#mySensorsToOmaResources">mySensorsToOmaResources(msg)</a> ⇒ <code>object</code> | <code>null</code></dt>
<dd><p>Find corresponding <a href="/mysensors/#omaresources">OMA resource</a> to incoming MySensors datas</p>
</dd>
<dt><a href="#mySensorsDecoder">mySensorsDecoder(packet, protocol)</a> ⇒ <code>object</code> | <code>null</code></dt>
<dd><p>Convert incoming MySensors data to Aloes Client
pattern - &quot;+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type&quot;</p>
</dd>
<dt><a href="#mySensorsPatternDetector">mySensorsPatternDetector(packet)</a> ⇒ <code>object</code> | <code>null</code></dt>
<dd><p>Check incoming MQTT packet against <a href="/mysensors/#mysensorsapi">MySensors Serial API</a>
pattern - &quot;+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type&quot;</p>
</dd>
<dt><a href="#mySensorsEncoder">mySensorsEncoder(instance, protocol)</a> ⇒ <code>object</code> | <code>null</code></dt>
<dd><p>Convert incoming Aloes Client data to <a href="/mysensors/#mysensorsapi">MySensors protocol</a>
pattern - &quot;+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type&quot;</p>
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
References used to validate [MySensors](/mysensors/#mysensorsapi) payloads

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pattern | <code>string</code> | The pattern used by [MySensors](/mysensors/#mysensorsapi) MQTT devices. |
| validators | <code>object</code> | Check inputs / build outputs |
| validators.nodeId | <code>array</code> |  |
| validators.methods | <code>array</code> | [0, 1, 2, 3, 4]. |

<a name="labelsCommand"></a>

## labelsCommand : <code>object</code>
Labels used in Mysensors message to identify commands.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Type | <code>string</code> | [MySensors](/mysensors/#mysensorsapi) Type |
| value | <code>number</code> | MySensors Type value ( used by transport ) |
| description | <code>string</code> | MySensors Type description |

<a name="labelsPresentation"></a>

## labelsPresentation : <code>object</code>
Labels used in Mysensors message to identify sensor type in presentation commands.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Type | <code>string</code> | [MySensors](/mysensors/#mysensorsapi) Type |
| value | <code>number</code> | MySensors Type value ( used by transport ) |
| omaObject | <code>number</code> | [OMA Object](/mysensors/#omaobjects) ID |
| description | <code>string</code> | MySensors Type description |
| resources | <code>Array.&lt;string&gt;</code> | MySensors variable subtype used by this type |

<a name="labelsSet"></a>

## labelsSet : <code>object</code>
Labels used in Mysensors message to identify sensor type in Set/req commands.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Type | <code>string</code> | MySensors subtype |
| value | <code>number</code> | MySensors Subype value ( used by transport ) |
| omaResources | <code>object</code> | [OMA Resources](/mysensors/#omaresources) attached to `labelsPresentation[0].omaObject` |
| Unit | <code>string</code> | Sensor value unit |
| description | <code>string</code> | MySensors Subtype description |
| sensorTypes | <code>Array.&lt;string&gt;</code> | MySensors Type(s) using this variable |

<a name="labelsInternal"></a>

## labelsInternal : <code>object</code>
Labels used in Mysensors message to identify sensor type in Internal commands.

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Type | <code>string</code> | MySensors subtype |
| value | <code>number</code> | MySensors Subype value ( used by transport ) |
| description | <code>string</code> | MySensors Subtype description |

<a name="mySensorsToOmaObject"></a>

## mySensorsToOmaObject(msg) ⇒ <code>object</code> \| <code>null</code>
Find corresponding [OMA object](/mysensors/#omaobjects) following a MySensors presentation message

**Kind**: global function  
**Returns**: <code>object</code> \| <code>null</code> - sensor  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>object</code> | Decoded MQTT packet. |

<a name="mySensorsToOmaResources"></a>

## mySensorsToOmaResources(msg) ⇒ <code>object</code> \| <code>null</code>
Find corresponding [OMA resource](/mysensors/#omaresources) to incoming MySensors datas

**Kind**: global function  
**Returns**: <code>object</code> \| <code>null</code> - sensor  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>object</code> | Decoded MQTT packet. |

<a name="mySensorsDecoder"></a>

## mySensorsDecoder(packet, protocol) ⇒ <code>object</code> \| <code>null</code>
Convert incoming MySensors data to Aloes Client
pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"

**Kind**: global function  
**Returns**: <code>object</code> \| <code>null</code> - sensor  

| Param | Type | Description |
| --- | --- | --- |
| packet | <code>object</code> | Incoming MQTT packet. |
| protocol | <code>object</code> | Protocol paramters ( coming from patternDetector ). |

<a name="mySensorsPatternDetector"></a>

## mySensorsPatternDetector(packet) ⇒ <code>object</code> \| <code>null</code>
Check incoming MQTT packet against [MySensors Serial API](/mysensors/#mysensorsapi)
pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"

**Kind**: global function  
**Returns**: <code>object</code> \| <code>null</code> - pattern  
**Mthod**: mySensorsPatternDetector  

| Param | Type | Description |
| --- | --- | --- |
| packet | <code>object</code> | The MQTT packet. |

<a name="mySensorsEncoder"></a>

## mySensorsEncoder(instance, protocol) ⇒ <code>object</code> \| <code>null</code>
Convert incoming Aloes Client data to [MySensors protocol](/mysensors/#mysensorsapi)
pattern - "+prefixedDevEui/+nodeId/+sensorId/+method/+ack/+type"

**Kind**: global function  
**Returns**: <code>object</code> \| <code>null</code> - packet  
**Throws**:

- <code>Error</code> 'Wrong protocol input'


| Param | Type | Description |
| --- | --- | --- |
| instance | <code>object</code> | Sensor instance. |
| protocol | <code>object</code> | Protocol parameters ( coming from patternDetector ). |

<a name="external_OmaObjects"></a>

## OmaObjects
Oma Object References.

**Kind**: global external  
**See**: [https://aloes.io/app/api/omaObjects](https://aloes.io/app/api/omaObjects)  
<a name="external_OmaResources"></a>

## OmaResources
Oma Resources References.

**Kind**: global external  
**See**: [https://aloes.io/app/api/omaResources](https://aloes.io/app/api/omaResources)  
<a name="external_MySensorsAPI"></a>

## MySensorsAPI
MySensors Serial API

**Kind**: global external  
**See**: [https://www.mysensors.org/download/serial_api_20](https://www.mysensors.org/download/serial_api_20)  
