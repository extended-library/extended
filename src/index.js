'use strict'

/**
 * Additional options to change the default behavior.
 *
 * @typedef {Object} duratioOptions
 *
 * @property {string}  [unit='ms']  - The unit in which the returned duration will be converted to.
 *                                    By default, the returned duration will be in milliseconds ('ms').
 *                                    Possible units are the same as for the durations to parse
 *                                    (from milliseconds to weeks).
 * @property {boolean} [round=true] - If true, the returned duration will be rounded. By default, it's true.
 */

/**
 * Converts different types of string durations to milliseconds, seconds, minutes, and more as numbers.
 *
 * @function duratio
 *
 * @param {string|number|*} [duration] - The duration(s) to parse.
 *                                       Multiple durations are allowed in the string separated by spaces and/or commas.
 *                                       Valid duration units: weeks, days, hours, minutes, seconds, and milliseconds.
 *                                       Possible duration unit variations:
 *                                           - milliseconds: 'ms', 'millisecond', 'milliseconds'
 *                                           - seconds:      's',  'sec',         'second',      'seconds'
 *                                           - minutes:      'm',  'min',         'minute',      'minutes'
 *                                           - hours:        'h',  'hour',        'hours'
 *                                           - days:         'd',  'day',         'days'
 *                                           - weeks:        'w',  'week',        'weeks'
 *
 * @param {string|number|duratioOptions} [defaultOrOptions] - The default duration as a fallback or additional
 *                                                                   options. If unspecified, the default fallback
 *                                                                   duration is 0 (zero).
 * @param {duratioOptions}               [options]          - Additional options to change
 *                                                                   the default behavior.
 *
 * @example
 * duratio('3.5h');
 * duratio('1.5h');
 * duratio('175min');
 * duratio('42 sec');
 * duratio('300ms');
 * duratio('1 hour 23 minutes 45 seconds 600 milliseconds');
 *
 * @returns {number} The duration in number.
 *                   If the given duration is invalid, the returned duration will be 0 (zero).
 */
function duratio (duration, defaultOrOptions, options) {
  // process options --------------------------------------------------------------------------------------------------*
  options = options || (defaultOrOptions && typeof defaultOrOptions === 'object' ? defaultOrOptions : {})
  const defaultDuration = duratio._isValid(defaultOrOptions) ? defaultOrOptions : 0
  const unit = typeof options.unit === 'string' ? options.unit.toLowerCase() : 'ms'
  const round = typeof options.round === 'boolean' ? options.round : true

  // utilize the cache and return if the cached input exists ----------------------------------------------------------*
  const input = duration + '' + defaultDuration + '' + unit + '' + round
  const cached = input in duratio._resultCache

  if (cached) {
    return duratio._resultCache[input]
  }

  // process duration -------------------------------------------------------------------------------------------------*
  duration = duratio._isValid(duration) ? duration : defaultDuration

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
      for (let matches, matchedValue, matchedUnit; (matches = duratio._durationPattern.exec(duration));) {
        // parse the value part after sanitizing it
        matchedValue = parseFloat(matches[2].replace(duratio._sanitizePattern, ''))

        // if the match has a negative sign
        if (matches[1]) {
          matchedValue = -matchedValue
        }

        if (!isNaN(matchedValue)) {
          // use the passed unit, otherwise the default unit will be milliseconds ('ms')
          matchedUnit = matches[3].toLowerCase() || 'ms'

          if (matchedUnit in duratio._unitMap) {
            parsedDuration += matchedValue * duratio._unitMap[matchedUnit]
          }
        }
      }
    }

    duration = parsedDuration
  }

  // converts the duration to the given unit --------------------------------------------------------------------------*
  // if the unit is valid, divide with the value of the given unit from the map, otherwise the duration will be 0
  if (unit in duratio._unitMap) {
    duration /= duratio._unitMap[unit]
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
    duratio._resultCache[input] = duration
  }

  return duration
}

/**
 * Creates and returns a customized duratio function with the given arguments.
 *
 * @function createCustom
 *
 * @param {string|number|*} [duration] - The duration(s) to parse.
 *                                       Multiple durations are allowed in the string separated by spaces and/or commas.
 *                                       Valid duration units: weeks, days, hours, minutes, seconds, and milliseconds.
 *                                       Possible duration unit variations:
 *                                           - milliseconds: 'ms', 'millisecond', 'milliseconds'
 *                                           - seconds:      's',  'sec',         'second',      'seconds'
 *                                           - minutes:      'm',  'min',         'minute',      'minutes'
 *                                           - hours:        'h',  'hour',        'hours'
 *                                           - days:         'd',  'day',         'days'
 *                                           - weeks:        'w',  'week',        'weeks'
 *
 * @param {string|number|duratioOptions} [defaultOrOptions] - The default duration as a fallback or additional
 *                                                                   options. If unspecified, the default fallback
 *                                                                   duration is 0 (zero).
 * @param {duratioOptions}               [options]          - Additional options to change
 *                                                                   the default behavior.
 *
 * @example
 * duratio('3.5h');
 * duratio('1.5h');
 * duratio('175min');
 * duratio('42 sec');
 * duratio('300ms');
 * duratio('1 hour 23 minutes 45 seconds 600 milliseconds');
 *
 * @returns {duratio} The customized duratio function.
 */
duratio.createCustom = (duration, defaultOrOptions, options) => {
  return function duratioCustom (dur, def, opt) {
    dur = typeof dur === 'string' || typeof dur === 'number' ? dur : duration

    let defaultDuration = typeof defaultOrOptions === 'string' || typeof defaultOrOptions === 'number'
      ? defaultOrOptions
      : 0

    if (typeof def === 'string' || typeof def === 'number') {
      defaultDuration = def
    }

    // default options given upon creating the custom duratio function
    let defaultOptions = defaultOrOptions && typeof defaultOrOptions === 'object'
      ? defaultOrOptions
      : {}

    if (options && typeof options === 'object') {
      defaultOptions = options
    }

    // options, when called the customized duratio function with
    opt = opt || (def && typeof def === 'object' ? def : {})

    // merge the options, default options given upon creating the custom duratio function will be override
    // with the options, when called the customized duratio function with
    opt = Object.assign(defaultOptions, opt)

    return duratio(dur, defaultDuration, opt)
  }
}

/**
 * A week in milliseconds.
 *
 * @private
 * @const {number}
 */
duratio._WEEK_IN_MS = 604800000

/**
 * A day in milliseconds
 *
 * @private
 * @const {number}
 */
duratio._DAY_IN_MS = 86400000

/**
 * An hour in milliseconds.
 *
 * @private
 * @const {number}
 */
duratio._HOUR_IN_MS = 3600000

/**
 * A minute in milliseconds.
 *
 * @private
 * @const {number}
 */
duratio._MINUTE_IN_MS = 60000

/**
 * A second in milliseconds.
 *
 * @private
 * @const {number}
 */
duratio._SECOND_IN_MS = 1000

/**
 * A map of key-value units for more compact duration parsing.
 *
 * @private
 * @const {Object}
 */
duratio._unitMap = {
  // weeks
  w: duratio._WEEK_IN_MS,
  wk: duratio._WEEK_IN_MS,
  wks: duratio._WEEK_IN_MS,
  week: duratio._WEEK_IN_MS,
  weeks: duratio._WEEK_IN_MS,

  // days
  d: duratio._DAY_IN_MS,
  dy: duratio._DAY_IN_MS,
  day: duratio._DAY_IN_MS,
  days: duratio._DAY_IN_MS,

  // hours
  h: duratio._HOUR_IN_MS,
  hr: duratio._HOUR_IN_MS,
  hrs: duratio._HOUR_IN_MS,
  hour: duratio._HOUR_IN_MS,
  hours: duratio._HOUR_IN_MS,

  // minutes
  m: duratio._MINUTE_IN_MS,
  mn: duratio._MINUTE_IN_MS,
  min: duratio._MINUTE_IN_MS,
  mins: duratio._MINUTE_IN_MS,
  minute: duratio._MINUTE_IN_MS,
  minutes: duratio._MINUTE_IN_MS,

  // seconds
  s: duratio._SECOND_IN_MS,
  sec: duratio._SECOND_IN_MS,
  secs: duratio._SECOND_IN_MS,
  second: duratio._SECOND_IN_MS,
  seconds: duratio._SECOND_IN_MS,

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
duratio._durationPattern = /(-?)([\d\s\-_,.]+)\s*([a-zA-Z]*)/g

/**
 * The pattern to use, when sanitizing the parsed duration.
 *
 * @private
 * @const {RegExp}
 */
duratio._sanitizePattern = /[\s\-_,]/g

/**
 * The cache to store the results based on the given arguments.
 *
 * @private
 * @type {Object}
 */
duratio._resultCache = {}

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
duratio._isValid = (object) => {
  return (typeof object === 'string' && object.length > 0) ||
    (typeof object === 'number' && object > -Infinity && object < Infinity && !isNaN(object))
}

export default duratio
