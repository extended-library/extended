# @jessling/duration

<!-- Badges - 1st row -->
<p align="center">
  <!-- NPM badge -->
  <a href="https://www.npmjs.com/package/@jessling/duration"><img src="https://img.shields.io/npm/v/@jessling/duration?color=brightgreen&style=flat-square" alt="release-badge"></a>
  <!-- CI badge -->
  <a href="https://travis-ci.org/jessling/duration"><img src="https://img.shields.io/travis/jessling/duration.svg?style=flat-square" alt="ci-badge"></a>
  <!-- Coverage badge -->
  <a href="https://codecov.io/gh/jessling/duration"><img src="https://img.shields.io/codecov/c/github/jessling/duration?style=flat-square" alt="coverage-badge"></a>
  <!-- Dependency badge -->
  <a href="https://greenkeeper.io"><img src="https://badges.greenkeeper.io/jessling/duration.svg?style=flat-square" alt="dependency-badge"></a>
  <!-- Documentation badge -->
  <a href="https://github.com/jessling/duration/blob/master/doc/API.md"><img src="https://inch-ci.org/github/jessling/duration.svg?branch=master&style=flat-square" alt="documentation-badge"></a>
</p>

<!-- Badges - 2nd row -->
<p align="center">
  <!-- Code style badge -->
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/style-standardjs-f1d300.svg?style=flat-square" alt="code-style-badge"></a>
  <!-- Commit style badge -->
  <a href="https://commitizen.github.io/cz-cli"><img src="https://img.shields.io/badge/commit-commitizen-fe7d37.svg?style=flat-square" alt="commit-style-badge"></a>
  <!-- Release workflow badge -->
  <a href="https://semantic-release.gitbook.io/semantic-release"><img src="https://img.shields.io/badge/release-semantic--release-e10079.svg?style=flat-square" alt="release-workflow-badge"></a>
  <!-- License badge -->
  <a href="https://github.com/jessling/duration/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square" alt="license-badge"></a>
  <!-- Contribution badge -->
  <a href="https://github.com/jessling/duration/blob/master/.github/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="contribution-badge"></a>
</p>

---

<h3 align="center">
  Human-readable, convenient, friendly durations.
</h3>

<p align="center">
  Converts durations given as <b>strings to milliseconds</b> or to custom units from milliseconds to weeks.
</p>

---

## Why?

- **1.:** ...
- **2.:** ...
- **3.:** ...

## Installation

```
$ npm install @jessling/duration --save
```

```
$ yarn add @jessling/duration
```

## Usage

  - **CommonJS:**
  
    ```javascript
    const duration = require('@jessling/duration')
    ```

 - **ES Module:**

    ```javascript
    import duration from '@jessling/duration'
    ```

## API

<!--- <% api --->
<a name="module_@jessling/duration"></a>

### @jessling/duration

* [@jessling/duration](#module_@jessling/duration)
    * [~duration([duration], [defaultOrOptions], [options])](#module_@jessling/duration..duration) ⇒ <code>number</code>
    * [~createCustom([duration], [defaultOrOptions], [options])](#module_@jessling/duration..createCustom) ⇒ <code>duration</code>
    * [~durationOptions](#module_@jessling/duration..durationOptions) : <code>Object</code>

<a name="module_@jessling/duration..duration"></a>

#### @jessling/duration~duration([duration], [defaultOrOptions], [options]) ⇒ <code>number</code>
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

**Example** *(General usage)*  
```js
// the returned values are in milliseconds
duration('3.5h') // === 12600000
duration('1.5h') // === 5400000
duration('175min') // === 10500000
duration('42 sec') // === 42000
duration('300ms') // === 300
duration('1 hour 23 minutes 45 seconds 600 milliseconds') // === 5025600
```
**Example** *(CommonJS)*  
```js
const duration = require('@jessling/duration')

duration('42 sec') // === 42000
```
**Example** *(ES Module)*  
```js
import duration from '@jessling/duration'

duration('42 sec') // === 42000
```
<a name="module_@jessling/duration..createCustom"></a>

#### @jessling/duration~createCustom([duration], [defaultOrOptions], [options]) ⇒ <code>duration</code>
Creates a customized duration function with the given arguments.

**Returns**: <code>duration</code> - The customized duration function.  
**See**: [@jessling/duration~duration](@jessling/duration~duration)  
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
const duration = require('@jessling/duration')

const custom = duration.createCustom()
```
**Example** *(ES Module)*  
```js
import { createCustom } from '@jessling/duration'

const custom = createCustom()
```
<a name="module_@jessling/duration..durationOptions"></a>

#### @jessling/duration~durationOptions : <code>Object</code>
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
    <td>[unit]</td><td><code>string</code></td><td><code>&quot;&#x27;ms&#x27;&quot;</code></td><td><p>The unit in which the returned duration will be converted to.</p>
<p>  By default, the returned duration will be in milliseconds (<code>&#39;ms&#39;</code>).
  Possible units are the same as for the durations to parse (from milliseconds to weeks).</p>
</td>
    </tr><tr>
    <td>[round]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true, the returned duration will be rounded. By default, it&#39;s true.</p>
</td>
    </tr>  </tbody>
</table>

<!--- api %> --->

## Related

Check out the [official website][url-website] for more.

Find more **@jessling** packages on [NPM][url-npm] and on [GitHub][url-github].

## Contribution

**Any contribution is ***highly*** appreciated**. To get going, check out the [**contribution guidelines**][url-contrib-doc].

***Thank you and have fun!***

## License

[ISC][url-license-doc] @ [Richard King](https://www.richrdkng.com)

  <!--- References ======================================================== --->

  <!--- Badges -->
  
  <!--- URLs --->
  [url-license-doc]: https://github.com/jessling/duration/blob/master/LICENSE.md
  [url-contrib-doc]: https://github.com/jessling/duration/blob/master/.github/CONTRIBUTING.md
  [url-npm]:         https://www.npmjs.com/search?q=keywords:@jessling
  [url-github]:      https://github.com/jessling
  [url-website]:     https://jessling.github.io
