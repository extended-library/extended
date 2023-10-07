import DateAdapter from './utils/DateAdapter'

import {
  type Preset,
  isPreset,
  getPreset
} from './utils/preset'

import format from './utils/format'

// LOG -> ISO 8601 -> '2017-09-14T03:20:34.091-04:00'

// -----------------------------------------------------------------------------

interface Options<T extends string> {
  format?: T
  UTC?: boolean
  from?: string | Date
}

// -----------------------------------------------------------------------------

function timestamp (): string

function timestamp (preset: Preset): string

function timestamp (format: string): string

function timestamp (options: Options<Preset>): string

function timestamp (options: Options<string>): string

function timestamp (arg1?: any): string {
  const dateAdapter = new DateAdapter(new Date(), false)

  if (typeof arg1 === 'undefined') {
    return getPreset(dateAdapter, 'LOG')
  }

  if (typeof arg1 === 'string') {
    return isPreset(arg1)
      ? getPreset(dateAdapter, arg1 as Preset)
      : format(arg1, dateAdapter)
  } else if (typeof arg1 === 'object' && arg1 !== null) {
    if (typeof arg1.UTC === 'boolean') {
      dateAdapter.UTC = arg1.UTC
    }

    if (isPreset(arg1.preset)) {
      return getPreset(dateAdapter, arg1 as Preset)
    }

    if (typeof arg1.format === 'string') {
      return format(arg1.format, dateAdapter)
    }
  }

  return getPreset(dateAdapter, 'LOG')
}

// -----------------------------------------------------------------------------

function UTCTimestamp (): string

function UTCTimestamp (preset: Preset): string

function UTCTimestamp (format: string): string

function UTCTimestamp (options: Options<Preset>): string

function UTCTimestamp (options: Options<string>): string

function UTCTimestamp (arg1?: any): string {
  return timestamp({ UTC: true })
}

// -----------------------------------------------------------------------------

function createTimestamp (preset: Preset): typeof timestamp

function createTimestamp (format: string): typeof timestamp

function createTimestamp (options: Options<Preset>): typeof timestamp

function createTimestamp (options: Options<string>): typeof timestamp

function createTimestamp (arg1?: any): typeof timestamp {
  return () => timestamp()
}

// -----------------------------------------------------------------------------

const extendedTimestamp: typeof timestamp & {
  createTimestamp: typeof createTimestamp
  UTCTimestamp: typeof UTCTimestamp
} = timestamp as any

extendedTimestamp.createTimestamp = createTimestamp
extendedTimestamp.UTCTimestamp = UTCTimestamp

export default extendedTimestamp

// ;(() => {
//   timestamp('-YYYY-MM-')
// })()
