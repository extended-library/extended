// TODO: options with fallback

function toArray (): []
function toArray (value?: undefined | null): []
function toArray (value: string): string[]

function toArray <T extends ArrayLike<any>> (value: T): T
function toArray <T> (value: Set<T>): T[]
function toArray <K, V> (value: Map<K, V>): Array<Array<K | V>>

function toArray <T = unknown> (value: T): [T]

function toArray (value?: any): any {
  if (value === undefined || value === null) {
    return []
  }

  if (typeof value === 'string') {
    return [value]
  }

  if (Array.isArray(value)) {
    return value
  }

  if (typeof value[Symbol.iterator] === 'function') {
    return [...value]
  }

  return [value]
}

export default toArray
