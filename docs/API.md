<a name="module_@standards/duration"></a>

## @standards/duration

* [@standards/duration](#module_@standards/duration)
    * [~duration([duration], [defaultOrOptions], [options])](#module_@standards/duration..duration) ⇒ <code>number</code>
    * [~createCustom([duration], [defaultOrOptions], [options])](#module_@standards/duration..createCustom) ⇒ <code>duration</code>
    * [~durationOptions](#module_@standards/duration..durationOptions) : <code>Object</code>

<a name="module_@standards/duration..duration"></a>

### @standards/duration~duration([duration], [defaultOrOptions], [options]) ⇒ <code>number</code>
Converts different types of string durations to milliseconds, seconds, minutes, and more as numbers.

**Returns**: <code>number</code> - The duration in number.
                  If the given duration is invalid, the returned duration will be `0` *(zero)*.  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[duration]</td><td><code>string</code> | <code>number</code> | <code>*</code></td><td><p>The duration(s) to parse.</p>
<p>  Multiple durations are allowed in the string separated by spaces and/or commas.</p>
<p>  Valid duration units: <strong>weeks</strong>, <strong>days</strong>, <strong>hours</strong>, <strong>minutes</strong>, <strong>seconds</strong>, and <strong>milliseconds</strong>.
  Possible duration unit variations:</p>
<ul>
<li>milliseconds: <code>&#39;ms&#39;</code>, <code>&#39;millisecond&#39;</code>, <code>&#39;milliseconds&#39;</code></li>
<li>seconds:      <code>&#39;s&#39;</code>,  <code>&#39;sec&#39;</code>,         <code>&#39;second&#39;</code>,      <code>&#39;seconds&#39;</code></li>
<li>minutes:      <code>&#39;m&#39;</code>,  <code>&#39;min&#39;</code>,         <code>&#39;minute&#39;</code>,      <code>&#39;minutes&#39;</code></li>
<li>hours:        <code>&#39;h&#39;</code>,  <code>&#39;hour&#39;</code>,        <code>&#39;hours&#39;</code></li>
<li>days:         <code>&#39;d&#39;</code>,  <code>&#39;day&#39;</code>,         <code>&#39;days&#39;</code></li>
<li>weeks:        <code>&#39;w&#39;</code>,  <code>&#39;week&#39;</code>,        <code>&#39;weeks&#39;</code></li>
</ul>
</td>
    </tr><tr>
    <td>[defaultOrOptions]</td><td><code>string</code> | <code>number</code> | <code>durationOptions</code></td><td><p>The default duration as a fallback or additional options.</p>
<p>  If unspecified, the default fallback duration is 0 (zero).</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>durationOptions</code></td><td><p>Additional options to change the default behavior.</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(General Usage)*  
```js
// these will return milliseconds
duration('3.5h') // === 12600000
duration('1.5h') // === 5400000
duration('175min') // === 10500000
duration('300ms') // === 300
```
**Example** *(Unit Varieties)*  
```js
// singulars, plurals, and shorthands work as expected
duration('2s') // === 2000
duration('2sec') // === 2000
duration('2second') // === 2000
duration('2seconds') // === 2000
duration('2 second') // === 2000
duration('2 seconds') // === 2000
```
**Example** *(Whitespaces)*  
```js
// whitespaces don't matter
duration('42 sec') // === 42000
duration(' 42sec') // === 42000
duration('42sec ') // === 42000
duration('   42   sec   ') // === 42000
```
**Example** *(Separators)*  
```js
// commas, underscores, and dashes are allowed
duration('10000 sec') // === 10000000
duration('10,000 sec') // === 10000000
duration('10_000 sec') // === 10000000
duration('10-000 sec') // === 10000000
```
**Example** *(Unit Tolerance)*  
```js
// multiple units are allowed too, even the crazier ones
duration('1 hour 23 minutes 45 seconds 600 milliseconds') // === 5025600
duration('100ms 200ms') // === 300
duration('500ms 400ms 300ms 200ms 100ms') // === 1500
duration('1s 2sec 3secs 4second 5seconds') // === 15000
duration('1.1h 2.2h 3.3h 4.4h 5.5h') // === 59400000
duration('0.5d 1.0day 1.5day 2.0days') // === 432000000
```
**Example** *(Custom Fallback)*  
```js
// these will return the fallback duration
duration(undefined, '1 hour') // === 3600000
duration(null, '45 min') // === 2700000
duration(false, '60sec') // === 60000
```
**Example** *(Custom Return Unit)*  
```js
// 1 hour in seconds
duration('1 h', { unit: 's' }) // === 3600

// 2 days in minutes
duration('2 days', { unit: 'minutes' }) // === 2880

// 3 weeks, 5 days and 12 hours in hours
duration('3w 5days 12 h', { unit: 'h' }) // === 636
```
**Example** *(CommonJS Require)*  
```js
const duration = require('@standards/duration')

duration('42 sec') // === 42000
```
**Example** *(ES Module Import)*  
```js
import duration from '@standards/duration'

duration('42 sec') // === 42000
```
<a name="module_@standards/duration..createCustom"></a>

### @standards/duration~createCustom([duration], [defaultOrOptions], [options]) ⇒ <code>duration</code>
Creates a customized duration function with the given arguments.

**Returns**: <code>duration</code> - The customized duration function.  
**See**: [@standards/duration~duration](@standards/duration~duration)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[duration]</td><td><code>string</code> | <code>number</code> | <code>*</code></td><td><p>The duration(s) to parse.</p>
</td>
    </tr><tr>
    <td>[defaultOrOptions]</td><td><code>string</code> | <code>number</code> | <code>durationOptions</code></td><td><p>The default duration as a fallback or additional options.</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>durationOptions</code></td><td><p>Additional options to change the default behavior.</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(CommonJS)*  
```js
const duration = require('@standards/duration')

// custom duration function
// with 1 hour as a fallback, return unit is in seconds
const custom = duration.createCustom(null, '1 hour', { unit: 'sec' })
```
**Example** *(ES Module)*  
```js
import { createCustom } from '@standards/duration'

// custom duration function
// with 1 hour as a fallback, return unit is in seconds
const custom = createCustom(null, '1 hour', { unit: 'sec' })
```
**Example** *(Custom Duration Function)*  
```js
// will return the fallback, which is "1 hour" in seconds ({ unit: 'sec' })
custom() // === 3600

// will return 2 hours in seconds, since the return unit is "sec"
custom('2 hours') // === 7200
```
<a name="module_@standards/duration..durationOptions"></a>

### @standards/duration~durationOptions : <code>Object</code>
Additional options to change the default behavior.

**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[unit]</td><td><code>string</code></td><td><code>&quot;ms&quot;</code></td><td><p>The unit in which the returned duration will be converted to.</p>
<p>  By default, the returned duration will be in milliseconds (<code>&#39;ms&#39;</code>).
  Possible units are the same as for the durations to parse (from milliseconds to weeks).</p>
</td>
    </tr><tr>
    <td>[round]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, the returned duration will be rounded. By default, it&#39;s <code>true</code>.</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Duration Options)*  
```js
// without fallback
duration('42 sec', { unit: 'sec', round: false })

// with fallback
duration('42 sec', '1 sec', { unit: 'sec', round: false })
```
