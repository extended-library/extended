export default class DateAdapter {
  private readonly _date: Date
  private _UTC: boolean

  constructor (date: Date, UTC: boolean) {
    this._date = date
    this._UTC = UTC
  }

  get UTC (): boolean {
    return this.UTC
  }

  set UTC (UTC: boolean) {
    this._UTC = UTC
  }

  get YYYY (): string {
    const year = this._UTC
      ? this._date.getUTCFullYear()
      : this._date.getFullYear()

    return year.toString()
  }

  get MM (): string {
    // .get*Month() is 0-based (e.g.: 0 is January, 11 is December)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth#return_value
    const month = this._UTC
      ? this._date.getUTCMonth()
      : this._date.getMonth()

    // adjust to be a human-readable month
    return (month + 1)
      .toString()
      .padStart(2, '0')
  }

  get DD (): string {
    const day = this._UTC
      ? this._date.getUTCDate()
      : this._date.getDate()

    return day.toString().padStart(2, '0')
  }

  get HH (): string {
    const hours = this._UTC
      ? this._date.getUTCHours()
      : this._date.getHours()

    return hours.toString().padStart(2, '0')
  }

  get mm (): string {
    const minutes = this._UTC
      ? this._date.getUTCMinutes()
      : this._date.getMinutes()

    return minutes.toString().padStart(2, '0')
  }

  get ss (): string {
    const seconds = this._UTC
      ? this._date.getUTCSeconds()
      : this._date.getSeconds()

    return seconds.toString().padStart(2, '0')
  }

  get ms (): string {
    const milliseconds = this._UTC
      ? this._date.getUTCMilliseconds()
      : this._date.getMilliseconds()

    return milliseconds.toString().padStart(3, '0')
  }

  getOffset = (divider = ':'): string => {
    const offset = this._date.getTimezoneOffset()
    // const offset = -150

    const diffHours = Math.floor(offset / 60 * -1)
    const diffMinutes = offset % 60 * -1

    let diff = ''

    if (offset < 0) {
      diff += '-'
    } else {
      diff += '+'
    }

    diff += diffHours.toString().padStart(2, '0')
    diff += divider
    diff += diffMinutes.toString().padStart(2, '0')

    return diff
  }
}
