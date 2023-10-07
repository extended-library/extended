export const getYear = (date: Date): string => {
  return date.getFullYear().toString()
}

export const getMonth = (date: Date): string => {
  // adjust for human-readable month as .getMonth() is 0-based (e.g.: 0 is January, 11 is December)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth#return_value
  return (date.getMonth() + 1)
    .toString()
    .padStart(2, '0')
}

export const getDay = (date: Date): string => {
  return date.getDate()
    .toString()
    .padStart(2, '0')
}

export const getHour = (date: Date): string => {
  return date.getHours()
    .toString()
    .padStart(2, '0')
}

export const getMinutes = (date: Date): string => {
  return date.getMinutes()
    .toString()
    .padStart(2, '0')
}

export const getSeconds = (date: Date): string => {
  return date.getSeconds()
    .toString()
    .padStart(2, '0')
}

export const getMilliseconds = (date: Date): string => {
  return date.getMilliseconds()
    .toString()
    .padStart(3, '0')
}

export const getOffset = (date: Date, divider = ':'): string => {
  const offset = date.getTimezoneOffset()
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
