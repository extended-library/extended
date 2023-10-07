import DateAdapter from './DateAdapter'

const _PATTERN = /(YYYY|MM|DD|HH|mm|ss|ms)/g

const _MAP = {
  YYYY: 0,
  MM: 0,
  DD: 0,
  HH: 0,
  mm: 0,
  ss: 0,
  ms: 0
} as const

export default function format (string: string, dateAdapter: DateAdapter): string {
  return string.replace(_PATTERN, (key) => {
    return key in _MAP
      // @ts-expect-error
      ? dateAdapter[key]
      : key
  })
}
