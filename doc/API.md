## Functions

<dl>
<dt><a href="#duration">duration([duration], [defaultOrOptions], [options])</a> ⇒ <code>number</code></dt>
<dd><p>Converts different types of string durations to milliseconds, seconds, minutes, and more as numbers.</p>
</dd>
<dt><a href="#createCustom">createCustom([duration], [defaultOrOptions], [options])</a> ⇒ <code><a href="#duration">duration</a></code></dt>
<dd><p>Creates and returns a customized duration function with the given arguments.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#durationOptions">durationOptions</a> : <code>Object</code></dt>
<dd><p>Additional options to change the default behavior.</p>
</dd>
</dl>

<a name="duration"></a>

## duration([duration], [defaultOrOptions], [options]) ⇒ <code>number</code>
Converts different types of string durations to milliseconds, seconds, minutes, and more as numbers.

**Returns**: <code>number</code> - The duration in number.
                  If the given duration is invalid, the returned duration will be 0 (zero).  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[duration]</td><td><code>string</code> | <code>number</code> | <code>*</code></td><td><p>The duration(s) to parse.
                                      Multiple durations are allowed in the string separated by spaces and/or commas.
                                      Valid duration units: weeks, days, hours, minutes, seconds, and milliseconds.
                                      Possible duration unit variations:
                                          - milliseconds: &#39;ms&#39;, &#39;millisecond&#39;, &#39;milliseconds&#39;
                                          - seconds:      &#39;s&#39;,  &#39;sec&#39;,         &#39;second&#39;,      &#39;seconds&#39;
                                          - minutes:      &#39;m&#39;,  &#39;min&#39;,         &#39;minute&#39;,      &#39;minutes&#39;
                                          - hours:        &#39;h&#39;,  &#39;hour&#39;,        &#39;hours&#39;
                                          - days:         &#39;d&#39;,  &#39;day&#39;,         &#39;days&#39;
                                          - weeks:        &#39;w&#39;,  &#39;week&#39;,        &#39;weeks&#39;</p>
</td>
    </tr><tr>
    <td>[defaultOrOptions]</td><td><code>string</code> | <code>number</code> | <code><a href="#durationOptions">durationOptions</a></code></td><td><p>The default duration as a fallback or additional
                                                                  options. If unspecified, the default fallback
                                                                  duration is 0 (zero).</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code><a href="#durationOptions">durationOptions</a></code></td><td><p>Additional options to change
                                                                  the default behavior.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
duration('3.5h');
duration('1.5h');
duration('175min');
duration('42 sec');
duration('300ms');
duration('1 hour 23 minutes 45 seconds 600 milliseconds');
```
<a name="createCustom"></a>

## createCustom([duration], [defaultOrOptions], [options]) ⇒ [<code>duration</code>](#duration)
Creates and returns a customized duration function with the given arguments.

**Returns**: [<code>duration</code>](#duration) - The customized duration function.  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[duration]</td><td><code>string</code> | <code>number</code> | <code>*</code></td><td><p>The duration(s) to parse.
                                      Multiple durations are allowed in the string separated by spaces and/or commas.
                                      Valid duration units: weeks, days, hours, minutes, seconds, and milliseconds.
                                      Possible duration unit variations:
                                          - milliseconds: &#39;ms&#39;, &#39;millisecond&#39;, &#39;milliseconds&#39;
                                          - seconds:      &#39;s&#39;,  &#39;sec&#39;,         &#39;second&#39;,      &#39;seconds&#39;
                                          - minutes:      &#39;m&#39;,  &#39;min&#39;,         &#39;minute&#39;,      &#39;minutes&#39;
                                          - hours:        &#39;h&#39;,  &#39;hour&#39;,        &#39;hours&#39;
                                          - days:         &#39;d&#39;,  &#39;day&#39;,         &#39;days&#39;
                                          - weeks:        &#39;w&#39;,  &#39;week&#39;,        &#39;weeks&#39;</p>
</td>
    </tr><tr>
    <td>[defaultOrOptions]</td><td><code>string</code> | <code>number</code> | <code><a href="#durationOptions">durationOptions</a></code></td><td><p>The default duration as a fallback or additional
                                                                  options. If unspecified, the default fallback
                                                                  duration is 0 (zero).</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code><a href="#durationOptions">durationOptions</a></code></td><td><p>Additional options to change
                                                                  the default behavior.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
duration('3.5h');
duration('1.5h');
duration('175min');
duration('42 sec');
duration('300ms');
duration('1 hour 23 minutes 45 seconds 600 milliseconds');
```
<a name="durationOptions"></a>

## durationOptions : <code>Object</code>
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
    <td>[unit]</td><td><code>string</code></td><td><code>&quot;&#x27;ms&#x27;&quot;</code></td><td><p>The unit in which the returned duration will be converted to.
                                   By default, the returned duration will be in milliseconds (&#39;ms&#39;).
                                   Possible units are the same as for the durations to parse
                                   (from milliseconds to weeks).</p>
</td>
    </tr><tr>
    <td>[round]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, the returned duration will be rounded. By default, it&#39;s true.</p>
</td>
    </tr>  </tbody>
</table>

