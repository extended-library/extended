import {
  getYear,
  getMonth,
  getDay,
  getHour,
  getMinutes,
  getSeconds,
  getMilliseconds,
  getOffset
} from './utils'

// LOG -> ISO 8601 -> '2017-09-14T03:20:34.091-04:00'

type Preset = 'LOG' | 'LOG-SHORT' | 'FILE' | 'FILE-SHORT'

interface Options {
  preset?: Preset
  format?: string
  from?: string
}

function timestamp (): string
function timestamp (format: string): string
function timestamp (preset: Preset): string
function timestamp (options: Options): string

function timestamp (arg1?: any): string {
  const date = new Date()
  // // var offset = localDate.getTimezoneOffset();
  // // var utc = new Date(localDate.getTime() - offset * 60000);

  // // console.log(offset)
  // // console.log(utc)

  // console.log(new Date().toString())
  // console.log(new Date().toISOString())

  // console.log(new Date().getHours())
  // console.log(new Date().getUTCHours())

  if (typeof arg1 === 'undefined' || arg1 === 'LOG') {
    return (
      getYear(date) + '-' + getMonth(date) + '-' + getDay(date) +
      'T' +
      getHour(date) + ':' + getMinutes(date) + ':' + getSeconds(date) +
      '.' + getMilliseconds(date) +
      getOffset(date)
    )
  }

  if (arg1 === 'LOG-SHORT') {
    return (
      getYear(date) + '-' + getMonth(date) + '-' + getDay(date) +
      'T' +
      getHour(date) + ':' + getMinutes(date) + ':' + getSeconds(date)
    )
  }

  if (arg1 === 'FILE') {
    return (
      getYear(date) + '-' + getMonth(date) + '-' + getDay(date) +
      'T' +
      getHour(date) + '-' + getMinutes(date) + '-' + getSeconds(date) +
      '-' + getMilliseconds(date) +
      getOffset(date, '-')
    )
  }

  if (arg1 === 'FILE-SHORT') {
    return (
      getYear(date) + '-' + getMonth(date) + '-' + getDay(date) +
      'T' +
      getHour(date) + '-' + getMinutes(date) + '-' + getSeconds(date)
    )
  }

  return timestamp()
}

export default timestamp
