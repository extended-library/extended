// TODO: stuff below
/*
function isArray (value) {
  return typeof value === 'object'
    && Object.prototype.toString.call(value) === '[object Array]'
}

function isObject (value) {
  return typeof value === 'object'
    && Object.prototype.toString.call(value) === '[object Object]'
}

function isRegExp (value) {
  return value instanceof RegExp
}

function isEmpty (value) {
  // for string, arrays and objects too
  // export default function isEmpty (value: any): boolean {
  //   if (!value) {
  //     return true
  //   }

  //   if (typeof value === 'string') {
  //     if (value.length === 0) {
  //       return true
  //     }

  //     // TODO: empty string checks
  //   }

  //   if (toString.call(value) === '[object Array]') {
  //     return value.length === 0
  //   }

  //   if (toString.call(value) === '[object Object]') {
  //     return Object.keys(value).length === 0
  //   }

  //   return false
  // }
  return value && value.length === 0
}

function isNonEmpty (value) {
  return value && value.length > 0
}
*/

export { default as isArray } from './array'
export { default as isObject } from './object'
