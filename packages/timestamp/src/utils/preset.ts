import DateAdapter from './DateAdapter'

export type Preset = 'LOG' | 'LOG-SHORT' | 'FILE' | 'FILE-SHORT'

const _PRESET_PATTERN = /^(?:LOG|LOG-SHORT|FILE|FILE-SHORT)$/

export const isPreset = (string: string): boolean => {
  return _PRESET_PATTERN.test(string)
}

export const getPreset = (dateAdapter: DateAdapter, preset: Preset): string => {
  const _ = dateAdapter
  const defaultPreset = `${_.YYYY}-${_.MM}-${_.DD}T${_.HH}:${_.mm}:${_.ss}.${_.ms}${_.getOffset()}`

  switch (preset) {
    case 'LOG':
      return defaultPreset

    case 'LOG-SHORT':
      return `${_.YYYY}-${_.MM}-${_.DD}T${_.HH}:${_.mm}:${_.ss}`

    case 'FILE':
      return `${_.YYYY}-${_.MM}-${_.DD}T${_.HH}-${_.mm}-${_.ss}-${_.ms}${_.getOffset('-')}`

    case 'FILE-SHORT':
      return `${_.YYYY}-${_.MM}-${_.DD}T${_.HH}-${_.mm}-${_.ss}`

    default:
      return defaultPreset
  }
}
