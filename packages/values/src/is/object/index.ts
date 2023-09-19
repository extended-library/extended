export default function isObject (value: any): boolean {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)

  return prototype === null || prototype === Object.prototype
}
