/**
 * @module @standards/duration
 */

/**
 * A week in milliseconds.
 *
 * @private
 * @const {number}
 */
const _WEEK_IN_MS = 604800000

/**
 * A day in milliseconds
 *
 * @private
 * @const {number}
 */
const _DAY_IN_MS = 86400000

/**
 * An hour in milliseconds.
 *
 * @private
 * @const {number}
 */
const _HOUR_IN_MS = 3600000

/**
 * A minute in milliseconds.
 *
 * @private
 * @const {number}
 */
const _MINUTE_IN_MS = 60000

/**
 * A second in milliseconds.
 *
 * @private
 * @const {number}
 */
const _SECOND_IN_MS = 1000

/**
 * A map of key-value units for more compact duration parsing.
 *
 * @private
 * @const {Object}
 */
const _unitMap = {
  // weeks
  w: _WEEK_IN_MS,
  wk: _WEEK_IN_MS,
  wks: _WEEK_IN_MS,
  week: _WEEK_IN_MS,
  weeks: _WEEK_IN_MS,

  // days
  d: _DAY_IN_MS,
  dy: _DAY_IN_MS,
  day: _DAY_IN_MS,
  days: _DAY_IN_MS,

  // hours
  h: _HOUR_IN_MS,
  hr: _HOUR_IN_MS,
  hrs: _HOUR_IN_MS,
  hour: _HOUR_IN_MS,
  hours: _HOUR_IN_MS,

  // minutes
  m: _MINUTE_IN_MS,
  mn: _MINUTE_IN_MS,
  min: _MINUTE_IN_MS,
  mins: _MINUTE_IN_MS,
  minute: _MINUTE_IN_MS,
  minutes: _MINUTE_IN_MS,

  // seconds
  s: _SECOND_IN_MS,
  sec: _SECOND_IN_MS,
  secs: _SECOND_IN_MS,
  second: _SECOND_IN_MS,
  seconds: _SECOND_IN_MS,

  // milliseconds
  ms: 1,
  msec: 1,
  msecs: 1,
  millisec: 1,
  millisecond: 1,
  milliseconds: 1
}

/**
 * The pattern for duration parsing.
 *
 * @private
 * @const {RegExp}
 */
const _durationPattern = /(-?)([\d\s\-_,.]+)\s*([a-zA-Z]*)/g

/**
 * The pattern to use, when sanitizing the parsed duration.
 *
 * @private
 * @const {RegExp}
 */
const _sanitizePattern = /[\s\-_,]/g

/**
 * The cache to store the results based on the given arguments.
 *
 * @private
 * @type {Object}
 */
const _resultCache = {}

/**
 * Determines whether the given input is valid.
 *
 * @private
 * @function _isValid
 *
 * @param {*} object - The object to check, whether it has a valid value to use for duration parsing.
 *
 * @returns {boolean} The validity of the input
 */
function _isValid (object) {
  return (typeof object === 'string' && object.length > 0) ||
    (typeof object === 'number' && object > -Infinity && object < Infinity && !isNaN(object))
}

/**
 * Additional options to change the default behavior.
 *
 * @typedef {Object} durationOptions
 *
 * @property {string} [unit=ms] - The unit in which the returned duration will be converted to.
 *
 *   By default, the returned duration will be in milliseconds (`'ms'`).
 *   Possible units are the same as for the durations to parse (from milliseconds to weeks).
 *
 * @property {boolean} [round=true] - If true, the returned duration will be rounded. By default, it's `true`.
 *
 * @example <caption>Duration Options</caption>
 * // without fallback
 * duration('42 sec', { unit: 'sec', round: false })
 *
 * // with fallback
 * duration('42 sec', '1 sec', { unit: 'sec', round: false })
 */

/**
 * Converts different types of string durations to milliseconds, seconds, minutes, and more as numbers.
 *
 * @function duration
 *
 * @param {string|number|*} [duration] - The duration(s) to parse.
 *
 *   Multiple durations are allowed in the string separated by spaces and/or commas.
 *
 *   Valid duration units: **weeks**, **days**, **hours**, **minutes**, **seconds**, and **milliseconds**.
 *   Possible duration unit variations:
 *
 *   - milliseconds: `'ms'`, `'millisecond'`, `'milliseconds'`
 *   - seconds:      `'s'`,  `'sec'`,         `'second'`,      `'seconds'`
 *   - minutes:      `'m'`,  `'min'`,         `'minute'`,      `'minutes'`
 *   - hours:        `'h'`,  `'hour'`,        `'hours'`
 *   - days:         `'d'`,  `'day'`,         `'days'`
 *   - weeks:        `'w'`,  `'week'`,        `'weeks'`
 *
 * @param {string|number|durationOptions} [defaultOrOptions] - The default duration as a fallback or additional options.
 *
 *   If unspecified, the default fallback duration is 0 (zero).
 *
 * @param {durationOptions} [options] - Additional options to change the default behavior.
 *
 * @example <caption>General Usage</caption>
 * // these will return milliseconds
 * duration('3.5h') // === 12600000
 * duration('1.5h') // === 5400000
 * duration('175min') // === 10500000
 * duration('300ms') // === 300
 *
 * @example <caption>Unit Varieties</caption>
 * // singulars, plurals, and shorthands work as expected
 * duration('2s') // === 2000
 * duration('2sec') // === 2000
 * duration('2second') // === 2000
 * duration('2seconds') // === 2000
 * duration('2 second') // === 2000
 * duration('2 seconds') // === 2000
 *
 * @example <caption>Whitespaces</caption>
 * // whitespaces don't matter
 * duration('42 sec') // === 42000
 * duration(' 42sec') // === 42000
 * duration('42sec ') // === 42000
 * duration('   42   sec   ') // === 42000
 *
 * @example <caption>Separators</caption>
 * // commas, underscores, and dashes are allowed
 * duration('10000 sec') // === 10000000
 * duration('10,000 sec') // === 10000000
 * duration('10_000 sec') // === 10000000
 * duration('10-000 sec') // === 10000000
 *
 * @example <caption>Unit Tolerance</caption>
 * // multiple units are allowed too, even the crazier ones
 * duration('1 hour 23 minutes 45 seconds 600 milliseconds') // === 5025600
 * duration('100ms 200ms') // === 300
 * duration('500ms 400ms 300ms 200ms 100ms') // === 1500
 * duration('1s 2sec 3secs 4second 5seconds') // === 15000
 * duration('1.1h 2.2h 3.3h 4.4h 5.5h') // === 59400000
 * duration('0.5d 1.0day 1.5day 2.0days') // === 432000000
 *
 * @example <caption>Custom Fallback</caption>
 * // these will return the fallback duration
 * duration(undefined, '1 hour') // === 3600000
 * duration(null, '45 min') // === 2700000
 * duration(false, '60sec') // === 60000
 *
 * @example <caption>Custom Return Unit</caption>
 * // 1 hour in seconds
 * duration('1 h', { unit: 's' }) // === 3600
 *
 * // 2 days in minutes
 * duration('2 days', { unit: 'minutes' }) // === 2880
 *
 * // 3 weeks, 5 days and 12 hours in hours
 * duration('3w 5days 12 h', { unit: 'h' }) // === 636
 *
 * @example <caption>CommonJS Require</caption>
 * const duration = require('@standards/duration')
 *
 * duration('42 sec') // === 42000
 *
 * @example <caption>ES Module Import</caption>
 * import duration from '@standards/duration'
 *
 * duration('42 sec') // === 42000
 *
 * @returns {number} The duration in number.
 *                   If the given duration is invalid, the returned duration will be `0` *(zero)*.
 */
function duration (duration, defaultOrOptions, options) {
  // process options --------------------------------------------------------------------------------------------------*
  options = options || (defaultOrOptions && typeof defaultOrOptions === 'object' ? defaultOrOptions : {})
  const defaultDuration = _isValid(defaultOrOptions) ? defaultOrOptions : 0
  const unit = typeof options.unit === 'string' ? options.unit.toLowerCase() : 'ms'
  const round = typeof options.round === 'boolean' ? options.round : true

  // utilize the cache and return if the cached input exists ----------------------------------------------------------*
  const input = duration + '' + defaultDuration + '' + unit + '' + round
  const cached = input in _resultCache

  if (cached) {
    return _resultCache[input]
  }

  // process duration -------------------------------------------------------------------------------------------------*
  duration = _isValid(duration) ? duration : defaultDuration

  if (typeof duration === 'string') {
    let parsedDuration = 0

    /* istanbul ignore else */
    if (duration.length > 0) {
      /*
        matches parts:
          - matches[1] - sign - if present "-" (a dash), if absent "" (empty string)
          - matches[2] - value
          - matches[3] - unit
      */
      for (let matches, matchedValue, matchedUnit; (matches = _durationPattern.exec(duration));) {
        // parse the value part after sanitizing it
        matchedValue = parseFloat(matches[2].replace(_sanitizePattern, ''))

        // if the match has a negative sign
        if (matches[1]) {
          matchedValue = -matchedValue
        }

        if (!isNaN(matchedValue)) {
          // use the passed unit, otherwise the default unit will be milliseconds ('ms')
          matchedUnit = matches[3].toLowerCase() || 'ms'

          if (matchedUnit in _unitMap) {
            parsedDuration += matchedValue * _unitMap[matchedUnit]
          }
        }
      }
    }

    duration = parsedDuration
  }

  // converts the duration to the given unit --------------------------------------------------------------------------*
  // if the unit is valid, divide with the value of the given unit from the map, otherwise the duration will be 0
  if (unit in _unitMap) {
    duration /= _unitMap[unit]
  } else {
    duration = 0
  }

  // only round, when it's sensible
  if (duration !== 0 && round) {
    duration = Math.round(duration)

    // prevent -0 after rounding
    if (duration === 0) {
      duration = Math.abs(duration)
    }
  }

  // store the result in the cache if it's unstored
  /* istanbul ignore else */
  if (!cached) {
    _resultCache[input] = duration
  }

  return duration
}

/**
 * Creates a customized duration function with the given arguments.
 *
 * @see {@link @standards/duration~duration}
 * @function createCustom
 *
 * @param {string|number|*} [duration] - The duration(s) to parse.
 * @param {string|number|durationOptions} [defaultOrOptions] - The default duration as a fallback or additional options.
 * @param {durationOptions} [options] - Additional options to change the default behavior.
 *
 * @example <caption>CommonJS</caption>
 * const duration = require('@standards/duration')
 *
 * // custom duration function
 * // with 1 hour as a fallback, return unit is in seconds
 * const custom = duration.createCustom(null, '1 hour', { unit: 'sec' })
 *
 * @example <caption>ES Module</caption>
 * import { createCustom } from '@standards/duration'
 *
 * // custom duration function
 * // with 1 hour as a fallback, return unit is in seconds
 * const custom = createCustom(null, '1 hour', { unit: 'sec' })
 *
 * @example <caption>Custom Duration Function</caption>
 * // will return the fallback, which is "1 hour" in seconds ({ unit: 'sec' })
 * custom() // === 3600
 *
 * // will return 2 hours in seconds, since the return unit is "sec"
 * custom('2 hours') // === 7200
 *
 * @returns {duration} The customized duration function.
 */
function createCustom (duration_, defaultOrOptions, options) {
  return function durationCustom (dur, def, opt) {
    dur = typeof dur === 'string' || typeof dur === 'number' ? dur : duration_

    let defaultDuration = typeof defaultOrOptions === 'string' || typeof defaultOrOptions === 'number'
      ? defaultOrOptions
      : 0

    if (typeof def === 'string' || typeof def === 'number') {
      defaultDuration = def
    }

    // default options given upon creating the custom duration function
    let defaultOptions = defaultOrOptions && typeof defaultOrOptions === 'object'
      ? defaultOrOptions
      : {}

    if (options && typeof options === 'object') {
      defaultOptions = options
    }

    // options, when called the customized duration function with
    opt = opt || (def && typeof def === 'object' ? def : {})

    // merge the options, default options given upon creating the custom duration function will be override
    // with the options, when called the customized duration function with
    opt = Object.assign(defaultOptions, opt)

    return duration(dur, defaultDuration, opt)
  }
}

export { createCustom }

export default duration
