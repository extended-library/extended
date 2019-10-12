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

## :thinking:	Why?

- **1.:** It's **more intuitive** for everyday use, when dealing with durations :heart::

  ```javascript    
  // general job cycle
  const cycle = duration('36 hours') // === 129600000 in milliseconds

  // movie playtime
  const length = duration('2h 41m') // === 9660000 in milliseconds

  // custom notification set by a user
  const notifyIn = duration('24 hours 36 minutes 49 seconds') // === 88609000

  // delays the execution for ~15,000 milliseconds
  await delay(duration('15 seconds'))
  ```

- **2.:** It's easier, when **handling larger or more complex durations** :muscle::
  
  ```javascript
  // will log out "It is time!" in ~60,000 milliseconds
  setTimeout(() => console.log('It is time!'), duration('1 min'))

  // will log out "It is time again!" in every ~12,500 milliseconds
  setInterval(() => console.log('It is time again!'), duration('12.5 sec'))

  // 15552000000 milliseconds from now
  const date = new Date(Date.now() + duration('180 days'))
  document.cookie = 'value=42;expires=' + date.toUTCString() + ';path=/')  
  ```

- **3.:** It's **highly configurable** and the inputs are **cached** :godmode::

  ```javascript
  // custom return unit with a default fallback
  duration('42 hours', '1 hour', { unit: 'seconds' }) // === 151200 in seconds

  // create a custom duration function with predefined arguments
  const custom = createCustom(0, '1 day', { unit: 'seconds' })

  // will return the given duration in seconds ({ unit: 'seconds' })
  custom('1 hour') // === 3600 in seconds
  ```

## :package: Installation

- **NPM:**

  ```bash
  npm install @jessling/duration --save
  ```

- **Yarn:**

  ```bash
  yarn add @jessling/duration
  ```

## :coffee: Usage

**@jessling/duration** can be used in **Node.js**, in the **Browser**, and ***in every*** current module format, system, environment, and variety including **CommonJS**, **ESM**, **UMD**, **AMD**, **SystemJS** and [***more***][url-cdn].

- **CommonJS:**

  ```javascript
  const duration = require('@jessling/duration')
  ```

- **ES Module:**

  ```javascript
  import duration from '@jessling/duration'
  ```

- **In Browser**:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@jessling/duration/dist/duration.umd.min.js"></script>    
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      console.log(duration('42 sec')) // === 42000
    })
  </script>
  ```

- **AMD, SystemJS, IIFE, and Others:**

  Check out the [**additional variations and SRI hashes on jsDelivr CDN**][url-cdn].

### :satisfied: Usage - General

```javascript
// these will return milliseconds
duration('3.5h') // === 12600000
duration('1.5h') // === 5400000
duration('175min') // === 10500000
duration('300ms') // === 300

// singulars, plurals, and shorthands work as expected
duration('2s') // === 2000
duration('2sec') // === 2000
duration('2second') // === 2000
duration('2seconds') // === 2000
duration('2 second') // === 2000
duration('2 seconds') // === 2000

// whitespaces don't matter
duration('42 sec') // === 42000
duration(' 42sec') // === 42000
duration('42sec ') // === 42000
duration('   42   sec   ') // === 42000

// commas, underscores, and dashes are allowed
duration('10000 sec') // === 10000000
duration('10,000 sec') // === 10000000
duration('10_000 sec') // === 10000000
duration('10-000 sec') // === 10000000

// multiple units are allowed too, even the crazier ones
duration('1 hour 23 minutes 45 seconds 600 milliseconds') // === 5025600
duration('100ms 200ms') // === 300
duration('500ms 400ms 300ms 200ms 100ms') // === 1500
duration('1s 2sec 3secs 4second 5seconds') // === 15000
duration('1.1h 2.2h 3.3h 4.4h 5.5h') // === 59400000
duration('0.5d 1.0day 1.5day 2.0days') // === 432000000
```

### :yum: Usage - Custom Fallback

```javascript
// these will return the fallback duration
duration(undefined, '1 hour') // === 3600000
duration(null, '45 min') // === 2700000
duration(false, '60sec') // === 60000
```

### :heart_eyes: Usage - Custom Return Unit

```javascript
// 1 hour in seconds
duration('1 h', { unit: 's' }) // === 3600

// 2 days in minutes
duration('2 days', { unit: 'minutes' }) // === 2880

// 3 weeks, 5 days and 12 hours in hours
duration('3w 5days 12 h', { unit: 'h' }) // === 636
```

### :anguished: Usage - Custom Duration Function

```javascript
// ---------- in CommonJS --------------------
const duration = require('@jessling/duration')

// custom duration function
// with 1 hour as a fallback, return unit is in seconds
const custom = duration.createCustom(null, '1 hour', { unit: 'sec' })
```

```javascript
// ---------- in ES Module ----------------------
import { createCustom } from '@jessling/duration'

// custom duration function
// with 1 hour as a fallback, return unit is in seconds
const custom = createCustom(null, '1 hour', { unit: 'sec' })
```

```javascript
// will return the fallback, which is "1 hour" in seconds ({ unit: 'sec' })
custom() // === 3600

// will return 2 hours in seconds, since the return unit is "sec"
custom('2 hours') // === 7200
```

---

## :computer: API

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
const duration = require('@jessling/duration')

duration('42 sec') // === 42000
```
**Example** *(ES Module Import)*  
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

// custom duration function
// with 1 hour as a fallback, return unit is in seconds
const custom = duration.createCustom(null, '1 hour', { unit: 'sec' })
```
**Example** *(ES Module)*  
```js
import { createCustom } from '@jessling/duration'

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
<!--- api %> --->

---

## :star: Related

Check out the [official website][url-website] for more tools, utilities, and packages and follow on [Twitter][url-twitter].

Find more **@jessling** packages on [NPM][url-npm] and [GitHub][url-github].

## :beers: Contribution

**Any contribution is ***highly*** appreciated**. To get going, check out the [**contribution guidelines**][url-contrib-doc].

***Thank you and have fun!***

## :copyright: License

[ISC][url-license-doc] @ [Richard King](https://www.richrdkng.com)

  <!--- References ======================================================== --->

  <!--- Badges -->
  
  <!--- URLs --->
  [url-license-doc]: https://github.com/jessling/duration/blob/master/LICENSE.md
  [url-contrib-doc]: https://github.com/jessling/duration/blob/master/.github/CONTRIBUTING.md
  [url-cdn]:         https://www.jsdelivr.com/package/npm/@jessling/duration?path=dist
  [url-npm]:         https://www.npmjs.com/search?q=keywords:@jessling
  [url-github]:      https://github.com/jessling
  [url-website]:     https://jessling.github.io
  [url-twitter]:     https://twitter.com/_jessling
