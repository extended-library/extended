// https://github.com/standardsjs/js-util-it/blob/master/src/it.js

// TODO: truthy except false, 0, -0, 0n, "", null, undefined, and NaN.
// TODO: true, false, 1, 0, "1", "0", 'y/Y', 'n/N', 'yes', 'no', 'on', 'off'
/*
Returns true for "1", "true", "on" and "yes". Returns false otherwise.
If FILTER_NULL_ON_FAILURE is set, false is returned only for "0", "false", "off", "no", and "", and null is returned for all non-boolean values.
*/

export default function asBoolean (value: any): boolean {
  if (typeof value === 'undefined' || value === null) {
    return false
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value > 0
  }

  if (typeof value === 'string') {
    if (parseFloat(value) > 0) {
      return true
    }

    value = value.toLowerCase()

    return value === 'y' ||
      value === 'yes' ||
      value === 'on'
  }

  return false
}
